import { defineField, defineType } from "sanity";

/** Governance status language — must match VerificationStatus in src/types/content.ts. */
export const verificationStatus = [
  { title: "Verified", value: "VERIFIED" },
  { title: "Confirmed by Ample", value: "CLIENT_CONFIRMED" },
  { title: "Available", value: "AVAILABLE" },
  { title: "Available on request", value: "AVAILABLE_ON_REQUEST" },
  { title: "Project-specific", value: "PROJECT_SPECIFIC" },
  { title: "In development", value: "IN_DEVELOPMENT" },
  { title: "To be confirmed", value: "TO_BE_CONFIRMED" },
  { title: "Coming soon", value: "COMING_SOON" },
];

export const visibility = [
  { title: "Public", value: "PUBLIC" },
  { title: "Available on request", value: "AVAILABLE_ON_REQUEST" },
  { title: "Qualified access", value: "QUALIFIED_ACCESS" },
  { title: "Coming soon", value: "COMING_SOON" },
];

export const relationshipTypes = [
  "Ample Associates Company",
  "Founder",
  "Promoter",
  "Investment",
  "Associated Business",
  "Strategic Partner",
  "Joint Venture",
];

/** Sectors are the client's portfolio groups, in the client's order. */
export const sectorSlugs = [
  { title: "Education Consultancy", value: "education-consultancy" },
  { title: "College", value: "college" },
  { title: "Energy Sector", value: "energy" },
  { title: "Property Development", value: "property-development" },
  { title: "Financial Channel", value: "financial-channel" },
];

export const seoMetadata = defineType({
  name: "seoMetadata",
  title: "SEO metadata",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required().max(65).warning("Keep titles under ~60–65 characters"),
    }),
    defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.required().max(160) }),
    defineField({ name: "ogTitle", type: "string" }),
    defineField({ name: "ogDescription", type: "text", rows: 2 }),
    defineField({ name: "ogImage", type: "string", description: "Path or URL, 1200×630" }),
    defineField({ name: "noindex", type: "boolean", initialValue: false }),
  ],
});

export const keyFact = defineType({
  name: "keyFact",
  title: "Key fact",
  type: "object",
  description: "Unverified facts are shown by status only — the value is not rendered.",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "status",
      type: "string",
      options: { list: verificationStatus },
      initialValue: "TO_BE_CONFIRMED",
    }),
    defineField({ name: "note", type: "string" }),
  ],
  preview: { select: { title: "label", subtitle: "status" } },
});

export const mediaImage = defineType({
  name: "mediaImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({ name: "src", type: "string", validation: (r) => r.required() }),
    defineField({ name: "alt", type: "string", validation: (r) => r.required() }),
    defineField({ name: "width", type: "number" }),
    defineField({ name: "height", type: "number" }),
    defineField({
      name: "kind",
      type: "string",
      description: "Never label a stock or concept image as an actual project photo.",
      options: { list: ["Actual Project Photo", "Architectural Render", "Concept Image", "Location Image"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "credit", type: "string" }),
    defineField({ name: "creditUrl", type: "url" }),
  ],
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", validation: (r) => r.required() }),
  ],
});

export const sourceReference = defineType({
  name: "sourceReference",
  title: "Source reference",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "publisher", type: "string", validation: (r) => r.required() }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "referenceYear", type: "string" }),
    defineField({ name: "lastVerified", type: "date", validation: (r) => r.required() }),
  ],
});
