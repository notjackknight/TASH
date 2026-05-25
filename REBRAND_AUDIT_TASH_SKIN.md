# Rebrand Audit & Scope of Work — "The Esthetic Haus" → "TASH Skin"

**Audit date:** 2026-05-18
**Auditor:** Jack Knight
**Project:** the-esthetic-haus (live production website)
**Stack:** Vite + React + TypeScript + React Router + Tailwind v4 + Cloudflare Pages + Cloudflare Pages Functions + Square API
**Reason for rebrand:** Legal / copyright (must leave no residual reference to "Haus")
**Original build cost:** $2,000

---

## 1. Executive Summary

This is **not** a find-and-replace job. The word "Haus" is woven through:

- **Brand identity & legal copy** (footer, T&Cs, policies, claims of IP ownership)
- **Domain & DNS** (`esthetic.haus` — the `.haus` TLD itself must be retired)
- **SEO surface area** (canonical, OG, Twitter cards, JSON-LD schema, sitemap, robots, manifest)
- **23 service-name brand tokens** (e.g., "The Signature Haus Facial", "Haus Express Facial") that flow through the **Square booking catalog** — these are **Square service display names**, not just website copy. The website's booking hook (`src/hooks/useBooking.ts`) maps brand-named services to Square IDs by string match, so if Square service names change, this map breaks too.
- **6 package product names** ("The Bridal Haus Experience", "The Haus New Mommy Reset Glow Package", etc.) with matching **WebP image files** that include "Haus" in the filename
- **Asset directories** (`/eh_public_assets/Haus_Packages/...`, `/eh_public_assets/Heart_behind_the_haus/...`) and **logo file** (`EH_Logo.webp`) — every reference in code and every reference in built HTML for image preloads must be updated
- **Brand email** (`theesthetichausllc@gmail.com`) referenced in JSON-LD, footer, two Legal pages, and Square contact form metadata
- **Instagram handle** (`@theesthetichausbynatasha`) embedded in JSON-LD `sameAs` and footer
- **Shop subdomain** (`theesthetichaus.shop`) referenced in Nav and ShopStrip
- **Embedded Google Maps iframe** that searches for "The%20Esthetic%20Haus" by name (will need re-pinning once GBP is renamed)
- **Square gift-card and booking URLs** that contain a Square seller subdomain — these become legally risky if the Square seller account remains under the old DBA

Because the trigger is legal/copyright, **every public-facing instance must be eliminated** — including alt text, file names, image preload URLs, schema markup, and the domain itself. A partial migration leaves the client exposed.

**Total raw token count (case-insensitive `haus`):** 247 matches across 30 files (excluding `node_modules`, `dist/`, `.wrangler/`, `.git/`).

---

## 2. Full Findings — Grouped by Category

> Risk levels: **High** = legal exposure, broken functionality, or SEO/indexing damage if missed. **Medium** = user-visible content or SEO degradation. **Low** = developer-only / cosmetic / non-public.

### 2.A — Visible Website Copy

| # | File | Line | Old text | Replacement | Risk | Notes |
|---|------|------|----------|-------------|------|-------|
| 1 | [index.html](index.html#L6) | 6 | `<title>The Esthetic Haus — Where Beauty Comes Home</title>` | `<title>TASH Skin — Where Beauty Comes Home</title>` (or new tagline) | High | Page title; first impression in browser tab & SERPs |
| 2 | [src/components/Hero.tsx](src/components/Hero.tsx#L51-L56) | 51, 56 | `About The Haus` (button label + comment) | `About TASH` / `About TASH Skin` | High | Primary CTA on hero |
| 3 | [src/components/About.tsx](src/components/About.tsx#L79) | 79 | `<span className="italic font-light">the Haus.</span>` | `TASH Skin.` (or new italic flourish) | High | Headline copy |
| 4 | [src/components/About.tsx](src/components/About.tsx#L91) | 91 | "I decided to name my company The Esthetic Haus because I wanted it to feel like more than just a place for service... `"Haus"` represents warmth, comfort..." | **Full rewrite** — new origin story for TASH Skin name | High | Founder narrative — currently explains the meaning of "Haus" as a brand concept; this entire paragraph must be replaced with the new brand's etymology / meaning |
| 5 | [src/components/About.tsx](src/components/About.tsx#L49) | 49 | `alt="Natasha, founder of The Esthetic Haus"` | `alt="Natasha, founder of TASH Skin"` | Medium | Alt text — accessibility + SEO |
| 6 | [src/components/Footer.tsx](src/components/Footer.tsx#L32) | 32 | `The Esthetic Haus @ Suites by Ivy House` | `TASH Skin @ Suites by Ivy House` | High | Visible address line |
| 7 | [src/components/Footer.tsx](src/components/Footer.tsx#L45) | 45 | `About The Haus` (nav link) | `About TASH` | High | Footer nav |
| 8 | [src/components/Footer.tsx](src/components/Footer.tsx#L127) | 127 | `Visit the <span>Haus.</span>` | `Visit TASH Skin.` | High | Footer CTA |
| 9 | [src/components/Footer.tsx](src/components/Footer.tsx#L156) | 156 | `The Esthetic Haus` (legal block) | `TASH Skin` | High | Legal entity name in footer |
| 10 | [src/components/Footer.tsx](src/components/Footer.tsx#L164) | 164 | `© {year} The Esthetic Haus` | `© {year} TASH Skin` | High | Copyright notice (legal) |
| 11 | [src/components/Footer.tsx](src/components/Footer.tsx#L386) | 386 | `title="The Esthetic Haus location"` (iframe title) | `title="TASH Skin location"` | Medium | Accessibility label on map embed |
| 12 | [src/components/Navigation.tsx](src/components/Navigation.tsx#L77-L80) | 77, 80 | `aria-label="The Esthetic Haus — Home"` and `alt="The Esthetic Haus"` (logo) | `aria-label="TASH Skin — Home"`, `alt="TASH Skin"` | High | Logo a11y + alt — screen readers |
| 13 | [src/components/Navigation.tsx](src/components/Navigation.tsx#L370) | 370 | "...clinical-grade formulations curated by The Esthetic Haus..." | "...curated by TASH Skin..." | Medium | Cosmedix portal description |
| 14 | [src/components/Navigation.tsx](src/components/Navigation.tsx#L383) | 383 | `desc: 'Every product personally vetted by The Esthetic Haus team.'` | `'...by the TASH Skin team.'` | Medium | Nav megamenu description |
| 15 | [src/components/Navigation.tsx](src/components/Navigation.tsx#L431) | 431 | `Refer a <span>Haus Bestie.</span>` | `Refer a TASH Bestie.` (or new tagline) | High | Referral section heading |
| 16 | [src/components/Navigation.tsx](src/components/Navigation.tsx#L442) | 442 | `desc: 'Tell a friend or family member about The Esthetic Haus.'` | `'...about TASH Skin.'` | Medium | Referral copy |
| 17 | [src/components/FloatingActionButton.tsx](src/components/FloatingActionButton.tsx#L168) | 168 | `I agree to receive texts from The Esthetic Haus. Msg & data rates may apply.` | `...from TASH Skin...` | **High — Legal/SMS compliance** | TCPA SMS consent language; must reflect the actual sending entity registered with the SMS provider |
| 18 | [src/components/ECommerce.tsx](src/components/ECommerce.tsx#L31) | 31 | `<span>Gift of Haus.</span>` | `Gift of TASH.` (or new phrasing) | High | Gift card section headline |
| 19 | [src/components/ECommerce.tsx](src/components/ECommerce.tsx#L81) | 81 | `Haus` (large display text) | `TASH` | High | Visible body text |
| 20 | [src/components/ShopStrip.tsx](src/components/ShopStrip.tsx#L31) | 31 | `Shop <span>The Haus.</span>` | `Shop TASH Skin.` | High | Shop strip headline |
| 21 | [src/components/MaySpecialStrip.tsx](src/components/MaySpecialStrip.tsx#L96) | 96 | `Glow Haus <span>Season.</span>` | `Glow Season.` / `TASH Glow Season.` | High | Strip headline (mobile) |
| 22 | [src/components/MaySpecialStrip.tsx](src/components/MaySpecialStrip.tsx#L195) | 195 | `Glow Haus <span>Season.</span>` | Same as above | High | Strip headline (desktop) |
| 23 | [src/components/MaySpecialStrip.tsx](src/components/MaySpecialStrip.tsx#L430) | 430 | `...confirmed by The Esthetic Haus.` | `...confirmed by TASH Skin.` | High | Booking confirmation copy |
| 24 | [src/components/Packages.tsx](src/components/Packages.tsx#L368) | 368 | `The Haus Difference` (section heading) | `The TASH Difference` | High | Marketing heading |
| 25 | [src/components/Packages.tsx](src/components/Packages.tsx#L514) | 514 | `The Haus Packages` (section heading) | `TASH Packages` / `The TASH Skin Packages` | High | Section heading |
| 26 | [src/components/Services.tsx](src/components/Services.tsx#L492) | 492 | `The Haus Services` (section heading) | `TASH Services` / `The TASH Skin Services` | High | Section heading |
| 27 | [src/components/Services.tsx](src/components/Services.tsx#L68) | 68 | "...Add on the Hydra-Plane Haus Facial..." | "...add on the Hydra-Plane Facial..." | High | Service description |
| 28 | [src/components/Services.tsx](src/components/Services.tsx#L98) | 98 | "...Leaving the haus soothed, hydrated, and radiant." | "...Leaving you soothed..." | High | Service description |
| 29 | [src/components/Services.tsx](src/components/Services.tsx#L160) | 160 | "No mega volumes in this haus..." | "No mega volumes here..." | High | Service description |
| 30 | [src/components/Services.tsx](src/components/Services.tsx#L172) | 172 | "The Esthetic Haus created mini fills..." | "TASH Skin created mini fills..." | High | Service description |
| 31 | [src/components/Gallery.tsx](src/components/Gallery.tsx#L63-L89) | 63–89 (13 lines) | `alt: 'The Haus, in frames'`, `alt: 'The Haus moment'`, `alt: 'Ambient haus'` | `alt: 'TASH Skin, in frames'` etc. | Medium | 13 alt-text references — SEO + a11y |
| 32 | [src/components/Reviews.tsx](src/components/Reviews.tsx#L72), [src/data/reviews.ts](src/data/reviews.ts#L67) | 72, 67 | `'The Esthetic Haus is so cozy and Natasha does amazing work!...'` | Keep as historical Google review **OR** edit to `'[Studio name redacted for rebrand]'` — **client decision** | High — Legal | This is a real customer review quoting the old brand by name. Options: (a) leave as-is with a disclaimer that it predates the rebrand, (b) replace with newer reviews that mention "TASH Skin", or (c) edit. **Discuss with client.** |
| 33 | [src/components/Legal.tsx](src/components/Legal.tsx#L95) | 95 | `By accessing or using The Esthetic Haus website and services...` | `By accessing or using TASH Skin website...` | **High — Legal** | Terms of Use |
| 34 | [src/components/Legal.tsx](src/components/Legal.tsx#L101) | 101 | `The Esthetic Haus provides esthetic services...` | `TASH Skin provides...` | **High — Legal** | T&Cs |
| 35 | [src/components/Legal.tsx](src/components/Legal.tsx#L136) | 136 | `By booking an appointment with The Esthetic Haus...` | `...with TASH Skin...` | **High — Legal** | Cancellation policy |
| 36 | [src/components/Legal.tsx](src/components/Legal.tsx#L148) | 148 | `...is the property of The Esthetic Haus and may not be reproduced...` | `...property of TASH Skin...` | **High — Legal/IP** | IP ownership claim |
| 37 | [src/components/Legal.tsx](src/components/Legal.tsx#L154) | 154 | `The Esthetic Haus is not liable for any adverse reactions...` | `TASH Skin is not liable...` | **High — Legal** | Liability disclaimer |
| 38 | [src/pages/GreensboroMedSpaPage.tsx](src/pages/GreensboroMedSpaPage.tsx#L40) | 40 | `alt="The Esthetic Haus in Greensboro, NC"` | `alt="TASH Skin in Greensboro, NC"` | Medium | Hero alt |
| 39 | [src/pages/GreensboroMedSpaPage.tsx](src/pages/GreensboroMedSpaPage.tsx#L81) | 81 | `{ label: 'About The Haus' }` (breadcrumb) | `{ label: 'About TASH Skin' }` | Medium | Breadcrumb label |
| 40 | [src/pages/GreensboroMedSpaPage.tsx](src/pages/GreensboroMedSpaPage.tsx#L95) | 95 | Long-form body copy (omitted from grep snippet — needs read) | Rewrite for new brand | High | About-page hero/body copy |
| 41 | [src/pages/GreensboroMedSpaPage.tsx](src/pages/GreensboroMedSpaPage.tsx#L101) | 101 | `The Haus was created to be warm, intimate, and welcoming...` | Rewrite around TASH Skin's brand voice | High | Body copy |
| 42 | [src/pages/services/TeethWhiteningPage.tsx](src/pages/services/TeethWhiteningPage.tsx#L73) | 73 | `...professional teeth whitening at The Esthetic Haus.` | `...at TASH Skin.` | High | Service page body |
| 43 | [src/pages/services/TeethWhiteningPage.tsx](src/pages/services/TeethWhiteningPage.tsx#L129) | 129 | `onClick={() => openBooking('Pearly White Haus Teeth Whitening')}` | `openBooking('Pearly White Teeth Whitening')` — **must match new Square service name** | **High — functional** | Booking lookup key; will break booking if Square name differs |
| 44 | [src/pages/services/MicroneedlingPage.tsx](src/pages/services/MicroneedlingPage.tsx#L72) | 72 | `At The Esthetic Haus, we use professional-grade technology...` | `At TASH Skin...` | High | Body copy |
| 45 | [src/pages/services/FacialsPage.tsx](src/pages/services/FacialsPage.tsx#L72) | 72 | `Every facial at The Esthetic Haus begins...` | `Every facial at TASH Skin...` | High | Body copy |
| 46 | [src/pages/services/LashesPage.tsx](src/pages/services/LashesPage.tsx#L72) | 72 | `...every lash set at The Esthetic Haus is customized...` | `...every lash set at TASH Skin...` | High | Body copy |

---

### 2.B — Service Names (Public-facing names that are also Square catalog names + booking keys)

These are special: each entry shows up as a customer-facing service title **AND** as a string key in `useBooking.ts` that maps to a Square service ID. **The Square catalog itself must be renamed first**, then the code keys must be updated to match.

| # | File | Lines | Old service name | Recommended replacement | Risk | Notes |
|---|------|-------|------------------|-------------------------|------|-------|
| 47 | [src/components/Services.tsx](src/components/Services.tsx#L53) + [Square catalog] | 53 | The Signature Haus Facial | The Signature Facial | **High — functional + brand** | 23 services follow this same pattern. Each one appears in: (a) Services.tsx as display title, (b) MaySpecialStrip.tsx, (c) useBooking.ts as a lowercased lookup key, and (d) the actual Square Appointments catalog. All 4 must stay in sync. |
| 48 | " | 67 | Hydraglow Haus Facial | Hydraglow Facial | High | |
| 49 | " | 73 | The Dermaplane Haus Facial | The Dermaplane Facial | High | |
| 50 | " | 79 | Brightening Haus Facial | Brightening Facial | High | |
| 51 | " | 85 | Acne Haus Detox Facial | Acne Detox Facial | High | |
| 52 | " | 91 | Haus Express Facial | Express Facial | High | |
| 53 | " | 97 | Calm Haus Facial | Calm Facial | High | |
| 54 | " | 103 | Timeless Haus Facial | Timeless Facial | High | |
| 55 | " | 109 | Haus Hydrogen Oxygen Facial | Hydrogen Oxygen Facial | High | |
| 56 | " | 115 | Haus Back Facial | Back Facial | High | |
| 57 | " | 123 | Classic Haus Fill | Classic Fill | High | |
| 58 | " | 129 | Haus Wispy Dream Fill | Wispy Dream Fill | High | |
| 59 | " | 135 | The Haus of Wispy Dreams Full Set | Wispy Dreams Full Set | High | |
| 60 | " | 141 | Classic Haus Full Set | Classic Full Set | High | |
| 61 | " | 147 | Signature Haus Lash Lift + Tint | Signature Lash Lift + Tint | High | |
| 62 | " | 153 | The Power Haus Fill | The Power Fill | High | |
| 63 | " | 165 | The Haus Korean Lash Lift | The Korean Lash Lift | High | |
| 64 | " | 171 | Mini Haus Lash Touch Up | Mini Lash Touch Up | High | |
| 65 | " | 177 | Signature Haus Lash Tint | Signature Lash Tint | High | |
| 66 | " | 183 | The Haus Lash Removal | Lash Removal | High | |
| 67 | " | 197 | Signature Haus Brow Lamination | Signature Brow Lamination | High | |
| 68 | " | 211 | Haus Microneedling Treatment | Microneedling Treatment | High | |
| 69 | " | 223 | The Haus of LED Therapy | LED Therapy | High | |
| 70 | " | 229 | Haus Scalp Treatment and Massage | Scalp Treatment and Massage | High | |
| 71 | " | 235 | Haus of Hydrated Lip Mask | Hydrated Lip Mask | High | |
| 72 | " | 243 | Haus Lip Wax | Lip Wax | High | |
| 73 | " | 249 | Haus Face Wax | Face Wax | High | |
| 74 | " | 255 | The Haus Underarm Wax | Underarm Wax | High | |
| 75 | " | 261 | The Haus Full Leg Wax | Full Leg Wax | High | |
| 76 | " | 267 | Haus Half Leg Wax | Half Leg Wax | High | |
| 77 | " | 273 | The Haus Full Arm Wax | Full Arm Wax | High | |
| 78 | " | 279 | Haus Stomach Wax | Stomach Wax | High | |
| 79 | " | 287 | Pearly White Haus Teeth Whitening | Pearly White Teeth Whitening | High | |
| 80 | " | 293 | The Haus Spray Tan | Spray Tan | High | |
| 81 | " | 299 | Haus of Gems | Gem Set / Tooth Gems | High | |

**Plus, every one of these names is duplicated in [src/hooks/useBooking.ts](src/hooks/useBooking.ts#L13-L52) (lines 13–52, ~30 entries)** as a lowercased lookup string mapping to a Square ID. If the Square service name changes but this map's key doesn't, **booking will silently break**.

**And every facial/lash/lip/wax service name appears again in [src/components/MaySpecialStrip.tsx](src/components/MaySpecialStrip.tsx#L27-L63) (lines 27–63)** as the Mother's Day special list — same rename treatment required.

**And every "Bridal/Mommy/Baby Bump/Molecular Peel/Blemish + Breakout/Signature Brow + Lash" package name** appears in **both** [src/components/Packages.tsx](src/components/Packages.tsx#L47-L125) **AND** [src/data/packages.ts](src/data/packages.ts#L23-L90) — both must be updated together.

| # | File | Line | Old | New | Risk |
|---|------|------|-----|-----|------|
| 82 | Packages.tsx + packages.ts | 47 / 23 | The Bridal Haus Experience | The Bridal Experience | High |
| 83 | " | 77 / 53 | The Haus New Mommy Reset Glow Package | The New Mommy Reset Glow Package | High |
| 84 | " | 88 / 64 | The Haus Baby Bump Package | The Baby Bump Package | High |
| 85 | " | 99 / 75 | The Haus Molecular Peel Package | The Molecular Peel Package | High |
| 86 | " | 110 / 86 | The Haus Blemish + Breakout Package | The Blemish + Breakout Package | High |
| 87 | " | 121 / — | The Haus Signature Brow + Lash Package | The Signature Brow + Lash Package | High |

---

### 2.C — SEO / Metadata / Structured Data

| # | File | Line | Old | Replacement | Risk | Notes |
|---|------|------|-----|-------------|------|-------|
| 88 | [index.html](index.html#L7) | 7 | `<meta name="description" content="The Esthetic Haus is a skincare studio...">` | Rewrite for TASH Skin | **High — SEO** | Page-level meta description |
| 89 | [index.html](index.html#L8) | 8 | `<link rel="canonical" href="https://www.esthetic.haus/" />` | New canonical with new domain | **High — SEO** | Canonical URL — wrong canonical = de-indexing |
| 90 | [index.html](index.html#L11-L12) | 11, 12 | `og:title` / `og:description` containing "The Esthetic Haus" | Update both | **High — Social** | Open Graph |
| 91 | [index.html](index.html#L14) | 14 | `<meta property="og:url" content="https://www.esthetic.haus/" />` | New domain | **High** | OG URL |
| 92 | [index.html](index.html#L15) | 15 | `<meta property="og:image" content="https://www.esthetic.haus/og-image.jpg" />` | New domain + new og-image (asset re-export) | **High** | OG image (also see asset section below) |
| 93 | [index.html](index.html#L16) | 16 | `<meta property="og:site_name" content="The Esthetic Haus" />` | `TASH Skin` | High | OG site name |
| 94 | [index.html](index.html#L21-L23) | 21–23 | `twitter:title`, `twitter:description`, `twitter:image` | All three need updating | High | Twitter/X card |
| 95 | [index.html](index.html#L59) | 59 | JSON-LD `"name": "The Esthetic Haus"` | `"TASH Skin"` | **High — SEO** | DaySpa schema name |
| 96 | [index.html](index.html#L60) | 60 | JSON-LD `"alternateName": "The Esthetic Haus by Natasha"` | `"TASH Skin by Natasha"` | High | Schema alternate name |
| 97 | [index.html](index.html#L61) | 61 | JSON-LD `"url": "https://www.esthetic.haus"` | New domain | High | Schema canonical |
| 98 | [index.html](index.html#L63) | 63 | JSON-LD `"email": "theesthetichausllc@gmail.com"` | New email (see 2.F) | High | Schema email |
| 99 | [index.html](index.html#L77) | 77 | JSON-LD `"image": "https://www.esthetic.haus/og-image.jpg"` | New domain | High | Schema image |
| 100 | [index.html](index.html#L78) | 78 | JSON-LD `"logo": "https://www.esthetic.haus/eh_public_assets/Logo/EH_Logo.webp"` | New domain + new logo asset (see 2.D) | High | Schema logo |
| 101 | [index.html](index.html#L88) | 88 | JSON-LD `"sameAs": ["https://www.instagram.com/theesthetichausbynatasha/"]` | New IG handle | **High** | Disambiguates business identity for Google |
| 102 | [index.html](index.html#L107, L116, L125, L134, L143) | 107, 116, 125, 134, 143 | JSON-LD `"provider": {"@type": "DaySpa", "name": "The Esthetic Haus"}` (×5) | `"TASH Skin"` | High | Service schema provider — 5 occurrences |
| 103 | [src/components/SEOHead.tsx](src/components/SEOHead.tsx#L26) | 26 | `<meta property="og:site_name" content="The Esthetic Haus" />` | `TASH Skin` | High | Per-page OG site_name (applies to all React-Helmet rendered routes) |
| 104 | [src/components/SEOHead.tsx](src/components/SEOHead.tsx#L14) | 14 | `business.url}/eh_public_assets/hero/hero_asset.webp` (dynamic OG fallback) | Update via business.ts; also rename `eh_public_assets` (see 2.D) | High | OG image fallback |
| 105 | [src/pages/services/TeethWhiteningPage.tsx](src/pages/services/TeethWhiteningPage.tsx#L41-L42) | 41, 42 | `title="...The Esthetic Haus"` / `description="...at The Esthetic Haus."` | `TASH Skin` | High | Per-route SEO |
| 106 | [src/pages/services/MicroneedlingPage.tsx](src/pages/services/MicroneedlingPage.tsx#L42-L43) | 42, 43 | Same pattern | `TASH Skin` | High | |
| 107 | [src/pages/services/FacialsPage.tsx](src/pages/services/FacialsPage.tsx#L42-L43) | 42, 43 | Same pattern | `TASH Skin` | High | |
| 108 | [src/pages/services/LashesPage.tsx](src/pages/services/LashesPage.tsx#L42-L43) | 42, 43 | Same pattern | `TASH Skin` | High | |
| 109 | [src/pages/services/BrowsPage.tsx](src/pages/services/BrowsPage.tsx#L42-L43) | 42, 43 | Same pattern | `TASH Skin` | High | |
| 110 | [src/pages/GreensboroMedSpaPage.tsx](src/pages/GreensboroMedSpaPage.tsx#L29-L30) | 29, 30 | Same pattern (`About The Esthetic Haus` / description with `Esthetic Haus by Natasha`) | `About TASH Skin` / rewrite description | High | About-page SEO |

---

### 2.D — URLs, Routes, Slugs, Sitemap, Robots

| # | File | Line | Old | Replacement | Risk | Notes |
|---|------|------|-----|-------------|------|-------|
| 111 | [public/sitemap.xml](public/sitemap.xml) | 4–40 | All 7 `<loc>` entries point to `https://www.esthetic.haus/...` | Replace with new domain | **High — SEO** | Sitemap drives Google's crawl. Must regenerate after domain switch. |
| 112 | [public/robots.txt](public/robots.txt#L4) | 4 | `Sitemap: https://www.esthetic.haus/sitemap.xml` | New domain | High | robots reference |
| 113 | [src/components/Navigation.tsx](src/components/Navigation.tsx#L30) | 30 | `external: 'https://theesthetichaus.shop/'` | New shop subdomain (or removed if shop is being shuttered/migrated) | **High** | Shop link in main nav |
| 114 | [src/components/ShopStrip.tsx](src/components/ShopStrip.tsx#L4) | 4 | `const SHOP_URL = 'https://theesthetichaus.shop/';` | New shop URL | High | Shop CTA strip |
| 115 | [src/components/Footer.tsx](src/components/Footer.tsx#L379) | 379 | Google Maps iframe with query `1s0x88531b596847c949%3A0x5f23b0748c51f46f!2sThe%20Esthetic%20Haus` (Place ID + name) | Re-embed using new Google Business Profile place ID once renamed | **High** | The iframe encodes the GBP place lookup. After renaming GBP, generate a fresh embed code from Google Maps. |
| 116 | [src/data/business.ts](src/data/business.ts#L4) | 4 | `url: 'https://www.esthetic.haus'` | New domain | **High — central** | Single source of truth used by SEOHead and any other dynamic URL builders |
| 117 | [src/data/business.ts](src/data/business.ts#L16) | 16 | `googleReviews: 'https://search.google.com/local/writereview?placeid=ChIJSclHaFkbU4gRb_RRjHSwI18'` | Place ID stays the same after a GBP rename, **but verify** | Medium | Review write-URL; technically Place ID is stable across renames, but verify after GBP rename |

---

### 2.E — Assets, Image Filenames, Asset Directories

These are file/folder names on disk. Renaming them requires (a) physical file/folder rename, (b) updating every code reference, and (c) re-running the build + invalidating CDN/Cloudflare cache.

| # | Path / Asset | Old | Replacement | Risk | Notes |
|---|--------------|-----|-------------|------|-------|
| 118 | Directory: [public/eh_public_assets/](public/eh_public_assets/) | `eh_public_assets/` (entire folder name uses "eh" = Esthetic Haus initials) | Rename to e.g. `tash_assets/` or `assets/` | **Medium — risk of broken links** | Referenced in: index.html (3×), _headers, scripts/optimize_bg.py (DST path), SEOHead.tsx, Hero.tsx, Gallery.tsx (×34 lines), About.tsx (×2), Footer.tsx (logo refs), Navigation.tsx, Packages.tsx (×8), MaySpecialStrip.tsx, Services.tsx, Reviews.tsx, and every service page. **Total ~80 path references** to update. |
| 119 | Directory: `public/eh_public_assets/Haus_Packages/` | `Haus_Packages/` | `Packages/` or `Skin_Packages/` | Medium | Used by packages data + Packages component |
| 120 | Directory: `public/eh_public_assets/Heart_behind_the_haus/` | `Heart_behind_the_haus/` | `Heart_behind_the_brand/` | Medium | Founder photo path — About.tsx |
| 121 | Directory: `public/eh_public_assets/Logo/` | `Logo/` (neutral, OK) | Keep | n/a | Folder name itself is fine |
| 122 | File: `public/eh_public_assets/Logo/EH_Logo.webp` | `EH_Logo.webp` | **New logo file** (visual rebrand) — `TASH_Logo.webp` | **High — visual** | This is the brand mark. Requires a new logo design. References in: index.html preload, JSON-LD logo URL, Navigation.tsx |
| 123 | File: `public/eh_public_assets/Haus_Packages/The_Bridal_Haus_Experience.webp` | filename contains "Haus" | `The_Bridal_Experience.webp` | Medium | File rename + reference update in packages.ts and Packages.tsx |
| 124 | File: `public/eh_public_assets/Haus_Packages/The_Haus_New_Mommy_Reset_Glow_Package.webp` | filename | `The_New_Mommy_Reset_Glow_Package.webp` | Medium | Same |
| 125 | File: `public/eh_public_assets/Haus_Packages/The_Haus_Baby_Bump_Package.webp` | filename | `The_Baby_Bump_Package.webp` | Medium | Same |
| 126 | File: `public/eh_public_assets/Haus_Packages/The_Haus_Molecular_Peel_Package.webp` | filename | `The_Molecular_Peel_Package.webp` | Medium | Same |
| 127 | File: `public/eh_public_assets/Haus_Packages/The_Haus_Blemish+Breakout_Package.webp` | filename | `The_Blemish+Breakout_Package.webp` | Medium | Same |
| 128 | File: `public/eh_public_assets/Haus_Packages/HP_BG_New.webp` and `HP_BG_mobile.webp` | "HP" is abbreviation for Haus Packages, but neutral | Keep or rename | Low | Cosmetic — only referenced internally |
| 129 | File: `public/og-image.jpg` | The image itself **likely contains the old logo/wordmark** | Re-export from design tool with new brand | **High** | Open Graph share image — visual brand on every social share |
| 130 | Files: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` | Likely contains EH logo glyph | Regenerate from new logo | **High** | Browser tab + iOS home-screen icon |

---

### 2.F — Backend / Config / Environment

| # | File | Line | Old | Replacement | Risk | Notes |
|---|------|------|-----|-------------|------|-------|
| 131 | [.env](.env), [.dev.vars](.dev.vars) | — | `SQUARE_LOCATION_ID="LVZVXGQCTDSJM"`, `SQUARE_ACCESS_TOKEN=...` | **Likely unchanged** if client keeps same Square account but renames the Seller account | Medium | If client opens a new Square account for the new DBA, all tokens, location IDs, and service IDs in `useBooking.ts` change. **Confirm with client.** |
| 132 | [.env.example](.env.example) | 1–10 | Comments reference Square setup only — no brand strings | Keep | Low | |
| 133 | [functions/api/contact.ts](functions/api/contact.ts#L89) | 89 | `referenceId: 'website-contact-form'` (also `[Website Contact Form]` literal in customer note) | No brand reference — keep | Low | Note: customer records in Square will historically reference the old brand via the Square account name. Cleanup of historical Square data is **out of scope** for the website rebrand. |
| 134 | [scripts/optimize_bg.py](scripts/optimize_bg.py#L25-L40) | 25, 26, 37–40 | `SRC = ROOT / "eh_source_assets"`, `DST = ROOT / "public" / "eh_public_assets"`, and `Haus_Packages/` paths | Rename source/dst constants and the Haus_Packages references | Low | Developer-only build script |
| 135 | [.gitignore](.gitignore#L17-L18) | 17–18 | `eh_source_assets/` ignore rule | Update if folder is renamed | Low | |
| 136 | [claude.md](claude.md) | 2 | Project doc references old brand | Update or leave as historical | Low | Developer-only doc |

---

### 2.G — Forms, Emails, Integrations

| # | Item | Old | Replacement | Risk | Notes |
|---|------|-----|-------------|------|-------|
| 137 | Brand email: `theesthetichausllc@gmail.com` | Hardcoded in 6 places: index.html (JSON-LD), Footer.tsx (×2), Legal.tsx (×4), business.ts | New email (e.g., `hello@tashskin.com`) | **High — legal + functional** | If the LLC name changes, the email account itself likely needs to change. References: see grep results in 2.A/2.C above. Also: the email must be configured on the new domain (Google Workspace setup, MX records). |
| 138 | Instagram URL: `https://www.instagram.com/theesthetichausbynatasha/` | In: index.html (JSON-LD sameAs), Footer.tsx, business.ts | New IG handle (e.g., `@tashskin`) | **High** | Client must claim new IG handle; old account either rebranded in-place (preserves followers) or migrated. **Strongly recommend renaming the existing IG handle** (Instagram supports username changes) rather than starting fresh — preserves audience + Google's "sameAs" signal for SEO. |
| 139 | Shop subdomain: `https://theesthetichaus.shop/` | Nav + ShopStrip | New shop URL | High | If the shop is hosted on Squarespace/Shopify/etc., that platform's storefront also needs renaming + DNS update |
| 140 | Square booking URL: `https://book.squareup.com/appointments/lu0cj345hv4hr2/location/LVZVXGQCTDSJM` | Hardcoded in: useBooking.ts, packages.ts, Packages.tsx, MaySpecialStrip.tsx, Navigation.tsx (×2) | Likely stable if Square account renamed (not replaced) — verify | Medium | Square subdomain `lu0cj345hv4hr2` may not change on seller rename, but **the public-facing seller display name in Square Booking will**. |
| 141 | Square gift card URL: `https://app.squareup.com/gift/ML5QH1ZNJJAR5/order` | business.ts, ECommerce.tsx | Same: stable if account renamed | Medium | |
| 142 | Contact form Square note format: `[Website Contact Form]` | No brand string — no change needed | Keep | Low | But: new contact submissions will land in the renamed Square customer DB — verify client can still find them |
| 143 | Google Business Profile | "The Esthetic Haus" | "TASH Skin" | **High** | Out of code — done in GBP UI. **Critical for local SEO continuity.** Place ID stays the same (good — reviews stay attached). |
| 144 | Google Search Console | Old domain property | New domain property + Change of Address tool | **High — SEO** | New property must be added & verified before launch; Change of Address tool initiates the migration |
| 145 | Google Analytics / Tag Manager | None found in code — likely not yet installed, OR managed via Cloudflare/Square Web Analytics | Confirm w/ client | Medium | Verify whether GA4 is configured. No `gtag.js`, `dataLayer`, or `GTM-` references found in the repo. |

---

### 2.H — Domain & DNS

| # | Item | Old | Action | Risk |
|---|------|-----|--------|------|
| 146 | Primary domain | `esthetic.haus` (`.haus` TLD) | **Retire entirely** — the TLD itself is the legal issue | **High** |
| 147 | Domain registrar | (assume Cloudflare Registrar or external) | Purchase new domain (`tashskin.com`?) and configure DNS | High |
| 148 | Cloudflare Pages custom domain | `www.esthetic.haus` | Add new domain, remove old, configure SSL | High |
| 149 | 301 redirects | None | Configure 301 redirects from every old URL → new equivalent, for SEO continuity. **Keep the old domain registered for 6–12 months** so redirects continue to fire. | **High — SEO** |
| 150 | DNS for email | Old MX records (if any) | New MX/SPF/DKIM for new email | High |
| 151 | Subdomain: `theesthetichaus.shop` (`.shop` TLD) | Same legal issue (contains "haus") | Migrate shop to new subdomain on new TLD, set up redirects from old | High |
| 152 | SSL/TLS certificates | Issued for `*.esthetic.haus` | Issue for new domain — Cloudflare handles this automatically once domain is added | Low |

---

### 2.I — Other Hidden / Edge References

| # | Item | Location | Notes |
|---|------|----------|-------|
| 153 | `dist/` build output | Contains all of the above baked into HTML/JS chunks | Rebuild after rebrand — `npm run build` regenerates from source. **Do not edit dist/ directly.** |
| 154 | `.wrangler/` Cloudflare cache | Local cache only | Will rebuild automatically |
| 155 | Cloudflare Pages build environment variables | Set in CF dashboard | `FRONTEND_URL` env var (referenced in _middleware.ts) must point to the new domain |
| 156 | Square Appointments seller subdomain | `lu0cj345hv4hr2` | Verify in Square whether seller-name change updates this slug |
| 157 | Square gift card URL slug | `ML5QH1ZNJJAR5` | Same — verify |
| 158 | Reviews on Google Business Profile | Tied to Place ID | Place ID survives rename, reviews remain attached. ✅ No data loss. |
| 159 | The customer review in `reviews.ts` (line 67) and `Reviews.tsx` (line 72) | Quotes the old brand by name | See item 32 — decision needed |
| 160 | Historical PR/social mentions, press, business cards, signage | Out of codebase | Client's manual work |

---

## 3. Summary of Scope by Phase

### Phase 1 — Discovery & Brand Asset Production (mostly client-driven, you coordinate)
- New logo design (or confirm client already has it)
- New brand color palette confirmation (may not change)
- New og-image / share image design
- New favicon + app icons (16, 32, 180px) regenerated from new logo
- Confirm new email address + new domain
- Confirm whether Square account is being renamed vs. replaced
- Confirm whether Instagram handle is being renamed vs. replaced
- Confirm whether shop subdomain is being renamed vs. replaced
- Decide on retained vs. removed customer reviews that mention the old brand

**Estimated time:** 2–4 hours of coordination + waiting on client deliverables

### Phase 2 — Domain & Infrastructure
- Purchase new domain
- Configure DNS on Cloudflare (or registrar of choice)
- Add new domain to Cloudflare Pages, configure SSL
- Set up email forwarding/MX records for new email on new domain
- Add new domain to Google Search Console + verify
- Submit Change of Address in GSC (from old → new domain)
- Configure 301 redirect map at Cloudflare (old paths → new paths)
- Keep old domain registered for 6–12 months as redirect host

**Estimated time:** 3–5 hours

### Phase 3 — Square Catalog Rename
- Rename all 23+ services in Square Appointments to remove "Haus"
- Rename all packages in Square (if managed there)
- Rename Square Seller display name (this affects booking page header)
- Verify booking URL still resolves
- Verify gift card URL still resolves

**Estimated time:** 2–3 hours (manual UI work in Square dashboard)

### Phase 4 — Codebase Implementation
- Update [src/data/business.ts](src/data/business.ts) — single source of truth (name, url, email, instagram)
- Update [index.html](index.html) — title, all meta, all JSON-LD (12+ refs)
- Update [src/components/SEOHead.tsx](src/components/SEOHead.tsx) — per-page SEO
- Update all 6 service/page SEO blocks (FacialsPage, LashesPage, BrowsPage, MicroneedlingPage, TeethWhiteningPage, GreensboroMedSpaPage)
- Update [src/components/Services.tsx](src/components/Services.tsx) — all 30 service titles + 4 body-copy mentions
- Update [src/components/MaySpecialStrip.tsx](src/components/MaySpecialStrip.tsx) — duplicate of service titles + 2 headlines + 1 body
- Update [src/hooks/useBooking.ts](src/hooks/useBooking.ts) — all 30 lookup keys (must match new Square names exactly)
- Update [src/components/Packages.tsx](src/components/Packages.tsx) + [src/data/packages.ts](src/data/packages.ts) — 6 package names, 6 image paths, body copy
- Update [src/components/About.tsx](src/components/About.tsx) — **rewrite founder narrative** (currently explains "Haus" meaning)
- Update [src/components/Footer.tsx](src/components/Footer.tsx) — 8 references including legal copyright line + map iframe
- Update [src/components/Navigation.tsx](src/components/Navigation.tsx) — logo alt/aria + 4 copy refs + shop URL
- Update [src/components/Hero.tsx](src/components/Hero.tsx) — CTA button
- Update [src/components/ECommerce.tsx](src/components/ECommerce.tsx) — gift card section copy
- Update [src/components/ShopStrip.tsx](src/components/ShopStrip.tsx) — shop URL + headline
- Update [src/components/Gallery.tsx](src/components/Gallery.tsx) — 13 alt-text refs
- Update [src/components/FloatingActionButton.tsx](src/components/FloatingActionButton.tsx) — **TCPA SMS consent legal copy**
- Update [src/components/Legal.tsx](src/components/Legal.tsx) — **entire T&C/policy block** (5 brand refs + 2 email refs)
- Update [src/components/Reviews.tsx](src/components/Reviews.tsx) + [src/data/reviews.ts](src/data/reviews.ts) — decision on quoted reviews
- Update [public/sitemap.xml](public/sitemap.xml) — 7 URLs
- Update [public/robots.txt](public/robots.txt) — sitemap URL
- Update [public/site.webmanifest](public/site.webmanifest) — `name` + `short_name`
- Rename `public/eh_public_assets/` → new folder name + update **~80 path references** across the codebase (or keep folder name and just rename `Haus_Packages` + `Heart_behind_the_haus` subfolders)
- Rename 6 `Haus_Packages/*.webp` filenames + their references
- Drop in new logo file + update references
- Drop in new `og-image.jpg`
- Drop in new favicons (4 files)
- Update [scripts/optimize_bg.py](scripts/optimize_bg.py) — paths
- Update [claude.md](claude.md) — project doc

**Estimated time:** 8–12 hours of focused implementation + careful diffing

### Phase 5 — QA & Launch
- Local dev test: every page, every booking link, every gift card link, contact form submission round-trip to Square, every image loads (no 404s from renamed asset paths)
- Build + preview locally via `npm run preview`
- Validate JSON-LD via Google's Rich Results Test on staging
- Validate OG / Twitter cards via opengraph.xyz or LinkedIn Post Inspector
- Validate sitemap.xml renders correctly
- Validate `robots.txt`
- Validate canonical tags on every route
- Lighthouse / SEO audit on staging
- Confirm contact form still hits Square (live test, expecting a real customer record)
- Confirm booking deep-links open in Square with the correct service preselected (round-trip test for 3–5 services minimum)
- Confirm map embed renders the new GBP pin
- Mobile + desktop visual QA on all routes
- Verify `FRONTEND_URL` env var in Cloudflare Pages

**Estimated time:** 4–6 hours

### Phase 6 — Post-Launch Verification
- DNS propagation check
- 301 redirect spot-check (try 5–10 old URLs)
- Submit new sitemap to GSC
- Monitor GSC for crawl errors over first 2 weeks
- Monitor 404s in Cloudflare Analytics
- Confirm GBP rename has propagated to Maps
- Update IG bio link to new domain
- Update any external listings client mentions (Yelp, NextDoor, business directories)

**Estimated time:** 2–3 hours over the following 2 weeks

---

## 4. Manual / Out-of-Codebase Work

These items **cannot be done in the codebase** — they require dashboard access, account ownership, or third-party platforms. List them clearly in the proposal so the client knows what they own vs. what you own.

| Owner | Task | Notes |
|-------|------|-------|
| Client | Purchase new domain | You can advise; client should own the registration |
| Client or You | DNS configuration on Cloudflare | Either, depending on access |
| Client | Google Business Profile rename | Client owns GBP; rename takes 3–14 days to fully propagate; **may trigger re-verification** (postcard, video call, or instant) |
| Client | Instagram username change | Client logs in & changes — preserves all followers, posts, tags |
| Client | Squarespace/shop platform rebrand (if shop is hosted there) | Out of this codebase |
| Client | New email setup (Google Workspace or similar) on new domain | ~$6/mo per mailbox |
| Client | Square Appointments: rename services + seller display name | Client can do (or you can on a screen-share) |
| Client | Update business cards, signage, printed marketing | Out of scope |
| Client | Notify existing customers via email/SMS of rebrand + new domain | Client owns customer comms |
| You | Code implementation per Phase 4 | |
| You | Domain + Cloudflare Pages migration per Phase 2 | |
| You | Google Search Console setup + Change of Address | Needs client to grant GSC owner access if not already shared |
| You (recommended) | 301 redirect map + 6-month redirect host on old domain | |
| You (recommended) | Post-launch SEO monitoring (2 weeks) | |

---

## 5. Pricing Recommendation

### Context for pricing
The original $2,000 build covered: design, development, copy structure, asset integration, Square Web Payments SDK integration, contact form → Square CRM integration, JSON-LD SEO, multi-route React app, Cloudflare Pages deployment. The codebase has grown since the original build (e.g., the May Special strip, Shop strip, and packages section were added later — visible in recent commits).

A rebrand is **not** a fraction of a new build because:
1. **You don't need to design from scratch** — colors, type, layout, components stay
2. **You don't need to negotiate scope or rebuild trust** — relationship exists
3. **But** every legal-grade rebrand requires the same audit discipline as a new build, plus an exit migration that a new build doesn't have

Rules of thumb in the industry:
- **Cosmetic copy-swap rebrand:** 15–25% of original build
- **Full brand migration with SEO preservation:** 35–55% of original build
- **Legal-mandated brand migration with domain change and SEO preservation:** 50–80% of original build

This project sits in the **legal-mandated** bucket.

---

### Pricing tiers

#### 🟢 Low-end: **$1,100**
**What's included:**
- Audit (this document)
- Code-side implementation only: every text/asset/metadata change in this audit
- Asset file rename + reference update
- New favicons + og-image + logo file swap (assumes client provides finished design files)
- Updated sitemap, robots, manifest, JSON-LD
- Single domain switch on Cloudflare Pages (you assume client buys domain & does GBP rename themselves)
- Basic local + production smoke-test
- 1 round of post-launch fixes within 7 days

**What's excluded:**
- Domain purchase / DNS setup
- 301 redirect map
- Google Search Console migration
- Square catalog rename (client does)
- Instagram/shop coordination
- SEO monitoring beyond launch day
- Post-launch debugging beyond 7-day window
- Logo design / og-image design

**When to quote this:** Client is highly self-sufficient, has design assets ready, is doing all dashboard work themselves.

---

#### 🟡 Recommended fair price: **$1,650**
**What's included (all of Low-end PLUS):**
- DNS + Cloudflare Pages domain migration (you handle it end-to-end)
- 301 redirect map for SEO continuity (every old URL → new equivalent)
- Google Search Console new property + Change of Address submission
- Square catalog rename — done together on a screen-share with the client (1 hour)
- Coordination with client on IG handle change, shop subdomain, GBP rename (advisory)
- Validated structured-data testing (Rich Results, OG inspector)
- Post-launch QA over 14 days — monitor GSC crawl errors, fix any 404s
- 2 rounds of revisions
- 30-day bug-fix window

**What's excluded:**
- Logo design (assumes client supplies)
- Custom copy rewriting beyond direct brand swaps (e.g., the About.tsx founder narrative — see Add-ons)
- Email account setup on new domain

**When to quote this:** Default recommendation. Reflects the legal-risk nature of the project, the scope of hidden references, and the post-launch SEO continuity work.

---

#### 🔴 High-end: **$2,400**
**What's included (all of Fair PLUS):**
- Full copy rewrite of the About page founder narrative + brand-meaning paragraph (the current copy explicitly explains the meaning of "Haus" — this must be replaced with a new brand origin story; needs writing, not just editing)
- Copy polish on every service description, package description, and Cosmedix portal blurb to remove any subtle "Haus" voice
- Brand asset production: new og-image graphic + new favicon set generated from logo
- Email setup on new domain (Google Workspace MX/SPF/DKIM, 1 mailbox)
- Shop subdomain migration assistance (if applicable to the shop platform you know)
- TCPA SMS consent language review (the FAB modal references the brand by name — minor legal review)
- 60-day bug-fix window
- Post-launch SEO report at 14 and 30 days (GSC impressions, click-through, indexing status, top 404s)
- Optional: paid SEO tool monitoring (Ahrefs/Semrush) for 30 days to track rank preservation across migration

**When to quote this:** Client wants you to own the whole thing end-to-end; client values SEO continuity; client cares about post-launch validation.

---

### Personal recommendation
**Quote $1,650 as the headline price**, with $1,100 as a "DIY-friendly" option and $2,400 as a "full-service" option. The fair price is justified because:

1. **Legal trigger raises the cost of mistakes.** A missed reference isn't just a typo — it could expose the client to renewed legal pressure. That justifies thoroughness and a paid audit.
2. **~260 individual reference points** across 30 files, spanning copy, metadata, schema, assets, file paths, hooks, and config. This is not "find-and-replace work."
3. **SEO migration risk.** A botched domain change can erase 6+ months of Google rankings. Preserving them via canonical/sitemap/Change-of-Address/301s is its own skill area.
4. **Coordination overhead.** Square catalog, Cloudflare DNS, GBP, GSC, Instagram, and shop platform must all be sequenced. That's project-management time, not just dev time.
5. **At $1,650, you're at 82.5% of original build** — appropriate for a legal-grade migration where you're rebuilding the brand layer over an existing codebase, plus running the migration cleanly.

---

## 6. Client-Facing Proposal Summary (Copy/Paste)

> **Project: Rebrand from "The Esthetic Haus" to "TASH Skin"**
>
> Hi Natasha — here's the scope and pricing for the rebrand. Because the change is being made for legal/copyright reasons, the work needs to be done thoroughly enough that no reference to the old brand remains anywhere on the website, in the metadata search engines see, in the file names on the server, or in the domain itself. A surface-level "find and replace" wouldn't accomplish that, and would leave your business exposed.
>
> **What I audited:** I went through the full codebase and found ~260 references to the old brand across roughly 30 files — including page titles, meta descriptions, social-share metadata, Google's structured-data schema, sitemap entries, customer-facing service names (which are also wired into Square's booking system), package names, asset folder/file names, alt text, your legal Terms of Use and policy pages, your SMS consent language, your logo file, your favicons, your share image, your email address in 6 places, your Instagram handle in 3 places, and the domain `esthetic.haus` itself (which uses the `.haus` TLD that needs to be retired entirely).
>
> **Scope of work — recommended package — $1,650:**
> - Comprehensive find-and-replace across the entire codebase (~260 reference points)
> - New favicons, share image, and logo dropped in (you provide the design files)
> - Asset folders and image filenames renamed; all code references updated
> - Square Appointments catalog renamed together with you (one screen-share session)
> - New domain purchased and DNS configured on Cloudflare
> - 301 redirects set up so every old URL forwards to its new equivalent — this preserves your Google rankings
> - Google Search Console updated with a Change-of-Address submission so Google migrates your SEO authority to the new domain
> - Sitemap, robots.txt, and JSON-LD structured data regenerated for the new domain
> - Open Graph and Twitter share previews validated
> - Coordination & advice on renaming your Google Business Profile, Instagram handle, and shop subdomain
> - Two weeks of post-launch monitoring — I'll watch Google Search Console for crawl errors and fix any 404s
> - 30-day bug-fix guarantee
>
> **What you'll handle on your end:** approving the new logo / brand assets, renaming your Google Business Profile, renaming your Instagram handle, and renaming services in Square (we'll do that together).
>
> **Two other options if you prefer:**
> - **$1,100 — DIY-friendly:** I do the code changes only; you handle the domain, DNS, GBP rename, Search Console, and Square catalog rename yourself.
> - **$2,400 — Full-service:** Everything in the recommended package, plus a copy rewrite of the About-page founder story (the current copy explicitly explains what "Haus" meant as a name — that paragraph has to be rewritten around the new brand), new og-image and favicon generation from your logo, email setup on the new domain (Google Workspace), and a 30-day SEO report.
>
> **Timeline:** ~2 weeks from green-light, with most code work completed in the first week and the domain migration + SEO transition in the second.
>
> Let me know which option works for you and we'll get started.

---

## 7. Appendix — Files Touched (Master List)

```
.env (no brand strings, but FRONTEND_URL in CF dashboard needs updating)
.env.example (no change needed)
.gitignore (eh_source_assets rule)
claude.md (project doc)
index.html (title, all meta, JSON-LD — 17 references)
package.json (no brand string; "react-example" name is generic, OK)
public/_headers (eh_public_assets cache rule — update path if renamed)
public/robots.txt (sitemap URL)
public/site.webmanifest (name, short_name)
public/sitemap.xml (7 URLs)
public/og-image.jpg (re-export)
public/favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png (regenerate)
public/eh_public_assets/ (folder rename)
public/eh_public_assets/Haus_Packages/ (folder rename + 6 file renames)
public/eh_public_assets/Heart_behind_the_haus/ (folder rename)
public/eh_public_assets/Logo/EH_Logo.webp (replace file)
scripts/optimize_bg.py (SRC/DST paths + Haus_Packages refs)
src/App.tsx (verify — no brand strings expected)
src/data/business.ts (name, url, email, instagram — central source of truth)
src/data/packages.ts (6 package titles, 6 image paths, 1 description body)
src/data/reviews.ts (1 review text — decision needed)
src/hooks/useBooking.ts (30 service-name lookup keys)
src/components/About.tsx (3 references including founder narrative rewrite)
src/components/ECommerce.tsx (2 references)
src/components/FloatingActionButton.tsx (1 reference — TCPA SMS legal copy)
src/components/Footer.tsx (8 references including © line and map iframe)
src/components/Gallery.tsx (13 alt-text refs)
src/components/Hero.tsx (2 references)
src/components/Legal.tsx (5 brand refs + 2 email refs in 2 separate legal pages)
src/components/MaySpecialStrip.tsx (~25 service names + 3 copy refs)
src/components/Navigation.tsx (logo alt/aria + 4 copy refs + shop URL)
src/components/Packages.tsx (6 titles + 6 image paths + 2 headings + body copy)
src/components/Reviews.tsx (1 review text — decision needed)
src/components/SEOHead.tsx (og:site_name + dynamic OG image fallback URL)
src/components/Services.tsx (30 service titles + 4 body-copy mentions + 1 heading)
src/components/ShopStrip.tsx (SHOP_URL + headline)
src/pages/GreensboroMedSpaPage.tsx (SEO + breadcrumb + alt + body)
src/pages/services/BrowsPage.tsx (SEO title/desc)
src/pages/services/FacialsPage.tsx (SEO + body)
src/pages/services/LashesPage.tsx (SEO + body)
src/pages/services/MicroneedlingPage.tsx (SEO + body)
src/pages/services/TeethWhiteningPage.tsx (SEO + body + booking key)
```

**End of audit.**
