import { getPolicy } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

const policy = getPolicy("privacy-policy")!;

export const metadata = buildMetadata({ ...policy.seo, path: "/privacy-policy/" });

export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}
