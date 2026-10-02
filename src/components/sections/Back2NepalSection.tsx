import Link from "next/link";
import { site } from "@/content/site";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { VerificationBadge } from "@/components/ui/StatusBadge";

/** Facts supplied by the client, 26 Sep 2026. Stated here only, not repeated in the prose. */
const facts = [
  { value: "NPR 5 lakh", label: "Minimum investment" },
  { value: "Kathmandu", label: "Operates from" },
  { value: "2025", label: "Operating since" },
];

const markets = [
  { id: "uk-projects", title: "Projects in the United Kingdom" },
  { id: "nepal-projects", title: "Projects in Nepal" },
];

/**
 * NRN Back 2 Nepal Investment Company, the Ample Associates investment arm.
 * "teaser" (homepage) introduces it and points to the Investor Centre;
 * "full" (Investor Centre) explains how it works.
 */
export function Back2NepalSection({
  variant = "full",
  showFacts = true,
}: {
  variant?: "full" | "teaser";
  /** Hide the fact panel when the page already states the facts (e.g. the Investor Centre hero). */
  showFacts?: boolean;
}) {
  const email = site.contact.email;

  if (variant === "teaser") {
    return (
      <section id="back2nepal" aria-labelledby="back2nepal-heading" className="scroll-mt-28 pb-24 md:pb-32">
        <div className="container-page">
          <div className="on-dark reveal relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-brand-800 via-navy-700 to-navy-950 p-8 text-white shadow-dossier md:p-12 lg:p-16">
            <div
              aria-hidden
              className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-sky-500/20 blur-3xl"
            />
            <svg
              aria-hidden
              viewBox="0 0 400 180"
              className="absolute right-0 bottom-0 -z-10 w-[26rem] max-w-[70%] text-white opacity-10"
            >
              <path d="M0 180L120 70L190 130L260 40L330 110L400 30V180H0Z" fill="currentColor" />
            </svg>
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="section-label">Diaspora investment company</p>
                <h2 id="back2nepal-heading" className="mt-5 text-heading-sm font-semibold text-balance md:text-heading">
                  NRN Back 2 Nepal Investment Company
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed font-light text-slate-300">
                  As Ample Associates grows, we want our community to grow with us, especially the people who have used
                  our services and known us for a decade. Back2Nepal gives them a way to invest in our projects.
                </p>
                <ArrowLink href="/investors/#back2nepal" onDark className="mt-6">
                  How investing through Back2Nepal works
                </ArrowLink>
              </div>
              <dl className="flex flex-col lg:col-span-5 lg:items-end lg:text-right">
                <dt className="text-[0.6875rem] font-semibold tracking-[0.14em] text-sky-200 uppercase">
                  {facts[0].label}
                </dt>
                <dd className="mt-2 text-[3.5rem] leading-none font-extralight tracking-[-0.03em] whitespace-nowrap md:text-[5rem]">
                  {facts[0].value}
                </dd>
                <dd className="mt-4 text-sm text-slate-400">
                  {facts[2].label} {facts[2].value} · {facts[1].label.toLowerCase()} {facts[1].value}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="back2nepal" aria-labelledby="back2nepal-heading" className="scroll-mt-28 py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="reveal">
            <p className="section-label mb-5">Diaspora investment company</p>
            <h2 id="back2nepal-heading" className="text-heading-sm font-semibold text-balance text-ink md:text-heading">
              NRN Back 2 Nepal Investment Company
            </h2>
            <p className="mt-2 text-ink-soft">NRN Back 2 Nepal Investment Company Pvt. Limited</p>
            <div className="mt-6 max-w-[62ch] space-y-4 text-lg leading-relaxed font-light text-ink-muted">
              <p>
                As Ample Associates grows globally, we want our community to grow with us, especially the people who
                have used our services and have known us for a decade. Back2Nepal gives them a way to invest in our
                projects.
              </p>
              <p>
                When we accept investment from our investor friends, we prepare the legal documents required by the
                Government of Nepal or the UK Government, and provide the documents needed for investment assurance.
              </p>
              <p>
                When an investment opportunity opens, we publish it on our news portal, where you can fill in the form
                to register.
              </p>
            </div>
            <ArrowLink href="/sectors/financial-channel/" className="mt-6">
              More about our Financial Channel
            </ArrowLink>
          </div>

          <div className="on-dark reveal relative isolate flex flex-col self-start overflow-hidden rounded-3xl border border-white/10 bg-navy-950 p-8 text-white shadow-dossier md:p-10">
            <div
              aria-hidden
              className="absolute -top-20 -right-20 -z-10 size-64 rounded-full bg-brand-600/30 blur-3xl"
            />
            {showFacts && (
              <>
                <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-sky-200 uppercase">
                  {facts[0].label}
                </p>
                <p className="mt-2 text-[3.5rem] leading-none font-extralight tracking-[-0.03em]">{facts[0].value}</p>
                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/12 pt-6">
                  {facts.slice(1).map((f) => (
                    <div key={f.label} className="flex flex-col gap-1">
                      <dt className="order-2 text-sm text-slate-400">{f.label}</dt>
                      <dd className="order-1 text-xl font-semibold">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
            {email && (
              <div className={showFacts ? "mt-8 border-t border-white/12 pt-8" : ""}>
                <ButtonLink href="/contact/" variant="onDark" mobileFull withArrow>
                  Talk to Our Team
                </ButtonLink>
                <p className="mt-4 text-sm text-slate-400">
                  Or write to{" "}
                  <a href={`mailto:${email}`} className="font-semibold text-white underline underline-offset-4">
                    {email}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="reveal mt-14 grid gap-8 border-t border-line pt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <h3 className="text-lg font-semibold text-ink">Where you will be able to invest</h3>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {markets.map((m) => (
                <li key={m.id} id={m.id} className="flex scroll-mt-28 items-center gap-3 font-medium text-ink">
                  {m.title}
                  <VerificationBadge status="COMING_SOON" />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-start gap-4 rounded-2xl bg-mist-200 p-5">
            <Icon name="shield" className="mt-0.5 size-6 shrink-0 text-brand-600" />
            <p className="text-sm leading-relaxed text-ink-muted">
              Investing involves risk, including the loss of money invested. Please read our{" "}
              <Link href="/risk-disclosure/" className="text-brand-600 underline underline-offset-2">
                risk disclosure
              </Link>{" "}
              and take independent advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
