import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";
import { getInsight, getInsightCategory, getInsights, getProjects } from "@/lib/cms";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { SourceCitation, formatDate } from "@/components/ui/SourceCitation";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { MediaFigure } from "@/components/ui/MediaFigure";
import { InvestorCTA } from "@/components/sections/InvestorCTA";

export const dynamicParams = false;

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((i) => ({ category: i.category, slug: i.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await props.params;
  const insight = await getInsight(category, slug);
  if (!insight) return {};
  return buildMetadata({
    ...insight.seo,
    path: `/insights/${insight.category}/${insight.slug}/`,
    type: "article",
    publishedTime: insight.publishedAt,
    modifiedTime: insight.updatedAt ?? insight.publishedAt,
  });
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** The part before a colon is the semibold accent; the rest stays light. */
function accentTitle(title: string) {
  const i = title.indexOf(":");
  if (i < 0) return title;
  return (
    <>
      <strong>{title.slice(0, i + 1)}</strong>
      {title.slice(i + 1)}
    </>
  );
}

const microLabel = "text-[0.6875rem] font-semibold tracking-[0.12em] uppercase";

export default async function InsightPage(props: PageProps<"/insights/[category]/[slug]">) {
  const { category, slug } = await props.params;
  const insight = await getInsight(category, slug);
  if (!insight) notFound();

  const cat = getInsightCategory(insight.category)!;
  const path = `/insights/${insight.category}/${insight.slug}/`;
  const [all, projects] = await Promise.all([getInsights(), getProjects()]);
  const more = all.filter((i) => i.slug !== insight.slug).slice(0, 2);
  const related = projects.filter((p) => insight.relatedProjects.includes(p.slug));
  const toc = insight.body.filter((b) => b.heading).map((b) => ({ id: slugify(b.heading!), heading: b.heading! }));

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden bg-linear-to-b from-canvas via-canvas to-mist-100">
          <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-30" />
          <div className="container-page pt-28 pb-14 md:pt-32 md:pb-20">
            <Breadcrumbs
              items={[
                { name: "Insights", path: "/insights/" },
                { name: insight.title, path },
              ]}
              className="mb-8 md:mb-10"
            />
            <div className={insight.cover ? "grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12" : undefined}>
              <div className={insight.cover ? "lg:col-span-7" : undefined}>
                <p className="section-label mb-6">{cat.title}</p>
                <h1 className="max-w-4xl text-[2.25rem] leading-[1.12] font-light tracking-[-0.03em] text-balance text-ink sm:text-display [&_strong]:font-semibold [&_strong]:text-brand-600">
                  {accentTitle(insight.title)}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed font-light text-ink-muted md:text-lead">
                  {insight.excerpt}
                </p>
                <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  <div className={`${microLabel} flex items-center gap-2.5 text-ink-muted`}>
                    <dt className="flex items-center gap-2.5">
                      <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />
                      By
                    </dt>
                    <dd className="text-ink">{insight.author}</dd>
                  </div>
                  <div className={`${microLabel} flex items-center gap-2.5 text-ink-muted`}>
                    <dt className="flex items-center gap-2.5">
                      <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />
                      Published
                    </dt>
                    <dd className="text-ink">
                      <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time>
                    </dd>
                  </div>
                  <div className={`${microLabel} flex items-center gap-2.5 text-ink-muted`}>
                    <dt className="flex items-center gap-2.5">
                      <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />
                      Last updated
                    </dt>
                    <dd className="text-ink">
                      <time dateTime={insight.updatedAt ?? insight.publishedAt}>
                        {formatDate(insight.updatedAt ?? insight.publishedAt)}
                      </time>
                    </dd>
                  </div>
                </dl>
              </div>
              {insight.cover && (
                <MediaFigure
                  image={insight.cover}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="aspect-[4/3] rounded-3xl shadow-dossier lg:col-span-5"
                />
              )}
            </div>
          </div>
        </header>

        <div className="container-page grid gap-8 py-16 md:py-24 lg:grid-cols-[1fr_20rem] lg:gap-10">
          <div className="min-w-0 rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-8 md:p-12">
            <div className="prose-ample">
              {insight.body.map((block, i) => (
                <section key={i} aria-labelledby={block.heading ? slugify(block.heading) : undefined}>
                  {block.heading && (
                    <h2 id={slugify(block.heading)} className="flex scroll-mt-28 items-baseline gap-4">
                      <span
                        aria-hidden
                        className="text-[2rem] leading-none font-extralight text-brand-600 tabular-nums"
                      >
                        {String(toc.findIndex((t) => t.heading === block.heading) + 1).padStart(2, "0")}
                      </span>
                      {block.heading}
                    </h2>
                  )}
                  {block.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </section>
              ))}

              <div className="mt-12 flex gap-4 rounded-2xl bg-mist-200 p-6 text-base not-italic">
                <Icon name="info" className="mt-1 size-5 shrink-0 text-brand-600" />
                <p className="!mt-0 text-ink-muted">
                  This article is general information, not legal, tax or investment advice. Rules change; confirm your
                  position with qualified advisers. <Link href="/risk-disclosure/">Read our risk disclosure</Link>.
                </p>
              </div>

              {insight.sources.length > 0 && (
                <section aria-labelledby="sources" className="mt-12 border-t border-line pt-8">
                  <h2 id="sources" className="!mt-0">
                    Sources
                  </h2>
                  <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                    {insight.sources.map((s) => (
                      <li key={s.label} className="rounded-2xl border border-line bg-mist-100 p-5">
                        <p className="!mt-0 mb-3 text-sm font-semibold text-ink">{s.label}</p>
                        <SourceCitation source={s} />
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </div>
          </div>

          <aside className="grid content-start gap-5 lg:sticky lg:top-28 lg:self-start">
            {toc.length > 0 && (
              <nav aria-label="In this article" className="rounded-2xl bg-white p-6 shadow-lift">
                <p className={`${microLabel} text-brand-600`}>In this article</p>
                <ol className="mt-4 space-y-1">
                  {toc.map((t, i) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="flex gap-3 py-1.5 text-sm text-ink-muted transition-colors hover:text-brand-600"
                      >
                        <span className="text-ink-soft tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        {t.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {related.map((p) => (
              <div key={p.slug} className="on-dark rounded-2xl border border-white/10 bg-navy-950 p-6 text-white">
                <p className={`${microLabel} text-sky-200`}>Related project</p>
                <p className="mt-3 text-xl font-semibold">{p.title}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-300">
                  <Icon name="mapPin" className="size-4 text-sky-500" />
                  {p.location}
                </p>
                <ArrowLink href={`/investments/${p.slug}/`} onDark className="mt-3">
                  Review {p.shortTitle}
                </ArrowLink>
              </div>
            ))}
          </aside>
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-mist-100 py-24 md:py-28" aria-labelledby="more-insights">
          <div className="container-page">
            <SectionHeading
              id="more-insights"
              label="Insights"
              title={
                <>
                  More <span className="font-light">insights</span>
                </>
              }
              action={<ArrowLink href="/insights/">All insights</ArrowLink>}
            />
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {more.map((i) => (
                <li key={i.slug} className="reveal">
                  <ArticleCard insight={i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <InvestorCTA />
      <JsonLd data={articleSchema(insight, path)} />
    </>
  );
}
