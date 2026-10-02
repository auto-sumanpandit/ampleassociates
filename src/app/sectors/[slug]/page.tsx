import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInsights, getPortfolio, getProjectsBySector, getSector, getSectors } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";
import { media } from "@/content/media";
import { sources } from "@/content/sources";
import { PageHero } from "@/components/sections/PageHero";
import { InvestorCTA } from "@/components/sections/InvestorCTA";
import { TrackView } from "@/components/sections/TrackView";
import { GhostNumber, SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { Icon } from "@/components/ui/Icon";
import { MediaFigure } from "@/components/ui/MediaFigure";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { PortfolioTile } from "@/components/cards/PortfolioTile";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { StatCard } from "@/components/cards/InfoCards";
import { SectorCard } from "@/components/cards/SectorCard";
import { stickyColumn } from "@/lib/layout";
import { cn } from "@/lib/cn";
import { SectorIconTile, SectorSwitcher } from "../_components/SectorSwitcher";

export const dynamicParams = false;

export async function generateStaticParams() {
  const sectors = await getSectors();
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/sectors/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const sector = await getSector(slug);
  if (!sector) return {};
  return buildMetadata({ ...sector.seo, path: `/sectors/${sector.slug}/` });
}

/** Sector-specific sourced context, where we have a verified source. */
const sectorContext = {
  energy: {
    image: media.himalayanSolarSite,
    caption: "Himalayan Solar Power, Sitalpati, Khandbari",
    stat: {
      value: "3,878 MW",
      label: "Nepal's installed electricity capacity, July 2025.",
      source: sources.installedCapacity2025,
    },
  },
  "property-development": {
    image: media.lakesideHotelConcept,
    caption: "Design concept for the Lakeside hotel development",
    stat: {
      value: "1.16 million",
      label: "International visitors to Nepal in 2025, the market for Pokhara's hotels.",
      source: sources.tourismArrivals2025,
    },
  },
} as const;

const relatedInsight: Record<string, string[]> = {
  "education-consultancy": [],
  college: [],
  energy: ["hydropower-in-nepal-investor-overview"],
  "property-development": ["pokhara-lekhnath-guide-for-home-buyers", "how-to-invest-in-nepal-from-overseas"],
  "financial-channel": ["how-to-invest-in-nepal-from-overseas"],
};

/** Light title with the last word as the semibold royal-blue accent. */
function accentTitle(title: string) {
  const i = title.lastIndexOf(" ");
  if (i < 0) return <strong>{title}</strong>;
  return (
    <>
      {title.slice(0, i)} <strong>{title.slice(i + 1)}</strong>
    </>
  );
}

const microLabel = "text-[0.6875rem] font-semibold tracking-[0.12em] uppercase";

export default async function SectorPage(props: PageProps<"/sectors/[slug]">) {
  const { slug } = await props.params;
  const sector = await getSector(slug);
  if (!sector) notFound();

  const [projects, portfolio, insights, sectors] = await Promise.all([
    getProjectsBySector(sector.slug),
    getPortfolio(),
    getInsights(),
    getSectors(),
  ]);
  // A company that is shown as a featured project card is not repeated as a tile.
  const projectNames = new Set(projects.map((p) => p.shortTitle));
  const allEntities = portfolio.filter((p) => p.sector === sector.slug);
  const entities = allEntities.filter((e) => !projectNames.has(e.name));
  const related = insights.filter((i) => relatedInsight[sector.slug]?.includes(i.slug));
  const context = sectorContext[sector.slug as keyof typeof sectorContext];
  const others = sectors.filter((s) => s.slug !== sector.slug).slice(0, 4);
  const countries = [
    ...new Set(allEntities.flatMap((e) => (e.branches ? e.branches.map((b) => b.country) : [e.country]))),
  ];
  const sectorName = sector.shortTitle.toLowerCase();

  const facts = [
    { label: "Companies and projects", value: String(allEntities.length) },
    { label: "Where they operate", value: countries.length > 0 ? countries.join(" and ") : "Nepal" },
    {
      label: "Opportunities listed",
      value: projects.length > 0 ? String(projects.length) : "None at present",
    },
  ];

  return (
    <>
      <TrackView event="sector_view" params={{ sector: sector.slug }} />
      <PageHero
        title={accentTitle(sector.title)}
        intro={sector.summary}
        breadcrumbs={[
          { name: "Sectors", path: "/sectors/" },
          { name: sector.title, path: `/sectors/${sector.slug}/` },
        ]}
        aside={<SectorIconTile slug={sector.slug} />}
      />
      <SectorSwitcher sectors={sectors} current={sector.slug} />

      {/* 01 What we do */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <GhostNumber n="01" side="left" />
        <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="reveal lg:col-span-5">
            <p className="section-label">What we do</p>
            <h2 className="mt-6 text-heading-sm font-light text-ink md:text-heading">
              What we do in <span className="block font-semibold text-brand-600">{sector.title}.</span>
            </h2>
            <ArrowLink href={`/portfolio/#${sector.slug}`} className="mt-6">
              See it in the portfolio
            </ArrowLink>
          </div>
          <div className="reveal space-y-8 lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink-muted md:text-lead md:font-light">{sector.intro}</p>
            <dl className="grid gap-6 rounded-2xl bg-mist-100 p-7 sm:grid-cols-3 md:p-8">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <dt className={cn(microLabel, "text-ink-soft")}>{f.label}</dt>
                  <dd className="text-lg leading-snug font-semibold text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            {context?.stat && (
              <div className="max-w-md">
                <StatCard value={context.stat.value} label={context.stat.label} source={context.stat.source} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 02 Companies */}
      <section className="relative bg-mist-100 py-24 md:py-32">
        <GhostNumber n="02" />
        <div className="container-page relative">
          <SectionHeading
            label="Portfolio"
            title={
              <>
                Companies <span className="font-light">in this sector</span>
              </>
            }
            action={<ArrowLink href="/portfolio/">Full portfolio</ArrowLink>}
          />
          {projects.length > 0 && (
            <div className="reveal mt-14 grid gap-6">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} featured />
              ))}
            </div>
          )}
          {entities.length > 0 ? (
            <ul
              className={cn(
                "grid gap-6",
                projects.length > 0 ? "mt-6" : "mt-14",
                entities.length > 1 && "md:grid-cols-2",
                entities.length > 2 && "lg:grid-cols-3",
              )}
            >
              {entities.map((e) => (
                <li key={e.slug} className="reveal">
                  <PortfolioTile entity={e} />
                </li>
              ))}
            </ul>
          ) : (
            allEntities.length === 0 && (
              <ul className="mt-14 grid gap-3">
                {sector.ampleInvolvement.map((x) => (
                  <li key={x} className="flex gap-3 rounded-2xl bg-white p-5 text-ink shadow-lift">
                    <Icon name="check" className="mt-0.5 size-5 shrink-0 text-brand-600" />
                    <span className="leading-relaxed">{x}</span>
                  </li>
                ))}
              </ul>
            )
          )}
          {projects.length === 0 && (
            <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-dashed border-line-strong bg-white/60 p-7 md:flex-row md:items-center md:justify-between md:p-8">
              <p className="max-w-2xl leading-relaxed text-ink-muted">
                No {sectorName} opportunity is open at the moment. Contact the team about this sector to hear when a
                documented opportunity becomes available.
              </p>
              <ButtonLink href="/contact/" variant="secondary" mobileFull>
                Talk to Our Team
              </ButtonLink>
            </div>
          )}
        </div>
      </section>

      {/* 03 Focus areas, on navy */}
      <section className="on-dark relative overflow-hidden bg-navy-700 py-24 text-white md:py-32">
        <GhostNumber n="03" onDark />
        <div
          className={cn(
            "container-page relative grid gap-12",
            context?.image && "lg:grid-cols-12 lg:items-center lg:gap-16",
          )}
        >
          {context?.image && (
            <MediaFigure
              image={context.image}
              caption={"caption" in context ? context.caption : undefined}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="reveal aspect-[4/3] rounded-3xl shadow-dossier lg:col-span-5"
            />
          )}
          <div className={cn("reveal", context?.image && "lg:col-span-7")}>
            <p className="section-label">Our focus</p>
            <h2 className="mt-6 text-heading-sm font-semibold text-white md:text-heading">
              Where Ample <span className="font-light text-sky-200">focuses.</span>
            </h2>
            <ol className={cn("mt-10 grid gap-8", !context?.image && "md:grid-cols-2 lg:grid-cols-3")}>
              {sector.focusAreas.map((f, i) => (
                <li key={f.title} className="border-t border-white/10 pt-6">
                  <h3 className="flex items-baseline gap-3 text-xl font-semibold text-white">
                    <span className="text-sm font-semibold text-sky-500 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-300">{f.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 04 Considerations */}
      <section className="relative py-24 md:py-32">
        <GhostNumber n="04" side="left" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            className={stickyColumn}
            label="Before you commit"
            title={
              <>
                What to <span className="font-light">consider</span>
              </>
            }
          />
          <ul className="grid gap-5">
            {sector.considerations.map((c) => (
              <li key={c.title} className="reveal rounded-2xl bg-white p-7 shadow-lift md:p-8">
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-mist-200 text-brand-600">
                    <Icon name="alert" className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{c.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink-muted">{c.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-mist-100 py-24 md:py-32">
          <div className="container-page">
            <SectionHeading
              label="Insights"
              title={
                <>
                  Further <span className="font-light">reading</span>
                </>
              }
              action={<ArrowLink href="/insights/">All insights</ArrowLink>}
            />
            <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((i) => (
                <li key={i.slug} className="reveal">
                  <ArticleCard insight={i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className={cn("relative py-24 md:py-32", related.length === 0 && "bg-mist-100")}>
        <GhostNumber n="05" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading
            className={stickyColumn}
            label="FAQs"
            title={
              <>
                {sector.title}: <span className="font-light">questions</span>
              </>
            }
          />
          <FAQ items={sector.faqs} />
        </div>
      </section>

      <section className={cn("py-24 md:py-32", related.length > 0 ? "bg-mist-100" : "bg-white")}>
        <div className="container-page">
          <SectionHeading
            label="Our sectors"
            title={
              <>
                Explore <span className="font-light">other sectors</span>
              </>
            }
            action={<ArrowLink href="/sectors/">All sectors</ArrowLink>}
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.slug} className="reveal">
                <SectorCard sector={s} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InvestorCTA />
    </>
  );
}
