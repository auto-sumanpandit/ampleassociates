import Image from "next/image";
import Link from "next/link";
import type { MediaImage, PortfolioGroup } from "@/types/content";
import { media } from "@/content/media";
import { cn } from "@/lib/cn";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPortfolio, getSectors } from "@/lib/cms";
import { PageHero } from "@/components/sections/PageHero";
import { InvestorCTA } from "@/components/sections/InvestorCTA";
import { GhostNumber, SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { sectorIcon } from "./_components/SectorSwitcher";

export const metadata = buildMetadata({
  title: "Sectors | Education, Energy & Property in the UK and Nepal",
  description:
    "Ample Associates' five sectors: Education Consultancy, College, Energy Sector, Property Development and Financial Channel, and what Ample does in each.",
  path: "/sectors/",
});

/** Bento cell and surface per sector, in the client's order (7+5, 5+7, then a full-width row). */
const bento: Record<
  PortfolioGroup,
  { cell: string; tone: "navy" | "white" | "lavender" | "royal" | "photo"; image?: MediaImage }
> = {
  "education-consultancy": { cell: "lg:col-span-7", tone: "navy" },
  college: { cell: "lg:col-span-5", tone: "white" },
  energy: { cell: "lg:col-span-5", tone: "photo", image: media.himalayanSolarSite },
  "property-development": { cell: "lg:col-span-7", tone: "photo", image: media.lakesideHotelConcept },
  "financial-channel": { cell: "md:col-span-2 lg:col-span-12", tone: "royal" },
};

const nextSteps = [
  { href: "/portfolio/", label: "See every company in the portfolio" },
  { href: "/investors/", label: "How investing with Ample Associates works" },
  { href: "/invest-nepal/", label: "Why Nepal, and the risks to consider" },
  { href: "/contact/", label: "Propose a project in one of these sectors" },
];

export default async function SectorsPage() {
  const [sectors, portfolio] = await Promise.all([getSectors(), getPortfolio()]);

  return (
    <>
      <PageHero
        title={
          <>
            Focused on sectors that shape <strong>long-term development</strong>
          </>
        }
        intro="Our five sectors match our portfolio: Education Consultancy, College, Energy Sector, Property Development and Financial Channel. Each adds experience that the others can use."
        breadcrumbs={[{ name: "Sectors", path: "/sectors/" }]}
      />

      {/* 01 The five sectors */}
      <section className="relative py-24 md:py-32">
        <GhostNumber n="01" />
        <div className="container-page relative">
          <SectionHeading
            label="Our sectors"
            title={
              <>
                Five sectors, <span className="font-light">one Ample Associates.</span>
              </>
            }
            action={<ArrowLink href="/portfolio/">View the full portfolio</ArrowLink>}
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            {sectors.map((s, i) => {
              const companies = portfolio.filter((p) => p.sector === s.slug);
              const look = bento[s.slug];
              const photo = look.tone === "photo" ? look.image : undefined;
              const light = look.tone === "white" || look.tone === "lavender";
              return (
                <li key={s.slug} className={cn("reveal", look.cell)}>
                  <Link
                    href={`/sectors/${s.slug}/`}
                    className={cn(
                      "group relative isolate flex h-full min-h-80 flex-col gap-6 overflow-hidden rounded-2xl p-7 shadow-lift transition-transform duration-300 hover:-translate-y-1 md:p-8",
                      look.tone === "navy" && "bg-navy-950 text-white",
                      look.tone === "white" && "border border-line bg-white text-ink",
                      look.tone === "lavender" && "bg-mist-300 text-ink",
                      look.tone === "royal" && "bg-brand-600 text-white",
                      look.tone === "photo" && "bg-navy-950 text-white",
                    )}
                  >
                    {photo && (
                      <>
                        <Image
                          src={photo.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="-z-20 object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/70 to-navy-950/20"
                        />
                      </>
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={cn(
                          "inline-flex size-12 shrink-0 items-center justify-center rounded-xl",
                          light
                            ? "bg-white text-brand-600"
                            : look.tone === "royal"
                              ? "bg-white text-brand-600"
                              : "bg-brand-600 text-white",
                          look.tone === "white" && "bg-mist-200",
                        )}
                      >
                        <Icon name={sectorIcon[s.slug]} className="size-6" />
                      </span>
                      {photo && (
                        <span className="rounded-full bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase backdrop-blur-md">
                          {photo.kind}
                        </span>
                      )}
                    </div>
                    <div className="mt-auto">
                      <p
                        className={cn(
                          "text-[0.6875rem] font-semibold tracking-[0.12em] uppercase",
                          light ? "text-brand-600" : look.tone === "royal" ? "text-brand-100" : "text-sky-200",
                        )}
                      >
                        Sector {String(i + 1).padStart(2, "0")} · {companies.length}{" "}
                        {companies.length === 1 ? "company" : "companies"}
                      </p>
                      <h3 className="mt-1 text-[1.625rem] leading-tight font-semibold tracking-[-0.02em] md:text-heading-sm">
                        {s.title}
                      </h3>
                      <p className={cn("mt-3 max-w-xl leading-relaxed", light ? "text-ink-muted" : "text-slate-200")}>
                        {s.summary}
                      </p>
                    </div>
                    <div className="flex items-end justify-between gap-4">
                      <ul className="flex flex-wrap gap-2">
                        {companies.map((c) => (
                          <li
                            key={c.slug}
                            className={cn(
                              "rounded-lg px-3 py-1 text-xs font-medium",
                              light ? "bg-white text-ink" : "bg-white/10 text-white backdrop-blur-sm",
                              look.tone === "white" && "bg-mist-200",
                            )}
                          >
                            {c.name}
                          </li>
                        ))}
                      </ul>
                      <span
                        aria-hidden
                        className={cn(
                          "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45",
                          light
                            ? "bg-white text-ink group-hover:bg-brand-600 group-hover:text-white"
                            : look.tone === "royal"
                              ? "bg-white text-brand-600"
                              : "bg-white/15 text-white group-hover:bg-brand-600",
                        )}
                      >
                        <Icon name="arrowUpRight" className="size-5" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
          <p className="mt-5 text-xs text-ink-soft">
            Energy panel: Himalayan Solar Power, Sitalpati, Khandbari. Property panel: design concept for the Lakeside
            hotel development.
          </p>
        </div>
      </section>

      {/* 02 How sectors are used */}
      <section className="on-dark relative overflow-hidden bg-navy-700 py-24 text-white md:py-32">
        <GhostNumber n="02" onDark side="left" />
        <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              onDark
              label="Our approach"
              title={
                <>
                  Sector experience is <span className="font-light text-sky-200">only the starting point</span>
                </>
              }
              intro="Before Ample commits time, capital or its name to a project, the project has to stand on its own: a real need, a workable site or business, clear ownership and a documented structure."
            />
          </div>
          <ul className="grid gap-1 rounded-2xl border border-white/10 bg-navy-950 p-6 md:p-8 lg:col-span-5">
            {nextSteps.map((l) => (
              <li key={l.href}>
                <ArrowLink href={l.href} onDark>
                  {l.label}
                </ArrowLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InvestorCTA />
    </>
  );
}
