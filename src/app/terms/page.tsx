import { getPolicy } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

const policy = getPolicy("terms")!;

export const metadata = buildMetadata({ ...policy.seo, path: "/terms/" });

export default function Page() {
  return <LegalPage slug="terms" />;
}
