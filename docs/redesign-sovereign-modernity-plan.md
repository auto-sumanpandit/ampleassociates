# Redesign plan: "Sovereign Modernity" (new design, 1 Oct 2026)

Source: `new design/` (Stitch export). Five desktop screens (Home, About, Investors, Sector: Property Development) plus mobile screens (Home, About, Contact, Investors, Sector), and `sovereign_modernity/DESIGN.md`.

## What we take from the new design

- **Look:** Poppins with light display weights (200/300) against semibold accents, lavender surface `#FBF8FF`, deep navy `#070D26` / `#0B1437`, royal blue `#3D03FA`, sky blue `#2287FD` utility bar, amber "To be confirmed" badges, hairline borders `#E2E8F0`.
- **Shapes:** pill buttons with an arrow disc, 28px cards, 36px hero and feature panels, 12 to 16px nested items.
- **Shell:** sky-blue utility bar with the email, floating white pill header (About, Sectors, Portfolio, Investors, Contact + "Talk to Our Team"), navy footer with a mountain silhouette, mobile bottom tab bar.
- **Sections:** pill section labels, big ghost numbers (01, 02...), layered Himalayan silhouette (Machhapuchhre) under the hero, overlapping stats card, dark "five sectors" bento, navy Back2Nepal feature block, royal-blue closing CTA "Let's build what's next."

## What we do NOT take (content rules stay)

The Stitch copy is invented. Layout is used, copy is not:

- Stats "1,982 / 4,452+" become verified facts: 2004, 4,500+ students, 5 sectors, 9 companies and projects (Ample International Education counts once, with three branches, since 2 Oct 2026).
- "[Name Confirmed via Dossier]" leadership placeholders become the two real directors with their own photos.
- Invented London address (100 Bishopsgate), phone numbers, "Ample Associates Ltd" legal line, "Regulatory Disclosures", NEPSE tickers: not used. Offices stay city-only with "To be confirmed".
- Only one public email (contact@ampleassociates.com). investment@ was removed by the client on 27 Sep 2026.
- Ample Cozy Homes uses the client's concept image (`ample-cozy-homes-concept.jpg`). The 3D render from the new design was tried on 2 Oct 2026 and dropped the same day at the client's request.
- No forms (static portfolio). Contact page uses email cards with "Copy" buttons only.
- Name is always "Ample Associates". No em-dashes in visible copy. Sectors stay in the client's order.

## Build phases

1. **Backup** current `src/` to `backups/`.
2. **Tokens** (`globals.css`): remap existing token names (navy, brand, mist, line, canvas) to the new palette so every page shifts at once; add 28/36px radii, the two shadow tiers, display type scale, Poppins 200.
3. **Shell:** utility bar, floating pill header, mobile menu, bottom tab bar, footer with mountains.
4. **Shared UI:** Button (uppercase pill + arrow disc), SectionLabel pill, SectionHeading (light/bold split + ghost number), PageHero (lavender, big light title, meta dots), StatusBadge (amber), cards (Sector, Project, Team, Portfolio).
5. **Pages with a design:** Home, About, Investors, Sector detail, Contact.
6. **Pages without a design** inherit the new components: Portfolio, Sectors index, Leadership, How We Work, Governance, FAQs, Investments, Invest Nepal, Insights, legal pages, 404.
7. **Verify:** typecheck, lint, build; screenshots at desktop and mobile widths; check no em-dashes and no invented facts.

## Navigation change

Primary nav follows the design: About, Sectors, Portfolio, Investors, Contact. Opportunities, Why Nepal, Insights, Leadership, How We Work, Governance and FAQs move to the footer (pages and URLs unchanged).

## Status (2 Oct 2026)

All phases done. Typecheck, lint and production build pass. All 24 page types were checked at 390px and 1440px: no horizontal scroll, no em-dashes, no script errors. Previews: `docs/redesign-preview-home.png`, `docs/redesign-preview-contact-mobile.png`.

Decided by the user (2 Oct 2026): keep the new hero line "Rooted in Nepal. Growing from London." Later the same day the client switched Ample Cozy Homes back to the original concept image (`ample-cozy-homes-concept.jpg`); the 3D render file is kept but unused.

## Pages removed (2 Oct 2026)

The user asked to remove unnecessary pages and left the choice to us. Removed because their content is covered elsewhere (files moved to `backups/removed-pages-2026-10-02/`, permanent redirects in `config/http-rules.mjs`):

| Removed | Redirects to | Why |
| --- | --- | --- |
| /how-we-work/ | /investors/ | Process steps already on Investors |
| /governance/ | /about/ | Status key repeats Portfolio's "What each label means" |
| /faqs/ | /investors/ | Only collected FAQs that sit on each page |
| /investments/ | /investments/ample-homes-pokhara/ | Listed a single project |
| /insights/{category}/ | /insights/ | Thin pages (one or two articles each) |

Kept: Leadership (trust), Sectors overview (primary nav), Investing in Nepal and the articles (search value). The Legal pages, Insights, the article template and the Sectors overview were then given a richer layout (status card and numbered sections; featured guide with cover photos; photo bento).
