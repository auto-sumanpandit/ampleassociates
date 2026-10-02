import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "sanity/**",
    "dist/**",
    "backups/**",
    ".agents/**",
    ".claude/**",
    "out/**",
    ".wrangler/**",
    "stitch_ample_associates_homepage/**",
    ".playwright-mcp/**",
  ]),
]);

export default eslintConfig;
