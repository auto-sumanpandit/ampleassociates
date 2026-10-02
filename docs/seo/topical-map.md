# Topical Map: Entity Model (Koray Tuğberk GÜBÜR framework)

Updated 27 Sep 2026: sectors now match the five portfolio groups; see src/content/sectors.ts.

The cluster table with URLs, queries, links and cannibalisation notes is in [`/SEO-TOPICAL-MAP.md`](../../SEO-TOPICAL-MAP.md). This document records the semantic model behind it.

## 1. Source context

| Element                   | Definition                                                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Central entity**        | Ample Associates                                                                                                                                                                                                          |
| **Source context**        | A Nepal-focused investment and project-development organisation that grew out of an education consultancy (since 2009), with activity in Nepal and the UK.                                                                |
| **Central search intent** | _Understand, evaluate and take part in_ development projects and investment in Nepal, safely.                                                                                                                             |
| **Conversion goal**       | Direct enquiries to the team (contact page, contact@ampleassociates.com) about projects, partnerships, proposals and investing through NRN Back 2 Nepal Investment Company. Static site: no forms or online transactions. |
| **Primary audience**      | Nepalis in the UK (citizens and NRNs), including former Ample International Education clients; Nepal-based private investors; families buying a long-term home.                                                           |
| **Site-wide n-grams**     | "Nepal", "UK", "project", "investment", "development", "Pokhara", "verified / to be confirmed", "risk".                                                                                                                   |

**Why this framing matters for YMYL.** Search engines judge investment content on expertise and trustworthiness. The source context therefore leads with _transparency_ (roles, sources, risks), not promotion. That is also the information gap the SERPs leave open (see [`competitor-analysis.md`](competitor-analysis.md)).

## 2. Entity hierarchy

```
Ample Associates (central entity)
├── Investing in Nepal ............ root attribute (pillar: /invest-nepal/)
│   ├── Investor categories: Nepali citizen abroad · NRN · foreign national
│   ├── Legal framework: FITTA 2019 · FDI minimum · negative list · repatriation
│   ├── Institutions: Investment Board Nepal · Department of Industry · Nepal Rastra Bank
│   └── Risks: legal · title · currency · liquidity · natural hazard · execution
├── Projects ....................... core monetisation attribute (/investments/)
│   └── Ample Cozy Homes, Pokhara (/investments/ample-homes-pokhara/)
│       ├── Location: Pokhara Lekhnath · Kaski · Gandaki · Prithvi Chowk (6.5 km) · Begnas / Rupa lakes
│       ├── Attributes: 11 homes · British-inspired · planned roads · organised plots · utility-ready
│       └── Unconfirmed attributes: plot size · pricing · structure · SPV · timeline
├── Sectors (= portfolio groups, in the client's order)
│   ├── Education Consultancy → Ample International Education UK · Kathmandu · Pokhara
│   ├── College → SAMS College London (trading name of Ample International E College)
│   ├── Energy Sector → Sikles Hydropower (13 MW) · Upper Richet Hydropower (2 MW) · Himalayan Solar Power (10 MW) · SAMS Energy Development Company (partner of Rudrakshya Hydropower, 8 + 4 MW)
│   ├── Property Development → Ample Cozy Homes (Pokhara Lekhnath) · Lakeside hotel development, Pokhara (coming soon)
│   └── Financial Channel → NRN Back 2 Nepal Investment Company Pvt. Limited (Kathmandu, since 2025, minimum NPR 5 lakh)
├── Process: identify → assess → feasibility → due diligence → structure → partner → develop → report → exit
├── Governance: roles · relationship labels · conflicts · decisions · reporting · complaints · KYC
└── People: Pramod Adhikari (founder; office boy at Orbit International Education, Pokhara, in 2004) · Samjhana Adhikari (director)
```

## 3. Attribute classification (root / rare / unique)

| Attribute of "investing in Nepal"                                                                                   | Class                         | Where covered                                                         |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------- |
| Who can invest (citizenship categories)                                                                             | Root                          | `/invest-nepal/`, overseas guide                                      |
| Minimum FDI, FITTA negative list                                                                                    | Root                          | overseas guide, FAQs                                                  |
| Sectors open to investment                                                                                          | Root                          | `/invest-nepal/`, `/sectors/`                                         |
| Risks (currency, title, liquidity)                                                                                  | Root                          | `/risk-disclosure/`, project page, Why Nepal                          |
| Promoter shares in hydropower                                                                                       | Rare                          | hydropower article, `/sectors/energy/`                                |
| Planned community vs isolated plot (neighbourhood control)                                                          | Rare                          | Ample Cozy Homes, Lekhnath guide                                      |
| Community investment route for the diaspora (NRN Back 2 Nepal, from NPR 5 lakh, documented under Nepal or UK rules) | **Unique**                    | `/sectors/financial-channel/`, `#back2nepal` on `/` and `/investors/` |
| "To be confirmed" status language for unverified facts                                                              | **Unique** (information gain) | site-wide                                                             |
| Relationship labels for every portfolio business                                                                    | **Unique**                    | `/portfolio/`, `/governance/`                                         |
| Lekhnath-Pokhara merger context for buyers                                                                          | Rare                          | Lekhnath guide                                                        |

## 4. Core section (monetisation, built first)

| Seed            | Nodes                                                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/investments/` | `/investments/ample-homes-pokhara/` (+ future projects, e.g. the Lakeside hotel when announced)                                                     |
| `/investors/`   | `#back2nepal`, `/faqs/`, `/contact/`                                                                                                                |
| `/sectors/`     | `/sectors/education-consultancy/`, `/sectors/college/`, `/sectors/energy/`, `/sectors/property-development/`, `/sectors/financial-channel/`         |
| `/how-we-work/` | none                                                                                                                                                |
| `/governance/`  | `/portfolio/` (anchors `#education-consultancy`, `#college`, `#energy`, `#property-development`, `#financial-channel`), `/leadership/`, legal pages |

## 5. Outer section (authority, feeds the core)

| Contextual domain | Articles (live / planned)                                                                 | Connects to core page                                       |
| ----------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Legal and process | Overseas investment guide (live) · NRN guide (planned) · property due diligence (planned) | `/investments/`, `/sectors/financial-channel/`, `/contact/` |
| Place             | Pokhara Lekhnath buyer guide (live)                                                       | Ample Cozy Homes                                            |
| Energy            | Hydropower overview (live) · Solar (future)                                               | `/sectors/energy/`                                          |
| Visitor economy   | Tourism and hospitality (planned)                                                         | `/sectors/property-development/` (hotel section)            |
| Macro             | Nepal economy for investors (future)                                                      | `/invest-nepal/`                                            |
| Project freshness | Project updates (future, auto-published)                                                  | project pages                                               |

## 6. Topical borders (acknowledged, not crossed)

| Border topic                               | Why                                                          |
| ------------------------------------------ | ------------------------------------------------------------ |
| NEPSE share trading, IPOs, stock tips      | Different source context (retail equities); regulatory risk  |
| Remittance / money transfer                | Transactional service Ample does not offer                   |
| Study abroad counselling                   | Belongs to ampleedu.com; would cannibalise a sister business |
| College courses and admissions             | Belong to SAMS College London itself                         |
| Travel guides (Begnas Lake, trekking)      | Travel intent; used only as location context                 |
| Personal finance (FDs, gold, mutual funds) | Outside Ample's offer                                        |
| Land listings / plot sales                 | Ample presents projects, not a listings marketplace          |

## 7. Contextual bridges (outer → core)

- Overseas guide → "How Ample fits in" section → `/how-we-work/`, `/investments/`
- Overseas guide (NRN section) → `/sectors/financial-channel/` (NRN Back 2 Nepal Investment Company)
- Lekhnath guide → "6.5 km from Prithvi Chowk" example → Ample Cozy Homes
- Hydropower article → "Ample's involvement" → `/sectors/energy/` → `/portfolio/#energy`
- Why Nepal → sectors grid → each sector → its projects

## 8. Vastness / depth / momentum

Ample has one live project and limited verified data, so the site cannot yet be _vast_. The strategy compensates with **depth** (sourced, genuinely useful pages) and **momentum** (a steady cadence of guides and dated project updates). See [`content-gap-analysis.md`](content-gap-analysis.md) for the priority matrix.
