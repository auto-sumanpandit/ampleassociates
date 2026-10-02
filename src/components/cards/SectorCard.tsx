import Link from "next/link";
import type { Sector, SectorSlug } from "@/types/content";
import { portfolioGroups } from "@/content/portfolio";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export const sectorIcons: Record<SectorSlug, IconName> = {
  "education-consultancy": "book",
  college: "building",
  energy: "bolt",
  "property-development": "home",
  "financial-channel": "globe",
};

/** "Sector 01".."Sector 05", from the client's sector order. */
function sectorNumber(slug: SectorSlug, index?: number) {
  const i = index ?? portfolioGroups.findIndex((g) => g.slug === slug);
  return i >= 0 ? `Sector ${String(i + 1).padStart(2, "0")}` : null;
}

/**
 * Sector card: icon tile, "Sector 0N" micro-label, title, summary and an arrow
 * disc that turns on hover. The whole card links to the sector page.
 */
export function SectorCard({
  sector,
  index,
  tone = "light",
}: {
  sector: Sector;
  /** Zero-based position; defaults to the sector's place in the client's order. */
  index?: number;
  /** Use "dark" on navy sections. */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const number = sectorNumber(sector.slug, index);
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 md:p-8",
        dark
          ? "border border-white/10 bg-navy-950 text-white"
          : "border border-line bg-white shadow-lift hover:shadow-dossier",
      )}
    >
      <span
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-xl transition-colors duration-300",
          dark
            ? "bg-brand-600 text-white"
            : "bg-mist-200 text-brand-600 group-hover:bg-brand-600 group-hover:text-white",
        )}
      >
        <Icon name={sectorIcons[sector.slug]} className="size-6" />
      </span>
      {number && (
        <p
          className={cn(
            "mt-6 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase",
            dark ? "text-sky-200" : "text-ink-soft",
          )}
        >
          {number}
        </p>
      )}
      <h3
        className={cn(
          "text-[1.375rem] leading-tight font-semibold tracking-[-0.01em]",
          number ? "mt-1.5" : "mt-6",
          dark ? "text-white" : "text-ink",
        )}
      >
        <Link href={`/sectors/${sector.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {sector.title}
        </Link>
      </h3>
      <p className={cn("mt-3 flex-1 leading-relaxed", dark ? "text-slate-300" : "text-ink-muted")}>{sector.summary}</p>
      <div className="mt-8 flex justify-end">
        <span
          aria-hidden
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45",
            dark
              ? "bg-white/10 text-white group-hover:bg-brand-600"
              : "bg-mist-200 text-ink group-hover:bg-brand-600 group-hover:text-white",
          )}
        >
          <Icon name="arrowUpRight" className="size-5" />
        </span>
      </div>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl ring-offset-2 group-has-[a:focus-visible]:ring-2",
          dark ? "ring-brand-200 ring-offset-navy-950" : "ring-brand-600",
        )}
      />
    </article>
  );
}
