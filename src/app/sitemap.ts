import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { getInsights, getProjects, getSectors } from "@/lib/cms";
import { absoluteUrl } from "@/lib/seo/metadata";

/** Canonical, indexable URLs only (trailing slash, production domain). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, sectors, insights] = await Promise.all([getProjects(), getSectors(), getInsights()]);
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/invest-nepal/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/leadership/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/portfolio/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/sectors/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/investors/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact/", priority: 0.6, changeFrequency: "yearly" },
    { path: "/insights/", priority: 0.7, changeFrequency: "weekly" },
    { path: "/risk-disclosure/", priority: 0.3, changeFrequency: "yearly" },
    { path: "/investment-disclaimer/", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy-policy/", priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookie-policy/", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms/", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/investments/${p.slug}/`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...sectors.map((s) => ({
      url: absoluteUrl(`/sectors/${s.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...insights.map((i) => ({
      url: absoluteUrl(`/insights/${i.category}/${i.slug}/`),
      lastModified: new Date(i.updatedAt ?? i.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
