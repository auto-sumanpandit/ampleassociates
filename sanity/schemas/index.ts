import { faqItem, keyFact, mediaImage, seoMetadata, sourceReference } from "./shared";
import {
  faq,
  governanceDocument,
  insight,
  office,
  policy,
  portfolioEntity,
  project,
  projectUpdate,
  sector,
  teamMember,
} from "./documents";

export const schemaTypes = [
  // objects
  seoMetadata,
  keyFact,
  mediaImage,
  faqItem,
  sourceReference,
  // documents
  project,
  projectUpdate,
  portfolioEntity,
  sector,
  teamMember,
  insight,
  faq,
  policy,
  governanceDocument,
  office,
];
