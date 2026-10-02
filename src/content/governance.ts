import type { VerificationStatus } from "@/types/content";

export interface GovernanceItem {
  title: string;
  body: string;
  status: VerificationStatus;
}

/** What visitors can expect to know about Ample, and the current status of each item. */
export const governanceDisclosures: GovernanceItem[] = [
  {
    title: "Legal entity",
    body: "The legal name, registration number and registered office of the entity trading as Ample Associates.",
    status: "TO_BE_CONFIRMED",
  },
  {
    title: "Directors",
    body: "Pramod Adhikari and Samjhana Adhikari are directors of Ample Associates. Their formal appointments will be listed with the company registration details once confirmed.",
    status: "TO_BE_CONFIRMED",
  },
  {
    title: "Ownership structure",
    body: "Who owns Ample Associates and how it relates to the other Ample Associates companies.",
    status: "TO_BE_CONFIRMED",
  },
  {
    title: "Portfolio relationships",
    body: "Each business on the Portfolio page is labelled by its actual relationship to Ample: Ample Associates company, founder, promoter, investment or associated business.",
    status: "IN_DEVELOPMENT",
  },
  {
    title: "Ample's role in each project",
    body: "Whether Ample is developer, co-developer, sponsor, promoter, partner or introducer is stated on every project page.",
    status: "PROJECT_SPECIFIC",
  },
  {
    title: "Project company and investment structure",
    body: "The legal vehicle, rights and obligations for each opportunity, shared before any agreement.",
    status: "PROJECT_SPECIFIC",
  },
  {
    title: "Professional advisers",
    body: "Legal, technical and accounting advisers engaged on a project will be named where they have agreed to be named.",
    status: "PROJECT_SPECIFIC",
  },
  {
    title: "Financial reporting",
    body: "Reporting arrangements for each project, including how costs and progress are reported to participants.",
    status: "PROJECT_SPECIFIC",
  },
];

export const governancePrinciples = [
  {
    title: "Say what Ample's role is",
    body: "Every project states whether Ample is the developer, a partner, a promoter or an introducer. A project Ample is only associated with is never presented as its own.",
  },
  {
    title: "Separate facts from estimates",
    body: "Confirmed figures, estimates and forward-looking statements are labelled differently. Unconfirmed numbers are not published.",
  },
  {
    title: "Put risk next to opportunity",
    body: "Each project page lists its main risks on the same page as the opportunity, not in a separate document few people read.",
  },
  {
    title: "Disclose relationships",
    body: "Where Ample, its directors or related parties have an interest in a project, land or contractor, that interest should be disclosed to participants.",
  },
  {
    title: "Document before inviting",
    body: "Structure, ownership and key agreements are prepared before anyone is invited to commit money.",
  },
  {
    title: "Report with dates",
    body: "Project updates carry a date and describe what actually happened, including delays.",
  },
];

export const decisionFramework = [
  {
    title: "Project approval",
    body: "Whether a project moves from assessment to structuring, based on feasibility and due-diligence findings.",
  },
  {
    title: "Material changes",
    body: "Changes to budget, design, timeline or structure that affect participants, and how participants are informed or consulted.",
  },
  {
    title: "Related-party matters",
    body: "Contracts or transactions involving parties connected to Ample, which should be disclosed and documented.",
  },
  {
    title: "Completion and exit",
    body: "Sale, handover, refinancing or distribution, following the terms of the project agreements.",
  },
];

export const complianceNotes = [
  {
    title: "Know your participant",
    body: "Before anyone participates in a project, identity and source-of-funds checks appropriate to the project and jurisdiction will apply. The specific requirements depend on applicable law.",
    status: "PROJECT_SPECIFIC" as VerificationStatus,
  },
  {
    title: "Complaints",
    body: "If you are unhappy with how an enquiry or project has been handled, contact us using the details on the Contact page and mark your message 'Complaint'. A formal complaints procedure will be published with the confirmed contact details.",
    status: "IN_DEVELOPMENT" as VerificationStatus,
  },
  {
    title: "Confidentiality",
    body: "Information you share with us is used only to respond to you and is not sold or shared for marketing. Project documents shared with you may be confidential.",
    status: "AVAILABLE" as VerificationStatus,
  },
];
