import { getPolicy } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

const policy = getPolicy("investment-disclaimer")!;

export const metadata = buildMetadata({ ...policy.seo, path: "/investment-disclaimer/" });

export default function Page() {
  return <LegalPage slug="investment-disclaimer" />;
}
