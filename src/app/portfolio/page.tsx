import { buildMetadata } from "@/lib/seo/metadata";
import { getPortfolio } from "@/lib/cms";
import type { RelationshipType } from "@/types/content";
import { site } from "@/content/site";
import { portfolioGroups } from "@/content/portfolio";
import { PageHero } from "@/components/sections/PageHero";
import { InvestorCTA } from "@/components/sections/InvestorCTA";
import { PortfolioTile } from "@/components/cards/PortfolioTile";
import { MediaFigure } from "@/components/ui/MediaFigure";
import { GhostNumber, SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { stickyColumn, stickyColumnBelowSubnav } from "@/lib/layout";

export const metadata = buildMetadata({
  title: "Our Portfolio | Ample Associates Businesses in Nepal & the UK",
  description:
    "Ample Associates in the UK and Nepal: education consultancy, SAMS College London, hydropower and solar, Ample Cozy Homes, a Pokhara hotel and Back2Nepal.",
  path: "/portfolio/",
});

const relationshipDefinitions: { type: RelationshipType; body: string }[] = [
  { type: "Ample Associates Company", body: "A company within Ample Associates." },
  { type: "Promoter", body: "A project Ample helped initiate as a promoter shareholder." },
  { type: "Associate Project", body: "A project Ample Associates is associated with." },
  { type: "Investment", body: "A business or property in which Ample has invested." },
];

export default async function PortfolioPage() {
  const portfolio = await getPortfolio();
  const groups = portfolioGroups
    .map((g) => ({ ...g, items: portfolio.filter((p) => p.sector === g.slug) }))
    .filter((g) => g.items.length > 0);
  const companyGroups = groups.filter((g) => g.slug !== "financial-channel");
  const channel = groups.find((g) => g.slug === "financial-channel");
  const back2nepal = channel?.items[0];
  const channelOnMist = companyGroups.length % 2 === 1;

  const facts = [
    { value: String(portfolio.length), label: "Companies and projects" },
    { value: "UK & Nepal", label: "Where they operate" },
    { value: String(groups.length), label: "Business areas" },
    { value: String(site.foundedYear), label: "The Ample journey begins" },
  ];

  return (
    <>
      <PageHero
        title={
          <>
            Our <strong>portfolio</strong>
          </>
        }
        intro="Ample Associates is the brand behind every company and project here, in the United Kingdom and Nepal: from education and energy to property and the financial channel between them."
        breadcrumbs={[{ name: "Portfolio", path: "/portfolio/" }]}
      />

      {/* Facts card overlapping the hero */}
      <section aria-label="Portfolio at a glance" className="relative z-10 -mt-10 md:-mt-14">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-8 rounded-3xl bg-white p-7 shadow-dossier lg:grid-cols-4 lg:p-10">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col">
                <dd className="order-1 text-[2rem] leading-none font-semibold tracking-[-0.03em] text-brand-600 tabular-nums md:text-[2.75rem]">
                  {f.value}
                </dd>
                <dt className="order-2 mt-3 text-sm text-ink-muted">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Group menu, pinned under the site header while reading */}
      <nav aria-label="Portfolio groups" className="sticky top-[5.5rem] z-30 mt-10 md:mt-14">
        <div className="container-page">
          <ul className="flex [scrollbar-width:none] gap-2 overflow-x-auto rounded-full border border-line bg-white/90 p-1.5 shadow-lift backdrop-blur-xl">
            {groups.map((g) => (
              <li key={g.slug} className="shrink-0">
                <a
                  href={`#${g.slug}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink transition-colors hover:bg-mist-200 hover:text-brand-600"
                >
                  {g.title}
                  <span className="rounded-full bg-mist-200 px-2 text-xs text-brand-600 tabular-nums">
                    {g.items.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {companyGroups.map((g, i) => (
        <section
          key={g.slug}
          id={g.slug}
          aria-labelledby={`${g.slug}-heading`}
          className={cn("relative scroll-mt-40 py-24 md:py-32", i % 2 === 1 && "bg-mist-100")}
        >
          <GhostNumber n={String(i + 1).padStart(2, "0")} side={i % 2 === 0 ? "right" : "left"} />
          <div className="container-page relative grid gap-12 lg:grid-cols-[19rem_1fr] lg:gap-16">
            <header className={stickyColumnBelowSubnav}>
              <p className="section-label">
                {g.items.length} {g.items.length === 1 ? "company" : "companies"}
              </p>
              <h2
                id={`${g.slug}-heading`}
                className="mt-6 text-heading-sm font-semibold tracking-[-0.025em] text-ink md:text-heading"
              >
                {g.title}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{g.summary}</p>
              <ArrowLink href={`/sectors/${g.slug}/`} className="mt-4">
                About this sector
              </ArrowLink>
              {g.image && (
                <MediaFigure
                  image={g.image}
                  caption={g.imageCaption}
                  sizes="(min-width: 1024px) 19rem, 100vw"
                  className="mt-6 hidden aspect-[4/3] rounded-2xl lg:block"
                />
              )}
            </header>
            <ul className={cn("grid gap-6", g.items.length > 1 && "sm:grid-cols-2")}>
              {g.items.map((e) => (
                <li key={e.slug} className="reveal">
                  <PortfolioTile entity={e} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {channel && back2nepal && (
        <section
          id={channel.slug}
          aria-labelledby={`${channel.slug}-heading`}
          className={cn("relative scroll-mt-40 py-24 md:py-32", channelOnMist && "bg-mist-100")}
        >
          <div className="container-page">
            <div className="on-dark reveal relative grid gap-10 overflow-hidden rounded-3xl bg-navy-950 p-8 text-white shadow-dossier md:p-12 lg:grid-cols-[19rem_1fr] lg:gap-16">
              <div aria-hidden className="dot-grid-light absolute inset-0 opacity-[0.07]" />
              <header className="relative">
                <p className="section-label">1 company</p>
                <h2 id={`${channel.slug}-heading`} className="mt-6 text-heading-sm font-semibold md:text-heading">
                  {channel.title}
                </h2>
                <p className="mt-4 leading-relaxed text-slate-300">{channel.summary}</p>
              </header>
              <div className="relative">
                <h3 className="text-2xl font-semibold tracking-[-0.015em]">{back2nepal.name}</h3>
                {back2nepal.legalName && <p className="mt-1 text-sm text-slate-400">{back2nepal.legalName}</p>}
                <p className="mt-4 max-w-[60ch] text-lg leading-relaxed font-light text-slate-300">
                  People who know Ample, especially clients who have known us for a decade, can invest in Ample
                  Associates projects in Nepal and the UK, with legal documents prepared under the applicable
                  government&rsquo;s rules.
                </p>
                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                  {[
                    { value: "NPR 5 lakh", label: "Minimum investment" },
                    { value: "Kathmandu", label: "Operates from" },
                    { value: "2025", label: "Operating since" },
                  ].map((f) => (
                    <div key={f.label} className="flex flex-col gap-1">
                      <dt className="order-2 text-sm text-slate-400">{f.label}</dt>
                      <dd className="order-1 text-2xl font-semibold tracking-[-0.02em] text-sky-200">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/investors/#back2nepal" variant="onDark" mobileFull withArrow>
                    About Back2Nepal
                  </ButtonLink>
                  <ButtonLink href="/contact/" variant="onDarkOutline" mobileFull>
                    Talk to Our Team
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className={cn("relative py-24 md:py-32", !channelOnMist && "bg-mist-100")}>
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div className={stickyColumn}>
            <SectionHeading
              label="Relationships"
              title={
                <>
                  What each <span className="font-light">label means</span>
                </>
              }
              intro="Not every business is an Ample subsidiary. Each card states Ample's relationship to the company."
            />
            <p className="mt-6 text-sm leading-relaxed text-ink-muted">
              Official company logos will be added as they are supplied. Websites are linked only where we have checked
              they belong to the company named.
            </p>
            <ArrowLink href="/risk-disclosure/" className="mt-4">
              Read the risk disclosure
            </ArrowLink>
          </div>
          <dl className="grid gap-5 self-start sm:grid-cols-2">
            {relationshipDefinitions.map((r) => (
              <div key={r.type} className="reveal rounded-2xl bg-white p-7 shadow-lift md:p-8">
                <dt className="text-lg font-semibold text-ink">{r.type}</dt>
                <dd className="mt-2 leading-relaxed text-ink-muted">{r.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <InvestorCTA />
    </>
  );
}
