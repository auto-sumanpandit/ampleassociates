import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { personSchema } from "@/lib/seo/schema";
import { getTeam } from "@/lib/cms";
import { PageHero } from "@/components/sections/PageHero";
import { InvestorCTA } from "@/components/sections/InvestorCTA";
import { GhostNumber, SectionHeading } from "@/components/ui/SectionHeading";
import { VerificationBadge } from "@/components/ui/StatusBadge";
import { ArrowLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { cn } from "@/lib/cn";
import { stickyColumn } from "@/lib/layout";

export const metadata = buildMetadata({
  title: "Leadership | Pramod Adhikari & Samjhana Adhikari",
  description:
    "Meet the founders and directors of Ample Associates, Pramod Adhikari and Samjhana Adhikari: their backgrounds and how they lead.",
  path: "/leadership/",
});

const principles: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Build for the long term",
    body: "Decisions are judged by whether they will still look right in ten years, not whether they look good this quarter.",
    icon: "clock",
  },
  {
    title: "Keep improving",
    body: "Long-term value is built through trust, discipline and the willingness to keep improving.",
    icon: "compass",
  },
  {
    title: "Be clear about roles",
    body: "Say who is responsible for what, in the organisation and on every project.",
    icon: "layers",
  },
  {
    title: "Grow beyond the founders",
    body: "Bring in advisers, specialists and partners around clear responsibilities as the organisation grows.",
    icon: "users",
  },
];

const microLabel = "text-[0.6875rem] font-semibold tracking-[0.12em] uppercase";

export default async function LeadershipPage() {
  const team = await getTeam();
  return (
    <>
      <PageHero
        title={
          <>
            Leadership built on <strong>vision, trust</strong> and long-term thinking.
          </>
        }
        intro="Ample was shaped by two siblings who chose perseverance over ease, integrity over shortcuts and purpose over noise."
        breadcrumbs={[
          { name: "About", path: "/about/" },
          { name: "Leadership", path: "/leadership/" },
        ]}
      />

      {/* 01 / 02 Director profiles */}
      {team.map((m, i) => (
        <section
          key={m.slug}
          id={m.slug}
          aria-labelledby={`${m.slug}-name`}
          className={cn("relative scroll-mt-28 py-24 md:py-32", i % 2 === 0 ? "bg-white" : "bg-mist-100")}
        >
          <GhostNumber n={String(i + 1).padStart(2, "0")} side={i % 2 === 0 ? "right" : "left"} />
          <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className={cn("reveal flex flex-col gap-6 lg:col-span-4", stickyColumn)}>
              <div className="relative">
                <div aria-hidden className="absolute inset-0 -rotate-2 rounded-3xl bg-mist-300" />
                <div className="relative overflow-hidden rounded-3xl bg-white p-3 shadow-dossier">
                  {m.photo ? (
                    <Image
                      src={m.photo.src}
                      alt={m.photo.alt}
                      width={640}
                      height={640}
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 100vw"
                      className="aspect-square w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`${m.name}, photograph to be supplied`}
                      className="flex aspect-square w-full items-center justify-center rounded-2xl bg-navy-950 text-display font-light text-sky-200"
                    >
                      {m.name
                        .split(" ")
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-lift">
                <p className={cn(microLabel, "text-ink-soft")}>Areas of experience</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {m.expertise.map((e) => (
                    <li key={e} className="rounded-full bg-mist-200 px-3 py-1 text-xs font-medium text-ink">
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="reveal lg:col-span-8 lg:pl-10">
              <p className="section-label">Director {String(i + 1).padStart(2, "0")}</p>
              <h2
                id={`${m.slug}-name`}
                className="mt-5 text-[2.5rem] leading-[1.1] font-light tracking-[-0.03em] text-ink md:text-display"
              >
                {m.name.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="font-semibold">{m.name.split(" ").slice(-1)}</span>
              </h2>
              <p className={cn(microLabel, "mt-4 flex flex-wrap items-center gap-2 text-brand-600")}>
                {m.role}
                {m.roleStatus !== "VERIFIED" && m.roleStatus !== "CLIENT_CONFIRMED" && (
                  <VerificationBadge status={m.roleStatus} />
                )}
              </p>
              <div className="mt-8 max-w-[680px] space-y-5 text-lg leading-relaxed text-ink-muted">
                {m.biography.map((p, j) => (
                  <p key={p.slice(0, 32)} className={cn(j === 0 && "text-xl font-light text-ink md:text-lead")}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-12 max-w-[680px]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-mist-200 text-brand-600">
                    <Icon name="book" className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">Education</h3>
                    {m.education.some((e) => e.status !== "VERIFIED" && e.status !== "CLIENT_CONFIRMED") && (
                      <p className="text-sm text-ink-muted">
                        As listed in the company profile. Being verified before publication as confirmed.
                      </p>
                    )}
                  </div>
                </div>
                <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white px-5 shadow-lift md:px-6">
                  {m.education.map((e) => (
                    <li
                      key={e.qualification}
                      className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                    >
                      <span>
                        <span className="block font-semibold text-ink">{e.qualification}</span>
                        <span className="text-sm text-ink-muted">{e.institution}</span>
                      </span>
                      {e.status !== "VERIFIED" && e.status !== "CLIENT_CONFIRMED" && (
                        <VerificationBadge status={e.status} className="self-start sm:self-center" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <JsonLd data={personSchema(m)} />
        </section>
      ))}

      {/* Governance principles */}
      <section className="on-dark relative overflow-hidden bg-navy-700 py-24 text-white md:py-32">
        <GhostNumber n={String(team.length + 1).padStart(2, "0")} onDark />
        <div className="container-page relative">
          <SectionHeading
            onDark
            label="How we lead"
            title={
              <>
                Leadership <span className="font-light text-sky-200">supported by governance.</span>
              </>
            }
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className="reveal flex flex-col gap-6 rounded-2xl border border-white/10 bg-navy-950 p-7 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                    <Icon name={p.icon} className="size-6" />
                  </span>
                  <span className={cn(microLabel, "text-sky-200 tabular-nums")}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-300">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-white p-7 text-ink md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex gap-4">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-mist-200 text-brand-600">
                <Icon name="shield" className="size-6" />
              </span>
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-ink">Advisers and specialists</h3>
                <p className="mt-1.5 leading-relaxed text-ink-muted">
                  Legal, technical and financial advisers will be named on individual project pages where they have
                  agreed to be named. No adviser is listed until that is confirmed.
                </p>
              </div>
            </div>
            <ArrowLink href="/portfolio/" className="shrink-0">
              See how each relationship is labelled
            </ArrowLink>
          </div>
        </div>
      </section>

      <InvestorCTA />
    </>
  );
}
