import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getInsights, getProject, getProjects } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schema";
import { sectorTitle } from "@/content/sectors";
import { PageHero } from "@/components/sections/PageHero";
import { KeyFactGrid } from "@/components/sections/KeyFactGrid";
import { SiteSchematic } from "@/components/sections/SiteSchematic";
import { TrackView } from "@/components/sections/TrackView";
import { InvestorCTA } from "@/components/sections/InvestorCTA";
import { GhostNumber, SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { MediaFigure } from "@/components/ui/MediaFigure";
import { OpportunityBadge, VerificationBadge } from "@/components/ui/StatusBadge";
import { FAQ } from "@/components/ui/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { DocumentCard, RiskCard } from "@/components/cards/InfoCards";
import { ArticleCard } from "@/components/cards/ArticleCard";
import type { TimelineStage } from "@/types/content";
import { stickyColumnBelowSubnav } from "@/lib/layout";
import { cn } from "@/lib/cn";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/investments/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProject(slug);
  if (!project) return {};
  return buildMetadata({ ...project.seo, path: `/investments/${project.slug}/`, ogImage: project.seo.ogImage });
}

const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "location", label: "Location" },
  { id: "design", label: "Design" },
  { id: "information", label: "Pricing & structure" },
  { id: "timeline", label: "Timeline" },
  { id: "risks", label: "Risks" },
  { id: "documents", label: "Documents" },
  { id: "faqs", label: "FAQs" },
  { id: "enquire", label: "Enquire" },
];

const stageLabel: Record<TimelineStage["state"], string> = {
  complete: "Complete",
  current: "In progress",
  upcoming: "Upcoming",
  unconfirmed: "Status to be confirmed",
};

const microLabel = "text-[0.6875rem] font-semibold tracking-[0.12em] uppercase";

export default async function ProjectPage(props: PageProps<"/investments/[slug]">) {
  const { slug } = await props.params;
  const project = await getProject(slug);
  if (!project) notFound();

  const insights = (await getInsights()).filter((i) => i.relatedProjects.includes(project.slug));
  const path = `/investments/${project.slug}/`;
  const titleRest = project.title.startsWith(project.shortTitle)
    ? project.title.slice(project.shortTitle.length)
    : null;

  return (
    <>
      <TrackView event="project_view" params={{ project: project.slug }} />
      <PageHero
        eyebrow={`${sectorTitle(project.sector)} · ${project.region}`}
        title={
          titleRest !== null ? (
            <>
              <strong>{project.shortTitle}</strong>
              {titleRest}
            </>
          ) : (
            project.title
          )
        }
        intro={project.summary}
        breadcrumbs={[
          { name: "Portfolio", path: "/portfolio/" },
          { name: project.shortTitle, path },
        ]}
        actions={
          <>
            <ButtonLink href="/contact/" mobileFull withArrow>
              Enquire About This Project
            </ButtonLink>
            <ButtonLink href="#overview" variant="secondary" mobileFull>
              Explore the Project
            </ButtonLink>
          </>
        }
        aside={
          <div className="grid gap-5">
            {project.heroImage && (
              <figure className="relative">
                <div aria-hidden className="absolute inset-0 -rotate-2 rounded-3xl bg-mist-300" />
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-dossier">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={project.heroImage.src}
                      alt={project.heroImage.alt}
                      fill
                      preload
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                    <span
                      className={cn(
                        microLabel,
                        "absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-brand-600 backdrop-blur-md",
                      )}
                    >
                      {project.heroImage.kind}
                    </span>
                  </div>
                  <figcaption className="px-5 py-4 text-sm text-ink-muted">
                    {project.locationDetails.heroCaption ?? project.heroImage.alt}
                    {project.heroImage.credit && (
                      <span className="mt-1 block text-xs text-ink-soft">
                        Photo:{" "}
                        {project.heroImage.creditUrl ? (
                          <a
                            href={project.heroImage.creditUrl}
                            className="underline underline-offset-2"
                            rel="noopener"
                            target="_blank"
                          >
                            {project.heroImage.credit}
                          </a>
                        ) : (
                          project.heroImage.credit
                        )}
                      </span>
                    )}
                  </figcaption>
                </div>
              </figure>
            )}
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white p-4 shadow-lift">
                <dt className={cn(microLabel, "text-ink-soft")}>Status</dt>
                <dd className="mt-2">
                  <OpportunityBadge status={project.status} />
                </dd>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-lift">
                <dt className={cn(microLabel, "text-ink-soft")}>Ample&rsquo;s role</dt>
                <dd className="mt-2 flex flex-wrap items-center gap-1.5 font-semibold text-ink">
                  {project.amplesRole}
                  {project.amplesRoleStatus !== "VERIFIED" && <VerificationBadge status={project.amplesRoleStatus} />}
                </dd>
              </div>
            </dl>
          </div>
        }
      />

      {/* In-page navigation */}
      <nav aria-label="On this page" className="sticky top-[5.5rem] z-30 -mt-6 md:-mt-8">
        <div className="container-page">
          <ul className="flex [scrollbar-width:none] gap-1 overflow-x-auto rounded-full border border-line bg-white/90 p-1.5 shadow-lift backdrop-blur-xl">
            {sectionNav.map((s) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className="inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium text-ink-muted transition-colors hover:bg-mist-200 hover:text-brand-600"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 01 At a glance */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32" aria-labelledby="snapshot-heading">
        <GhostNumber n="01" />
        <div className="container-page relative">
          <SectionHeading
            id="snapshot-heading"
            label="Key facts"
            title={
              <>
                At a <span className="font-light">glance</span>
              </>
            }
            intro="Confirmed facts are shown as values. Anything not yet verified is shown by its status, never as a number."
          />
          <div className="mt-14">
            <KeyFactGrid facts={project.keyFacts} />
          </div>
        </div>
      </section>

      {/* 02 Overview */}
      <section id="overview" className="relative scroll-mt-40 bg-white py-24 md:py-32">
        <GhostNumber n="02" side="left" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading className={stickyColumnBelowSubnav} label="Overview" title={project.overviewHeading} />
          <div className="space-y-5 text-lg leading-relaxed text-ink-muted">
            {project.overview.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            <div className="flex gap-4 rounded-2xl bg-mist-100 p-7 text-base md:p-8">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600">
                <Icon name="building" className="size-6" />
              </span>
              <div>
                <p className="font-semibold text-ink">Who owns and runs the project?</p>
                <p className="mt-2">
                  {project.projectOwner.label}: {project.projectOwner.value}{" "}
                  <VerificationBadge status={project.projectOwner.status} className="ml-1 align-middle" />
                </p>
                {project.projectOwner.note && <p className="mt-2 text-sm">{project.projectOwner.note}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Location */}
      <section id="location" className="relative scroll-mt-40 bg-mist-100 py-24 md:py-32">
        <GhostNumber n="03" />
        <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading label="Location" title={project.locationDetails.heading} />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
              {project.locationDetails.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            {project.locationDetails.guide && (
              <ArrowLink href={project.locationDetails.guide.href} className="mt-6">
                {project.locationDetails.guide.label}
              </ArrowLink>
            )}
          </div>
          <div className="grid gap-5">
            <div className="rounded-2xl bg-white p-7 shadow-lift md:p-8">
              <p className={cn(microLabel, "text-brand-600")}>Location details</p>
              <ul className="mt-5 grid gap-3">
                {project.locationDetails.points.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-ink">
                    <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-mist-200 text-brand-600">
                      <Icon name="mapPin" className="size-4" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {project.gallery[0] && project.gallery[0].src !== project.heroImage?.src && (
              <MediaFigure
                image={project.gallery[0]}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/3] rounded-3xl shadow-dossier"
              />
            )}
          </div>
        </div>
      </section>

      {/* 04 Design */}
      <section id="design" className="relative scroll-mt-40 py-24 md:py-32">
        <GhostNumber n="04" side="left" />
        <div className="container-page relative">
          <SectionHeading label="Design" title={project.design.heading} intro={project.design.intro} />
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <ul className="grid gap-5 sm:grid-cols-2">
              {project.developmentPlan.map((d) => (
                <li key={d.title} className="reveal rounded-2xl bg-white p-7 shadow-lift">
                  <h3 className="font-semibold text-ink">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{d.body}</p>
                </li>
              ))}
            </ul>
            {project.design.showSiteSchematic && <SiteSchematic />}
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {project.audiences.map((a) => (
              <div key={a.title} className="reveal rounded-2xl bg-mist-200 p-7 md:p-8">
                <h3 className="text-xl font-semibold text-ink">{a.title}</h3>
                <ul className="mt-5 space-y-2.5 text-ink-muted">
                  {a.points.map((x) => (
                    <li key={x} className="flex gap-3">
                      <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-600" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 Pricing and structure */}
      <section id="information" className="relative scroll-mt-40 bg-white py-24 md:py-32">
        <GhostNumber n="05" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className={stickyColumnBelowSubnav}>
            <SectionHeading
              label="Pricing & structure"
              title="Project and purchase information"
              intro="Land, construction and pricing information will be published once verified. Until then it is shared directly on request."
            />
            <div className="mt-8 flex gap-4 rounded-2xl bg-mist-200 p-6">
              <Icon name="info" className="mt-0.5 size-5 shrink-0 text-brand-600" />
              <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
                Ample does not publish projected returns for this project, and no investment structure is offered until
                its legal vehicle and terms are confirmed.
              </p>
            </div>
          </div>
          <KeyFactGrid facts={project.investmentInformation} columns={2} />
        </div>
      </section>

      {/* 06 Timeline */}
      <section id="timeline" className="relative scroll-mt-40 py-24 md:py-32">
        <GhostNumber n="06" side="left" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <SectionHeading
            className={stickyColumnBelowSubnav}
            label="Timeline"
            title={
              <>
                Development <span className="font-light">journey</span>
              </>
            }
            intro="Stages are indicative. Dates are published only once confirmed."
          />
          <ol className="grid gap-3">
            {project.timeline.map((t, i) => (
              <li
                key={t.title}
                className="grid grid-cols-[2.5rem_1fr] items-start gap-4 rounded-2xl bg-white p-5 shadow-lift sm:grid-cols-[2.5rem_1fr_auto] sm:items-center"
              >
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full text-sm font-semibold",
                    t.state === "complete" && "bg-mist-200 text-brand-600",
                    t.state === "current" && "bg-brand-600 text-white shadow-glow",
                    t.state !== "complete" && t.state !== "current" && "border border-line-strong text-ink-soft",
                  )}
                >
                  {t.state === "complete" ? <Icon name="check" className="size-4" label="Complete" /> : i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{t.title}</h3>
                  <p className="text-[0.9375rem] text-ink-muted">{t.description}</p>
                </div>
                <span
                  className={cn(
                    "col-start-2 justify-self-start rounded-full px-3 py-1 text-xs font-medium sm:col-start-auto",
                    t.state === "current" ? "bg-brand-600/10 text-brand-600" : "bg-mist-200 text-ink-muted",
                  )}
                >
                  {stageLabel[t.state]}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 07 Risks, on navy */}
      <section
        id="risks"
        className="on-dark relative scroll-mt-40 overflow-hidden bg-navy-700 py-24 text-white md:py-32"
      >
        <GhostNumber n="07" onDark />
        <div className="container-page relative">
          <SectionHeading
            onDark
            label="Risks"
            title={
              <>
                Clear information <span className="font-light text-sky-200">matters</span>
              </>
            }
            intro="Property development involves planning, construction, market and execution risks. Evaluate them, ideally with your own advisers, before any commitment."
            action={
              <ArrowLink href="/risk-disclosure/" onDark>
                Read the full risk disclosure
              </ArrowLink>
            }
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {project.risks.map((r, i) => (
              <li key={r.title} className="reveal">
                <RiskCard risk={r} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 08 Documents */}
      <section id="documents" className="relative scroll-mt-40 py-24 md:py-32">
        <GhostNumber n="08" side="left" />
        <div className="container-page relative">
          <SectionHeading
            label="Documents"
            title={
              <>
                Review the development <span className="font-light">in more detail</span>
              </>
            }
            intro="Some documents are shared on request; more sensitive documents are shared with serious enquirers after an initial conversation."
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {project.documents.map((d) => (
              <li key={d.title} className="reveal">
                <DocumentCard doc={d} />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="/contact/" variant="secondary" mobileFull>
              Ask about project documents
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="updates-heading" className="bg-mist-100 py-24 md:py-28">
        <div className="container-page">
          <SectionHeading
            id="updates-heading"
            label="Updates"
            title={
              <>
                Project <span className="font-light">updates</span>
              </>
            }
          />
          {project.updates.length > 0 ? (
            <ol className="mt-12 grid gap-4">
              {project.updates.map((u) => (
                <li key={u.date + u.title} className="rounded-2xl bg-white p-7 shadow-lift">
                  <time dateTime={u.date} className={cn(microLabel, "text-brand-600")}>
                    {u.date}
                  </time>
                  <h3 className="mt-2 font-semibold text-ink">{u.title}</h3>
                  <p className="mt-1 text-ink-muted">{u.body}</p>
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-10 flex max-w-3xl items-start gap-4 rounded-2xl border border-dashed border-line-strong bg-white/60 p-6">
              <Icon name="clock" className="mt-0.5 size-5 shrink-0 text-brand-600" />
              <p className="leading-relaxed text-ink-muted">
                No dated updates have been published yet. Updates will appear here as the project reaches confirmed
                milestones.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 09 FAQs */}
      <section id="faqs" className="relative scroll-mt-40 py-24 md:py-32">
        <GhostNumber n="09" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading
            className={stickyColumnBelowSubnav}
            label="FAQs"
            title={
              <>
                {project.shortTitle}: <span className="font-light">frequently asked questions</span>
              </>
            }
          />
          <FAQ items={project.faqs} />
        </div>
        <JsonLd data={faqSchema(project.faqs)} />
      </section>

      <section id="enquire" className="scroll-mt-40 bg-mist-100 py-24 md:py-28">
        <div className="container-page">
          <div className="grid gap-10 rounded-3xl bg-white p-8 shadow-dossier md:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-20">
            <SectionHeading
              label="Enquire"
              title={
                <>
                  Interested in <span className="text-brand-600">{project.shortTitle}?</span>
                </>
              }
              intro="Speak with the team for the latest project information, including details that are shared on request."
            />
            <div className="flex flex-col gap-3">
              <ButtonLink href="/contact/" withArrow>
                Talk to Our Team
              </ButtonLink>
              <ButtonLink href="/portfolio/" variant="secondary">
                View Our Portfolio
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {insights.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="container-page">
            <SectionHeading
              label="Insights"
              title={
                <>
                  Guides for buyers <span className="font-light">and investors</span>
                </>
              }
              action={<ArrowLink href="/insights/">All insights</ArrowLink>}
            />
            <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {insights.map((i) => (
                <li key={i.slug} className="reveal">
                  <ArticleCard insight={i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <InvestorCTA
        body="Speak with the team about Ample Cozy Homes, projects in preparation or the wider Ample Associates portfolio."
        secondary={{ label: "View Our Portfolio", href: "/portfolio/" }}
      />
    </>
  );
}
