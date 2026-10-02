import Image from "next/image";
import type { PortfolioEntity } from "@/types/content";
import { VerificationBadge } from "@/components/ui/StatusBadge";
import { Icon } from "@/components/ui/Icon";
import { Emblem } from "@/components/layout/Logo";
import { cn } from "@/lib/cn";

const chip = "inline-flex items-center gap-1.5 rounded-full bg-mist-200 px-3 py-1 text-xs font-medium text-ink-muted";

/** Up to three initials from the capitalised words of a name (e.g. "SAMS College London" -> "SCL"). */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Z0-9]/.test(w))
    .map((w) => w[0])
    .slice(0, 3)
    .join("");
}

/**
 * Company card: logo (or initials) tile and status badges, the Ample
 * relationship chip, name, trading name, what it does, then country and scale.
 * The whole card links to the company's website only when that site has been checked.
 */
export function PortfolioTile({ entity }: { entity: PortfolioEntity }) {
  const linked = Boolean(entity.website && entity.websiteVerified);
  const tradingName = entity.legalName && !entity.legalName.startsWith(entity.name) ? entity.legalName : null;
  const relationshipPending = entity.relationshipStatus === "TO_BE_CONFIRMED";
  // Wordmark-style logos (much wider than tall) get a wider white tile instead of the square.
  const wideLogo = Boolean(entity.logo && entity.logo.width / entity.logo.height > 1.6);

  return (
    <article className="group @container relative h-full overflow-hidden rounded-2xl border border-line bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className={cn("flex h-full flex-col", entity.image && "@2xl:flex-row")}>
        {entity.image && (
          <figure className="flex flex-col @2xl:w-1/2 @2xl:shrink-0">
            <div className="relative aspect-[16/10] bg-mist-200 @2xl:aspect-auto @2xl:min-h-80 @2xl:flex-1">
              <Image
                src={entity.image.src}
                alt={entity.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase backdrop-blur-md">
                {entity.image.kind}
              </span>
            </div>
            {entity.imageCaption && (
              <figcaption className="border-b border-line px-7 py-3 text-sm text-ink-muted md:px-8 @2xl:border-r @2xl:border-b-0">
                {entity.imageCaption}
              </figcaption>
            )}
          </figure>
        )}
        <div className="flex flex-1 flex-col p-7 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <span
              className={cn(
                "inline-flex h-16 shrink-0 items-center justify-center overflow-hidden rounded-xl text-lg font-semibold tracking-[-0.01em] text-brand-600",
                wideLogo ? "w-36 bg-white ring-1 ring-line" : "w-16 bg-mist-100",
              )}
            >
              {entity.logo ? (
                <Image
                  src={entity.logo.src}
                  alt={`${entity.name} logo`}
                  width={entity.logo.width}
                  height={entity.logo.height}
                  sizes={wideLogo ? "9rem" : "4rem"}
                  className="size-full object-contain p-2"
                />
              ) : (
                <span aria-hidden>{initials(entity.name)}</span>
              )}
            </span>
            {(entity.stage || relationshipPending) && (
              <div className="flex flex-col items-end gap-1.5">
                {entity.stage && <VerificationBadge status={entity.stage} />}
                {relationshipPending && <VerificationBadge status="TO_BE_CONFIRMED" />}
              </div>
            )}
          </div>

          <p className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-mist-200 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase">
            {/* The emblem carries the brand; the text states Ample's role. */}
            <Emblem className="size-3.5 shrink-0" />
            {entity.relationshipType ?? "Ample Associates project"}
          </p>

          <h3 className="mt-4 text-[1.375rem] leading-snug font-semibold tracking-[-0.015em] text-ink">
            {linked ? (
              <a
                href={entity.website}
                target="_blank"
                rel="noopener"
                className="after:absolute after:inset-0 focus-visible:outline-none"
              >
                {entity.name}
                <span className="sr-only">, visit website (opens in a new tab)</span>
              </a>
            ) : (
              entity.name
            )}
          </h3>
          {tradingName && <p className="mt-1 text-sm text-ink-soft">{tradingName}</p>}
          <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{entity.description}</p>

          <div className="mt-7 flex items-end justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {entity.branches ? (
                entity.branches.map((b) => (
                  <span key={b.city} className={chip}>
                    <Icon name="mapPin" className="size-3.5 text-brand-600" />
                    {b.city}
                  </span>
                ))
              ) : (
                <span className={chip}>
                  <Icon name="mapPin" className="size-3.5 text-brand-600" />
                  {entity.country === "United Kingdom" ? "United Kingdom" : "Nepal"}
                </span>
              )}
              {entity.sourceScale && (
                <span className={chip}>
                  <Icon name="bolt" className="size-3.5 text-brand-600" />
                  {entity.sourceScale}
                </span>
              )}
            </div>
            {linked && (
              <span aria-hidden className="flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-600">
                Website
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-mist-200 text-ink transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name="arrowUpRight" className="size-5" />
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
      {linked && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl ring-brand-600 ring-offset-2 group-has-[a:focus-visible]:ring-2"
        />
      )}
    </article>
  );
}
