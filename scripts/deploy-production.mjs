#!/usr/bin/env node
/**
 * Production deploy to Cloudflare (wrangler env "production", https://ampleassociates.com).
 * Builds the static export with search-engine indexing allowed and the production URL,
 * then deploys. Staging stays noindex; only this script turns indexing on.
 *
 * Usage: npm run deploy:production   (BUILD_CPUS=2 on low-memory machines)
 */
import { spawnSync } from "node:child_process";

const env = {
  ...process.env,
  NEXT_PUBLIC_ALLOW_INDEXING: "true",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ampleassociates.com",
};

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", env, shell: process.platform === "win32" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log(`Building for ${env.NEXT_PUBLIC_SITE_URL} with indexing allowed…`);
run("node", ["scripts/build-static.mjs"]);
run("npx", ["wrangler", "deploy", "--env", "production"]);
