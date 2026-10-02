#!/usr/bin/env node
/**
 * Static build for Cloudflare Workers static assets.
 *  1. Generates responsive WebP variants of /public/images/** into /public/_img
 *     (consumed by src/lib/image-loader.ts).
 *  2. Runs `next build` with STATIC_EXPORT=true → ./dist
 *  3. Writes dist/_headers and dist/_redirects from config/http-rules.mjs.
 *
 * Usage: node scripts/build-static.mjs
 * Env:   NEXT_PUBLIC_ALLOW_INDEXING=true only for production; BUILD_CPUS to limit workers.
 */
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative, extname } from "node:path";
import sharp from "sharp";
import { redirects, securityHeaders } from "../config/http-rules.mjs";

const WIDTHS = [640, 960, 1280, 1920, 2400]; // keep in sync with src/lib/image-loader.ts
const root = process.cwd();
const srcDir = join(root, "public", "images");
const imgOut = join(root, "public", "_img");
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

// 1. Image variants
rmSync(imgOut, { recursive: true, force: true });
mkdirSync(imgOut, { recursive: true });
const images = walk(srcDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
for (const file of images) {
  const name = relative(srcDir, file).replace(/\\/g, "/").replace(extname(file), "").replace(/\//g, "__");
  const { width: original = 0 } = await sharp(file).metadata();
  for (const w of WIDTHS) {
    await sharp(file)
      .resize({ width: Math.min(w, original), withoutEnlargement: true })
      .webp({ quality: 74 })
      .toFile(join(imgOut, `${name}-${w}.webp`));
  }
}
console.log(`✓ Generated ${images.length * WIDTHS.length} image variants`);

// 2. Static export
const nextBin = join(root, "node_modules", "next", "dist", "bin", "next");
const result = spawnSync(process.execPath, [nextBin, "build"], {
  stdio: "inherit",
  env: { ...process.env, STATIC_EXPORT: "true" },
});
if (result.status !== 0) process.exit(result.status ?? 1);
if (!existsSync(join(root, "dist", "index.html"))) {
  console.error("✗ Static export did not produce dist/index.html");
  process.exit(1);
}

// Next's static export writes segment prefetch payloads in nested folders
// (`contact/__next.contact/__PAGE__.txt`) but the client router requests the
// flattened name (`contact/__next.contact.__PAGE__.txt`). Write flattened copies.
let flattened = 0;
for (const file of walk(join(root, "dist"))) {
  const rel = relative(join(root, "dist"), file).replace(/\\/g, "/");
  const match = rel.match(/^(.*?)(__next\.[^/]+)\/(.+\.txt)$/);
  if (!match) continue;
  const [, dir, segment, rest] = match;
  const target = join(root, "dist", `${dir}${segment}.${rest.replace(/\//g, ".")}`);
  if (!existsSync(target)) {
    copyFileSync(file, target);
    flattened++;
  }
}
console.log(`✓ Wrote ${flattened} flattened prefetch payloads`);

// 3. _headers and _redirects
const headerLines = securityHeaders({ allowIndexing }).map((h) => `  ${h.key}: ${h.value}`);
const immutable = "  Cache-Control: public, max-age=31536000, immutable";
writeFileSync(
  join(root, "dist", "_headers"),
  ["/*", ...headerLines, "", "/_next/static/*", immutable, "", "/_img/*", immutable, "", "/images/*", immutable, ""].join(
    "\n",
  ),
);
writeFileSync(
  join(root, "dist", "_redirects"),
  redirects.flatMap(([from, to]) => [`${from} ${to} 301`, `${from}/ ${to} 301`]).join("\n") + "\n",
);
console.log(`✓ Wrote _headers (indexing ${allowIndexing ? "allowed" : "blocked"}) and _redirects (${redirects.length * 2} rules)`);
