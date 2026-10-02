import type { OpportunityStatus, VerificationStatus, Visibility } from "@/types/content";
import { cn } from "@/lib/cn";

const verificationLabels: Record<VerificationStatus, string> = {
  VERIFIED: "Verified",
  CLIENT_CONFIRMED: "Confirmed by Ample",
  AVAILABLE: "Available",
  AVAILABLE_ON_REQUEST: "Available on request",
  PROJECT_SPECIFIC: "Project-specific",
  IN_DEVELOPMENT: "In development",
  TO_BE_CONFIRMED: "To be confirmed",
  COMING_SOON: "Coming soon",
};

const verificationStyles: Record<VerificationStatus, string> = {
  VERIFIED: "border-forest-600/30 bg-forest-50 text-forest-800",
  CLIENT_CONFIRMED: "border-line bg-white text-ink-muted",
  AVAILABLE: "border-forest-600/30 bg-forest-50 text-forest-800",
  AVAILABLE_ON_REQUEST: "border-brand-600/20 bg-mist-200 text-brand-800",
  PROJECT_SPECIFIC: "border-line-strong bg-white text-navy-800",
  IN_DEVELOPMENT: "border-amber-dark/20 bg-amber-pale text-amber-dark",
  TO_BE_CONFIRMED: "border-amber-dark/20 bg-amber-pale text-amber-dark",
  COMING_SOON: "border-line-strong bg-white text-ink-muted",
};

export function verificationLabel(status: VerificationStatus) {
  return verificationLabels[status];
}

const base =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[0.625rem] font-semibold leading-5 tracking-[0.1em] uppercase";

export function VerificationBadge({ status, className }: { status: VerificationStatus; className?: string }) {
  return <span className={cn(base, verificationStyles[status], className)}>{verificationLabels[status]}</span>;
}

const opportunityStyles: Record<OpportunityStatus, string> = {
  "Open for Enquiries": "border-forest-600/30 bg-forest-50 text-forest-800",
  "Coming Soon": "border-line-strong bg-white text-navy-800",
  "Under Development": "border-brand-600/30 bg-mist-100 text-brand-800",
  "Fully Allocated": "border-line-strong bg-mist-100 text-ink-muted",
  Completed: "border-line-strong bg-mist-100 text-ink-muted",
};

export function OpportunityBadge({ status, className }: { status: OpportunityStatus; className?: string }) {
  return (
    <span className={cn(base, opportunityStyles[status], className)}>
      {status === "Open for Enquiries" && <span aria-hidden className="size-1.5 rounded-full bg-forest-600" />}
      {status}
    </span>
  );
}

const visibilityLabels: Record<Visibility, string> = {
  PUBLIC: "Public",
  AVAILABLE_ON_REQUEST: "Available on request",
  QUALIFIED_ACCESS: "Qualified access",
  COMING_SOON: "Coming soon",
};

export function VisibilityBadge({ visibility }: { visibility: Visibility }) {
  const style =
    visibility === "PUBLIC"
      ? verificationStyles.AVAILABLE
      : visibility === "AVAILABLE_ON_REQUEST"
        ? verificationStyles.AVAILABLE_ON_REQUEST
        : visibility === "QUALIFIED_ACCESS"
          ? "border-brand-600/30 bg-brand-600 text-ivory"
          : verificationStyles.COMING_SOON;
  return <span className={cn(base, style)}>{visibilityLabels[visibility]}</span>;
}
