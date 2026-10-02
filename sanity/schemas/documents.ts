import { defineArrayMember, defineField, defineType } from "sanity";
import { relationshipTypes, sectorSlugs, verificationStatus, visibility } from "./shared";

const slug = (source = "title") =>
  defineField({ name: "slug", type: "slug", options: { source }, validation: (r) => r.required() });

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "core", title: "Core", default: true },
    { name: "content", title: "Content" },
    { name: "investment", title: "Investment & risk" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "core", validation: (r) => r.required() }),
    slug(),
    defineField({ name: "shortTitle", type: "string", group: "core" }),
    defineField({
      name: "sector",
      type: "string",
      group: "core",
      options: { list: sectorSlugs },
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", type: "string", group: "core" }),
    defineField({ name: "region", type: "string", group: "core" }),
    defineField({ name: "country", type: "string", group: "core", initialValue: "Nepal" }),
    defineField({ name: "summary", type: "text", rows: 3, group: "core" }),
    defineField({
      name: "status",
      type: "string",
      group: "core",
      options: { list: ["Open for Enquiries", "Coming Soon", "Under Development", "Fully Allocated", "Completed"] },
    }),
    defineField({ name: "stage", type: "string", group: "core" }),
    defineField({ name: "stageStatus", type: "string", group: "core", options: { list: verificationStatus } }),
    defineField({ name: "projectType", type: "string", group: "core" }),
    defineField({
      name: "amplesRole",
      title: "Ample's role",
      type: "string",
      group: "core",
      options: {
        list: [
          "Developer",
          "Co-Developer",
          "Project Sponsor",
          "Investment Introducer",
          "Strategic Partner",
          "Promoter",
          "Holding Company",
          "Joint Venture Partner",
        ],
      },
    }),
    defineField({ name: "amplesRoleStatus", type: "string", group: "core", options: { list: verificationStatus } }),
    defineField({ name: "relationshipType", type: "string", group: "core", options: { list: relationshipTypes } }),
    defineField({ name: "projectOwner", type: "keyFact", group: "core" }),
    defineField({ name: "featured", type: "boolean", group: "core", initialValue: false }),
    defineField({ name: "heroImage", type: "mediaImage", group: "content" }),
    defineField({ name: "gallery", type: "array", group: "content", of: [defineArrayMember({ type: "mediaImage" })] }),
    defineField({ name: "keyFacts", type: "array", group: "content", of: [defineArrayMember({ type: "keyFact" })] }),
    defineField({ name: "overviewHeading", type: "string", group: "content" }),
    defineField({ name: "overview", type: "array", group: "content", of: [defineArrayMember({ type: "text" })] }),
    defineField({
      name: "locationDetails",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "paragraphs", type: "array", of: [defineArrayMember({ type: "text" })] }),
        defineField({ name: "points", type: "array", of: [defineArrayMember({ type: "string" })] }),
        defineField({ name: "heroCaption", type: "string" }),
        defineField({
          name: "guide",
          type: "object",
          fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "design",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "intro", type: "text" }),
        defineField({ name: "showSiteSchematic", type: "boolean" }),
      ],
    }),
    defineField({
      name: "audiences",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "points", type: "array", of: [defineArrayMember({ type: "string" })] }),
          ],
        }),
      ],
    }),
    defineField({
      name: "developmentPlan",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [defineField({ name: "title", type: "string" }), defineField({ name: "body", type: "text" })],
        }),
      ],
    }),
    defineField({
      name: "timeline",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text" }),
            defineField({
              name: "state",
              type: "string",
              options: { list: ["complete", "current", "upcoming", "unconfirmed"] },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "investmentInformation",
      type: "array",
      group: "investment",
      of: [defineArrayMember({ type: "keyFact" })],
    }),
    defineField({
      name: "risks",
      type: "array",
      group: "investment",
      of: [
        defineArrayMember({
          type: "object",
          fields: [defineField({ name: "title", type: "string" }), defineField({ name: "body", type: "text" })],
        }),
      ],
    }),
    defineField({
      name: "documents",
      type: "array",
      group: "investment",
      description: "Listing only. Restricted files must never be uploaded to a public asset URL.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text" }),
            defineField({ name: "visibility", type: "string", options: { list: visibility } }),
            defineField({ name: "status", type: "string", options: { list: verificationStatus } }),
          ],
        }),
      ],
    }),
    defineField({
      name: "updates",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "projectUpdate" }] })],
    }),
    defineField({ name: "faqs", type: "array", group: "content", of: [defineArrayMember({ type: "faqItem" })] }),
    defineField({ name: "seo", type: "seoMetadata", group: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "status" } },
});

export const projectUpdate = defineType({
  name: "projectUpdate",
  title: "Project update",
  type: "document",
  fields: [
    defineField({ name: "project", type: "reference", to: [{ type: "project" }], validation: (r) => r.required() }),
    defineField({ name: "date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
});

export const portfolioEntity = defineType({
  name: "portfolioEntity",
  title: "Portfolio entity",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    slug("name"),
    defineField({ name: "legalName", type: "string", description: "Registered or trading name, if different." }),
    defineField({
      name: "stage",
      type: "string",
      options: { list: verificationStatus },
      description: "Set only when the business isn't operating yet (e.g. Coming soon).",
    }),
    defineField({ name: "country", type: "string", options: { list: ["Nepal", "United Kingdom"] } }),
    defineField({ name: "sector", type: "string", options: { list: sectorSlugs } }),
    defineField({ name: "relationshipType", type: "string", options: { list: relationshipTypes } }),
    defineField({
      name: "relationshipStatus",
      type: "string",
      options: { list: verificationStatus },
      initialValue: "TO_BE_CONFIRMED",
      description:
        "Only set VERIFIED when documentary evidence is on file. Use CLIENT_CONFIRMED for relationships Ample has stated directly.",
    }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "sourceScale", type: "string" }),
    defineField({ name: "website", type: "url" }),
    defineField({
      name: "websiteVerified",
      type: "boolean",
      initialValue: false,
      description: "Link is only shown when checked.",
    }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "note", type: "string" }),
    defineField({ name: "featured", type: "boolean" }),
  ],
});

export const sector = defineType({
  name: "sector",
  title: "Sector",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "string", options: { list: sectorSlugs }, validation: (r) => r.required() }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "shortTitle", type: "string" }),
    defineField({ name: "accent", type: "string", options: { list: ["bronze", "forest"] } }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "intro", type: "text" }),
    defineField({ name: "ampleInvolvement", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "focusAreas",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [defineField({ name: "title", type: "string" }), defineField({ name: "body", type: "text" })],
        }),
      ],
    }),
    defineField({
      name: "considerations",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [defineField({ name: "title", type: "string" }), defineField({ name: "body", type: "text" })],
        }),
      ],
    }),
    defineField({ name: "faqs", type: "array", of: [defineArrayMember({ type: "faqItem" })] }),
    defineField({ name: "seo", type: "seoMetadata" }),
  ],
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    slug("name"),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "roleStatus", type: "string", options: { list: verificationStatus } }),
    defineField({ name: "shortBio", type: "text" }),
    defineField({ name: "biography", type: "array", of: [defineArrayMember({ type: "text" })] }),
    defineField({
      name: "education",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "qualification", type: "string" }),
            defineField({ name: "institution", type: "string" }),
            defineField({ name: "status", type: "string", options: { list: verificationStatus } }),
          ],
        }),
      ],
    }),
    defineField({ name: "expertise", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "photo",
      type: "mediaImage",
      description: "Approved photograph of the real person only — never AI-generated.",
    }),
    defineField({
      name: "profileLinks",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [defineField({ name: "label", type: "string" }), defineField({ name: "url", type: "url" })],
        }),
      ],
    }),
  ],
});

export const insight = defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slug(),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["investment-guides", "market-insights", "project-updates", "company-updates"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "author", type: "string", initialValue: "Ample Associates Editorial" }),
    defineField({ name: "publishedAt", type: "date", validation: (r) => r.required() }),
    defineField({ name: "updatedAt", type: "date" }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "heading", type: "string" }),
            defineField({ name: "paragraphs", type: "array", of: [defineArrayMember({ type: "text" })] }),
          ],
        }),
      ],
    }),
    defineField({
      name: "sources",
      type: "array",
      of: [defineArrayMember({ type: "sourceReference" })],
      description: "Every statistic must have a source with reference year and last-verified date.",
    }),
    defineField({ name: "relatedProjects", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "seo", type: "seoMetadata" }),
  ],
});

export const faq = defineType({
  name: "faq",
  title: "FAQ (site-wide)",
  type: "document",
  fields: [
    defineField({
      name: "group",
      type: "string",
      options: { list: ["about-ample", "investing", "overseas", "information"] },
    }),
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", validation: (r) => r.required() }),
    defineField({ name: "order", type: "number" }),
  ],
});

export const policy = defineType({
  name: "policy",
  title: "Policy / legal page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    slug(),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "lastUpdated", type: "date" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: verificationStatus },
      description: "VERIFIED only after legal review.",
    }),
    defineField({
      name: "sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "heading", type: "string" }),
            defineField({ name: "paragraphs", type: "array", of: [defineArrayMember({ type: "text" })] }),
            defineField({ name: "list", type: "array", of: [defineArrayMember({ type: "string" })] }),
          ],
        }),
      ],
    }),
    defineField({ name: "seo", type: "seoMetadata" }),
  ],
});

export const governanceDocument = defineType({
  name: "governanceDocument",
  title: "Governance disclosure",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "body", type: "text" }),
    defineField({ name: "status", type: "string", options: { list: verificationStatus } }),
    defineField({ name: "order", type: "number" }),
  ],
});

export const office = defineType({
  name: "office",
  title: "Office / location",
  type: "document",
  fields: [
    defineField({ name: "city", type: "string" }),
    defineField({ name: "country", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "address", type: "text", description: "Leave empty until confirmed." }),
    defineField({ name: "status", type: "string", options: { list: verificationStatus } }),
  ],
});
