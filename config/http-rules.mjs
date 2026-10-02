/**
 * Single source of truth for HTTP security headers and redirects.
 * Used by next.config.ts (Node hosting) and scripts/build-static.mjs
 * (Cloudflare `_headers` / `_redirects` for the static export).
 */

/** @param {{ isDev?: boolean }} opts */
export function contentSecurityPolicy({ isDev = false } = {}) {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
    "font-src 'self'",
    "connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://*.google-analytics.com",
    "frame-src 'none'",
    "form-action 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/**
 * @param {{ isDev?: boolean, allowIndexing?: boolean }} opts
 * @returns {{ key: string, value: string }[]}
 */
export function securityHeaders({ isDev = false, allowIndexing = false } = {}) {
  const headers = [
    { key: "Content-Security-Policy", value: contentSecurityPolicy({ isDev }) },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ];
  if (!allowIndexing) headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
  return headers;
}

/** Legacy / convenience paths → canonical pages (all permanent). */
export const redirects = [
  // Pages removed on 2 Oct 2026 (their content is covered elsewhere); old links go to the closest page.
  ["/investments", "/investments/ample-homes-pokhara/"],
  ["/how-we-work", "/investors/"],
  ["/governance", "/about/"],
  ["/faqs", "/investors/"],
  ["/insights/investment-guides", "/insights/"],
  ["/insights/market-insights", "/insights/"],
  ["/insights/project-updates", "/insights/"],
  ["/insights/company-updates", "/insights/"],
  ["/about-us", "/about/"],
  ["/team", "/leadership/"],
  ["/our-team", "/leadership/"],
  ["/opportunities", "/investments/ample-homes-pokhara/"],
  ["/investment-opportunities", "/investments/ample-homes-pokhara/"],
  ["/projects", "/investments/ample-homes-pokhara/"],
  ["/ample-homes", "/investments/ample-homes-pokhara/"],
  ["/why-nepal", "/invest-nepal/"],
  ["/investor-centre", "/investors/"],
  ["/register", "/contact/"],
  ["/investors/register", "/contact/"],
  ["/privacy", "/privacy-policy/"],
  ["/cookies", "/cookie-policy/"],
  ["/news", "/insights/"],
  ["/blog", "/insights/"],
  // Sectors renamed to the client's portfolio groups (27 Sep 2026).
  ["/sectors/property", "/sectors/property-development/"],
  ["/sectors/hospitality", "/sectors/property-development/"],
  ["/sectors/renewable-energy", "/sectors/energy/"],
  ["/sectors/education", "/sectors/education-consultancy/"],
  ["/sectors/strategic-ventures", "/sectors/financial-channel/"],
];
