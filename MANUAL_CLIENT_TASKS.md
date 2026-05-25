# Manual Tasks — Outside the Codebase

Things the coding agent **cannot do from its end** during the rebrand. These need either client login access, third-party platform action, or a design decision before the agent can finish certain code edits.

---

## 1. Items Resolved at Plan Time

These were resolved when the plan was written — listed here so you have the full picture:
- **New email:** `tashskinllc@gmail.com` — hard-coded into `src/data/business.ts` and propagates to footer, Legal pages, and JSON-LD. **Action item:** Have the client actually create this Gmail account (or confirm it exists) before launch so the contact links work.
- **New Instagram handle:** `@tashskinstudio` (URL: `https://www.instagram.com/tashskinstudio/`) — hard-coded into `src/data/business.ts`. **Action item:** Client renames her existing IG account (Settings → Account → Username) so the URL actually resolves. Don't create a new account — renaming preserves all followers and SEO signal.
- **Shop link (`theesthetichaus.shop`):** **Intentionally left as-is in the nav and ShopStrip.** Client has a 30-day window to rebrand the shop subdomain separately. The user-facing copy around the shop link has been changed to "TASH Skin," but the URL itself still goes to the old shop. **Action item before the 30-day window expires:** decide whether the shop migrates to `shop.tashskin.com` or some other URL, then update the two hard-coded URLs (`src/components/Navigation.tsx:30` and `src/components/ShopStrip.tsx:4`) and set up DNS for the new subdomain on whatever platform is hosting the shop.

---

## 2. Items Done Outside This Codebase

These don't block the agent but must happen for the rebrand to land properly. **Do them in roughly this order.**

### 2.1 — Buy `tashskin.com`
Purchase through Cloudflare Registrar (cheapest, no markup at renewal) or any registrar you prefer. Approx. $10/yr.

### 2.2 — Add the new domain to Cloudflare Pages
- Cloudflare Dashboard → Pages → the existing project (`the-esthetic-haus`?) → Custom domains → Add domain → `tashskin.com` and `www.tashskin.com`.
- Cloudflare will auto-provision SSL — wait for status: Active.
- Set `www.tashskin.com` as the primary; redirect apex (`tashskin.com`) to `www`.

### 2.3 — Set up 301 redirects from the old domain
Critical for SEO continuity. **Do not let the old domain go dark immediately** — keep it registered for at least 6–12 months so the redirects can fire for any inbound link, bookmark, or Google index entry still pointing at the old URLs.

Cloudflare lets you do this with a Bulk Redirects List or a Page Rule:
- `https://www.esthetic.haus/*` → `https://www.tashskin.com/$1` (301, preserve path + query)

Verify after setup by visiting `https://www.esthetic.haus/services/lashes` in an incognito window — it should redirect to `https://www.tashskin.com/services/lashes`.

### 2.4 — Update Cloudflare Pages environment variable
- Cloudflare Dashboard → Pages → Project → Settings → Environment variables.
- Find `FRONTEND_URL` (referenced in `functions/_middleware.ts`) and update its value from the old domain to `https://www.tashskin.com`. Without this, CORS will block the contact form in production.

### 2.5 — Google Search Console
1. Add `https://www.tashskin.com` as a new property in Search Console.
2. Verify it (TXT record or HTML file — Cloudflare DNS makes the TXT approach easy).
3. Once verified, in the **old** property (`www.esthetic.haus`), go to Settings → Change of Address tool and point it at the new property. This signals to Google to migrate the SEO authority to the new domain.
4. Submit the new sitemap (`https://www.tashskin.com/sitemap.xml`) under the new property.
5. Monitor crawl errors over the first 2–4 weeks.

### 2.6 — Google Business Profile rename
- Sign into the Google account that manages the Business Profile.
- Edit the name → `TASH Skin`.
- Google may require re-verification (postcard, video, or instant — usually instant for established profiles).
- **Place ID does not change** during a rename — all existing reviews stay attached to the new name. ✅
- After the rename propagates to Google Maps (3–14 days), the embedded map in the website footer will display the new name as the label. The Place ID in the iframe URL remains the same, so the map will continue to render the right pin throughout.

### 2.7 — Instagram username change
- Instagram app → Settings → Account → Username.
- Pick the new handle (e.g., `@tashskin`).
- Once changed, give the new URL to the coding agent for `src/data/business.ts`.

### 2.8 — Square Appointments — final verification
The client has already renamed services + packages in Square. Two follow-ups:
- **Seller display name:** In Square Dashboard → Account & Settings → Business → Business name. Confirm this also reads `TASH Skin` (it shows on the public booking page header).
- **SMS sender name:** If Square sends booking reminders / marketing SMS, the sender display registered with the carrier needs to read `TASH Skin` too — otherwise the website's TCPA consent line (which the agent will update to "I agree to receive texts from TASH Skin") won't match what customers actually see in their phone. Check Square's Customer Communications settings.

### 2.9 — New favicons and Open Graph share image (handled by the agent)
The agent will auto-generate these from the new TASH logo using a Pillow script (`scripts/generate_favicons.py`). Output:
- `public/favicon.ico` (multi-resolution)
- `public/favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`
- `public/og-image.jpg` (1200×630, logo centered on brand-color background)

**Optional follow-up:** If the auto-generated og-image looks rough or off-brand, hand it to a designer to re-export at higher polish. The site will ship with the auto-generated version in the meantime — perfectly functional, just not necessarily as polished as a designer-built share preview.

### 2.10 — Tell existing customers
Once the new site is live:
- Email past clients via the Square customer list ("We've rebranded — same Natasha, same studio, new name and look")
- Post on Instagram from the renamed account
- Update business cards, treatment-room signage, intake forms, gift card stock if printed

The coding agent doesn't do any of this — it's marketing/comms work.

---

## 3. Decisions the Client Needs to Make Before Launch

These need an answer before the rebrand goes live; they don't block the agent's code work, but they shape what gets published.

| Decision | Default if no answer | Notes |
|----------|---------------------|-------|
| Keep or remove the customer review that names the old brand by name | **Keep** — it's a real customer's quote; editing a third party's words is ethically questionable and editing reviews can violate Google's Terms of Service if the review was scraped from there. Surface later for client to ask the reviewer for an update. | `src/data/reviews.ts:67`, `src/components/Reviews.tsx:72` |
| Rewrite the meta description for the homepage | Agent uses: `"TASH Skin is a skincare studio in Greensboro, NC offering facials, lash extensions, brow treatments, microneedling, waxing, and teeth whitening. Book today."` | Client may want a more on-brand description |
| New hero title vs. keeping `Where beauty comes home.` | Agent keeps the existing title; swaps subtitle to client's new copy | Client tagline `Built from a childhood dream. Rooted in TASH skin.` is going in as the subtitle |
| `<title>` tag pattern in `index.html` and per-route | Agent uses: `TASH Skin — Where Beauty Comes Home` | Client may prefer a different formula |

---

## 4. Post-Launch Verification (within 2 weeks)

- Pull up Cloudflare Analytics — confirm no 404 spike (a small spike from cached old image URLs is normal for ~48 hours).
- Pull up Google Search Console (new property) — confirm crawling is happening, no critical errors.
- Search "TASH Skin Greensboro" in an incognito Google window after ~2 weeks. The new GBP listing should appear.
- Verify booking flow end-to-end from a fresh browser session: open the homepage, click a service's Book Now, complete a real or test booking through Square.
- Verify the contact form submission lands as a new customer record in Square.

---

## 5. Long-Term

- **Keep `esthetic.haus` registered for 12 months minimum** to maintain the redirect host. Annual renewal ~$30 since `.haus` is a premium TLD.
- After 6 months, check that Google has fully migrated indexing to the new domain (old domain shouldn't be appearing in SERPs anymore).
- After 12 months, decide whether to drop the old domain (cuts the redirect host) or renew once more for safety. The longer it forwards, the more SEO equity is preserved.

---

**End.**
