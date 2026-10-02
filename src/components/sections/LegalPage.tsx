import { notFound } from "next/navigation";
import Link from "next/link";
import { getPolicy } from "@/lib/cms";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { VerificationBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/components/ui/SourceCitation";
import { Icon } from "@/components/ui/Icon";
import { stickyColumn } from "@/lib/layout";
import { cn } from "@/lib/cn";

const related = [
  { href: "/risk-disclosure/", label: "Risk Disclosure" },
  { href: "/investment-disclaimer/", label: "Investment Disclaimer" },
  { href: "/privacy-policy/", label: "Privacy Policy" },
  { href: "/cookie-policy/", label: "Cookie Policy" },
  { href: "/terms/", label: "Terms of Use" },
];

function anchor(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const microLabel = "text-[0.6875rem] font-semibold tracking-[0.12em] uppercase";

/**
 * Shared template for legal and policy pages: hero with a status card, then numbered
 * sections in a white document card beside a sticky contents list and the legal-pages menu.
 */
export function LegalPage({ slug }: { slug: string }) {
  const policy = getPolicy(slug);
  if (!policy) notFound();
  const draft = policy.status !== "VERIFIED" && policy.status !== "CLIENT_CONFIRMED";
  const sections = policy.sections.map((s, i) => ({ ...s, id: anchor(s.heading), n: String(i + 1).padStart(2, "0") }));

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={policy.title}
        intro={policy.summary}
        breadcrumbs={[{ name: policy.title, path: `/${policy.slug}/` }]}
        aside={
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-lift">
            <div className="bg-white p-5">
              <dt className={cn(microLabel, "text-ink-soft")}>Last updated</dt>
              <dd className="mt-2 font-semibold text-ink">
                <time dateTime={policy.lastUpdated}>{formatDate(policy.lastUpdated)}</time>
              </dd>
            </div>
            <div className="bg-white p-5">
              <dt className={cn(microLabel, "text-ink-soft")}>Sections</dt>
              <dd className="mt-2 font-semibold text-ink tabular-nums">{sections.length}</dd>
            </div>
            <div className="col-span-2 bg-white p-5">
              <dt className={cn(microLabel, "text-ink-soft")}>Status</dt>
              <dd className="mt-2 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
                {draft ? (
                  <>
                    <VerificationBadge status={policy.status} /> Draft pending legal review.
                  </>
                ) : (
                  <span className="font-semibold text-ink">Reviewed</span>
                )}
              </dd>
            </div>
          </dl>
        }
      />

      <section className="bg-mist-100 py-16 md:py-24">
        <div className="container-page grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-10">
          <aside className={cn("order-2 grid content-start gap-5 lg:order-1", stickyColumn)}>
            {sections.length > 1 && (
              <nav aria-label="On this page" className="hidden rounded-2xl border border-line bg-white p-5 lg:block">
                <p className={cn(microLabel, "px-1 text-brand-600")}>On this page</p>
                <ol className="mt-3 space-y-0.5">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="flex gap-3 rounded-lg px-1 py-1.5 text-sm leading-snug text-ink-muted transition-colors hover:text-brand-600"
                      >
                        <span className="text-ink-soft tabular-nums">{s.n}</span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <nav aria-label="Legal pages" className="rounded-2xl border border-line bg-white p-5">
              <p className={cn(microLabel, "px-1 text-ink-soft")}>Legal pages</p>
              <ul className="mt-3 space-y-1">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      aria-current={r.href === `/${policy.slug}/` ? "page" : undefined}
                      className="flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-mist-100 hover:text-ink aria-[current=page]:bg-mist-200 aria-[current=page]:font-semibold aria-[current=page]:text-brand-600"
                    >
                      {r.label}
                      <Icon name="arrowRight" className="size-4 shrink-0 opacity-60" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="order-1 min-w-0 rounded-3xl border border-line bg-white shadow-lift lg:order-2">
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-heading`}
                className="grid scroll-mt-28 gap-4 border-t border-line p-6 first:border-t-0 sm:p-8 md:grid-cols-[4.5rem_1fr] md:gap-6 md:p-10"
              >
                <span aria-hidden className="text-[2.5rem] leading-none font-extralight text-brand-600 tabular-nums">
                  {s.n}
                </span>
                <div className="min-w-0">
                  <h2
                    id={`${s.id}-heading`}
                    className="text-xl font-semibold tracking-[-0.01em] text-ink md:text-[1.5rem]"
                  >
                    {s.heading}
                  </h2>
                  <div className="mt-4 max-w-[44rem] space-y-4 leading-relaxed text-ink-muted">
                    {s.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                  {s.list && (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {s.list.map((li) => (
                        <li
                          key={li}
                          className="flex gap-3 rounded-xl bg-mist-100 p-4 text-sm leading-relaxed text-ink-muted"
                        >
                          <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand-600" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
            {site.contact.email && (
              <div className="flex flex-col gap-4 rounded-b-3xl bg-navy-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8 md:px-10">
                <div className="flex items-center gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600">
                    <Icon name="mail" className="size-5" />
                  </span>
                  <p className="text-sm text-slate-300">
                    Questions about this page?
                    <span className="block font-semibold text-white">Write to {site.contact.email}</span>
                  </p>
                </div>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 text-xs font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:bg-mist-100"
                >
                  Email us
                </a>
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
