import type { Metadata } from "next";
import { site } from "@/content/site";
import type { SeoFields } from "@/types/content";

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

interface BuildMetadataInput extends SeoFields {
  /** Canonical path with trailing slash, e.g. "/about/". */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/** Builds complete page metadata: title, description, canonical, Open Graph and Twitter. */
export function buildMetadata({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  noindex,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const image = ogImage ?? site.defaultOgImage;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [{ url: image, width: 1200, height: 630, alt: site.name }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [image],
    },
  };
}
