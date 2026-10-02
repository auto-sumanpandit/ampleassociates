import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSectors } from "@/lib/cms";
import { sources } from "@/content/sources";
import { media } from "@/content/media";
import { faqGroups } from "@/content/faqs";
import { PageHero } from "@/components/sections/PageHero";
import { InvestorCTA } from "@/components/sections/InvestorCTA";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { GhostNumber, SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { Icon } from "@/components/ui/Icon";
import { MediaFigure } from "@/components/ui/MediaFigure";
import { SourceCitation } from "@/components/ui/SourceCitation";
import { StatCard } from "@/components/cards/InfoCards";
import { SectorCard } from "@/components/cards/SectorCard";
import { stickyColumn } from "@/lib/layout";
import { cn } from "@/lib/cn";

export const metadata = buildMetadata({
  title: "Investing in Nepal: Opportunities, Rules & Risks | Ample Associates",
  description:
    "How investing in Nepal works for Nepalis abroad, NRNs and foreign investors: sectors, FITTA, the NPR 20 million FDI threshold, property rules and risks.",
  path: "/invest-nepal/",
});

const steps = [
  {
    title: "Know your category",
    body: "Nepali citizen abroad, Non-Resident Nepali with foreign citizenship, or foreign national: each has different rights.",
  },
  {
    title: "Check the sector",
    body: "Some sectors, including real estate business, are closed to foreign investment under FITTA.",
  },
  {
    title: "Choose a project",
    body: "Look for a real project with clear ownership, approvals and a documented structure.",
  },
  { title: "Do due diligence", body: "Have title, company documents and agreements reviewed by your own lawyer." },
  {
    title: "Approvals & agreements",
    body: "Foreign investment needs approval from the Department of Industry or the Investment Board Nepal.",
  },
  { title: "Monitor & report", body: "Expect dated, specific updates through to completion or exit." },
];

const investorCategories = [
  {
    who: "Nepali citizens living abroad",
    property: "Can generally buy land and property as Nepali citizens.",
    business: "Can generally invest as residents do.",
  },
  {
    who: "Non-Resident Nepalis (foreign citizens)",
    property: "Limited residential ownership under NRN rules, with land-area ceilings.",
    business: "Can invest under NRN provisions; check current rules.",
  },
  {
    who: "Foreign nationals",
    property: "Generally cannot own land; real estate business is closed to foreign investment.",
    business: "Can invest in open sectors via FITTA, subject to approval and minimum thresholds.",
  },
];

const risks = [
  {
    title: "Legal and regulatory change",
    body: "Rules on foreign investment, land and repatriation change. What applies today may not apply at exit.",
  },
  {
    title: "Title and documentation",
    body: "Land records can be incomplete or disputed. Independent verification is essential.",
  },
  {
    title: "Currency",
    body: "Returns earned in Nepali rupees change in value for investors who measure wealth in pounds or dollars.",
  },
  { title: "Liquidity", body: "Property and private project interests can be hard to sell quickly." },
  {
    title: "Natural hazards",
    body: "Earthquakes, floods and landslides are real risks in Nepal and can affect construction and infrastructure.",
  },
  { title: "Execution", body: "Projects depend on contractors, approvals and people. Delays are common." },
];

const microLabel = "text-[0.6875rem] font-semibold tracking-[0.12em] uppercase";

export default async function InvestNepalPage() {
  const sectors = await getSectors();
  const overseasFaqs = faqGroups.find((g) => g.id === "overseas")?.items ?? [];
  const cited = [
    sources.installedCapacity2025,
    sources.tourismArrivals2025,
    sources.fdiThreshold,
    sources.fittaRealEstate,
    sources.investNepal,
    sources.ibn,
  ];

  return (
    <>
      <PageHero
        title={
          <>
            Investing in Nepal: <strong>opportunity, rules and risk</strong>
          </>
        }
        intro="Nepal offers real opportunities in energy, tourism, property and new businesses, and real risks. How you can take part depends on who you are and what you invest in."
        breadcrumbs={[{ name: "Why Nepal", path: "/invest-nepal/" }]}
        aside={
          <MediaFigure
            image={media.annapurna}
            sizes="(min-width: 1024px) 40vw, 100vw"
            preload
            className="aspect-[16/10] rounded-3xl shadow-dossier"
          />
        }
      />

      {/* The short answer */}
      <section className="bg-mist-100 pb-24 md:pb-32">
        <div className="container-page">
          <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-dossier md:p-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-mist-200 text-brand-600">
                <Icon name="info" className="size-6" />
              </span>
              <p className={cn(microLabel, "mt-5 text-brand-600")}>The short answer</p>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-ink lg:col-span-8">
              <p>
                <strong className="font-semibold">
                  Yes, you can invest in Nepal from abroad, but your options depend on your citizenship.
                </strong>{" "}
                <span className="font-light">
                  Nepali citizens living overseas can generally invest and own property as residents do. Non-Resident
                  Nepalis with foreign citizenship have limited rights under NRN rules. Foreign nationals invest under
                  the Foreign Investment and Technology Transfer Act (FITTA), with approval, a minimum of NPR 20 million
                  per project in most sectors, and no access to real estate business.
                </span>
              </p>
              <p className="flex items-start gap-3 rounded-xl bg-amber-pale p-4 text-base text-amber-dark">
                <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
                This page is general information, not legal advice. Confirm your position with a Nepal-qualified lawyer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 01 Indicators */}
      <section className="relative py-24 md:py-32">
        <GhostNumber n="01" />
        <div className="container-page relative">
          <SectionHeading
            label="Indicators"
            title={
              <>
                Selected indicators, <span className="font-light">with sources</span>
              </>
            }
            intro="We show only figures we can attribute to a named source, with the year they refer to and when we last checked them."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
            <StatCard
              value="3,878 MW"
              label="Installed electricity capacity, overwhelmingly hydropower, after 631 MW was added in a year."
              source={sources.installedCapacity2025}
            />
            <StatCard
              value="1,158,459"
              label="International visitors in 2025, compared with 1,147,548 in 2024."
              source={sources.tourismArrivals2025}
            />
            <StatCard
              value="NPR 20m"
              label="General minimum foreign direct investment per project, with exceptions such as IT."
              source={sources.fdiThreshold}
            />
          </div>
        </div>
      </section>

      {/* 02 Your route */}
      <section className="relative bg-mist-100 py-24 md:py-32">
        <GhostNumber n="02" side="left" />
        <div className="container-page relative">
          <SectionHeading
            label="Your status"
            title={
              <>
                <span className="font-light">Your route depends</span> on your status
              </>
            }
            intro="The single most important question for anyone investing in Nepal from overseas."
          />
          <ul className="mt-14 grid gap-4 md:hidden">
            {investorCategories.map((c) => (
              <li key={c.who} className="rounded-2xl bg-white p-7 shadow-lift">
                <h3 className="text-lg font-semibold text-ink">{c.who}</h3>
                <dl className="mt-4 grid gap-4 text-[0.9375rem]">
                  <div>
                    <dt className={cn(microLabel, "text-brand-600")}>Owning property</dt>
                    <dd className="mt-1 leading-relaxed text-ink-muted">{c.property}</dd>
                  </div>
                  <div>
                    <dt className={cn(microLabel, "text-brand-600")}>Investing in businesses and projects</dt>
                    <dd className="mt-1 leading-relaxed text-ink-muted">{c.business}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <div className="mt-14 hidden overflow-x-auto rounded-2xl bg-white shadow-lift md:block">
            <table className="w-full min-w-[44rem] border-collapse text-left">
              <caption className="sr-only">Investment and property rights by investor category</caption>
              <thead className={cn(microLabel, "bg-mist-200 text-ink")}>
                <tr>
                  <th scope="col" className="p-5 font-semibold md:px-7">
                    Investor category
                  </th>
                  <th scope="col" className="p-5 font-semibold md:px-7">
                    Owning property
                  </th>
                  <th scope="col" className="p-5 font-semibold md:px-7">
                    Investing in businesses and projects
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {investorCategories.map((c) => (
                  <tr key={c.who} className="align-top">
                    <th scope="row" className="p-5 font-semibold text-ink md:px-7">
                      {c.who}
                    </th>
                    <td className="p-5 leading-relaxed text-ink-muted md:px-7">{c.property}</td>
                    <td className="p-5 leading-relaxed text-ink-muted md:px-7">{c.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <SourceCitation source={sources.fittaRealEstate} />
            <ArrowLink href="/insights/investment-guides/how-to-invest-in-nepal-from-overseas/">
              Read the full guide to investing in Nepal from overseas
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* 03 Sectors */}
      <section className="relative py-24 md:py-32">
        <GhostNumber n="03" />
        <div className="container-page relative">
          <SectionHeading
            label="Sectors"
            title={
              <>
                Where the <span className="font-light">opportunities are</span>
              </>
            }
            intro="The sectors where Ample has experience, each with its own page covering Ample's involvement and what to consider."
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {sectors.map((s) => (
              <li key={s.slug} className="reveal">
                <SectorCard sector={s} />
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl leading-relaxed text-ink-muted">
            For residential property, see{" "}
            <Link
              href="/investments/ample-homes-pokhara/"
              className="font-semibold text-brand-600 underline underline-offset-2"
            >
              Ample Cozy Homes in Pokhara Lekhnath
            </Link>
            , and for energy, our{" "}
            <Link
              href="/insights/market-insights/hydropower-in-nepal-investor-overview/"
              className="font-semibold text-brand-600 underline underline-offset-2"
            >
              overview of hydropower in Nepal
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 04 How it works */}
      <section className="on-dark relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
        <div aria-hidden className="dot-grid-light absolute inset-0 opacity-[0.06]" />
        <GhostNumber n="04" side="left" onDark />
        <div className="container-page relative">
          <SectionHeading
            onDark
            label="Process"
            title={
              <>
                How investing in a <span className="font-light text-sky-200">Nepal project works</span>
              </>
            }
            intro="Six steps, whether you invest through Ample or anyone else."
          />
          <div className="mt-14">
            <ProcessTimeline steps={steps} columns={6} onDark />
          </div>
        </div>
      </section>

      {/* 05 Risks */}
      <section className="relative py-24 md:py-32">
        <GhostNumber n="05" />
        <div className="container-page relative">
          <SectionHeading
            label="Risks"
            title={
              <>
                Opportunity and risk <span className="font-light">belong on the same page</span>
              </>
            }
            action={<ArrowLink href="/risk-disclosure/">Full risk disclosure</ArrowLink>}
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {risks.map((r, i) => (
              <li key={r.title} className="reveal flex flex-col rounded-2xl bg-white p-7 shadow-lift md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-amber-pale text-amber-dark">
                    <Icon name="alert" className="size-6" />
                  </span>
                  <span className={cn(microLabel, "text-ink-soft")}>Risk {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-ink">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Project still has to work + official resources */}
      <section className="bg-mist-100 py-24 md:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionHeading
              title={
                <>
                  Country opportunity is not enough. <span className="font-light">The project still has to work.</span>
                </>
              }
              intro="Ample Associates presents specific projects, states its role in each, and supports investors through a staged process, from first conversation to due diligence."
            />
            <div className="mt-6 flex flex-col items-start gap-1">
              <ArrowLink href="/investors/">How investing with us works</ArrowLink>
              <ArrowLink href="/investments/ample-homes-pokhara/">Our current project: Ample Cozy Homes</ArrowLink>
              <ArrowLink href="/portfolio/">Our portfolio</ArrowLink>
            </div>
          </div>
          <div className="on-dark rounded-2xl bg-navy-950 p-7 text-white md:p-8 lg:col-span-5 lg:self-start">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-600">
              <Icon name="globe" className="size-6" />
            </span>
            <h2 className="mt-6 text-[1.375rem] font-semibold">Official resources</h2>
            <ul className="mt-5 grid gap-3">
              {[sources.investNepal, sources.ibn].map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener"
                    className="group flex min-h-11 items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4 font-semibold text-white transition-colors hover:border-brand-600 hover:bg-brand-600"
                  >
                    <span>
                      {s.publisher}: {s.label}
                    </span>
                    <Icon name="arrowUpRight" className="size-5 shrink-0 text-sky-200 group-hover:text-white" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 md:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <SectionHeading
            className={cn(stickyColumn, "lg:col-span-5")}
            label="FAQs"
            title={
              <>
                Investing from overseas: <span className="font-light">FAQs</span>
              </>
            }
          />
          <div className="lg:col-span-7">
            <FAQ items={overseasFaqs} />
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="border-t border-line bg-mist-100 py-16 md:py-20">
        <div className="container-page">
          <h2 className="text-[1.375rem] font-semibold text-ink">Sources used on this page</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cited.map((s) => (
              <li key={s.label} className="rounded-2xl bg-white p-6 shadow-lift">
                <p className="mb-4 text-sm font-semibold text-ink">{s.label}</p>
                <SourceCitation source={s} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InvestorCTA />
    </>
  );
}
