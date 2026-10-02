import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPortfolio, getSectors, getTeam } from "@/lib/cms";
import { offices } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { InvestorCTA } from "@/components/sections/InvestorCTA";
import { HeroMap } from "@/components/sections/HeroMap";
import { GhostNumber, SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { VerificationBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";
import { stickyColumn } from "@/lib/layout";

export const metadata = buildMetadata({
  title: "About Ample Associates | A Nepal Journey Since 2009",
  description:
    "From an office boy's job in Pokhara in 2004 to a group across the UK and Nepal: how Pramod Adhikari and his sister Samjhana built Ample since 2009.",
  path: "/about/",
});

/**
 * The six values that shaped the journey, grouped into three principle cards:
 * each card leads with one value and pairs it with a second in its footer panel.
 */
const principles: {
  icon: IconName;
  title: string;
  body: string;
  pair: { title: string; body: string };
  cell: string;
  layout: "stack" | "split";
}[] = [
  {
    icon: "users",
    title: "Long-term trust",
    body: "Relationships are built to last longer than any single project.",
    pair: { title: "Integrity", body: "Serving people with integrity, including when it is inconvenient." },
    cell: "lg:col-span-8",
    layout: "stack",
  },
  {
    icon: "compass",
    title: "Honest work",
    body: "Progress is earned through discipline and persistence, not shortcuts.",
    pair: { title: "Improvement", body: "A standing commitment to doing each thing better the next time." },
    cell: "lg:col-span-4",
    layout: "stack",
  },
  {
    icon: "globe",
    title: "Listening",
    body: "Respecting client needs and responding to feedback.",
    pair: { title: "Responsibility", body: "Responsibility to the communities where Ample works." },
    cell: "lg:col-span-12",
    layout: "split",
  },
];

const microLabel = "text-[0.6875rem] font-semibold tracking-[0.12em] uppercase";

export default async function AboutPage() {
  const [team, sectors, portfolio] = await Promise.all([getTeam(), getSectors(), getPortfolio()]);
  const inCountry = (c: "Nepal" | "United Kingdom") =>
    portfolio.filter((p) => (p.branches ? p.branches.some((b) => b.country === c) : p.country === c)).length;
  const nepalCount = inCountry("Nepal");
  const ukCount = inCountry("United Kingdom");

  const facts = [
    { label: "Pokhara", value: "2009", note: "Ample officially began" },
    { label: "United Kingdom", value: "2010", note: "Came to the UK for further study" },
    { label: "Students", value: "30,000+", note: "Helped by Ample International Education to date", accent: true },
    { label: "Sectors", value: String(sectors.length), note: "From education to a financial channel" },
  ];

  const uk = offices.filter((o) => o.country === "United Kingdom");
  const nepal = offices.filter((o) => o.country === "Nepal");
  const homes = [
    { name: "UK", offices: uk },
    { name: "Nepal", offices: nepal },
  ];

  return (
    <>
      <PageHero
        title={
          <>
            About <strong>Ample Associates</strong>
          </>
        }
        intro="Built on belief and growing through long-term vision: hard work, family trust and the relationships we have built along the way, in Nepal and the United Kingdom."
        breadcrumbs={[{ name: "About", path: "/about/" }]}
        meta={[
          "Building since 2009",
          `${nepalCount} businesses and projects in Nepal`,
          `${ukCount} in the United Kingdom`,
        ]}
      />

      {/* 01 Story */}
      <section className="relative bg-white py-24 md:py-32">
        <GhostNumber n="01" side="left" />
        <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:gap-8">
          <aside className={cn("reveal lg:col-span-4", stickyColumn)}>
            <div className="rounded-2xl bg-mist-100 p-6">
              <div className="flex items-center justify-between">
                <p className={cn(microLabel, "text-ink-soft")}>Two countries</p>
                <Icon name="globe" className="size-5 text-brand-600" />
              </div>
              <div className="mt-5 rounded-xl bg-white p-4">
                <HeroMap variant="corridor" tone="light" priority={false} />
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <p className={cn(microLabel, "text-ink")}>Pokhara to London</p>
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-brand-600">
                  <Icon name="mapPin" className="size-4" />
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Where the story began, and where it grew: one family business, rooted in Nepal and connected to the
                United Kingdom.
              </p>
            </div>
          </aside>

          <div className="reveal lg:col-span-8 lg:pl-6">
            <p className="section-label">Our story</p>
            <h2 className="mt-5 max-w-2xl text-heading-sm font-light text-ink md:text-heading">
              From <span className="font-semibold text-brand-600">Orbit International</span> to a two-country company.
            </h2>
            <div className="mt-8 max-w-[680px] space-y-5 text-lg leading-relaxed text-ink-muted">
              <p>
                Ample didn&rsquo;t start in a boardroom, and it didn&rsquo;t start with big money. Its roots go back to
                2004, when a 16-year-old called Pramod Adhikari took a job as an office boy at the Pokhara branch of
                Orbit International Education. He earned NPR 3,000 a month, about £15, and learned something that has
                stayed with him ever since: progress comes from discipline, sacrifice and simply keeping going.
              </p>
              <p>
                Four years in education consultancy taught him the work inside out. In 2009 he opened his own, and that
                was the first chapter of Ample.
              </p>
              <p>
                In 2010 he came to the UK for further study, and by the end of that year Ample International Education
                was helping international students here too. He didn&rsquo;t do it alone. His sister, Samjhana Adhikari,
                was beside him as a partner from the early years. Together they stood by more than 4,500 students whose
                colleges closed in the middle of their courses, just when those students needed help most.
              </p>
            </div>
            <blockquote className="my-10 max-w-[680px] rounded-r-2xl border-l-4 border-brand-600 bg-mist-100 py-6 pr-6 pl-7">
              <p className="text-[1.5rem] leading-snug font-light tracking-[-0.02em] text-brand-600 italic md:text-[1.875rem]">
                &ldquo;People are relationships, not transactions.&rdquo;
              </p>
              <footer className={cn(microLabel, "mt-3 text-ink-soft")}>What service work teaches you quickly</footer>
            </blockquote>
            <div className="max-w-[680px] space-y-5 text-lg leading-relaxed text-ink-muted">
              <p>
                The students Ample helped, and the trust they placed in us, are what let the brand grow one step at a
                time: first in education, then into hydropower, solar, property and hospitality in Nepal, and into
                businesses in the UK, including SAMS College London.
              </p>
              <p>
                In 2025 we opened NRN Back 2 Nepal Investment Company in Kathmandu, so the people who have known us for
                years can take part in what we build next. Today, Ample Associates brings all of that experience to real
                projects in the UK and Nepal, shared openly, with our role, the facts and the risks set out plainly.
              </p>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col rounded-xl bg-mist-100 p-4">
                  <dt className={cn(microLabel, "order-1 text-ink-soft")}>{f.label}</dt>
                  <dd
                    className={cn(
                      "order-2 mt-2 text-[1.75rem] leading-none font-semibold tracking-[-0.03em] tabular-nums",
                      f.accent ? "text-brand-600" : "text-ink",
                    )}
                  >
                    {f.value}
                  </dd>
                  <dd className="order-3 mt-2 text-sm leading-snug text-ink-muted">{f.note}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-2">
                {sectors.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/sectors/${s.slug}/`}
                      className="inline-flex rounded-full bg-mist-200 px-3 py-1 text-xs font-medium text-ink transition-colors hover:bg-brand-600 hover:text-white"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <ArrowLink href="/portfolio/" className="shrink-0">
                View the portfolio register
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Principles */}
      <section className="relative bg-mist-100 py-24 md:py-32">
        <GhostNumber n="02" />
        <div className="container-page relative">
          <SectionHeading
            label="How we work"
            title={
              <>
                Values that have <span className="font-light">shaped the journey.</span>
              </>
            }
            intro="Growth matters. How that growth is created matters equally."
            action={<ArrowLink href="/investors/">How investing with us works</ArrowLink>}
          />
          <ul className="mt-14 grid gap-6 lg:grid-cols-12">
            {principles.map((p, i) => {
              const heading = (
                <>
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-mist-200 text-brand-600">
                    <Icon name={p.icon} className="size-6" />
                  </span>
                  <p className={cn(microLabel, "mt-6 text-ink-soft")}>Principle {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-[1.375rem] font-semibold text-ink md:text-heading-sm">{p.title}</h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">{p.body}</p>
                </>
              );
              const pair = (
                <div className="rounded-xl bg-mist-100 p-5">
                  <p className={cn(microLabel, "text-brand-600")}>{p.pair.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.pair.body}</p>
                </div>
              );
              return (
                <li
                  key={p.title}
                  className={cn(
                    "reveal rounded-2xl bg-white p-7 shadow-lift transition-shadow hover:shadow-dossier md:p-8",
                    p.cell,
                  )}
                >
                  {p.layout === "split" ? (
                    <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                      <div className="lg:col-span-8">{heading}</div>
                      <div className="lg:col-span-4">{pair}</div>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col justify-between gap-8">
                      <div>{heading}</div>
                      {pair}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 03 Two homes */}
      <section className="on-dark relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
        <GhostNumber n="03" onDark />
        <div aria-hidden className="dot-grid-light absolute inset-0 opacity-[0.06]" />
        <div className="container-page relative">
          <SectionHeading
            onDark
            label="Two homes"
            title={
              <>
                Rooted in Nepal. <span className="font-light text-sky-200">Connected internationally.</span>
              </>
            }
            intro="Ample's activity spans Nepal and the United Kingdom. That matters for the many Nepalis who live and work in the UK and want a trustworthy way to take part in projects at home."
          />
          <ul className="mt-14 grid gap-6 lg:grid-cols-2">
            {homes.map((h) => (
              <li
                key={h.name}
                className="reveal flex flex-col gap-6 rounded-2xl border border-white/10 bg-navy-700/40 p-7 md:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[2.75rem] leading-none font-semibold tracking-[-0.03em] text-white md:text-display">
                    {h.name}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white">
                    <span aria-hidden className="size-1.5 rounded-full bg-sky-200" />
                    {h.offices.map((o) => o.city).join(" · ")}
                  </span>
                </div>
                <ul className="flex flex-1 flex-col gap-4">
                  {h.offices.map((o) => (
                    <li key={o.city} className="rounded-xl bg-navy-950/70 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="flex items-center gap-2 font-semibold text-white">
                          <Icon name="mapPin" className="size-4 text-sky-500" />
                          {o.city}
                        </p>
                        <p className={cn(microLabel, "flex items-center gap-2 text-slate-400")}>
                          Address
                          {o.address ? (
                            <span className="tracking-normal text-white normal-case">{o.address}</span>
                          ) : (
                            <VerificationBadge status={o.status} />
                          )}
                        </p>
                      </div>
                      <p className="mt-3 leading-relaxed text-slate-300">{o.description}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 People */}
      <section className="relative py-24 md:py-32">
        <GhostNumber n="04" />
        <div className="container-page relative">
          <SectionHeading
            label="Leadership"
            title="The people behind Ample Associates"
            intro="The Ample story was shaped by Pramod Adhikari and Samjhana Adhikari, combining family trust, entrepreneurship and a shared belief in building for the long term."
            action={<ArrowLink href="/leadership/">Leadership</ArrowLink>}
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {team.map((m, i) => (
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
                    <p className={cn(microLabel, "text-ink-soft")}>Director {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 text-[1.375rem] font-semibold text-ink">{m.name}</h3>
                    <p className={cn(microLabel, "mt-1 flex flex-wrap items-center gap-2 text-brand-600")}>
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

      <InvestorCTA
        body="Ample Cozy Homes is the first project Ample Associates presents in detail. Talk to us about it, our portfolio or a partnership."
        secondary={{ label: "Explore Ample Cozy Homes", href: "/investments/ample-homes-pokhara/" }}
      />
    </>
  );
}
