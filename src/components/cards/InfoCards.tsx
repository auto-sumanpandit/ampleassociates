import type { DocumentItem, RiskItem, SourceReference } from "@/types/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { VisibilityBadge } from "@/components/ui/StatusBadge";
import { SourceCitation } from "@/components/ui/SourceCitation";

const microLabel = "text-[0.6875rem] font-semibold tracking-[0.12em] uppercase";

export function RiskCard({ risk, index }: { risk: RiskItem; index: number }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className={`${microLabel} text-ink-soft`}>Risk {String(index + 1).padStart(2, "0")}</span>
        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-amber-pale text-amber-dark">
          <Icon name="alert" className="size-5" />
        </span>
      </div>
      <h3 className="mt-5 text-lg leading-snug font-semibold text-ink">{risk.title}</h3>
      <p className="mt-2 leading-relaxed text-ink-muted">{risk.body}</p>
    </article>
  );
}

export function DocumentCard({ doc }: { doc: DocumentItem }) {
  const icon: IconName = doc.visibility === "QUALIFIED_ACCESS" ? "lock" : "document";
  return (
    <article className="flex h-full gap-5 rounded-2xl border border-line bg-white p-6 md:p-7">
      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-mist-200 text-brand-600">
        <Icon name={icon} className="size-5" />
      </span>
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="leading-snug font-semibold text-ink">{doc.title}</h3>
        <p className="text-[0.9375rem] leading-relaxed text-ink-muted">{doc.description}</p>
        <div className="mt-auto pt-2">
          <VisibilityBadge visibility={doc.visibility} />
        </div>
      </div>
    </article>
  );
}

/**
 * A sourced statistic as an institutional metric card: royal-blue marker line,
 * light-weight value, context and full citation. Never used for unsourced numbers.
 */
export function StatCard({ value, label, source }: { value: string; label: string; source: SourceReference }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-lift md:p-8">
      <span aria-hidden className="h-1 w-12 rounded-full bg-brand-600" />
      <p className="mt-6 text-[2.5rem] leading-none font-light tracking-[-0.03em] text-ink tabular-nums md:text-[3rem]">
        {value}
      </p>
      <figcaption className="mt-4 flex flex-1 flex-col">
        <p className="flex-1 leading-relaxed text-ink-muted">{label}</p>
        <SourceCitation source={source} className="mt-6 border-t border-line pt-5" />
      </figcaption>
    </figure>
  );
}

export function FeatureItem({ icon, title, body }: { icon: IconName; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-mist-200 text-brand-600">
        <Icon name={icon} className="size-5" />
      </span>
      <div>
        <h3 className="font-semibold text-ink">{title}</h3>
        <p className="mt-1.5 leading-relaxed text-ink-muted">{body}</p>
      </div>
    </div>
  );
}
