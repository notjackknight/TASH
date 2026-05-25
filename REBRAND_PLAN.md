# Rebrand Implementation Plan — "The Esthetic Haus" → "TASH Skin"

> **Audience:** A fresh-context coding agent picking this up cold. Everything you need is in this file plus the audit at [REBRAND_AUDIT_TASH_SKIN.md](REBRAND_AUDIT_TASH_SKIN.md). **Read both before starting.**
> **Project root:** `c:\Users\jackk\OneDrive\Desktop\the-esthetic-haus`
> **Stack:** Vite + React 19 + TypeScript + React Router 7 + Tailwind v4 + Cloudflare Pages + Cloudflare Pages Functions + Square SDK v44

---

## 0. Context

The client, Natasha, is rebranding her med-spa business from **"The Esthetic Haus"** to **"TASH Skin"** for legal/copyright reasons. The word "Haus" must be eliminated from the live website, its metadata, its assets, its file names, and its domain. A separate audit document ([REBRAND_AUDIT_TASH_SKIN.md](REBRAND_AUDIT_TASH_SKIN.md)) catalogs **~260 individual references across ~30 files** — that is your ground-truth reference list. This plan tells you the **order of operations** and **the non-obvious gotchas** so you don't break things.

**New brand assets:** The client placed her replacement assets in `c:\Users\jackk\OneDrive\Desktop\the-esthetic-haus\Revision_Items\`:
- `new_Hero_image.png` — replaces the hero background image
- `new_heartbehindthehaus_image.PNG` — replaces the founder portrait in About
- `new_navbar_logo.PNG` — replaces the navbar logo (and JSON-LD `logo` reference)
- `new_The Haus Signature Brow + Lash Package_card_image.PNG` — replaces the Brow + Lash package card
- `tash-skin-copy.md` — new About-page copy + new hero subtitle text

**New domain:** `www.tashskin.com` (canonical). Use the `www.` form in all canonical/sitemap/OG/JSON-LD URLs to match the existing site's pattern (it already uses `www.esthetic.haus` everywhere).

**Square backend:** All Square services and packages have been renamed by the client on the Square side. **Pull the new names + Square IDs + prices from the Square Catalog API** rather than retyping them by hand. See § 5 below.

---

## 1. Critical Constraints — Read First

These are the things that will silently break the site if you miss them.

### 1.1 — `useBooking.ts` is a string-match dictionary
[src/hooks/useBooking.ts](src/hooks/useBooking.ts) has a `SERVICE_ID_MAP` of lowercased service titles → Square IDs. The `openBooking('Service Title')` function does `serviceTitle.toLowerCase()` and looks it up. If a service title in Services.tsx says `'Signature Facial'` but the map has `'signature haus facial'`, **the booking link silently falls back to the generic booking page with no service preselected**. After renaming services, every lookup key in this map must match the new lowercase title exactly. Pull from Square (see § 5).

### 1.2 — Square service catalog has the canonical truth now
The client has already renamed everything in Square. Do **not** invent new service/package names. Fetch them via the Square Catalog API and use those exact strings everywhere. § 5 has the script.

### 1.3 — Services.tsx, MaySpecialStrip.tsx, and useBooking.ts all duplicate the same service titles
Three files reference the same 30+ services. They must stay perfectly in sync. § 6 lays out the order.

### 1.4 — `data/packages.ts` uses `iconName: string`; `Packages.tsx` uses `Icon: React.ComponentType`
The two files define the `Package` type differently. **`Packages.tsx` is the source the UI actually renders.** `data/packages.ts` appears unused or duplicative — verify with a grep before deciding whether to update it, delete it, or leave it as a typed export reference. Default: update both to keep them consistent, but the UI gets its data from `Packages.tsx`.

Also: `Packages.tsx` includes one extra package (the brow-lammy combo at line 121) that doesn't exist in `data/packages.ts`. Don't lose it during sync.

### 1.5 — About.tsx narrative was 2 paragraphs; the new copy is 4 paragraphs
The current structure has a desktop-only second paragraph and a mobile collapsible duplicate. The new 4-paragraph copy needs the collapsible behavior to expand to wrap paragraphs 2–4 on mobile, with paragraph 1 always visible. See § 7.

### 1.6 — Hero subtitle is the right slot for the new tagline
The client's new tagline — *"Built from a childhood dream. Rooted in TASH skin."* — is longer than a hero title typically allows. It fits the existing subtitle slot (currently `Personalized skincare, lashes, and brows...`). Keep `Where beauty comes home.` as the title, swap the subtitle. § 7.

### 1.7 — Image dimensions must match what's already deployed
The Tailwind classes that style each image hard-code aspect ratios. The replacement images must be **fed into `scripts/optimize_bg.py`** which downscales to PHOTO_MAX=2400 longest side at WEBP quality 80. Do **not** introduce new dimensions or aspect ratios in the markup. § 4.

### 1.8 — Asset folder rename has ~80 reference sites
`public/eh_public_assets/` is referenced in ~80 places. **Do not rename this top-level folder in this rebrand.** Inside it, rename only the two sub-folders that contain "haus" in the name: `Haus_Packages/` → `Packages/`, and `Heart_behind_the_haus/` → `Heart_behind_the_brand/`. § 8.

Justification: keeping the `eh_public_assets` top-level name is a calculated trade-off. It's a folder name on disk and is not user-visible — neither in URLs that customers ever see (these load as background images and `<img>` srcs only), nor in any text content. Renaming it would touch ~80 lines for zero customer benefit and a real chance of typos breaking image loads. **Leave it.** This is approved scope reduction; flag it in the post-launch summary so the client knows.

### 1.9 — `index.html` JSON-LD has 5 separate `provider` entries
Lines 107, 116, 125, 134, 143 each have `"provider": {"@type": "DaySpa", "name": "The Esthetic Haus"}`. All 5 must be updated. Easy to miss one.

### 1.10 — TCPA SMS consent text in FloatingActionButton.tsx is legal copy
The line `I agree to receive texts from The Esthetic Haus.` ([src/components/FloatingActionButton.tsx:168](src/components/FloatingActionButton.tsx#L168)) is the SMS opt-in disclosure. It must name the actual sending entity. Update to `TASH Skin` — and verify with the client that her registered SMS sender display name in Square has been updated too. (Note in [MANUAL_CLIENT_TASKS.md](MANUAL_CLIENT_TASKS.md) covers this.)

### 1.11 — Customer review in `reviews.ts` quotes the old brand by name
`'The Esthetic Haus is so cozy and Natasha does amazing work!'` appears in both [src/data/reviews.ts:67](src/data/reviews.ts#L67) and [src/components/Reviews.tsx:72](src/components/Reviews.tsx#L72). **Recommended action:** leave it untouched (it's a real customer's quote — editing it changes a third party's words and is also flagged as a legal/ethics question). Surface this in the post-launch summary for the client to decide if she wants to pull it later. Do not silently edit a quote.

### 1.12 — Google Maps iframe encodes the old business name
[src/components/Footer.tsx:379](src/components/Footer.tsx#L379) has `!2sThe%20Esthetic%20Haus!` in the embed URL. The Place ID portion (`0x88531b596847c949...`) is stable across a GBP rename, but the encoded name in the iframe will display the old name as a label until the client renames the GBP. **Action:** Replace the encoded name portion with `TASH%20Skin` so when the GBP rename propagates, the iframe matches. The iframe will continue to render the correct pin via the Place ID regardless.

---

## 2. Order of Operations

Do not deviate from this order. Each step depends on the previous one.

1. **Step A — Fetch Square truth (§ 5)** — Generate the authoritative service+package list from Square. This unblocks every rename.
2. **Step B — Drop in new images + run optimizer (§ 4)** — New WebP files exist before code references them.
3. **Step C — Update single sources of truth (§ 3)** — `src/data/business.ts`, then `index.html`, then `site.webmanifest`, `sitemap.xml`, `robots.txt`. These propagate to every page via React-Helmet.
4. **Step D — Update services + booking (§ 6)** — Services.tsx, MaySpecialStrip.tsx, useBooking.ts in lockstep, using Step A's output.
5. **Step E — Update packages (§ 6)** — Packages.tsx and data/packages.ts, using Step A's output.
6. **Step F — Update copy components (§ 7)** — Hero.tsx, About.tsx, Footer.tsx, Navigation.tsx, ECommerce.tsx, ShopStrip.tsx, FloatingActionButton.tsx, Legal.tsx, Gallery.tsx alt-text, MaySpecialStrip.tsx headlines, the 6 service/about page bodies.
7. **Step G — Rename folders + references (§ 8)** — `Haus_Packages/` → `Packages/`, `Heart_behind_the_haus/` → `Heart_behind_the_brand/`. Update all 8 package image refs + 1 about image ref + 1 background image ref. Update `scripts/optimize_bg.py`.
8. **Step H — Update developer-only files (§ 9)** — `claude.md`, comments in code.
9. **Step I — Build + lint + visual QA (§ 10)** — `npm run lint`, `npm run build`, `npm run preview`. Smoke-test every page.

---

## 3. Single Sources of Truth — Update These First

These four files are imported by everything else. Get them right and most metadata flows.

### 3.1 — [src/data/business.ts](src/data/business.ts)
```ts
// Change:
name: 'The Esthetic Haus',
url: 'https://www.esthetic.haus',
email: 'theesthetichausllc@gmail.com',
instagram: 'https://www.instagram.com/theesthetichausbynatasha/',

// To:
name: 'TASH Skin',
url: 'https://www.tashskin.com',
email: 'tashskinllc@gmail.com',
instagram: 'https://www.instagram.com/tashskinstudio/',
```
These are confirmed values from the senior dev — use them as written. No placeholders needed.

### 3.2 — [index.html](index.html)
17 references to update. Specifically:
- Line 6 — `<title>` — keep "Where Beauty Comes Home" tagline or replace per client; default to: `TASH Skin — Where Beauty Comes Home`
- Lines 7, 12, 22 — meta descriptions (rewrite: "TASH Skin is a skincare studio in Greensboro, NC offering facials, lash extensions, brow treatments, microneedling, waxing, and teeth whitening. Book today.")
- Line 8 — canonical → `https://www.tashskin.com/`
- Lines 11, 21 — `og:title` / `twitter:title` → `TASH Skin | Skincare Studio in Greensboro, NC`
- Lines 14, 15, 23 — URL/image refs → swap `www.esthetic.haus` → `www.tashskin.com`
- Line 16 — `og:site_name` → `TASH Skin`
- Lines 50 — preload `/eh_public_assets/Logo/EH_Logo.webp` — keep this preload but reference the new logo file (see § 4)
- Lines 59, 60 — JSON-LD `name` and `alternateName` → `TASH Skin` / `TASH Skin by Natasha`
- Line 61 — JSON-LD `url` → `https://www.tashskin.com`
- Line 63 — JSON-LD `email` → from business.ts
- Line 77 — JSON-LD `image` URL — domain swap
- Line 78 — JSON-LD `logo` URL — domain swap + verify it points to the new logo file
- Line 88 — JSON-LD `sameAs` IG URL — from business.ts
- **Lines 107, 116, 125, 134, 143** — 5× JSON-LD `provider.name` `"The Esthetic Haus"` → `"TASH Skin"`

### 3.3 — [public/site.webmanifest](public/site.webmanifest)
```json
{ "name": "TASH Skin", "short_name": "TASH Skin", ... }
```

### 3.4 — [public/sitemap.xml](public/sitemap.xml) + [public/robots.txt](public/robots.txt)
All 7 `<loc>` entries in sitemap.xml and the 1 `Sitemap:` line in robots.txt: `www.esthetic.haus` → `www.tashskin.com`. Update `<lastmod>` to today's date.

### 3.5 — [src/components/SEOHead.tsx](src/components/SEOHead.tsx)
- Line 14: dynamic OG image URL fallback — confirm it now reads `${business.url}/eh_public_assets/hero/hero_asset.webp` and that the URL string is sourced from `business.url`. If business.ts is updated correctly, this resolves itself.
- Line 26: hard-coded `og:site_name` content → `TASH Skin` (or read from business.ts — preferred).

### 3.6 — Per-page SEO blocks (6 files)
[src/pages/services/FacialsPage.tsx:42-43](src/pages/services/FacialsPage.tsx#L42-L43), [LashesPage.tsx:42-43](src/pages/services/LashesPage.tsx#L42-L43), [BrowsPage.tsx:42-43](src/pages/services/BrowsPage.tsx#L42-L43), [MicroneedlingPage.tsx:42-43](src/pages/services/MicroneedlingPage.tsx#L42-L43), [TeethWhiteningPage.tsx:41-42](src/pages/services/TeethWhiteningPage.tsx#L41-L42), [GreensboroMedSpaPage.tsx:29-30](src/pages/GreensboroMedSpaPage.tsx#L29-L30). Pattern: replace `The Esthetic Haus` with `TASH Skin` in both `title` and `description` props. On GreensboroMedSpaPage, also handle `The Esthetic Haus by Natasha` → `TASH Skin by Natasha`.

---

## 4. New Image Installation

The client's source files are in `c:\Users\jackk\OneDrive\Desktop\the-esthetic-haus\Revision_Items\`. They are large PNGs and must be optimized into the same WebP slots the current assets use. **Do not change any `<img>` markup, sizing classes, or aspect ratios** — the new asset must visually fit where the old asset sat.

### 4.1 — Copy raw assets into `eh_source_assets/`
The optimizer expects PNG/JPG inputs in `eh_source_assets/`. The destination layout already exists; mirror the structure. Copy as:

| From (`Revision_Items/`) | To (`eh_source_assets/`) | Then optimizer writes to (`public/eh_public_assets/`) |
|---|---|---|
| `new_Hero_image.png` | `hero/hero_asset.png` | `hero/hero_asset.webp` |
| `new_heartbehindthehaus_image.PNG` | `Heart_behind_the_brand/founder_portrait.png` *(see § 8 for new folder name)* | `Heart_behind_the_brand/founder_portrait.webp` |
| `new_navbar_logo.PNG` | `Logo/TASH_Logo.png` | `Logo/TASH_Logo.webp` |
| `new_The Haus Signature Brow + Lash Package_card_image.PNG` | `Packages/Brow_Lash_Combo.png` *(see § 8)* | `Packages/Brow_Lash_Combo.webp` |

Use safe filenames (no spaces, no parens). The exact destination filenames above are recommended; if you change them, update every code reference too.

### 4.2 — Update [scripts/optimize_bg.py](scripts/optimize_bg.py)
Add jobs for the new assets and rename existing entries to match the new folder structure (§ 8). The optimizer accepts `("photo", src_rel, dst_rel)` tuples. Add/update:

```python
("photo", "hero/hero_asset.png",                     "hero/hero_asset.webp"),
("photo", "Heart_behind_the_brand/founder_portrait.png", "Heart_behind_the_brand/founder_portrait.webp"),
("photo", "Logo/TASH_Logo.png",                      "Logo/TASH_Logo.webp"),
("photo", "Packages/Brow_Lash_Combo.png",            "Packages/Brow_Lash_Combo.webp"),
("photo", "Packages/HP_BG_New.jpg",                  "Packages/HP_BG_New.webp"),   # was Haus_Packages/
("photo", "Packages/HP_BG_mobile.jpg",               "Packages/HP_BG_mobile.webp"), # was Haus_Packages/
```
Also remove the old `Logo/EH_Logo.png` → `Logo/EH_Logo.webp` job and the old `Brow_Lammy_Combos` job since those are being replaced.

### 4.3 — Run the optimizer
```
python scripts/optimize_bg.py
```
This is a one-shot operation. It downscales each photo to 2400px longest side at WEBP quality 80, which matches every existing asset. Output goes into `public/eh_public_assets/` at the destination paths.

### 4.4 — Update code references to new filenames
- [index.html:50](index.html#L50): `/eh_public_assets/Logo/EH_Logo.webp` → `/eh_public_assets/Logo/TASH_Logo.webp`
- [index.html:78](index.html#L78): same swap in JSON-LD logo URL (full domain)
- [src/components/Navigation.tsx:79](src/components/Navigation.tsx#L79): logo `<img src>` → `/eh_public_assets/Logo/TASH_Logo.webp`
- [src/components/About.tsx:48](src/components/About.tsx#L48): `src="/eh_public_assets/Heart_behind_the_haus/A00A7255_1771383766.webp"` → `src="/eh_public_assets/Heart_behind_the_brand/founder_portrait.webp"`
- [src/components/Hero.tsx:5](src/components/Hero.tsx#L5): `HERO_IMAGE` constant — no path change if you keep the destination filename `hero/hero_asset.webp`, which is the recommended approach.
- [index.html:44](index.html#L44): preload — keep as-is if hero filename is unchanged.
- [src/components/Packages.tsx:125](src/components/Packages.tsx#L125): `image: '/eh_public_assets/Haus_Packages/Brow_Lammy_Combos.webp'` → `image: '/eh_public_assets/Packages/Brow_Lash_Combo.webp'`

### 4.5 — Delete the old image files after the build succeeds
Once you've verified the build is loading the new assets, remove these old files:
- `public/eh_public_assets/Logo/EH_Logo.webp`
- `public/eh_public_assets/Heart_behind_the_haus/A00A7255_1771383766.webp` (and the now-empty folder)
- `public/eh_public_assets/Haus_Packages/Brow_Lammy_Combos.webp` (the file — rest of folder moves in § 8)
- The hero file is being overwritten by the new optimizer output, so it self-replaces.

### 4.6 — Favicons + og-image — auto-generate from the new logo
Senior dev has approved auto-generation. Use the new TASH logo (`eh_source_assets/Logo/TASH_Logo.png` once placed) as the source. Write a Python script `scripts/generate_favicons.py` (uses Pillow, same `PIL` import already required by `optimize_bg.py`) that:

1. Reads `eh_source_assets/Logo/TASH_Logo.png`.
2. Centers it on a transparent square canvas (or on the brand background color `#D1C7B5` from `site.webmanifest`) — choose transparent if the logo has good contrast, brand-color if the logo is light-on-light.
3. Exports four favicon sizes into `public/`:
   - `favicon-16x16.png` (16×16)
   - `favicon-32x32.png` (32×32)
   - `apple-touch-icon.png` (180×180, on brand-color bg per Apple guidelines — they don't support transparency)
   - `favicon.ico` — multi-resolution ICO containing 16×16, 32×32, and 48×48. Pillow can save `.ico` directly with the `sizes=[(16,16),(32,32),(48,48)]` kwarg.
4. Exports a 1200×630 Open Graph share image to `public/og-image.jpg`:
   - Brand-color background (`#D1C7B5` or `#5C2828` anchor — test which reads better)
   - New logo centered, scaled to ~40% of canvas width
   - Optional: small tagline text below logo (`Greensboro, NC` or `Skincare Studio`) in white, serif font — but only if Pillow can find a system serif font; otherwise skip the text to avoid a fallback-font look
   - Save as JPG at quality 90

Run order: place the logo PNG, run `optimize_bg.py` (for the navbar webp), then run `generate_favicons.py`. Both scripts are idempotent.

If the auto-generated og-image looks rough, flag it in the end-of-task summary so the senior dev can hand it off to a designer later — but ship the auto-generated version for now.

---

## 5. Pulling Services + Packages from Square (the time-saver)

The client has renamed all services and packages in Square Appointments. **Do not retype them.** Run a one-shot script to fetch the new authoritative list, then merge into the codebase.

### 5.1 — Write `scripts/sync_from_square.ts`
A Node script (run via `tsx`) that uses the existing Square SDK + the existing `.env` credentials. **It must run ONCE locally, write a JSON output file, and not be part of the runtime build.** No new server endpoints, no Cloudflare Function, no `npm run dev` integration.

Recommended shape (the agent writes this from scratch — outline below):

```ts
// scripts/sync_from_square.ts — run with: npx tsx scripts/sync_from_square.ts
// Reads SQUARE_ACCESS_TOKEN + SQUARE_ENVIRONMENT from .env.
// Lists all ITEM-type catalog objects, extracts:
//   - id (Square catalog item ID — what useBooking.ts uses)
//   - name (the renamed title)
//   - description (Square's short description, NOT the website's marketing desc)
//   - variations[0].itemVariationData.priceMoney.amount (cents)
// Writes the result to scripts/.square_catalog.json (gitignored) and prints a
// human-readable table to stdout.
```

Implementation notes:
- Use `client.catalog.list({ types: 'ITEM' })` or `client.catalog.search({ object_types: ['ITEM'] })`. Paginate via `cursor`.
- Square's `priceMoney.amount` is a **bigint in cents**. Format with `$${(Number(amount) / 100).toFixed(0)}` for whole dollars or `.toFixed(2)` if cents exist. The current code uses whole-dollar strings like `'$100'`, so default to `.toFixed(0)` unless cents are present.
- Filter to ITEM objects with bookable variations (skip retail items like Cosmedix products if any exist in the same Square catalog).
- Pretty-print results so the agent (you) can manually map them to the existing Services.tsx / Packages.tsx / MaySpecialStrip.tsx / useBooking.ts entries.

### 5.2 — Add `scripts/.square_catalog.json` to `.gitignore`
This file is a developer artifact and contains business data that doesn't belong in version control.

### 5.3 — Use the output to refresh four files, in order
Once you have the JSON, use it as ground truth for:

1. **[src/hooks/useBooking.ts](src/hooks/useBooking.ts) `SERVICE_ID_MAP`** — replace the 30+ lowercase-title-keyed entries. Each key = the new lowercased title from Square, each value = the Square catalog item ID. Skip retail/non-bookable items.
2. **[src/components/Services.tsx](src/components/Services.tsx) services array (lines 50–304)** — for each existing service entry, find the Square equivalent (likely matched by removing "Haus" from the old title) and update the `title` field. **Leave `desc`, `category`, `price` (verify against Square — may need updates if she changed pricing) alone unless Square's data overrides them.**
3. **[src/components/MaySpecialStrip.tsx](src/components/MaySpecialStrip.tsx) (lines 27–63)** — same treatment. Update `title` and `squareId` for each picklist entry.
4. **[src/components/Packages.tsx](src/components/Packages.tsx) + [src/data/packages.ts](src/data/packages.ts)** — packages are Square Appointment Services too (per `squareItemId` field). Match by old title minus "Haus" and update `title` + `squareItemId`. **`description`, `includes`, `highlights`, `upgrades`, `image`, `Icon`, `bestFor` are website-only and do not come from Square — leave them alone.**

### 5.4 — Verify booking after step 5.3
After every update, the booking lookup logic relies on **lowercase-exact match** between Services.tsx `title` and useBooking.ts `SERVICE_ID_MAP` keys. After the rename, run the booking smoke-test (§ 10): click "Book Now" on 5 random services + 2 packages, confirm Square Appointments opens with the right service preselected.

### 5.5 — What if Square's name doesn't cleanly map to an existing entry?
If you can't confidently match a Square item to one of the existing Services.tsx entries (e.g., the client added new services, removed some, or substantially renamed beyond just dropping "Haus"), **stop and surface the unmapped items in your end-of-task summary**. Do not guess. Don't drop existing services either — leave them with `TODO_CLIENT:` markers in the title and surface them for the client to confirm.

---

## 6. Service & Package Title Cascade — Implementation Detail

When updating titles, work this order to avoid breaking the booking flow mid-edit:

1. Edit [src/hooks/useBooking.ts](src/hooks/useBooking.ts) `SERVICE_ID_MAP` keys first (lowercase, exact). The map is the contract.
2. Edit [src/components/Services.tsx](src/components/Services.tsx) `title` fields. Each `title` you write here will be lowercased and used as a lookup into the map. They must match.
3. Edit [src/components/MaySpecialStrip.tsx](src/components/MaySpecialStrip.tsx). It uses `squareId` directly (not a string lookup), so titles here are display-only — but they should still match what's in Services.tsx for visual consistency.
4. Edit [src/components/Packages.tsx](src/components/Packages.tsx) and [src/data/packages.ts](src/data/packages.ts) — these use `squareItemId` for booking; titles are display-only.
5. Update [src/pages/services/TeethWhiteningPage.tsx:129](src/pages/services/TeethWhiteningPage.tsx#L129): `openBooking('Pearly White Haus Teeth Whitening')` → `openBooking('<new Square name>')`. **This is the only direct `openBooking(...)` string call outside the Services component**; it must match the Square name exactly (case-insensitively).
6. Update section headings:
   - [src/components/Services.tsx:492](src/components/Services.tsx#L492): `The Haus Services` → `TASH Services`
   - [src/components/Packages.tsx:368](src/components/Packages.tsx#L368): `The Haus Difference` → `The TASH Difference`
   - [src/components/Packages.tsx:514](src/components/Packages.tsx#L514): `The Haus Packages` → `TASH Packages`
7. Update in-prose mentions in Services.tsx descriptions:
   - Line 68: "Hydra-Plane Haus Facial" → "Hydra-Plane Facial" (or new Square name)
   - Line 98: "Leaving the haus..." → "Leaving you..."
   - Line 160: "No mega volumes in this haus..." → "No mega volumes here..."
   - Line 172: "The Esthetic Haus created mini fills..." → "TASH Skin created mini fills..."

---

## 7. Copy Replacement — Hero, About, Footer, Nav, Misc

### 7.1 — [src/components/Hero.tsx](src/components/Hero.tsx)
**Keep the title.** Only swap the subtitle.

| Line | Current | New |
|------|---------|-----|
| 34–36 | `Where beauty <br /><span className="italic font-light">comes home.</span>` | **Unchanged.** This stays as the hero title. |
| 37–38 | `<p ...>Personalized skincare, lashes, and brows in a studio built to feel like home.</p>` | `<p ...>Built from a childhood dream. Rooted in <span className="italic font-light">TASH skin.</span></p>` |
| 51 | `{/* Desktop: About The Haus | Mobile: Call Us */}` | `{/* Desktop: About TASH | Mobile: Call Us */}` |
| 56 | `About The Haus` (button text) | `About TASH` |

Justification: the new subtitle is 53 chars vs. current 76 chars — fits within `max-w-md`. Use the same italic-font-light treatment that the title uses for "comes home." to set "TASH skin." apart visually. The client's copy file writes it lowercase ("TASH skin") which we'll honor in this italic flourish — but use proper-cased "TASH Skin" everywhere else (it's the brand name).

### 7.2 — [src/components/About.tsx](src/components/About.tsx)
Replace the 2-paragraph narrative with the new 4-paragraph copy from `Revision_Items/tash-skin-copy.md`. **The collapsible mobile behavior must be preserved.**

**Headline (lines 76–80):**
```jsx
<h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-anchor leading-[1.05] mb-4 md:mb-8 lg:mb-5">
  The Heart Behind
  <br />
  <span className="italic font-light">TASH Skin.</span>
</h2>
```

**Body structure (replace lines 86–116):** First paragraph always visible; paragraphs 2–4 visible on desktop, collapsible on mobile.

```jsx
<div className="font-serif text-anchor/85 text-base md:text-lg leading-[1.65] md:leading-[1.75] lg:leading-[1.55] space-y-4 md:space-y-5 lg:space-y-3">
  <p>
    <span className="float-left font-serif text-[4.5rem] md:text-[6rem] leading-[0.78] mr-3 mt-1 text-anchor italic font-light">
      T
    </span>
    ASH was more than just a nickname… it was the name behind a little girl with a big dream. Long before this business ever existed, before the treatments, the studio, or the brand, there was simply a passion that never left my heart. Skin has always been more than beauty to me. It's confidence. It's healing. It's self-love. It's the way someone can walk into a room feeling insecure and leave feeling like themselves again.
  </p>

  {/* Paragraphs 2–4 — always visible on md+, collapsible on mobile */}
  <div className="hidden md:block space-y-4 md:space-y-5 lg:space-y-3">
    <p>TASH skin was created from years of dreaming, growing, learning, and believing that one day I could build something meaningful. A space where people feel seen, cared for, and comfortable in their own skin. What started as a childhood passion slowly became a purpose, and now that dream has become reality.</p>
    <p>This brand is deeply personal to me because it carries the name that has followed me through every stage of life; the younger version of me who dreamed fearlessly, and the woman I've become through hard work, faith, and passion. Every service, every client, and every detail behind TASH skin is rooted in intention, education, and genuine care.</p>
    <p>More than anything, I want TASH skin to be a place where confidence grows, insecurities soften, and people are reminded that beauty is not about perfection and it's about feeling radiant, empowered, and at home within yourself.</p>
  </div>
  <AnimatePresence initial={false}>
    {expanded && (
      <motion.div
        key="more"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="md:hidden overflow-hidden"
      >
        <div className="pt-4 space-y-4">
          <p>TASH skin was created from years of dreaming, growing, learning, and believing that one day I could build something meaningful. A space where people feel seen, cared for, and comfortable in their own skin. What started as a childhood passion slowly became a purpose, and now that dream has become reality.</p>
          <p>This brand is deeply personal to me because it carries the name that has followed me through every stage of life; the younger version of me who dreamed fearlessly, and the woman I've become through hard work, faith, and passion. Every service, every client, and every detail behind TASH skin is rooted in intention, education, and genuine care.</p>
          <p>More than anything, I want TASH skin to be a place where confidence grows, insecurities soften, and people are reminded that beauty is not about perfection and it's about feeling radiant, empowered, and at home within yourself.</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
```

The drop-cap is now "T" (for "TASH"). Note the special case: the first character of the new copy is "T" and the rest of the word is "ASH", so the drop-cap span gets `T` and the paragraph text begins `ASH was more than...`. This matches the existing pattern (where the drop-cap was "I" and the paragraph began "decided").

Also update line 49: `alt="Natasha, founder of The Esthetic Haus"` → `alt="Natasha, founder of TASH Skin"`.

### 7.3 — [src/components/Footer.tsx](src/components/Footer.tsx)

| Line | Current | New |
|------|---------|-----|
| 32 | `The Esthetic Haus @ Suites by Ivy House` | `TASH Skin @ Suites by Ivy House` |
| 45 | `About The Haus` | `About TASH` |
| 55, 58 | `theesthetichausllc@gmail.com` (×2) | From business.ts |
| 127 | `Visit the <span>Haus.</span>` | `Visit <span className="italic font-light">TASH Skin.</span>` |
| 156 | `The Esthetic Haus` (legal block) | `TASH Skin` |
| 164 | `© {year} The Esthetic Haus` | `© {year} TASH Skin` |
| 167 | `https://www.instagram.com/theesthetichausbynatasha/` | From business.ts |
| 379 | iframe src with `2sThe%20Esthetic%20Haus` | `2sTASH%20Skin` (Place ID portion unchanged) |
| 386 | `title="The Esthetic Haus location"` | `title="TASH Skin location"` |

### 7.4 — [src/components/Navigation.tsx](src/components/Navigation.tsx)

| Line | Current | New |
|------|---------|-----|
| 30 | `external: 'https://theesthetichaus.shop/'` | **Leave URL unchanged** — client has 30 days to migrate the shop subdomain separately. This rebrand only changes the user-facing copy. Add an inline code comment noting the URL is intentionally retained pending shop migration. |
| 77 | `aria-label="The Esthetic Haus — Home"` | `aria-label="TASH Skin — Home"` |
| 79 | `src="/eh_public_assets/Logo/EH_Logo.webp"` | `src="/eh_public_assets/Logo/TASH_Logo.webp"` |
| 80 | `alt="The Esthetic Haus"` | `alt="TASH Skin"` |
| 370 | "...curated by The Esthetic Haus..." | "...curated by TASH Skin..." |
| 383 | "...vetted by The Esthetic Haus team." | "...vetted by the TASH Skin team." |
| 431 | `Refer a <span>Haus Bestie.</span>` | `Refer a <span className="italic font-light">TASH Bestie.</span>` |
| 442 | "...about The Esthetic Haus." | "...about TASH Skin." |

### 7.5 — [src/components/ECommerce.tsx](src/components/ECommerce.tsx)
- Line 31: `<span>Gift of Haus.</span>` → `<span className="italic font-light">Gift of TASH.</span>`
- Line 81: large `Haus` display → `TASH` (verify the visual treatment still fits — TASH is shorter than Haus so should be fine).

### 7.6 — [src/components/ShopStrip.tsx](src/components/ShopStrip.tsx)
- Line 4: **Leave `SHOP_URL = 'https://theesthetichaus.shop/'` as-is for now.** The client has 30 days to rebrand the shop subdomain separately; this rebrand handles the user-facing copy only. Add an inline code comment noting the URL is intentionally retained pending shop migration.
- Line 31: `Shop <span>The Haus.</span>` → `Shop <span className="italic font-light">TASH Skin.</span>`

### 7.7 — [src/components/MaySpecialStrip.tsx](src/components/MaySpecialStrip.tsx)
- Line 96: `Glow Haus <span>Season.</span>` → `Glow <span className="italic font-light">Season.</span>` (drop "Haus")
- Line 195: same change
- Line 430: `confirmed by The Esthetic Haus.` → `confirmed by TASH Skin.`

### 7.8 — [src/components/FloatingActionButton.tsx](src/components/FloatingActionButton.tsx)
- Line 168: `I agree to receive texts from The Esthetic Haus. Msg & data rates may apply. Reply STOP to opt out.` → `I agree to receive texts from TASH Skin. Msg & data rates may apply. Reply STOP to opt out.`

### 7.9 — [src/components/Legal.tsx](src/components/Legal.tsx)
- Lines 95, 101, 136, 148, 154: replace `The Esthetic Haus` with `TASH Skin` in each policy paragraph.
- Lines 167, 168, 242, 243: email addresses come from business.ts (or hard-code the new email when known).

### 7.10 — [src/components/Gallery.tsx](src/components/Gallery.tsx)
13 alt-text entries on lines 63–89:
- `'The Haus, in frames'` → `'TASH Skin, in frames'` (×11 instances)
- Line 81: `'The Haus moment'` → `'TASH Skin moment'`
- Line 89: `'Ambient haus'` → `'Ambient studio'`

### 7.11 — Service & Greensboro page bodies
- [src/pages/services/TeethWhiteningPage.tsx:73](src/pages/services/TeethWhiteningPage.tsx#L73): `at The Esthetic Haus.` → `at TASH Skin.`
- [src/pages/services/MicroneedlingPage.tsx:72](src/pages/services/MicroneedlingPage.tsx#L72): `At The Esthetic Haus,` → `At TASH Skin,`
- [src/pages/services/FacialsPage.tsx:72](src/pages/services/FacialsPage.tsx#L72): `at The Esthetic Haus` → `at TASH Skin`
- [src/pages/services/LashesPage.tsx:72](src/pages/services/LashesPage.tsx#L72): `at The Esthetic Haus` → `at TASH Skin`
- [src/pages/GreensboroMedSpaPage.tsx:40](src/pages/GreensboroMedSpaPage.tsx#L40): alt text update
- [src/pages/GreensboroMedSpaPage.tsx:81](src/pages/GreensboroMedSpaPage.tsx#L81): `'About The Haus'` (breadcrumb) → `'About TASH Skin'`
- [src/pages/GreensboroMedSpaPage.tsx:95 and 101](src/pages/GreensboroMedSpaPage.tsx#L95): the long-form body copy currently explains "The Haus was created to be warm...". This page is the dedicated "About" page; **mirror the same 4-paragraph copy from About.tsx** here so the brand voice is consistent. Read lines 90–130 of GreensboroMedSpaPage.tsx for the exact prose location and replace with the new copy, adjusting paragraph structure to fit the existing visual layout.

---

## 8. Folder Renames

Two folders under `public/eh_public_assets/` contain "haus" in the name. Rename them and update every reference.

### 8.1 — `Haus_Packages/` → `Packages/`
Files inside this folder also have "Haus" in their names. Rename simultaneously:
- `The_Bridal_Haus_Experience.webp` → `The_Bridal_Experience.webp`
- `The_Haus_New_Mommy_Reset_Glow_Package.webp` → `The_New_Mommy_Reset_Glow_Package.webp`
- `The_Haus_Baby_Bump_Package.webp` → `The_Baby_Bump_Package.webp`
- `The_Haus_Molecular_Peel_Package.webp` → `The_Molecular_Peel_Package.webp`
- `The_Haus_Blemish+Breakout_Package.webp` → `The_Blemish+Breakout_Package.webp`
- `Brow_Lammy_Combos.webp` — being replaced entirely by the new client asset (see § 4)
- `HP_BG_New.webp` and `HP_BG_mobile.webp` — keep filenames (initials are abstract); just move with folder

Then update references in:
- [src/components/Packages.tsx](src/components/Packages.tsx) lines 51, 81, 92, 103, 114, 125, 493 (background image)
- [src/data/packages.ts](src/data/packages.ts) lines 27, 57, 68, 79, 90
- [scripts/optimize_bg.py](scripts/optimize_bg.py) — the path strings on lines 37–39

### 8.2 — `Heart_behind_the_haus/` → `Heart_behind_the_brand/`
File inside: `A00A7255_1771383766.webp` — replace entirely with new client asset (see § 4) renamed to `founder_portrait.webp`.

Update reference in:
- [src/components/About.tsx:48](src/components/About.tsx#L48)

### 8.3 — Do NOT rename `eh_public_assets/` itself
See § 1.8 for justification. The folder name is internal-only.

### 8.4 — Update `.gitignore`
- Line 18: `eh_source_assets/` — leave as-is (folder name doesn't need to change; it's developer-only and `eh` is non-customer-facing).

### 8.5 — Verify zero stale references after renames
After folder/file renames, grep the entire `src/` and `public/` and `scripts/` directories for `Haus_Packages` and `Heart_behind_the_haus`. Expect zero matches. Also grep for `Brow_Lammy` and `EH_Logo` — expect zero matches.

---

## 9. Developer-Only Files

- [claude.md](claude.md) line 2: update brand name to TASH Skin.
- Any code comments that say "haus" — update if you spot them while editing surrounding code; don't make a separate pass for comments only.

---

## 10. Verification — Smoke Test Checklist

After all edits, run:

```bash
npm run lint          # tsc --noEmit — must pass clean
npm run build         # vite build — must succeed
npm run preview       # serves dist/ locally
```

Then in the browser, with DevTools Network tab open, verify:

### 10.1 — Asset loads
- [ ] Homepage loads with no 404s in Network tab
- [ ] Hero image renders (new image)
- [ ] Navbar logo renders (new logo) — check mobile + tablet + desktop sizes (h-14 / h-16 / h-20)
- [ ] About-page founder portrait renders (new image)
- [ ] Brow + Lash Package card renders (new image) — check object-contain still fits
- [ ] All gallery images load
- [ ] All other package card images load (the 5 non-replaced packages)
- [ ] Favicons load (old ones, until client provides new)

### 10.2 — Copy spot-check
- [ ] Hero title still reads "Where beauty comes home." (italic on second line)
- [ ] Hero subtitle reads "Built from a childhood dream. Rooted in TASH skin." (italic on "TASH skin.")
- [ ] About section headline reads "The Heart Behind TASH Skin." (italic on second line)
- [ ] About first paragraph starts with drop-cap "T" then "ASH was more than just a nickname..."
- [ ] About mobile "Read the full note" button expands to show paragraphs 2–4
- [ ] Footer copyright reads "© 2026 TASH Skin"
- [ ] FAB SMS modal disclosure says "TASH Skin"
- [ ] Legal page (T&Cs) says "TASH Skin" throughout
- [ ] No remaining "Haus" anywhere on any page (browser Find: Ctrl+F → "haus" → zero matches across every route)

### 10.3 — Booking flow (critical — § 1.1)
Pick 5 random services from different categories. Click "Book Now" on each:
- [ ] Square Appointments opens
- [ ] The correct service is preselected (URL contains a service ID after `/services/`)
- [ ] Repeat for 2 packages
- [ ] Repeat for the Teeth Whitening page CTA (it's the only hardcoded `openBooking('...')` outside Services.tsx)

If any of these fall back to the generic booking page with no service preselected, the SERVICE_ID_MAP key doesn't match the new Services.tsx title (case-insensitive). Fix it.

### 10.4 — SEO surface
- [ ] View page source on `/`, search for `tashskin.com` — should appear in canonical, og:url, og:image, twitter:image, JSON-LD url + image + logo (7+ matches)
- [ ] View page source on `/`, search for `esthetic.haus` — zero matches
- [ ] View page source on `/`, search for `The Esthetic Haus` — zero matches
- [ ] View page source on `/`, search for `Haus` (case-sensitive) — zero matches
- [ ] All 5 JSON-LD `provider.name` fields read `"TASH Skin"`
- [ ] sitemap.xml renders with all 7 URLs pointing to tashskin.com
- [ ] robots.txt sitemap line points to tashskin.com
- [ ] site.webmanifest `name` and `short_name` are `TASH Skin`

### 10.5 — Build artifacts
- [ ] `dist/index.html` contains zero matches for "Haus" or "esthetic.haus"
- [ ] `dist/eh_public_assets/Packages/` exists with the new images
- [ ] `dist/eh_public_assets/Heart_behind_the_brand/founder_portrait.webp` exists
- [ ] `dist/eh_public_assets/Logo/TASH_Logo.webp` exists
- [ ] No `Haus_Packages/` or `Heart_behind_the_haus/` folder in `dist/`

### 10.6 — Final guard grep
```bash
# Run from project root. Should output nothing or only acceptable matches
# (acceptable = reviews.ts customer quote per § 1.11, and possibly the
# customer review duplicated in Reviews.tsx).
grep -rni "haus" src/ public/ index.html scripts/ functions/
```
Acceptable remaining matches:
- `src/data/reviews.ts:67` — customer's literal quote (see § 1.11)
- `src/components/Reviews.tsx:72` — same quote
- `claude.md` — only if not updated

Everything else: investigate.

---

## 11. Out of Scope for This Plan (Goes in MANUAL_CLIENT_TASKS.md)

Items that require client login or third-party platform access (the agent does **not** do these):
- New domain purchase + DNS configuration on Cloudflare
- Google Search Console new property + Change of Address
- Google Business Profile rename
- Instagram username change (rename `@theesthetichausbynatasha` → `@tashskinstudio`)
- New email mailbox setup (creating the actual `tashskinllc@gmail.com` mailbox + DNS forwarding if desired)
- Shop subdomain migration (`theesthetichaus.shop` is intentionally left in the nav for now — client has 30 days)
- Square SMS sender display name update
- Decision on whether to leave or pull the customer review that names the old brand

A companion document [MANUAL_CLIENT_TASKS.md](MANUAL_CLIENT_TASKS.md) (lives at the project root) catalogs all of these for the senior dev to hand off to the client.

---

## 12. Critical Files Index — Quick Reference

**Single-source-of-truth files** (update first):
- [src/data/business.ts](src/data/business.ts)
- [index.html](index.html)
- [public/sitemap.xml](public/sitemap.xml)
- [public/robots.txt](public/robots.txt)
- [public/site.webmanifest](public/site.webmanifest)

**Booking flow** (must stay in sync):
- [src/hooks/useBooking.ts](src/hooks/useBooking.ts)
- [src/components/Services.tsx](src/components/Services.tsx)
- [src/components/MaySpecialStrip.tsx](src/components/MaySpecialStrip.tsx)
- [src/components/Packages.tsx](src/components/Packages.tsx)
- [src/data/packages.ts](src/data/packages.ts)
- [src/pages/services/TeethWhiteningPage.tsx](src/pages/services/TeethWhiteningPage.tsx) (one hard-coded booking call)

**Copy / visible UI:**
- [src/components/Hero.tsx](src/components/Hero.tsx)
- [src/components/About.tsx](src/components/About.tsx)
- [src/components/Footer.tsx](src/components/Footer.tsx)
- [src/components/Navigation.tsx](src/components/Navigation.tsx)
- [src/components/ECommerce.tsx](src/components/ECommerce.tsx)
- [src/components/ShopStrip.tsx](src/components/ShopStrip.tsx)
- [src/components/FloatingActionButton.tsx](src/components/FloatingActionButton.tsx)
- [src/components/Legal.tsx](src/components/Legal.tsx)
- [src/components/Gallery.tsx](src/components/Gallery.tsx)
- [src/components/Reviews.tsx](src/components/Reviews.tsx)
- [src/data/reviews.ts](src/data/reviews.ts)
- [src/components/SEOHead.tsx](src/components/SEOHead.tsx)
- All 6 page files in [src/pages/](src/pages/) and [src/pages/services/](src/pages/services/)

**New scripts:**
- `scripts/sync_from_square.ts` (you will write this — § 5)
- `scripts/generate_favicons.py` (you will write this — § 4.6)

**Modified scripts:**
- [scripts/optimize_bg.py](scripts/optimize_bg.py)

**Source assets to be placed:**
- `eh_source_assets/hero/hero_asset.png`
- `eh_source_assets/Heart_behind_the_brand/founder_portrait.png`
- `eh_source_assets/Logo/TASH_Logo.png`
- `eh_source_assets/Packages/Brow_Lash_Combo.png`

---

## 13. End-of-Task Summary Template

When you finish, post a summary that includes:
1. Confirmation that `npm run lint` and `npm run build` passed
2. List of any items left as `TODO_CLIENT:` placeholders (new email, new IG, new shop URL, etc.)
3. Any Square catalog items from `scripts/.square_catalog.json` that you could not confidently map to existing Services.tsx / Packages.tsx entries
4. Confirmation that the smoke-test booking flow worked for the services you tested
5. List of files modified (count + paths)
6. Anything you noticed that the audit ([REBRAND_AUDIT_TASH_SKIN.md](REBRAND_AUDIT_TASH_SKIN.md)) missed

---

**End of plan.**
