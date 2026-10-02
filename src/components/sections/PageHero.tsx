import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  /** Optional pill label above the title. */
  eyebrow?: string;
  /** Wrap the key phrase in <strong> for the semibold royal-blue accent. */
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
  /** Short facts shown as a dotted row under the intro. */
  meta?: string[];
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Interior page hero: lavender wash (or deep navy), breadcrumb, a light display title
 * with a semibold accent, and an optional aside panel. Top padding clears the floating header.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  actions,
  aside,
  meta,
  tone = "light",
  className,
}: PageHeroProps) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        dark ? "on-dark bg-navy-950 text-white" : "bg-linear-to-b from-canvas via-canvas to-mist-100 text-ink",
        className,
      )}
    >
      {dark && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_85%_30%,rgb(61_3_250/0.35),transparent_70%)]"
        />
      )}
      <div
        aria-hidden
        className={cn("absolute inset-0 -z-10", dark ? "dot-grid-light opacity-[0.07]" : "dot-grid opacity-30")}
      />
      <div className="container-page pt-28 pb-14 md:pt-32 md:pb-20 lg:pb-24">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} onDark={dark} className="mb-8 md:mb-10" />}
        <div className={cn("grid gap-10", Boolean(aside) && "lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16")}>
          <div className="max-w-4xl">
            {eyebrow && <p className="section-label mb-6">{eyebrow}</p>}
            <h1
              className={cn(
                "text-[2.5rem] leading-[1.1] font-light tracking-[-0.03em] text-balance sm:text-display md:text-display-xl",
                "[&_strong]:font-semibold",
                dark ? "[&_strong]:text-sky-500" : "[&_strong]:text-brand-600",
              )}
            >
              {title}
            </h1>
            {intro && (
              <div
                className={cn(
                  "mt-6 max-w-2xl text-lg leading-relaxed font-light md:text-lead",
                  dark ? "text-slate-300" : "text-ink-muted",
                )}
              >
                {intro}
              </div>
            )}
            {meta && meta.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {meta.map((m) => (
                  <li
                    key={m}
                    className={cn(
                      "flex items-center gap-2.5 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase",
                      dark ? "text-sky-200" : "text-ink-muted",
                    )}
                  >
                    <span aria-hidden className={cn("size-1.5 rounded-full", dark ? "bg-sky-500" : "bg-brand-600")} />
                    {m}
                  </li>
                ))}
              </ul>
            )}
            {actions && <div className="mt-10 flex flex-col gap-3 sm:flex-row">{actions}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
