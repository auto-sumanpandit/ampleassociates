import Link from "next/link";
import type { Project } from "@/types/content";
import { sectorTitle } from "@/content/sectors";
import { MediaFigure } from "@/components/ui/MediaFigure";
import { OpportunityBadge, VerificationBadge } from "@/components/ui/StatusBadge";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Key facts surfaced on the card when the project has them (same set as the homepage feature). */
const highlightFacts = ["Number of homes", "Plot size per home", "Pricing"];

/**
 * Opportunity card: image with its kind chip and caption, the "An Ample
 * Associates project" pill, status, facts (unverified values as badges) and a
 * round arrow button. The whole card is one link target, labelled by the project title.
 */
export function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const href = `/investments/${project.slug}/`;
  const facts = project.keyFacts.filter((f) => highlightFacts.includes(f.label));
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-6 rounded-3xl border border-line bg-white p-4 shadow-lift transition-shadow duration-300 hover:shadow-dossier md:p-5",
        featured && "lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-10 lg:p-6",
      )}
    >
      {project.heroImage && (
        <MediaFigure
          image={project.heroImage}
          sizes={featured ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          caption={project.locationDetails?.heroCaption}
          captionAside={
            featured ? (
              <>
                <Icon name="mapPin" className="size-4" />
                {project.location}
              </>
            ) : undefined
          }
          className={cn(
            "aspect-[16/11] rounded-2xl bg-mist-100",
            featured && "lg:col-span-7 lg:aspect-auto lg:h-full lg:min-h-[28rem]",
          )}
          imageClassName="transition-transform duration-700 group-hover:scale-[1.03]"
        />
      )}
      <div
        className={cn("flex flex-1 flex-col px-2 pb-2 md:px-3", featured && "lg:col-span-5 lg:px-0 lg:py-4 lg:pr-4")}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-mist-200 px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase">
            <Icon name="building" className="size-4" />
            An Ample Associates project
          </span>
          <OpportunityBadge status={project.status} />
        </div>
        <p className="mt-5 text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-soft uppercase">
          {sectorTitle(project.sector)}
        </p>
        <h3
          className={cn(
            "mt-1.5 leading-tight font-semibold tracking-[-0.015em] text-ink",
            featured ? "text-[1.75rem] md:text-heading-sm" : "text-[1.375rem]",
          )}
        >
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-muted">
          <Icon name="mapPin" className="size-4 shrink-0 text-sky-500" />
          {project.location}, {project.country}
        </p>
        <p className="mt-4 leading-relaxed text-ink-muted">{project.summary}</p>

        <dl className="mt-6 divide-y divide-line rounded-2xl bg-mist-100 px-5">
          <div className="flex items-center justify-between gap-4 py-3.5">
            <dt className="shrink-0 text-sm text-ink-muted">Project</dt>
            <dd className="text-right text-sm font-semibold text-ink">{project.projectType}</dd>
          </div>
          {facts.map((f) => (
            <div key={f.label} className="flex items-center justify-between gap-4 py-3.5">
              <dt className="text-sm text-ink-muted">{f.label}</dt>
              <dd className="text-right text-sm font-semibold text-ink">
                {f.status === "VERIFIED" ? f.value : <VerificationBadge status={f.status} />}
              </dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 py-3.5">
            <dt className="shrink-0 text-sm text-ink-muted">Stage</dt>
            <dd className="flex flex-col items-end gap-1.5 text-right text-sm font-semibold text-ink">
              {project.stage}
              {project.stageStatus !== "VERIFIED" && <VerificationBadge status={project.stageStatus} />}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase">
            Review project
          </span>
          <span
            aria-hidden
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-glow transition-transform duration-300 group-hover:rotate-45"
          >
            <Icon name="arrowUpRight" className="size-5" />
          </span>
        </div>
      </div>
      {/* Keyboard focus ring for the stretched link */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-brand-600 ring-offset-2 group-has-[a:focus-visible]:ring-2"
      />
    </article>
  );
}
