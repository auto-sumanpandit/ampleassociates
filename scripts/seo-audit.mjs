#!/usr/bin/env node
/**
 * Pre-launch SEO audit. Crawls every URL in the sitemap of a running server
 * plus every internal link found, and reports:
 *  - non-200 status codes and broken internal links
 *  - pages without exactly one <h1>
 *  - missing/duplicate <title> and meta descriptions
 *  - missing or mismatched canonical URLs, staging domains in metadata
 *  - accidental noindex on indexable pages
 *  - images without alt attributes
 *  - invalid JSON-LD
 *  - orphan pages (in sitemap but not linked from any other page)
 *
 * Usage: node scripts/seo-audit.mjs http://localhost:3000 https://ampleassociates.com
 *   arg1 = server to crawl, arg2 = expected canonical origin (defaults to NEXT_PUBLIC_SITE_URL or ampleassociates.com)
 */

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const canonicalOrigin = (process.argv[3] ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://ampleassociates.com").replace(
  /\/$/,
  "",
);

const issues = [];
const report = (url, type, detail) => issues.push({ url, type, detail });

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const text = (html, re) => [...html.matchAll(re)].map((m) => decode(m[1]));
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1];

async function get(url) {
  const res = await fetch(url, { redirect: "manual" });
  return { status: res.status, html: res.headers.get("content-type")?.includes("text/html") ? await res.text() : "" };
}

const sitemapXml = await (await fetch(`${base}/sitemap.xml`)).text();
const sitemapUrls = text(sitemapXml, /<loc>([^<]+)<\/loc>/g).map((u) => u.replace(canonicalOrigin, ""));
console.log(`Sitemap: ${sitemapUrls.length} URLs`);

const titles = new Map();
const descriptions = new Map();
const inbound = new Map(sitemapUrls.map((u) => [u, 0]));
const checkedLinks = new Map();

for (const path of sitemapUrls) {
  const url = base + path;
  const { status, html } = await get(url);
  if (status !== 200) {
    report(path, "status", status);
    continue;
  }

  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) report(path, "h1-count", h1s);

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "") || undefined;
  if (!title) report(path, "title-missing", "");
  else {
    if (titles.has(title)) report(path, "title-duplicate", `same as ${titles.get(title)}`);
    titles.set(title, path);
    if (title.length > 70) report(path, "title-long", `${title.length} chars: ${title}`);
  }

  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "") || undefined;
  if (!desc) report(path, "description-missing", "");
  else {
    if (descriptions.has(desc)) report(path, "description-duplicate", `same as ${descriptions.get(desc)}`);
    descriptions.set(desc, path);
    if (desc.length > 165) report(path, "description-long", `${desc.length} chars`);
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!canonical) report(path, "canonical-missing", "");
  else if (canonical !== canonicalOrigin + path) report(path, "canonical-mismatch", canonical);

  const robotsMeta = html.match(/<meta name="robots" content="([^"]*)"/)?.[1];
  if (robotsMeta?.includes("noindex")) report(path, "noindex-in-sitemap", robotsMeta);

  for (const m of html.matchAll(/(?:property|name)="(?:og:url|og:image|twitter:image)" content="([^"]*)"/g)) {
    if (!m[1].startsWith(canonicalOrigin)) report(path, "og-wrong-origin", m[1]);
  }
  if (/localhost|vercel\.app|staging/i.test(html.match(/<head>[\s\S]*<\/head>/)?.[0] ?? "")) {
    report(path, "staging-domain-in-head", "");
  }

  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (attr(img, "alt") === undefined) report(path, "img-no-alt", attr(img, "src"));
  }

  for (const block of text(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(block);
    } catch {
      report(path, "jsonld-invalid", block.slice(0, 80));
    }
  }

  const links = new Set(
    text(html, /<a\b[^>]*href="([^"#?]*)(?:[#?][^"]*)?"/g).filter((h) => h.startsWith("/") && !h.startsWith("//")),
  );
  for (const href of links) {
    if (href !== path && inbound.has(href)) inbound.set(href, inbound.get(href) + 1);
    if (!checkedLinks.has(href)) {
      const res = await fetch(base + href, { redirect: "manual" });
      checkedLinks.set(href, res.status);
    }
    const s = checkedLinks.get(href);
    if (s >= 400) report(path, "broken-link", `${href} → ${s}`);
    else if (s >= 300) report(path, "link-redirects", `${href} → ${s}`);
  }
}

for (const [path, count] of inbound) if (count === 0 && path !== "/") report(path, "orphan", "no internal links in");

const byType = issues.reduce((acc, i) => ((acc[i.type] ??= []).push(i), acc), {});
if (issues.length === 0) {
  console.log("✓ No issues found.");
} else {
  for (const [type, list] of Object.entries(byType)) {
    console.log(`\n✗ ${type} (${list.length})`);
    for (const i of list) console.log(`   ${i.url}  ${i.detail}`);
  }
  process.exitCode = 1;
}
console.log(`\nChecked ${sitemapUrls.length} pages and ${checkedLinks.size} unique internal links.`);
