import "server-only";
import { cache } from "react";
import type {
  Insight,
  InsightCategorySlug,
  PortfolioEntity,
  Project,
  Sector,
  SectorSlug,
  TeamMember,
} from "@/types/content";
import { projects } from "@/content/projects";
import { portfolio } from "@/content/portfolio";
import { sectors } from "@/content/sectors";
import { team } from "@/content/team";
import { insights, insightCategories } from "@/content/insights";
import { policies } from "@/content/policies";
import { sanityEnabled, sanityQuery } from "./sanity";

/**
 * Content repository. Pages depend only on these functions, so the backing
 * store (local typed content or Sanity) can change without page changes.
 * If Sanity is configured but unreachable, the local content is served and
 * the failure is logged.
 */
async function fromSource<T>(query: string, local: T, params?: Record<string, unknown>): Promise<T> {
  if (!sanityEnabled) return local;
  try {
    const result = await sanityQuery<T | null>(query, params);
    // An empty dataset (e.g. before content migration) falls back to local content.
    if (result == null || (Array.isArray(result) && result.length === 0)) return local;
    return result;
  } catch (error) {
    console.error("[cms] Sanity unavailable, serving local content", error);
    return local;
  }
}

export const getProjects = cache((): Promise<Project[]> =>
  fromSource(
    `*[_type == "project"] | order(featured desc, title asc){..., "slug": slug.current, "updates": coalesce(updates[]->{date, title, body} | order(date desc), [])}`,
    projects,
  ),
);

export const getProject = cache(async (slug: string): Promise<Project | undefined> => {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
});

export const getProjectsBySector = cache(async (sector: SectorSlug): Promise<Project[]> => {
  const all = await getProjects();
  return all.filter((p) => p.sector === sector);
});

export const getPortfolio = cache((): Promise<PortfolioEntity[]> =>
  fromSource(`*[_type == "portfolioEntity"] | order(country asc, name asc){..., "slug": slug.current}`, portfolio),
);

export const getSectors = cache((): Promise<Sector[]> =>
  fromSource(`*[_type == "sector"] | order(order asc)`, sectors),
);

export const getSector = cache(async (slug: string): Promise<Sector | undefined> => {
  const all = await getSectors();
  return all.find((s) => s.slug === slug);
});

export const getTeam = cache((): Promise<TeamMember[]> =>
  fromSource(`*[_type == "teamMember"] | order(order asc){..., "slug": slug.current}`, team),
);

export const getInsights = cache((): Promise<Insight[]> =>
  fromSource(`*[_type == "insight"] | order(publishedAt desc){..., "slug": slug.current}`, insights),
);

export const getInsight = cache(async (category: string, slug: string): Promise<Insight | undefined> => {
  const all = await getInsights();
  return all.find((i) => i.slug === slug && i.category === category);
});

export const getInsightsByCategory = cache(async (category: InsightCategorySlug): Promise<Insight[]> => {
  const all = await getInsights();
  return all.filter((i) => i.category === category);
});

export function getInsightCategories() {
  return insightCategories;
}

export function getInsightCategory(slug: string) {
  return insightCategories.find((c) => c.slug === slug);
}

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}
