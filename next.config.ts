import type { NextConfig } from "next";
import { redirects, securityHeaders } from "./config/http-rules.mjs";

const isDev = process.env.NODE_ENV !== "production";
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

/**
 * STATIC_EXPORT=true builds plain HTML into ./dist for static hosting
 * (Cloudflare Workers static assets). Headers and redirects are then written
 * to _headers / _redirects by scripts/build-static.mjs, and images are served
 * from pre-generated WebP variants through a custom loader.
 */
const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Limit parallel build workers on low-memory machines, e.g. BUILD_CPUS=2 npm run build
  experimental: process.env.BUILD_CPUS ? { cpus: Number(process.env.BUILD_CPUS) } : {},
  ...(staticExport
    ? {
        output: "export",
        distDir: "dist",
        images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
      }
    : {
        images: { formats: ["image/avif", "image/webp"], qualities: [70, 75, 80] },
        async headers() {
          return [
            { source: "/:path*", headers: securityHeaders({ isDev, allowIndexing }) },
            {
              source: "/images/:path*",
              headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
          ];
        },
        async redirects() {
          return redirects.map(([source, destination]) => ({ source, destination, permanent: true }));
        },
      }),
};

export default nextConfig;
