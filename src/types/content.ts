/**
 * Content model shared by the local content store and the Sanity adapter.
 * Field names mirror the Sanity schemas in /sanity/schemas so either source
 * can back the site without page changes.
 */

/** Governance status language used across the site (see docs/content-verification-needed.md). */
export type VerificationStatus =
  | "VERIFIED"
  /** Stated directly by Ample (the client), without separate documentary evidence on file. */
  | "CLIENT_CONFIRMED"
  | "AVAILABLE"
  | "AVAILABLE_ON_REQUEST"
  | "PROJECT_SPECIFIC"
  | "IN_DEVELOPMENT"
  | "TO_BE_CONFIRMED"
  | "COMING_SOON";

export type Visibility = "PUBLIC" | "AVAILABLE_ON_REQUEST" | "QUALIFIED_ACCESS" | "COMING_SOON";

export type OpportunityStatus =
  "Open for Enquiries" | "Coming Soon" | "Under Development" | "Fully Allocated" | "Completed";

export type RelationshipType =
  | "Ample Associates Company"
  | "Founder"
  | "Promoter"
  | "Associate Project"
  | "Investment"
  | "Associated Business"
  | "Strategic Partner"
  | "Joint Venture";

export type AmpleRole =
  | "Developer"
  | "Co-Developer"
  | "Project Sponsor"
  | "Investment Introducer"
  | "Strategic Partner"
  | "Promoter"
  | "Holding Company"
  | "Joint Venture Partner";

/** Sectors are the client's portfolio groups, in the client's order. */
export type SectorSlug = "education-consultancy" | "college" | "energy" | "property-development" | "financial-channel";

export type ImageKind =
  "Actual Project Photo" | "Project Image" | "Architectural Render" | "Concept Image" | "Location Image" | "Portrait";

export interface SeoFields {
  title: string;
  description: string;
  /** Optional OG override; falls back to title/description. */
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
}

export interface MediaImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: ImageKind;
  credit?: string;
  creditUrl?: string;
}

/** A fact that may or may not be published yet. `value` is only rendered when status allows it. */
export interface KeyFact {
  label: string;
  value: string;
  status: VerificationStatus;
  note?: string;
}

export interface FaqItem {
  question: string;
  /** Plain-text answer (also used in FAQPage JSON-LD). */
  answer: string;
}

export interface SourceReference {
  label: string;
  publisher: string;
  url?: string;
  referenceYear?: string;
  lastVerified?: string;
}

export interface RiskItem {
  title: string;
  body: string;
}

export interface DocumentItem {
  title: string;
  description: string;
  visibility: Visibility;
  status: VerificationStatus;
}

export interface TimelineStage {
  title: string;
  description: string;
  state: "complete" | "current" | "upcoming" | "unconfirmed";
}

export interface ProjectUpdate {
  date: string;
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  sector: SectorSlug;
  location: string;
  region: string;
  country: string;
  summary: string;
  status: OpportunityStatus;
  stage: string;
  stageStatus: VerificationStatus;
  projectType: string;
  amplesRole: AmpleRole;
  amplesRoleStatus: VerificationStatus;
  relationshipType: RelationshipType;
  projectOwner: KeyFact;
  heroImage?: MediaImage;
  gallery: MediaImage[];
  keyFacts: KeyFact[];
  overview: string[];
  overviewHeading: string;
  locationDetails: {
    heading: string;
    paragraphs: string[];
    points: string[];
    heroCaption?: string;
    /** Related guide for the location, if any. */
    guide?: { label: string; href: string };
  };
  design: { heading: string; intro: string; showSiteSchematic?: boolean };
  audiences: { title: string; points: string[] }[];
  developmentPlan: { title: string; body: string }[];
  timeline: TimelineStage[];
  investmentInformation: KeyFact[];
  risks: RiskItem[];
  documents: DocumentItem[];
  updates: ProjectUpdate[];
  faqs: FaqItem[];
  seo: SeoFields;
  featured: boolean;
}

/** Portfolio groups and sectors are the same list. */
export type PortfolioGroup = SectorSlug;

export interface PortfolioEntity {
  slug: string;
  name: string;
  /** Registered or trading name, when it differs from the display name. */
  legalName?: string;
  /** Stage of the business or project, shown when it isn't yet operating (e.g. COMING_SOON). */
  stage?: VerificationStatus;
  country: "Nepal" | "United Kingdom";
  sector: SectorSlug;
  /** Relationship as described in the source document. */
  relationshipType: RelationshipType | null;
  relationshipStatus: VerificationStatus;
  description: string;
  /** Capacity or scale stated in the source, if any. */
  sourceScale?: string;
  website?: string;
  websiteVerified?: boolean;
  /** Official logo supplied by the company. Until supplied, a designed wordmark is shown. */
  logo?: { src: string; width: number; height: number };
  note?: string;
  /** Concept image or photograph shown at the top of the company card. */
  image?: MediaImage;
  /** Caption for `image`, e.g. "Design concept for ...". */
  imageCaption?: string;
  /** Branch offices of one company (shown instead of the single country chip). */
  branches?: { city: string; country: "Nepal" | "United Kingdom" }[];
  featured: boolean;
}

export interface Sector {
  slug: SectorSlug;
  title: string;
  shortTitle: string;
  summary: string;
  intro: string;
  ampleInvolvement: string[];
  focusAreas: { title: string; body: string }[];
  considerations: { title: string; body: string }[];
  faqs: FaqItem[];
  seo: SeoFields;
  accent: "bronze" | "forest";
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  roleStatus: VerificationStatus;
  /** One-line summary for search engines (Person schema); not shown on the page. */
  shortBio: string;
  biography: string[];
  education: { qualification: string; institution: string; status: VerificationStatus }[];
  expertise: string[];
  photo?: MediaImage;
  profileLinks: { label: string; url: string }[];
}

export type InsightCategorySlug = "investment-guides" | "market-insights" | "project-updates" | "company-updates";

export interface InsightCategory {
  slug: InsightCategorySlug;
  title: string;
  description: string;
}

export interface Insight {
  slug: string;
  title: string;
  category: InsightCategorySlug;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  /** Location photograph shown on the card and article header (credited where it appears). */
  cover?: MediaImage;
  body: { heading?: string; paragraphs: string[] }[];
  sources: SourceReference[];
  relatedProjects: string[];
  seo: SeoFields;
}

export interface PolicySection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Policy {
  slug: string;
  title: string;
  summary: string;
  lastUpdated: string;
  status: VerificationStatus;
  sections: PolicySection[];
  seo: SeoFields;
}

export interface Office {
  city: string;
  country: string;
  description: string;
  address: string | null;
  status: VerificationStatus;
}
