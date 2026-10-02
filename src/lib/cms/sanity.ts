import "server-only";

/**
 * Minimal Sanity client using the HTTP query API (no SDK dependency).
 * Enabled when SANITY_PROJECT_ID and SANITY_DATASET are set.
 * Documents are expected to follow the schemas in /sanity/schemas, whose
 * field names match src/types/content.ts.
 */
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = process.env.SANITY_API_VERSION ?? "2025-02-19";
const token = process.env.SANITY_READ_TOKEN;

export const sanityEnabled = Boolean(projectId);

export async function sanityQuery<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  if (!projectId) throw new Error("Sanity is not configured");
  const url = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    next: { revalidate: 300, tags: ["sanity"] },
  });
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`);
  const json = (await res.json()) as { result: T };
  return json.result;
}
