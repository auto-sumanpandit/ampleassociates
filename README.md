# AmpleAssociates.com

The website for **Ample Associates** — investment and development opportunities in Nepal across property, renewable energy, hospitality, education and strategic ventures.

Built with Next.js 16 (App Router, React Server Components), TypeScript (strict) and Tailwind CSS v4. Content comes from a typed content layer that can be backed by Sanity. Every page is statically prerendered.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional for local dev
npm run dev                  # http://localhost:3000
```

The site is fully static: no forms, no user accounts and no server-side code. Visitors reach the team through the contact details on `/contact/` (set in `src/content/site.ts`).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve (use `BUILD_CPUS=2 npm run build` on low-memory machines) |
| `npm run check` | Typecheck, lint and build |
| `npm run build:static` | Static export to `dist/` with `_headers`, `_redirects` and WebP image variants |
| `npm run deploy:staging` | Static build + deploy to Cloudflare staging (see docs/deployment.md) |
| `npm run audit:seo` | Crawls the sitemap of a running server (`:3000`) and checks status codes, H1s, duplicate titles/descriptions, canonicals, noindex, alt text, JSON-LD validity, broken links and orphans |
| `npm run seo:on-page-map` | Regenerates `docs/seo/on-page-map.md` from the rendered site |
| `npm run format` | Prettier |

## Project structure

```
src/
  app/                      Routes (one folder per URL; trailing-slash URLs)
    investments/[slug]/     Project template (Ample Homes)
    sectors/[slug]/         Sector template
    insights/[category]/[slug]/  Articles (category pages exist only when they have articles)
    sitemap.ts, robots.ts   Technical SEO
  components/
    layout/                 Header, MobileNavigation, Footer, Logo, Analytics + consent
    ui/                     Button, SectionHeading, StatusBadge, Breadcrumbs, FAQ, SourceCitation, MediaFigure, Icon, JsonLd
    cards/                  ProjectCard, SectorCard, PortfolioCard, TeamCard, ArticleCard, RiskCard, DocumentCard, StatCard
    sections/               PageHero, ProcessTimeline, InvestorCTA, KeyFactGrid, OpportunityExplorer, SiteSchematic, LegalPage
  content/                  Typed content (the local CMS): projects, portfolio, sectors, team, insights, policies, sources…
  lib/
    cms/                    Content repository (local ↔ Sanity)
    seo/                    Metadata builder, JSON-LD builders
    analytics.ts            GA4 events (consent-gated)
  types/content.ts          Content model
sanity/                     Sanity Studio schemas (separate install)
scripts/                    SEO audit and on-page map generators
docs/                       SEO research, verification report, deployment, design decisions
stitch_ample_associates_homepage/  Original Google Stitch design exports (reference only)
```

## Content rules (important)

This is an investment (YMYL) website. The content layer enforces a **status language**:

`VERIFIED · AVAILABLE · AVAILABLE_ON_REQUEST · PROJECT_SPECIFIC · IN_DEVELOPMENT · TO_BE_CONFIRMED · COMING_SOON`

- A fact whose status is `TO_BE_CONFIRMED`, `AVAILABLE_ON_REQUEST` or `COMING_SOON` is rendered **as its status badge, never as a value** (`KeyFactGrid`).
- Portfolio relationships always show their status. Websites are linked only when `websiteVerified: true`.
- Every external statistic lives in `src/content/sources.ts` with publisher, reference year and last-verified date, and is rendered with `SourceCitation`.
- Images carry a `kind` ("Actual Project Photo", "Architectural Render", "Concept Image", "Location Image"), shown on the image with its credit.
- Never use "invest now", "guaranteed", "risk-free" or similar. Never publish returns.

What still needs confirmation from the client: **[docs/content-verification-needed.md](docs/content-verification-needed.md)**.

## Documentation

| Document | Purpose |
|---|---|
| [SEO-TOPICAL-MAP.md](SEO-TOPICAL-MAP.md) | Cluster-level topical map (queries, URLs, links, cannibalisation) |
| [docs/seo/keyword-research.md](docs/seo/keyword-research.md) | Keyword data (DataForSEO, Nepal and UK) |
| [docs/seo/topical-map.md](docs/seo/topical-map.md) | Entity model, core/outer sections, borders |
| [docs/seo/competitor-analysis.md](docs/seo/competitor-analysis.md) | Live SERP analysis |
| [docs/seo/content-gap-analysis.md](docs/seo/content-gap-analysis.md) | Gaps, priority matrix, content briefs |
| [docs/seo/internal-linking-plan.md](docs/seo/internal-linking-plan.md) | Link architecture and anchor rules |
| [docs/seo/on-page-map.md](docs/seo/on-page-map.md) | Generated titles, descriptions, H1/H2s and schema per URL |
| [docs/content-verification-needed.md](docs/content-verification-needed.md) | Claims awaiting confirmation (launch blockers first) |
| [docs/design-decisions.md](docs/design-decisions.md) | What changed from the Stitch designs, and why |
| [docs/deployment.md](docs/deployment.md) | Environment, hosting, launch checklist |
| [sanity/README.md](sanity/README.md) | CMS set-up |

## Adding a project

1. Add an object to `src/content/projects.ts` (or a `project` document in Sanity) following the `Project` type. Keep unverified values as `TO_BE_CONFIRMED`.
2. The project automatically appears on `/investments/`, its sector page, the sitemap and (if `featured`) the homepage.
3. Link it from at least one insight (see the internal-linking plan).

## Future phases (architecture ready)

- Enquiry forms (contact, project information, investor registration) were removed at the client's request — the site is a static company portfolio. They can be added back later if needed.
- `/insights/project-updates/` and `/insights/company-updates/`: generated automatically once an article exists in the category.
- Investor portal (auth, document room, reporting): not built by design — Phase 5.
