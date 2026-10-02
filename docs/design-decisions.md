# Design Decisions & Changes from the Stitch Designs

Updated 27 Sep 2026: sectors now match the portfolio groups; see src/content/sectors.ts.

## Sector and portfolio restructure (26-27 Sep 2026)

Confirmed by the client. Sectors now mirror the client's portfolio groups exactly, in the client's order:

| #   | Sector                | URL                               | Portfolio                                                                                                                                                                 |
| --- | --------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Education Consultancy | `/sectors/education-consultancy/` | Ample International Education UK, Kathmandu and Pokhara                                                                                                                   |
| 2   | College               | `/sectors/college/`               | SAMS College London (trading name of Ample International E College)                                                                                                       |
| 3   | Energy Sector         | `/sectors/energy/`                | Sikles Hydropower (13 MW), Upper Richet Hydropower (2 MW), Himalayan Solar Power (10 MW), SAMS Energy Development Company (partner of Rudrakshya Hydropower, 8 MW + 4 MW) |
| 4   | Property Development  | `/sectors/property-development/`  | Ample Cozy Homes (Pokhara Lekhnath); Lakeside, Pokhara hotel development (coming soon)                                                                                    |
| 5   | Financial Channel     | `/sectors/financial-channel/`     | NRN Back 2 Nepal Investment Company Pvt. Limited (Kathmandu, since 2025, minimum NPR 5 lakh)                                                                              |

- **Redirects (301, `config/http-rules.mjs`):** `/sectors/property/` and `/sectors/hospitality/` → `/sectors/property-development/`; `/sectors/renewable-energy/` → `/sectors/energy/`; `/sectors/education/` → `/sectors/education-consultancy/`; `/sectors/strategic-ventures/` → `/sectors/financial-channel/`. There is no Hospitality & Tourism sector and no Strategic Ventures sector.
- **Removed from the portfolio:** Ample Financial Solutions, MyUniStudy.com, Ample Property / B2N (UK), Ample Housing, Ample Hospitality and "Ample International College".
- **Names:** the organisation is called only "Ample Associates". The housing project is "Ample Cozy Homes" (its URL stays `/investments/ample-homes-pokhara/`). The hydropower company is spelt "Sikles", as on its own website. The landmark is "Prithvi Chowk".
- **Portfolio page:** `/portfolio/` is grouped by the same five groups, with anchors `#education-consultancy`, `#college`, `#energy`, `#property-development` and `#financial-channel`.
- **Homepage order:** map hero (London and Nepal pins) · facts strip · journey (2004 office boy at Orbit International Education, Pokhara; 2009; 2010 UK; 4,500+ students; 2025 Back2Nepal) · portfolio bento (five groups) · NRN Back 2 Nepal Investment Company section (`#back2nepal`) · current project (Ample Cozy Homes) · leadership · "Nepal in context" with guides · closing CTA. The Investor Centre `/investors/` also carries the `#back2nepal` section. This replaces the Stitch homepage order noted in section 1.
- **Contact:** one email address, contact@ampleassociates.com.

## Brand update (26 Sep 2026): aligned with ampleedu.com

At the client's request the visual identity now follows the Ample brand as used on ampleedu.com:

| Element        | Before (Stitch)                            | Now (Ample brand)                                                 |
| -------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| Typeface       | Playfair Display + Plus Jakarta Sans       | Poppins (300-700) throughout                                      |
| Primary colour | Midnight navy `#0F172A` + copper `#C5A059` | Royal blue `#3D03FA` → indigo `#240294` gradients, navy `#0A3971` |
| Accents        | Copper / bronze                            | Sky blue `#2287FD` (utility bar), lavender `#C9BCFF` / `#D8CDFE`  |
| Surfaces       | Warm ivory / stone                         | White, cool mist `#F5F5FE`                                        |
| Corners        | 4px                                        | 8px                                                               |
| Section titles | Serif, near-black                          | Poppins SemiBold, royal blue                                      |
| Header         | None                                       | Sky-blue utility bar (as on ampleedu.com)                         |

Token names were made semantic (`navy-*`, `brand-*`, `mist-*`) in `src/app/globals.css`. The Ample Associates emblem was kept (the ampleedu.com crest carries a graduation cap, which is education-specific) and recoloured in brand blue. Director photographs now come from ampleedu.com.

The sections below describe the original Stitch-based build; the layout decisions still apply, the palette/typography notes are superseded by the table above, and the sector list and homepage order are superseded by the restructure section.

The Google Stitch designs in `stitch_ample_associates_homepage/` were the visual reference. Their layout, hierarchy, typography, colour system and section order were kept. Their **copy was not**, because much of it was invented. This log records what changed and why.

## 1. Kept from Stitch

- **Design system "Trans-Himalayan"** (`stitch_ample_associates_homepage/trans_himalayan_sovereign_capital/DESIGN.md`): Playfair Display for headings, Plus Jakarta Sans for body text, midnight navy, warm ivory, stone surfaces, a restrained copper accent, forest green for energy, hairline 1px borders, 4px radii, and minimal shadows. Implemented as Tailwind v4 `@theme` tokens in `src/app/globals.css`.
- **Page architecture and section order** for Home (since reordered, see above), About, Leadership, Investments, Ample Cozy Homes, Sectors, Why Nepal, Investor Centre, Governance and Contact.
- **Component patterns:** label-caps eyebrows, numbered process steps, project dossier cards, status chips, a disclosure register (Governance), and a tiered document list.
- **Brand emblem:** rebuilt as a clean vector (two peaks forming a double "A"): `public/brand/`, `src/components/layout/Logo.tsx`.

## 2. Content removed because it was invented

| Stitch content                                                                                                                                          | Why removed                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| "25MW Run-of-River Hydro, Nuwakot, $18.5M", "Boutique Mountain Retreat 34-key, $7.2M", "Gandaki Hydro & Solar Syndicate", "Kathmandu Prime Residential" | Projects that don't exist in the source                                       |
| "Upper Trishuli Cascade", "Terai Solar Grid", "Annapurna Vista Resort", "Everest Cloud Solutions", "Premier Learning Institute"                         | Invented portfolio entries                                                    |
| "12 Berkeley Square, Mayfair", "Durbarmarg", "Nagpokhari" offices                                                                                       | Unverified addresses                                                          |
| Companies House number, LEI, "Bloomberg AMPLE:LN", "FCA Registered", "SEBON filing #441/081"                                                            | Fabricated regulatory identifiers, potentially unlawful on an investment site |
| "Quarterly investor distributions", "Structured co-investment with exit & leaseback", "escrow", "sovereign PPAs"                                        | Invented financial terms                                                      |
| Housing project (now Ample Cozy Homes) "overlooking Phewa Lake", "private infinity pools", "Est. completion 2026", "~840m ASL", villa plot availability | Invented or incorrect project facts (Lekhnath is not on Phewa Lake)           |
| "Over two decades of cross-border leadership", "15+ years", "accredited / institutional partners only"                                                  | Unsupported claims or wrong audience                                          |
| AI-generated founder portraits and villa imagery                                                                                                        | Would misrepresent real people and the project                                |

## 3. UX and accessibility improvements

| Change                                                                                            | Reason                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copper `#C5A059` text on light backgrounds → bronze `#775A19`                                     | Contrast went from ~2.3:1 (fails WCAG) to ~6.4:1                                                                                                          |
| Micro-labels 11px → 12px minimum                                                                  | Legibility                                                                                                                                                |
| Status badges on every unverified fact (`To be confirmed`, `Available on request`, `Coming soon`) | Trust and YMYL: a figure is never shown before it's verified                                                                                              |
| One current project plus an honest "more in preparation" note, instead of three cards             | Two of the three Stitch cards were invented                                                                                                               |
| Monogram portraits labelled "photograph to be supplied"                                           | No AI likenesses of real people (since replaced by real director photographs)                                                                             |
| Mobile navigation as a native `<dialog>` drawer                                                   | Focus trap, Escape to close, inert background, no extra libraries                                                                                         |
| Opportunity filters in a bottom-sheet dialog on mobile                                            | Stitch mobile design had no workable filter pattern                                                                                                       |
| Horizontal process steps collapse to a vertical rail on mobile                                    | Readability at 390px                                                                                                                                      |
| Sticky in-page section nav on the project page                                                    | The page is long (~18,000px on mobile)                                                                                                                    |
| FAQ uses `<details>/<summary>`                                                                    | Works without JavaScript, keyboard-accessible, content crawlable                                                                                          |
| "Invest Now"-style CTAs replaced ("Talk to Our Team", "Enquire About This Project")               | Compliance-safe language. The homepage "Invest With Us" button goes to the `#back2nepal` section, which states the risks and links to the risk disclosure |
| Real, credited location photography (Wikimedia Commons, CC BY-SA) with an on-image kind label     | Honest imagery until project photography exists                                                                                                           |
| Illustrative 11-plot schematic labelled "not a survey or approved plan"                           | Visual aid without implying approvals                                                                                                                     |

## 4. Deliberate simplifications

- **No forms, registration or investor login.** At the client's request the site is a static company portfolio; all enquiries go through the contact details (contact@ampleassociates.com).
- **No hero video.** Protects LCP. The hero is a server-rendered dotted map of the UK-to-Nepal corridor with pins on London and Nepal.
- **No animation library.** Motion is limited to CSS transitions and respects `prefers-reduced-motion`.
