import type { SourceReference } from "@/types/content";
import { cn } from "@/lib/cn";

function formatDate(iso?: string) {
  if (!iso) return undefined;
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Displays SOURCE / REFERENCE YEAR / LAST VERIFIED for an external fact. */
export function SourceCitation({ source, className }: { source: SourceReference; className?: string }) {
  return (
    <dl
      className={cn(
        "grid gap-x-4 gap-y-1 text-[0.8125rem] leading-5 text-ink-muted sm:grid-cols-[auto_1fr] sm:items-baseline",
        className,
      )}
    >
      <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-soft uppercase">Source</dt>
      <dd>
        {source.url ? (
          <a
            href={source.url}
            className="font-medium text-brand-600 underline decoration-brand-600/30 underline-offset-2 hover:decoration-current"
            rel="noopener"
            target="_blank"
          >
            {source.publisher}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          source.publisher
        )}
      </dd>
      {source.referenceYear && (
        <>
          <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-soft uppercase">Reference year</dt>
          <dd>{source.referenceYear}</dd>
        </>
      )}
      {source.lastVerified && (
        <>
          <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-soft uppercase">Last verified</dt>
          <dd>
            <time dateTime={source.lastVerified}>{formatDate(source.lastVerified)}</time>
          </dd>
        </>
      )}
    </dl>
  );
}

export { formatDate };
