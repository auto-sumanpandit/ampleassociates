# Competitor & SERP Analysis

Updated 27 Sep 2026: "Ample's angle" notes now use the five sector pages that match the portfolio groups; see src/content/sectors.ts. SERP data is unchanged.

**Method:** Live Google organic SERPs via DataForSEO (`serp/google/organic/live/regular`, top 10), retrieved 25 September 2026, plus manual review of the ranking pages' positioning. Nepal (2524) unless noted.

## 1. "invest in nepal": Nepal (590/mo)

| #   | Ranking page                     | Type                                 | What it offers                                                  |
| --- | -------------------------------- | ------------------------------------ | --------------------------------------------------------------- |
| 1   | investnepal.gov.np               | Government portal                    | Official investment promotion and facilitation                  |
| 2   | investforimpactnepal.com         | Donor-funded programme (BII/FMO/SDC) | Ecosystem support for foreign investors                         |
| 3   | globalimebank.com (blog)         | Bank blog                            | Personal-finance "investment options" (FDs, mutual funds, gold) |
| 4   | jp.nepalembassy.gov.np           | Embassy page                         | Generic list of sectors                                         |
| 5   | reddit.com/r/Nepal               | Forum                                | Retail "where to invest my money"                               |
| 6   | ibn.gov.np                       | Government                           | Investment Board Nepal                                          |
| 7-9 | fmo.nl, LinkedIn, consulate page | Mixed                                | Programme evaluation, company page, generic sector list         |

**Intent:** mixed. Foreign direct investment (government) plus retail personal finance (bank blog, Reddit).
**Gap:** no page explains, for a _diaspora individual_, how the route differs by citizenship, what the real restrictions are, and how to assess an actual project. Government pages are institution-oriented. The bank and Reddit pages are about savings products.
**Ample's angle:** `/invest-nepal/` opens with a direct answer and a category comparison table, puts risks on the same page, and cites sources. It links _to_ IBN and Invest Nepal rather than competing with them on authority.

## 2. "house for sale in pokhara": Nepal (170/mo), UK (70/mo)

| #   | Ranking page                                   | Type                                        |
| --- | ---------------------------------------------- | ------------------------------------------- |
| 1   | gharghaderi.com                                | Listing portal                              |
| 2   | nepalhomesearch.com                            | Listing portal / housing project aggregator |
| 3   | instagram.com/lalpurjanepalpkr                 | Agent social account                        |
| 4   | nepalniwas.com                                 | Listing portal                              |
| 5   | facebook.com (Lalpurja Nepal Pokhara)          | Agent social page                           |
| 6-8 | 99aana.com, epropertynepal.com, aafnaighar.com | Listing portals                             |

**Intent:** transactional listings. **SERP features:** none notable besides social results.
**Content depth:** thin. Price, a few photos, phone number. No developer information, title information or risk content.
**Gap:** no ranking page tells a buyer _who the developer is_, what is verified, or what to check. Planned-community projects are presented only as listing cards.
**Ample's angle:** the Ample Cozy Homes page is a developer-grade project dossier (facts with status, location, design, timeline, risks, documents, FAQs). It won't outrank portals on inventory breadth, but it can rank for project-type queries and convert diaspora buyers who distrust listings.

## 3. "nrn investment in nepal": UK (10/mo)

| #   | Ranking page                                   | Type                        |
| --- | ---------------------------------------------- | --------------------------- |
| 1   | corporatenp.com                                | Law/corporate services blog |
| 2   | merolagani.com (NRNDFL)                        | Share-market data           |
| 3   | reddit.com                                     | Forum                       |
| 4-6 | nepselink.com, sharesansar.com, nepsealpha.com | Share-market news/data      |
| 7   | havenlawnp.com                                 | Law firm guide              |
| 9   | nrnlawnepal.com                                | Law firm guide              |

**Intent:** split between _legal how-to_ and _NEPSE-listed NRN companies_ (a navigational ambiguity).
**Gap:** law-firm guides are procedural but don't connect to real projects. Share-market pages are off-topic for property.
**Ample's angle:** cover NRN rights in the overseas guide now. A dedicated NRN guide is planned once reviewed by a Nepal lawyer. Ample also has its own diaspora route, NRN Back 2 Nepal Investment Company (`/sectors/financial-channel/`), which connects the legal question to documented group projects. None of the ranking pages does this.

## 4. "hydropower in nepal": Nepal (880/mo)

| #   | Ranking page      | Type                 |
| --- | ----------------- | -------------------- |
| 1   | ippan.org.np      | Industry association |
| 2   | nepjol.info       | Academic journal PDF |
| 3   | scribd.com        | Uploaded document    |
| 4   | ajeg.nseg.org.np  | Academic PDF         |
| 5   | icimod.org        | Research institute   |
| 6   | linkedin.com post | Social               |
| 7   | jvs.org.np        | NGO study            |
| 8   | zmescience.com    | News (flood impact)  |

**Intent:** informational and academic. Positions 1-6 were occupied by SERP features (rank_absolute starts at 7), likely a knowledge panel, People Also Ask and news.
**Gap:** no plain-English explainer of _how private projects are structured_ (promoters, licences, PPAs) together with current capacity data and risks.
**Ample's angle:** the hydropower overview article, with a sourced capacity figure, promoter-share explanation and risks, linked to Ample's own involvement on `/sectors/energy/` (Sikles Hydropower, Upper Richet Hydropower, Himalayan Solar Power, SAMS Energy Development Company).

## 5. Direct competitors (positioning, not SERPs)

| Competitor type               | Examples seen in SERPs                 | Strength          | Weakness Ample can exploit                 |
| ----------------------------- | -------------------------------------- | ----------------- | ------------------------------------------ |
| Government investment portals | Invest Nepal, IBN                      | Authority         | Not project-specific; institutional tone   |
| Listing portals               | Gharghaderi, NepalHomeSearch, 99aana   | Inventory, volume | No verification, no developer transparency |
| Law firms                     | Haven Law, NRN Law Nepal, Corporate NP | Legal detail      | No projects; procedural only               |
| Social-media agents           | Lalpurja Nepal Pokhara                 | Reach             | Low trust; no documentation                |

**Structured data observed:** portals use basic Organization/BreadcrumbList. None of the ranking pages reviewed used FAQPage or Article with citations. Ample uses Article (with `citation`), BreadcrumbList, Organization, WebSite, Person and FAQPage (on `/faqs/` and project FAQs only).

## 6. What we did not do

We did not copy competitor content. We did not target listing-portal inventory queries with doorway pages. We did not claim authority we don't have (e.g. "Nepal's leading investment company").
