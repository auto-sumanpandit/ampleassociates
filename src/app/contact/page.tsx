import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { offices, site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { GhostNumber, SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { VerificationBadge } from "@/components/ui/StatusBadge";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CopyEmailButton } from "./_components/CopyEmailButton";

export const metadata = buildMetadata({
  title: "Contact Ample Associates | Projects & Partnerships in Nepal",
  description:
    "Email Ample Associates at contact@ampleassociates.com about our projects, investing through Back2Nepal or a partnership in the UK and Nepal.",
  path: "/contact/",
});

const topics: { icon: IconName; title: string; body: string; href: string; link: string }[] = [
  {
    icon: "home",
    title: "Ample Cozy Homes, Pokhara",
    body: "Current project information, including details shared on request.",
    href: "/investments/ample-homes-pokhara/",
    link: "Review the project",
  },
  {
    icon: "compass",
    title: "Investing through Back2Nepal",
    body: "Investment in Ample Associates projects in Nepal and the UK, from NPR 5 lakh.",
    href: "/investors/#back2nepal",
    link: "About Back2Nepal",
  },
  {
    icon: "building",
    title: "Partnerships and project proposals",
    body: "Landowners, developers and operators with a credible project in Ample's sectors.",
    href: "/sectors/",
    link: "Our sectors",
  },
];

/** Neutral guidance only: no promises about response times. */
const include: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "users",
    title: "Your name and country",
    body: "Who you are and where you live, so we know which part of the team is best placed to reply.",
  },
  {
    icon: "compass",
    title: "What you are interested in",
    body: "A current project, investing through Back2Nepal, or a partnership or project proposal.",
  },
  {
    icon: "layers",
    title: "The sector or company",
    body: "Education Consultancy, College, Energy Sector, Property Development or Financial Channel, or a specific company in our portfolio.",
  },
  {
    icon: "clock",
    title: "The best time to reply",
    body: "Your time zone and when you would prefer to hear from us.",
  },
];

const countries = ["United Kingdom", "Nepal"] as const;

export default function ContactPage() {
  const { email } = site.contact;

  return (
    <>
      <PageHero
        title={
          <>
            Talk to <strong>Our Team</strong>
          </>
        }
        intro="Whether you are exploring a project, looking for a development partner or presenting an opportunity, we would like to hear from you."
        breadcrumbs={[{ name: "Contact", path: "/contact/" }]}
      />

      {/* Email card and contact topics */}
      <section className="relative pb-24 md:pb-32">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-8">
          {email ? (
            <div className="on-dark relative isolate overflow-hidden rounded-3xl bg-brand-600 p-8 text-white shadow-glow md:p-12 lg:col-span-7">
              <div aria-hidden className="dot-grid-light absolute inset-0 -z-10 opacity-20" />
              <div
                aria-hidden
                className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-brand-800/70 blur-3xl"
              />
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white text-brand-600">
                  <Icon name="mail" className="size-6" />
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-white uppercase">
                  Public email
                </span>
              </div>
              <h2 className="mt-8 text-heading-sm font-semibold md:text-heading">Email Ample Associates</h2>
              <p className="mt-3 max-w-md text-lg leading-relaxed font-light text-brand-100">
                One address for our projects, investing through Back2Nepal and partnerships.
              </p>
              <div className="mt-8 rounded-2xl bg-brand-800/60 p-5 md:p-6">
                <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-100 uppercase">
                  Email address
                </p>
                <a
                  href={`mailto:${email}`}
                  className="mt-2 block text-xl font-semibold break-all text-white underline decoration-white/30 underline-offset-4 hover:decoration-white md:text-2xl"
                >
                  {email}
                </a>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CopyEmailButton email={email} className="w-full sm:w-auto" />
                <ButtonLink href={`mailto:${email}`} variant="onDarkOutline" mobileFull withArrow>
                  Write an email
                </ButtonLink>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-4 rounded-3xl bg-white p-8 shadow-lift md:p-12 lg:col-span-7">
              <Icon name="info" className="mt-1 size-6 shrink-0 text-brand-600" />
              <div>
                <p className="flex flex-wrap items-center gap-2 font-semibold text-ink">
                  Email <VerificationBadge status="TO_BE_CONFIRMED" />
                </p>
                <p className="mt-2 leading-relaxed text-ink-muted">
                  Direct contact details for Ample Associates are being confirmed and will be published here shortly.
                </p>
              </div>
            </div>
          )}

          <div className="lg:col-span-5 lg:pl-4">
            <p className="eyebrow">What you can contact us about</p>
            <ul className="mt-6 grid gap-4">
              {topics.map((t) => (
                <li key={t.title} className="flex gap-4 rounded-2xl bg-white p-6 shadow-lift">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-mist-200 text-brand-600">
                    <Icon name={t.icon} className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-ink">{t.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">{t.body}</p>
                    <ArrowLink href={t.href} className="mt-1">
                      {t.link}
                    </ArrowLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 01 What to include */}
      <section className="relative bg-mist-100 py-24 md:py-32">
        <GhostNumber n="01" />
        <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:gap-8">
          <SectionHeading
            className="lg:col-span-5"
            label="Before you write"
            title={
              <>
                What to include <span className="font-light">in your email</span>
              </>
            }
            intro="A few details help us pass your message to the right person in the UK or Nepal."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {include.map((item) => (
              <li key={item.title} className="reveal flex flex-col rounded-2xl bg-white p-7 shadow-lift">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-mist-200 text-brand-600">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 Offices */}
      <section
        aria-labelledby="locations"
        className="on-dark relative overflow-hidden bg-navy-950 py-24 text-white md:py-32"
      >
        <div aria-hidden className="dot-grid-light absolute inset-0 opacity-[0.06]" />
        <GhostNumber n="02" onDark />
        <div className="container-page relative">
          <SectionHeading
            onDark
            id="locations"
            label="Where Ample operates"
            title={
              <>
                Two homes, <span className="font-light text-sky-200">the UK and Nepal.</span>
              </>
            }
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-6">
            {countries.map((country) => {
              const cities = offices.filter((o) => o.country === country);
              return (
                <div key={country} className={country === "Nepal" ? "lg:col-span-2" : undefined}>
                  <p className="flex items-center gap-2.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-sky-200 uppercase">
                    <span aria-hidden className="size-1.5 rounded-full bg-sky-500" />
                    {country}
                  </p>
                  <ul className={country === "Nepal" ? "mt-5 grid gap-6 md:grid-cols-2" : "mt-5 grid gap-6"}>
                    {cities.map((o) => (
                      <li
                        key={o.city}
                        className="reveal flex h-full flex-col rounded-2xl border border-white/10 bg-navy-900 p-7 md:p-8"
                      >
                        <div className="flex items-center gap-4">
                          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
                            <Icon name="mapPin" className="size-6" />
                          </span>
                          <div>
                            <h3 className="text-[1.375rem] leading-tight font-semibold">{o.city}</h3>
                            <p className="text-sm text-slate-400">{o.country}</p>
                          </div>
                        </div>
                        <p className="mt-6 flex-1 leading-relaxed text-slate-300">{o.description}</p>
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                          <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-slate-400 uppercase">
                            Address
                          </span>
                          {o.address ? (
                            <span className="text-sm text-white">{o.address}</span>
                          ) : (
                            <VerificationBadge status={o.status} />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mt-14 max-w-2xl text-sm leading-relaxed text-slate-400">
            Contacting Ample does not create any commitment. See our{" "}
            <Link href="/privacy-policy/" className="text-sky-200 underline underline-offset-2 hover:text-white">
              Privacy Policy
            </Link>{" "}
            for how we handle your correspondence.
          </p>
        </div>
      </section>
    </>
  );
}
