import type { KeyFact } from "@/types/content";
import { VerificationBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";

const withheld = new Set(["TO_BE_CONFIRMED", "AVAILABLE_ON_REQUEST", "COMING_SOON"]);

/**
 * Project snapshot / fact register as institutional metric cards: royal-blue
 * marker line, micro-label, light-weight value. Unverified values are shown as
 * their status badge, never as a number.
 */
export function KeyFactGrid({ facts, columns = 4 }: { facts: KeyFact[]; columns?: 2 | 3 | 4 }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
      )}
    >
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-lift md:p-7"
        >
          <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-soft uppercase">
            {/* Marker line lives inside the <dt> so the <dl> stays valid. */}
            <span
              aria-hidden
              className="mb-5 block h-1 w-10 rounded-full bg-brand-600 transition-all duration-500 group-hover:w-16"
            />
            {fact.label}
          </dt>
          <dd className="mt-2.5 flex flex-col items-start gap-2.5">
            {withheld.has(fact.status) ? (
              <VerificationBadge status={fact.status} />
            ) : (
              <>
                <span className="text-[1.375rem] leading-snug font-light tracking-[-0.015em] text-ink">
                  {fact.value}
                </span>
                {fact.status !== "VERIFIED" && <VerificationBadge status={fact.status} />}
              </>
            )}
            {fact.note && <span className="text-sm leading-snug text-ink-muted">{fact.note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
