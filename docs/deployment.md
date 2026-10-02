# Deployment Guide

The site is a Next.js 16 App Router application. Every page is statically prerendered at build time and there is no server-side code (no forms, no accounts). Any Node.js host that supports Next.js works. **Vercel** is recommended (per the development plan).

## 1. Requirements

- Node.js ≥ 20.9 (developed on Node 24)
- A domain (ampleassociates.com) with DNS access
- The official contact email/phone, set in `src/content/site.ts` (`site.contact`)

## 2. Environment variables

Copy `.env.example` and set these on the host. Never commit real values.

| Variable | Production value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://ampleassociates.com` | Canonicals, OG tags, sitemap |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` **on production only** | Any other value sends `X-Robots-Tag: noindex` and a disallow-all robots.txt. Keep previews at `false`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-…` | Optional; loads only after consent |
| `NEXT_PUBLIC_GSC_VERIFICATION` | token | Or verify via DNS instead |
| `SANITY_*` | when the CMS is live | Optional |

`NEXT_PUBLIC_*` values are baked in at **build** time. Rebuild after changing them.

## Staging on Cloudflare (live)

**URL:** https://ampleassociates-staging.automationsuman2025.workers.dev
(Cloudflare account: Automationsuman2025@gmail.com's Account; Worker: `ampleassociates-staging`)

The staging site is a pure static export served by Workers static assets:

```bash
npm run deploy:staging        # = npm run build:static && wrangler deploy --env staging
# low-memory machines: BUILD_CPUS=2 npm run deploy:staging
```

`npm run build:static` (scripts/build-static.mjs):
1. generates responsive WebP variants of `public/images/**` into `public/_img` (served through `src/lib/image-loader.ts`)
2. runs `next build` with `STATIC_EXPORT=true` → `dist/`
3. writes `dist/_headers` (security headers + `X-Robots-Tag: noindex` unless `NEXT_PUBLIC_ALLOW_INDEXING=true`) and `dist/_redirects` from `config/http-rules.mjs`
4. writes flattened copies of Next's segment-prefetch files (Next 16 export/router path mismatch)

Staging is **noindex**: robots.txt disallows everything and every response carries `X-Robots-Tag: noindex, nofollow`.

Known differences from Node hosting: the trailing-slash redirect (`/about` → `/about/`) is a 307 from Cloudflare rather than a 308; images are pre-sized WebP rather than on-demand AVIF/WebP.

Roll back: `npx wrangler rollback --env staging`. Remove: `npx wrangler delete --env staging`.

## Production on Cloudflare (ready, not yet deployed)

Production uses the same static build as staging, on the `production` environment in `wrangler.jsonc` (Worker `ampleassociates`, custom domains `ampleassociates.com` and `www.ampleassociates.com`).

```bash
npm run deploy:production     # = build with NEXT_PUBLIC_ALLOW_INDEXING=true and NEXT_PUBLIC_SITE_URL=https://ampleassociates.com, then wrangler deploy --env production
```

Before the first production deploy:

1. Add the `ampleassociates.com` zone to the same Cloudflare account as staging (Automationsuman2025@gmail.com's Account) and switch the domain's nameservers to Cloudflare. Custom domains only attach to zones on that account.
2. Add a Cloudflare **Redirect Rule**: `www.ampleassociates.com/*` → `https://ampleassociates.com/${1}` (301), so there is one canonical host. Canonical tags already point to the apex.
3. Optional: set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the shell before deploying to enable consent-gated Google Analytics.

Production differs from staging only in indexing: `robots.txt` allows crawling and lists `https://ampleassociates.com/sitemap.xml`, and no `X-Robots-Tag: noindex` header is sent. Roll back with `npx wrangler rollback --env production`.

## 3. Vercel

1. Import the repository. Framework preset: Next.js. Build command `npm run build`.
2. Set the environment variables for **Production**. For **Preview**, set `NEXT_PUBLIC_ALLOW_INDEXING=false`.
3. Add `ampleassociates.com` and `www.ampleassociates.com`. Make the apex the primary domain and redirect `www` to it (Vercel domain settings), matching the canonical URLs.
4. Deploy, then run the checks in §6.

Alternative (DigitalOcean App Platform or any VPS): `npm ci && npm run build && npm start` behind HTTPS. Set `NODE_ENV=production`.

## 4. Contact details

Set the official email and phone in `src/content/site.ts` → `site.contact`. They appear on `/contact/` and in the Organization schema. Until set, the Contact page shows \"To be confirmed\".

## 5. Security headers

Set in `next.config.ts`: CSP (self plus Google Analytics only; `form-action 'none'`), HSTS with preload, `X-Frame-Options: DENY`, `nosniff`, a strict referrer policy, a locked-down permissions policy, and COOP. If you add a third-party script, add its origin to the CSP.

## 6. Launch checklist

- [x] A-list launch blockers in [`content-verification-needed.md`](content-verification-needed.md) resolved (brand name, email, addresses, legal pages reviewed, 2 Oct 2026). Open by the client's choice: UK financial-promotion review of the Back2Nepal wording.
- [x] `npm run check` passes (typecheck, lint, build); GitHub Actions runs the same on every push
- [x] SEO audit clean (`npm start`, then `npm run audit:seo`)
- [ ] `ampleassociates.com` zone on the Cloudflare account; www → apex redirect rule
- [ ] `npm run deploy:production`
- [ ] `https://ampleassociates.com/robots.txt` allows crawling and lists the sitemap
- [ ] Validate schema with the Google Rich Results Test (home, /investments/ample-homes-pokhara/, one article, /leadership/)
- [ ] Lighthouse on mobile: home, /portfolio/, /investments/ample-homes-pokhara/
- [ ] Verify the property in Google Search Console, submit `sitemap.xml`
- [ ] GA4 (if enabled): confirm events only fire after accepting cookies
- [ ] Check 301 redirects from removed pages (`/how-we-work/`, `/governance/`, `/faqs/`, `/investments/`) and legacy URLs (`/about-us`, `/why-nepal`, `/ample-homes`)

## 7. After launch

- Re-verify every source in `src/content/sources.ts` every 6 months (update `lastVerified`).
- Re-run `npm run seo:on-page-map` after content changes to refresh `docs/seo/on-page-map.md`.
- Review Search Console queries at 8–12 weeks and reconfigure titles/H1s against real impression data.
