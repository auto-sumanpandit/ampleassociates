import { site } from "@/content/site";
import type { FaqItem, Insight, TeamMember } from "@/types/content";
import { absoluteUrl } from "./metadata";

/**
 * JSON-LD builders. Only schema types with genuine factual support are used:
 * no ratings, reviews or financial-product markup.
 */
const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/ample-associates-icon.png"),
    description: site.positioning,
    foundingDate: String(site.foundedYear),
    areaServed: [
      { "@type": "Country", name: "Nepal" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    founder: [
      { "@type": "Person", name: "Pramod Adhikari", url: absoluteUrl("/leadership/#pramod-adhikari") },
      { "@type": "Person", name: "Samjhana Adhikari", url: absoluteUrl("/leadership/#samjhana-adhikari") },
    ],
    ...(site.legal.legalName ? { legalName: site.legal.legalName } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    contactPoint: [
      site.contact.email && { "@type": "ContactPoint", contactType: "customer service", email: site.contact.email },
    ].filter(Boolean),
    ...(site.social.length ? { sameAs: site.social.map((s) => s.url) } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: absoluteUrl("/"),
    inLanguage: "en-GB",
    publisher: { "@id": orgId },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleSchema(insight: Insight, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.publishedAt,
    dateModified: insight.updatedAt ?? insight.publishedAt,
    mainEntityOfPage: absoluteUrl(path),
    author: { "@type": "Organization", name: insight.author, url: absoluteUrl("/about/") },
    publisher: { "@id": orgId },
    image: absoluteUrl(site.defaultOgImage),
    inLanguage: "en-GB",
    citation: insight.sources.filter((s) => s.url).map((s) => s.url),
  };
}

export function personSchema(member: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl(`/leadership/#${member.slug}`),
    name: member.name,
    jobTitle: member.role,
    description: member.shortBio,
    worksFor: { "@id": orgId },
    url: absoluteUrl(`/leadership/#${member.slug}`),
    ...(member.profileLinks.length ? { sameAs: member.profileLinks.map((l) => l.url) } : {}),
  };
}
