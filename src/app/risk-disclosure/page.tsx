import { getPolicy } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

const policy = getPolicy("risk-disclosure")!;

export const metadata = buildMetadata({ ...policy.seo, path: "/risk-disclosure/" });

export default function Page() {
  return <LegalPage slug="risk-disclosure" />;
}
