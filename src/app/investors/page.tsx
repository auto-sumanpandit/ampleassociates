import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getInsights, getProjects, getSectors } from "@/lib/cms";
import { investorJourney } from "@/content/process";
import { faqGroups } from "@/content/faqs";
import { PageHero } from "@/components/sections/PageHero";
import { InvestorCTA } from "@/components/sections/InvestorCTA";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Back2NepalSection } from "@/components/sections/Back2NepalSection";
import { GhostNumber, SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { Icon, type IconName } from "@/components/ui/Icon";
import { VisibilityBadge } from "@/components/ui/StatusBadge";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import type { SectorSlug, Visibility } from "@/types/content";
import { stickyColumn } from "@/lib/layout";
import { cn } from "@/lib/cn";

export const metadata = buildMetadata({
  title: "Investor Centre | Nepal Project Enquiries | Ample Associates",
  description:
    "Information for investors: NRN Back 2 Nepal Investment Company, current projects, how enquiries work, documents at each stage, due diligence and risks.",
  path: "/investors/",
});

/** Back2Nepal facts supplied by the client (26 and 27 Sep 2026), as shown elsewhere on the site. */
const dossier = [
  { label: "Operates from", value: "Kathmandu" },
  { label: "Operating since", value: "2025" },
];

const audiences: { icon: IconName; title: string; body: string; cell: string }[] = [
  {
    icon: "users",
    title: "Individual investors",
    body: "People looking for a documented way to take part in a specific project.",
    cell: "lg:col-span-3",
  },
  {
    icon: "globe",
    title: "Nepalis abroad & NRNs",
    body: "In the UK and elsewhere, wanting a trustworthy connection to projects at home.",
    cell: "lg:col-span-3",
  },
  {
    icon: "building",
    title: "Business owners",
    body: "Entrepreneurs considering property or project co-development.",
    cell: "lg:col-span-2",
  },
  {
    icon: "home",
    title: "Family investors",
    body: "Families planning long-term holdings or a home in Nepal.",
    cell: "lg:col-span-2",
  },
  {
    icon: "layers",
    title: "Strategic partners",
    body: "Developers, contractors and operators who can help deliver projects.",
    cell: "md:col-span-2 lg:col-span-2",
  },
];

const informationTiers: { stage: string; visibility: Visibility; items: string[] }[] = [
  {
    stage: "Public",
    visibility: "PUBLIC",
    items: ["Project summaries and facts on this site", "Risks and FAQs", "Sector and market context with sources"],
  },
  {
    stage: "On request",
    visibility: "AVAILABLE_ON_REQUEST",
    items: ["Project brochure", "Current pricing and cost information", "Illustrative layouts"],
  },
  {
    stage: "Qualified access",
    visibility: "QUALIFIED_ACCESS",
    items: ["Title and ownership documents", "Company and structure documents", "Detailed financial information"],
  },
];

const diligence = [
  "Who legally owns the land or project company?",
  "Which approvals are granted, and which are only applied for?",
  "What structure would you hold, and what rights does it give you?",
  "How are costs estimated, and what contingency is included?",
  "How and when could you exit, and what could stop that?",
  "Are there any related-party interests you should know about?",
];

/** Sector icons and grid cells, in the client's order (3+3, then 2+2+2 on desktop). */
const sectorStyle: Record<SectorSlug, { icon: IconName; cell: string }> = {
  "education-consultancy": { icon: "book", cell: "lg:col-span-3" },
  college: { icon: "building", cell: "lg:col-span-3" },
  energy: { icon: "bolt", cell: "lg:col-span-2" },
  "property-development": { icon: "home", cell: "lg:col-span-2" },
  "financial-channel": { icon: "globe", cell: "md:col-span-2 lg:col-span-2" },
};

function DossierCard() {
  return (
    <aside
      aria-label="NRN Back 2 Nepal Investment Company at a glance"
      className="relative isolate overflow-hidden rounded-2xl bg-white p-7 text-ink shadow-dossier md:p-8"
    >
      <div aria-hidden className="absolute -right-10 -bottom-10 -z-10 size-36 rounded-full bg-mist-100" />
      <div className="flex items-center gap-4">
        <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-mist-200 text-brand-600">
          <Icon name="compass" className="size-6" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase">Back2Nepal</p>
          <p className="leading-snug font-semibold text-ink">NRN Back 2 Nepal Investment Company Pvt. Limited</p>
        </div>
      </div>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {dossier.map((f) => (
          <div key={f.label} className="flex items-center justify-between gap-4 py-3.5">
            <dt className="text-sm text-ink-muted">{f.label}</dt>
            <dd className="text-right text-lg font-semibold text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
      <dl className="mt-5 flex flex-col gap-1">
        <dt className="text-sm text-ink-muted">Minimum investment</dt>
        <dd className="text-[2.75rem] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap text-brand-600">
          NPR 5 lakh
        </dd>
      </dl>
    </aside>
  );
}

export default async function InvestorsPage() {
  const [projects, insights, sectors] = await Promise.all([getProjects(), getInsights(), getSectors()]);
  const faqs = [
    ...(faqGroups.find((g) => g.id === "investing")?.items ?? []),
    ...(faqGroups.find((g) => g.id === "information")?.items ?? []),
  ];

  return (
    <>
      <PageHero
        tone="dark"
        title={
          <>
            Invest in <strong>Nepal</strong>.
          </>
        }
        intro="Review current projects, understand how enquiries work and what information is shared at each stage."
        breadcrumbs={[{ name: "Investor Centre", path: "/investors/" }]}
        actions={
          <>
            <ButtonLink href="#back2nepal" mobileFull withArrow>
              Invest Through Back2Nepal
            </ButtonLink>
            <ButtonLink href="/contact/" variant="onDarkOutline" mobileFull>
              Talk to Our Team
            </ButtonLink>
          </>
        }
        aside={<DossierCard />}
      />

      {/* Diaspora investment company (anchor #back2nepal, linked from the homepage) */}
      <Back2NepalSection variant="full" showFacts={false} />

      {/* 01 Who it is for */}
      <section className="relative bg-mist-100 py-24 md:py-32">
        <GhostNumber n="01" />
        <div className="container-page relative">
          <SectionHeading
            label="Who it is for"
            title={
              <>
                Investors <span className="font-light">and partners.</span>
              </>
            }
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
            {audiences.map((a) => (
              <li
                key={a.title}
                className={cn("reveal flex flex-col rounded-2xl bg-white p-7 shadow-lift md:p-8", a.cell)}
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-mist-200 text-brand-600">
                  <Icon name={a.icon} className="size-6" />
                </span>
                <h3 className="mt-6 text-[1.375rem] leading-tight font-semibold text-ink">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 How it works */}
      <section id="how-it-works" className="relative scroll-mt-28 py-24 md:py-32">
        <GhostNumber n="02" side="left" />
        <div className="container-page relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <SectionHeading
              className={cn(stickyColumn, "lg:col-span-5")}
              label="How it works"
              title={
                <>
                  <span className="font-light">From initial interest</span> to informed decision
                </>
              }
              intro="A conversation with the team is the first step. It does not commit you to anything."
            />
            <div className="rounded-2xl bg-white p-7 shadow-lift md:p-10 lg:col-span-7">
              <ProcessTimeline steps={investorJourney} />
            </div>
          </div>

          <div className="mt-20 md:mt-24">
            <div className="max-w-2xl">
              <h3 className="text-heading-sm font-semibold text-ink">Information at the right stage</h3>
              <p className="mt-3 text-lg leading-relaxed font-light text-ink-muted">
                Commercially sensitive documents are shared progressively, and never through public links.
              </p>
            </div>
            <ol className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
              {informationTiers.map((t, i) => (
                <li
                  key={t.stage}
                  className={cn(
                    "reveal flex flex-col rounded-2xl p-7 md:p-8",
                    i === 2 ? "on-dark bg-navy-950 text-white" : "bg-mist-100",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={cn(
                        "text-[2.5rem] leading-none font-light tracking-[-0.03em] tabular-nums",
                        i === 2 ? "text-sky-200" : "text-brand-600",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <VisibilityBadge visibility={t.visibility} />
                  </div>
                  <h4 className={cn("mt-6 text-lg font-semibold", i === 2 ? "text-white" : "text-ink")}>{t.stage}</h4>
                  <ul className={cn("mt-4 space-y-2.5", i === 2 ? "text-slate-300" : "text-ink-muted")}>
                    {t.items.map((x) => (
                      <li key={x} className="flex gap-2.5">
                        <Icon
                          name="check"
                          className={cn("mt-1 size-4 shrink-0", i === 2 ? "text-sky-500" : "text-brand-600")}
                        />
                        {x}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex items-start gap-2 text-sm text-ink-muted">
              <Icon name="lock" className="mt-0.5 size-4 shrink-0 text-brand-600" />A secure investor portal is planned
              for a later phase. Until then, documents are shared directly by the team.
            </p>
          </div>
        </div>
      </section>

      {/* 03 Where it invests */}
      <section className="on-dark relative overflow-hidden bg-navy-700 py-24 text-white md:py-32">
        <GhostNumber n="03" onDark />
        <div className="container-page relative">
          <SectionHeading
            onDark
            label="Where Ample invests"
            title={
              <>
                <span className="font-light text-sky-200">Five sectors,</span> across the UK and Nepal.
              </>
            }
            intro="Each sector has its own page covering Ample's involvement and what to consider."
            action={
              <ArrowLink href="/sectors/" onDark>
                All sectors
              </ArrowLink>
            }
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
            {sectors.map((s, i) => {
              const style = sectorStyle[s.slug];
              return (
                <li key={s.slug} className={cn("reveal", style.cell)}>
                  <Link
                    href={`/sectors/${s.slug}/`}
                    className="group flex h-full flex-col gap-6 rounded-2xl border border-white/10 bg-navy-950 p-7 shadow-xl transition-transform duration-300 hover:-translate-y-1 md:p-8"
                  >
                    <div className="flex items-center gap-4">
                      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
                        <Icon name={style.icon} className="size-6" />
                      </span>
                      <div>
                        <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-sky-200 uppercase">
                          Sector {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="text-[1.375rem] leading-tight font-semibold">{s.title}</h3>
                      </div>
                    </div>
                    <p className="leading-relaxed text-slate-300">{s.summary}</p>
                    <span className="mt-auto flex items-center justify-between gap-4 text-sm font-semibold text-sky-200 group-hover:text-white">
                      Explore {s.shortTitle.toLowerCase()}
                      <span
                        aria-hidden
                        className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand-600"
                      >
                        <Icon name="arrowUpRight" className="size-5" />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-20 md:mt-24">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h3 className="text-heading-sm font-semibold text-white">Current &amp; upcoming opportunities</h3>
              <ArrowLink href="/portfolio/" onDark>
                Full portfolio
              </ArrowLink>
            </div>
            <div className="mt-8 grid gap-6">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} featured />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 Clear answers */}
      <section id="faq" className="relative scroll-mt-28 py-24 md:py-32">
        <GhostNumber n="04" />
        <div className="container-page relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className={cn(stickyColumn, "lg:col-span-5")}>
              <SectionHeading
                label="Investor FAQs"
                title={
                  <>
                    Clear answers <span className="font-light">for investors.</span>
                  </>
                }
              />
            </div>
            <div className="lg:col-span-7">
              <FAQ items={faqs} />
            </div>
          </div>

          {/* Risk notice */}
          <div className="reveal mt-20 rounded-3xl bg-mist-200 p-7 md:mt-24 md:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white text-brand-600">
                  <Icon name="shield" className="size-6" />
                </span>
                <h3 className="mt-6 text-heading-sm font-semibold text-ink">
                  Questions worth asking, of us and of anyone
                </h3>
                <p className="mt-3 text-lg leading-relaxed font-light text-ink-muted">
                  We encourage independent review. Ask for documents, not assurances.
                </p>
                <ArrowLink href="/risk-disclosure/" className="mt-4">
                  Read the risk disclosure
                </ArrowLink>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
                {diligence.map((q) => (
                  <li key={q} className="flex gap-3 rounded-xl bg-white p-4 leading-snug text-ink">
                    <Icon name="compass" className="mt-0.5 size-5 shrink-0 text-brand-600" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="relative bg-mist-100 py-24 md:py-32">
        <div className="container-page">
          <SectionHeading
            label="Insights"
            title={
              <>
                Investor briefings <span className="font-light">and guides</span>
              </>
            }
            action={<ArrowLink href="/insights/">All insights</ArrowLink>}
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
            {insights.slice(0, 3).map((i) => (
              <li key={i.slug} className="reveal">
                <ArticleCard insight={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InvestorCTA />
    </>
  );
}
