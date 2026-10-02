import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getInsightCategories, getInsights } from "@/lib/cms";
import { PageHero } from "@/components/sections/PageHero";
import { InvestorCTA } from "@/components/sections/InvestorCTA";
import { GhostNumber, SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { formatDate } from "@/components/ui/SourceCitation";
import { ArticleCard } from "@/components/cards/ArticleCard";

export const metadata = buildMetadata({
  title: "Insights | Guides to Investing and Property in Nepal",
  description:
    "Practical, sourced guides from Ample Associates on investing in Nepal from overseas, buying a home in Pokhara Lekhnath and Nepal's hydropower sector.",
  path: "/insights/",
});

/** The editorial standard, one point per card (same wording as before, split up). */
const standards: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "info",
    title: "General information, not advice",
    body: "Articles explain how things work. They are not legal, tax or investment advice.",
  },
  {
    icon: "document",
    title: "Every statistic has a source",
    body: "Each figure is attributed to a named source, with a reference year and the date we last checked it.",
  },
  {
    icon: "clock",
    title: "Updated when things change",
    body: "Articles are updated when rules or figures change, and the update date is shown.",
  },
];

export default async function InsightsPage() {
  const insights = await getInsights();
  const [lead, ...rest] = insights;
  const leadCategory = lead && getInsightCategories().find((c) => c.slug === lead.category);
  const upcoming = getInsightCategories().filter((c) => !insights.some((i) => i.category === c.slug));

  return (
    <>
      <PageHero
        title={
          <>
            Guides and <strong>market context</strong>
          </>
        }
        intro="Practical guides for investors and home buyers, with sources for every fact. Written by the Ample Associates editorial team."
        breadcrumbs={[{ name: "Insights", path: "/insights/" }]}
        meta={[`${insights.length} guides`, "Every figure sourced", "Dated updates"]}
      />

      {/* 01 Guides */}
      <section className="relative py-24 md:py-32">
        <GhostNumber n="01" />
        <div className="container-page relative">
          <SectionHeading
            label="Latest"
            title={
              <>
                Read <span className="font-light">before you decide.</span>
              </>
            }
          />

          {lead && (
            <article className="group reveal relative mt-14 grid overflow-hidden rounded-3xl bg-navy-950 text-white shadow-dossier lg:grid-cols-12">
              <div className="relative aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]">
                {lead.cover && (
                  <Image
                    src={lead.cover.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
                <span className="absolute top-5 left-5 rounded-full bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase backdrop-blur-md">
                  Featured guide
                </span>
              </div>
              <div className="on-dark flex flex-col p-8 md:p-10 lg:col-span-5 lg:p-12">
                {leadCategory && (
                  <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-sky-200 uppercase">
                    {leadCategory.title}
                  </p>
                )}
                <h2 className="mt-4 text-[1.75rem] leading-tight font-semibold tracking-[-0.02em] md:text-heading-sm">
                  <Link
                    href={`/insights/${lead.category}/${lead.slug}/`}
                    className="after:absolute after:inset-0 focus-visible:outline-none"
                  >
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-4 flex-1 leading-relaxed font-light text-slate-300">{lead.excerpt}</p>
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/12 pt-6">
                  <time
                    dateTime={lead.publishedAt}
                    className="text-[0.6875rem] font-semibold tracking-[0.12em] text-slate-400 uppercase"
                  >
                    {formatDate(lead.publishedAt)}
                  </time>
                  <span aria-hidden className="flex items-center gap-3 text-sm font-semibold">
                    Read the guide
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-600 transition-transform duration-300 group-hover:rotate-45">
                      <Icon name="arrowUpRight" className="size-5" />
                    </span>
                  </span>
                </div>
                {lead.cover?.credit && (
                  <p className="relative z-10 mt-4 text-[0.6875rem] text-slate-500">
                    Photo:{" "}
                    <a
                      href={lead.cover.creditUrl}
                      rel="noopener"
                      target="_blank"
                      className="underline underline-offset-2 hover:text-slate-300"
                    >
                      {lead.cover.credit}
                    </a>
                  </p>
                )}
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl ring-sky-500 ring-offset-2 group-has-[a:focus-visible]:ring-2"
              />
            </article>
          )}

          {rest.length > 0 && (
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {rest.map((i) => (
                <li key={i.slug} className="reveal">
                  <ArticleCard insight={i} />
                </li>
              ))}
            </ul>
          )}

          {upcoming.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-line-strong px-6 py-5">
              <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-soft uppercase">
                Coming soon
              </span>
              {upcoming.map((c) => (
                <span key={c.slug} className="rounded-full bg-mist-200 px-3 py-1 text-sm text-ink-muted">
                  {c.title}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 02 Editorial standards */}
      <section className="on-dark relative overflow-hidden bg-navy-700 py-24 text-white md:py-32">
        <GhostNumber n="02" onDark />
        <div className="container-page relative">
          <SectionHeading
            onDark
            label="Editorial standards"
            title={
              <>
                How we write <span className="font-light text-sky-200">every guide.</span>
              </>
            }
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {standards.map((s) => (
              <li key={s.title} className="reveal rounded-2xl border border-white/10 bg-navy-950 p-7 md:p-8">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-400">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InvestorCTA />
    </>
  );
}
