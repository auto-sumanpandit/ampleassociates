import { getPolicy } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

const policy = getPolicy("cookie-policy")!;

export const metadata = buildMetadata({ ...policy.seo, path: "/cookie-policy/" });

export default function Page() {
  return <LegalPage slug="cookie-policy" />;
}
