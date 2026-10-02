import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Mountains } from "@/components/ui/Mountains";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const suggestions: { href: string; label: string; icon: IconName }[] = [
  { href: "/portfolio/", label: "Our portfolio", icon: "layers" },
  { href: "/investments/ample-homes-pokhara/", label: "Ample Cozy Homes, Pokhara", icon: "home" },
  { href: "/invest-nepal/", label: "Investing in Nepal", icon: "compass" },
  { href: "/about/", label: "About Ample", icon: "users" },
  { href: "/contact/", label: "Contact the team", icon: "mail" },
];

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-canvas via-canvas to-mist-100">
      <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-30" />
      <span aria-hidden className="ghost-number top-28 right-6 hidden text-ink md:block lg:right-16 lg:text-[16rem]">
        404
      </span>
      <div className="container-page relative pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-3xl">
          <p className="section-label">404 · Page not found</p>
          <h1 className="mt-7 text-[2.5rem] leading-[1.1] font-light tracking-[-0.03em] text-balance text-ink sm:text-display md:text-display-xl">
            We couldn&rsquo;t find <strong className="font-semibold text-brand-600">that page.</strong>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed font-light text-ink-muted md:text-lead">
            It may have moved, or the address may be mistyped. These pages might help:
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group flex h-full items-center gap-4 rounded-2xl bg-white p-5 shadow-lift transition-transform duration-300 hover:-translate-y-1 lg:flex-col lg:items-start"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-mist-200 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <span className="flex flex-1 items-center justify-between gap-3 font-semibold text-ink lg:w-full">
                  {s.label}
                  <Icon
                    name="arrowRight"
                    className="size-4 shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/" className="mt-12" mobileFull withArrow>
          Back to the homepage
        </ButtonLink>
      </div>
      <Mountains className="-mb-px h-24 md:h-40" />
    </section>
  );
}
