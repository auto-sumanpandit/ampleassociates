import Image from "next/image";
import Link from "next/link";
import { getPortfolio, getProjects, getTeam } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";
import { portfolioGroups } from "@/content/portfolio";
import type { PortfolioGroup } from "@/types/content";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Mountains } from "@/components/ui/Mountains";
import { GhostNumber, SectionHeading } from "@/components/ui/SectionHeading";
import { VerificationBadge } from "@/components/ui/StatusBadge";
import { InvestorCTA } from "@/components/sections/InvestorCTA";
import { HeroMap } from "@/components/sections/HeroMap";
import { Back2NepalSection } from "@/components/sections/Back2NepalSection";
import { cn } from "@/lib/cn";

export const metadata = buildMetadata({
  title: "Ample Associates | Investment & Development Opportunities in Nepal",
  description:
    "Ample Associates: education, energy, property and a diaspora investment channel across the UK and Nepal, building since 2009. Explore our portfolio.",
  path: "/",
});

/** Bento cell, surface and icon for each sector, in the client's order (8+4, then 4+4+4). */
const bento: Record<PortfolioGroup, { cell: string; tone: "navy" | "white" | "lavender" | "royal"; icon: IconName }> = {
  "education-consultancy": { cell: "lg:col-span-8", tone: "navy", icon: "book" },
  college: { cell: "lg:col-span-4", tone: "white", icon: "building" },
  energy: { cell: "lg:col-span-4", tone: "navy", icon: "bolt" },
  "property-development": { cell: "lg:col-span-4", tone: "lavender", icon: "home" },
  "financial-channel": { cell: "md:col-span-2 lg:col-span-4", tone: "royal", icon: "globe" },
};

export default async function HomePage() {
  const [projects, portfolio, team] = await Promise.all([getProjects(), getPortfolio(), getTeam()]);
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const groups = portfolioGroups
    .map((g) => ({ ...g, items: portfolio.filter((p) => p.sector === g.slug) }))
    .filter((g) => g.items.length > 0);

  const stats = [
    { value: "2009", label: "When Ample officially began, in Pokhara" },
    { value: "30,000+", label: "Students helped to date" },
    { value: String(groups.length), label: "Sectors across the UK and Nepal" },
    { value: String(portfolio.length), label: "Companies and projects" },
  ];

  return (
    <>
      {/* Hero: lavender sky, dotted UK-to-Nepal map, Himalayan silhouette */}
      <section className="relative isolate overflow-hidden bg-linear-to-b from-canvas via-canvas to-mist-100">
        <div aria-hidden className="dot-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute top-24 right-0 -z-10 hidden w-[62%] max-w-[64rem] lg:block">
          <HeroMap variant="wide" tone="light" />
        </div>
        <div className="container-page relative pt-32 pb-10 md:pt-40 lg:min-h-[44rem] lg:pt-44">
          <div className="max-w-3xl">
            <p className="section-label">United Kingdom to Nepal</p>
            <h1 className="mt-7 text-[2.75rem] leading-[1.05] font-light tracking-[-0.035em] text-ink sm:text-display md:text-display-xl">
              <span className="block font-semibold">Rooted in Nepal.</span>
              <span className="block text-ink-muted">Growing from</span>
              <span className="block font-semibold text-brand-600">London.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed font-light text-ink-muted md:text-lead">
              Ample Associates builds education, energy, property and financial ventures across the United Kingdom and
              Nepal, for Nepali families at home and abroad.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact/" mobileFull withArrow>
                Talk to Our Team
              </ButtonLink>
              <ButtonLink href="/portfolio/" variant="secondary" mobileFull>
                View Our Portfolio
              </ButtonLink>
            </div>
          </div>
          <HeroMap variant="corridor" tone="light" className="mx-auto mt-12 max-w-xl lg:hidden" />
        </div>
        <Mountains className="-mb-px h-40 md:h-56 lg:h-64" />
      </section>

      {/* Stats card overlapping the mountains */}
      <section aria-label="Ample Associates in numbers" className="relative z-10 -mt-16 md:-mt-24">
        <div className="container-page">
          <dl className="grid gap-8 rounded-3xl bg-white p-8 shadow-dossier sm:grid-cols-2 lg:grid-cols-4 lg:p-12">
            {stats.map((s) => (
              <div key={s.label} className="group flex flex-col">
                <dd className="order-1 text-[2.75rem] leading-none font-semibold tracking-[-0.03em] text-brand-600 tabular-nums md:text-display">
                  {s.value}
                </dd>
                <dt className="order-2 mt-3 text-sm text-ink-muted">{s.label}</dt>
                <span
                  aria-hidden
                  className="order-3 mt-4 h-1 w-12 rounded-full bg-mist-300 transition-all duration-500 group-hover:w-full group-hover:bg-brand-600"
                />
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 01 Story */}
      <section className="relative py-24 md:py-32">
        <GhostNumber n="01" side="left" />
        <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow">Our story</p>
            <h2 className="mt-4 text-heading-sm font-light text-ink md:text-heading">
              From a <span className="font-semibold text-brand-600">Pokhara</span> office to a{" "}
              <span className="font-semibold text-brand-600">UK</span> and Nepal company.
            </h2>
            <p className="mt-5 max-w-md text-ink-muted">
              Every business starts somewhere. Ours started with a 16-year-old in Pokhara.
            </p>
          </div>
          <div className="reveal space-y-8 lg:col-span-7">
            <blockquote className="text-[1.75rem] leading-snug font-light tracking-[-0.02em] text-ink italic md:text-[2.125rem]">
              &ldquo;People are relationships, not transactions.&rdquo;
            </blockquote>
            <div className="grid gap-6 leading-relaxed text-ink-muted md:grid-cols-2">
              <p>
                In 2004, Pramod Adhikari took a job as an office boy at the Pokhara branch of Orbit International
                Education, on NPR 3,000 a month. After four years learning the business he opened his own education
                consultancy in 2009. That was the beginning of Ample.
              </p>
              <p>
                In 2010 he came to the UK to study. With his sister, Samjhana Adhikari, he built an agency that stood by
                more than 4,500 students when their colleges closed mid-course. That trust carried Ample into
                hydropower, solar, property and new businesses in the UK.
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl bg-mist-200 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-brand-600">
                  <Icon name="mapPin" className="size-6" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Pokhara to London</p>
                  <p className="text-sm text-ink-muted">Two countries, one Ample Associates</p>
                </div>
              </div>
              <ArrowLink href="/about/">Read our complete story</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Sectors bento */}
      <section className="on-dark relative overflow-hidden bg-navy-700 py-24 text-white md:py-32">
        <GhostNumber n="02" onDark />
        <div className="container-page relative">
          <SectionHeading
            onDark
            label="Our sectors"
            title={
              <>
                Five sectors, <span className="font-light text-sky-200">one Ample Associates.</span>
              </>
            }
            action={
              <ArrowLink href="/portfolio/" onDark>
                View the full portfolio
              </ArrowLink>
            }
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            {groups.map((g, i) => {
              const { cell, tone, icon } = bento[g.slug];
              const light = tone === "white" || tone === "lavender";
              return (
                <li key={g.slug} className={cn("reveal", cell)}>
                  <Link
                    href={`/sectors/${g.slug}/`}
                    className={cn(
                      "group flex h-full min-h-72 flex-col gap-6 rounded-2xl p-7 shadow-xl transition-transform duration-300 hover:-translate-y-1 md:p-8",
                      tone === "navy" && "border border-white/10 bg-navy-950",
                      tone === "white" && "bg-white text-ink",
                      tone === "lavender" && "bg-mist-300 text-ink",
                      tone === "royal" && "bg-brand-600",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span
                          className={cn(
                            "inline-flex size-12 shrink-0 items-center justify-center rounded-xl",
                            tone === "navy" && "bg-brand-600 text-white",
                            tone === "white" && "bg-mist-300 text-brand-600",
                            (tone === "lavender" || tone === "royal") && "bg-white text-brand-600",
                          )}
                        >
                          <Icon name={icon} className="size-6" />
                        </span>
                        <div>
                          <p
                            className={cn(
                              "text-[0.6875rem] font-semibold tracking-[0.12em] uppercase",
                              light ? "text-brand-600" : tone === "royal" ? "text-brand-100" : "text-sky-200",
                            )}
                          >
                            Sector {String(i + 1).padStart(2, "0")}
                          </p>
                          <h3 className="text-[1.375rem] leading-tight font-semibold md:text-heading-sm">{g.title}</h3>
                        </div>
                      </div>
                    </div>
                    <p className={cn("max-w-xl leading-relaxed", light ? "text-ink-muted" : "text-slate-300")}>
                      {g.summary}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-4">
                      <ul className="flex flex-wrap gap-2">
                        {g.items.map((e) => (
                          <li
                            key={e.slug}
                            className={cn(
                              "rounded-lg px-3 py-1 text-xs font-medium",
                              tone === "navy" && "bg-navy-700 text-white",
                              tone === "white" && "bg-mist-200 text-ink",
                              tone === "lavender" && "bg-white text-ink",
                              tone === "royal" && "bg-brand-800 text-white",
                            )}
                          >
                            {e.name}
                          </li>
                        ))}
                      </ul>
                      <span
                        aria-hidden
                        className={cn(
                          "inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45",
                          light
                            ? "bg-white text-ink group-hover:bg-brand-600 group-hover:text-white"
                            : tone === "royal"
                              ? "bg-white text-brand-600"
                              : "bg-white/10 text-white group-hover:bg-brand-600",
                        )}
                      >
                        <Icon name="arrowUpRight" className="size-5" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 03 Featured project */}
      {featured && (
        <section className="relative py-24 md:py-32">
          <GhostNumber n="03" side="left" />
          <div className="container-page relative grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <figure className="reveal relative lg:col-span-7">
              <div aria-hidden className="absolute inset-0 -rotate-2 rounded-3xl bg-mist-300" />
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-dossier">
                <div className="relative aspect-[16/11]">
                  {featured.heroImage && (
                    <Image
                      src={featured.heroImage.src}
                      alt={featured.heroImage.alt}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover"
                    />
                  )}
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase backdrop-blur-md">
                    Concept Image
                  </span>
                </div>
                <figcaption className="flex items-center justify-between gap-4 px-5 py-4 text-sm text-ink-muted">
                  <span>{featured.locationDetails?.heroCaption ?? "Design concept for Ample Cozy Homes"}</span>
                  <span className="hidden items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-sky-500 uppercase sm:flex">
                    <Icon name="mapPin" className="size-4" />
                    {featured.location}
                  </span>
                </figcaption>
              </div>
            </figure>
            <div className="reveal lg:col-span-5 lg:pl-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-mist-200 px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase">
                <Icon name="building" className="size-4" />
                An Ample Associates project
              </p>
              <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading">{featured.shortTitle}</h2>
              <p className="mt-5 leading-relaxed text-ink-muted">{featured.summary}</p>
              <dl className="mt-8 divide-y divide-line rounded-2xl bg-mist-100 px-5">
                {featured.keyFacts
                  .filter((f) =>
                    ["Number of homes", "Plot size per home", "Pricing", "Project stage"].includes(f.label),
                  )
                  .map((f) => (
                    <div key={f.label} className="flex items-center justify-between gap-4 py-3.5">
                      <dt className="text-sm text-ink-muted">{f.label}</dt>
                      <dd className="text-right text-sm font-semibold text-ink">
                        {f.status === "VERIFIED" ? f.value : <VerificationBadge status={f.status} />}
                      </dd>
                    </div>
                  ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <ButtonLink href={`/investments/${featured.slug}/`} mobileFull withArrow>
                  View the Project
                </ButtonLink>
                <ArrowLink href="/portfolio/">Full portfolio</ArrowLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Diaspora investment company */}
      <Back2NepalSection variant="teaser" />

      {/* 04 Leadership */}
      <section className="relative bg-mist-100 py-24 md:py-32">
        <GhostNumber n="04" />
        <div className="container-page relative">
          <SectionHeading
            label="Leadership"
            title="The people behind Ample Associates"
            intro="A brother and sister who have built Ample together since the early years, in Nepal and the UK."
            action={<ArrowLink href="/leadership/">Leadership &amp; governance</ArrowLink>}
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {team.map((m) => (
              <li key={m.slug} className="reveal">
                <Link
                  href={`/leadership/#${m.slug}`}
                  className="group flex h-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-lift transition-transform duration-300 hover:-translate-y-1 sm:flex-row md:p-8"
                >
                  {m.photo && (
                    <Image
                      src={m.photo.src}
                      alt={m.photo.alt}
                      width={320}
                      height={320}
                      sizes="10rem"
                      className="aspect-square w-32 shrink-0 rounded-xl object-cover sm:w-40"
                    />
                  )}
                  <div className="flex flex-1 flex-col">
                    <h3 className="text-[1.375rem] font-semibold text-ink">{m.name}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase">
                      {m.role}
                      {m.roleStatus !== "VERIFIED" && m.roleStatus !== "CLIENT_CONFIRMED" && (
                        <VerificationBadge status={m.roleStatus} />
                      )}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {m.expertise.map((x) => (
                        <li key={x} className="rounded-full bg-mist-200 px-3 py-1 text-xs font-medium text-ink-muted">
                          {x}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto flex items-center justify-between pt-6 text-sm font-semibold text-brand-600">
                      Read {m.name.split(" ")[0]}&rsquo;s profile
                      <span className="inline-flex size-9 items-center justify-center rounded-full bg-mist-200 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                        <Icon name="arrowRight" className="size-4" />
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InvestorCTA />
    </>
  );
}
