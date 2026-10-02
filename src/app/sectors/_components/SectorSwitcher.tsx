import Link from "next/link";
import type { Sector, SectorSlug } from "@/types/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** One icon per sector, matching the homepage bento. */
export const sectorIcon: Record<SectorSlug, IconName> = {
  "education-consultancy": "book",
  college: "building",
  energy: "bolt",
  "property-development": "home",
  "financial-channel": "globe",
};

/** Large lavender icon tile used as the sector hero aside. */
export function SectorIconTile({ slug }: { slug: SectorSlug }) {
  return (
    <div aria-hidden className="hidden lg:flex lg:justify-end">
      <span className="relative inline-flex size-36 items-center justify-center overflow-hidden rounded-3xl bg-mist-200 text-brand-600 shadow-lift">
        <span className="absolute -right-6 -bottom-6 size-24 rounded-full bg-brand-600/10 blur-xl" />
        <Icon name={sectorIcon[slug]} className="relative size-16" />
      </span>
    </div>
  );
}

/** Horizontal pill switcher linking every sector, in the client's order. The current sector is filled. */
export function SectorSwitcher({ sectors, current }: { sectors: Sector[]; current: SectorSlug }) {
  return (
    <nav aria-label="Sectors" className="bg-mist-100 pb-12 md:pb-16">
      <ul className="container-page flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1">
        {sectors.map((s) => {
          const active = s.slug === current;
          return (
            <li key={s.slug} className="shrink-0">
              <Link
                href={`/sectors/${s.slug}/`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-600 text-white"
                    : "border border-line bg-white text-ink hover:border-brand-600/40 hover:text-brand-600",
                )}
              >
                <Icon name={sectorIcon[s.slug]} className={cn("size-4", active ? "text-white" : "text-brand-600")} />
                {s.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
