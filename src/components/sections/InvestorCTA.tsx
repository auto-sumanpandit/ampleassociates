import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";

interface InvestorCTAProps {
  title?: ReactNode;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** Closing band used at the end of most pages: full-bleed royal blue with a dot grid. */
export function InvestorCTA({
  title = (
    <>
      <span className="font-extralight">Let&rsquo;s build</span>{" "}
      <span className="font-semibold">what&rsquo;s next.</span>
    </>
  ),
  body = "Talk to Ample Associates about our projects, our portfolio or a partnership across education, clean energy, property and the diaspora investment channel.",
  primary = { label: "Talk to Our Team", href: "/contact/" },
  secondary,
}: InvestorCTAProps) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-brand-600 text-white">
      <div aria-hidden className="dot-grid-light absolute inset-0 -z-10 opacity-20" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_50%_120%,rgb(36_2_148/0.7),transparent_70%)]"
      />
      <div className="container-page flex flex-col items-center py-20 text-center md:py-28">
        <h2 className="max-w-4xl text-[2.5rem] leading-[1.1] font-light tracking-[-0.03em] text-balance md:text-display-xl">
          {title}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed font-light text-brand-100">{body}</p>
        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href={primary.href} variant="onDark" mobileFull withArrow>
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} variant="onDarkOutline" mobileFull>
              {secondary.label}
            </ButtonLink>
          )}
        </div>
        {site.contact.email && (
          <a
            href={`mailto:${site.contact.email}`}
            className="mt-10 text-[0.6875rem] font-semibold tracking-[0.14em] text-brand-100 uppercase underline-offset-4 hover:text-white hover:underline"
          >
            {site.contact.email}
          </a>
        )}
      </div>
    </section>
  );
}
