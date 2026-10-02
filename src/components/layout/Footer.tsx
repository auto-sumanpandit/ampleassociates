import Link from "next/link";
import { footerNav, offices, site } from "@/content/site";
import { Mountains } from "@/components/ui/Mountains";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "./Analytics";

export function Footer() {
  const year = new Date().getFullYear();
  const { legal } = site;
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 pb-16 text-slate-400 md:pb-0">
      <Mountains variant="dark" className="absolute inset-x-0 top-0 h-20 opacity-70 md:h-24" />
      <div className="container-page relative grid gap-12 pt-24 pb-14 md:pt-32 lg:grid-cols-[1.1fr_2.4fr] lg:gap-16">
        <div>
          <Logo onDark tagline />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">{site.positioning}</p>
          {site.contact.email && (
            <a
              href={`mailto:${site.contact.email}`}
              className="mt-6 inline-flex min-h-10 items-center text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              {site.contact.email}
            </a>
          )}
          <ul className="mt-6 flex flex-wrap gap-2">
            {offices.map((o) => (
              <li
                key={o.city}
                className="rounded-full border border-white/12 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-sky-200 uppercase"
              >
                {o.city}, {o.country === "United Kingdom" ? "UK" : o.country}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-[0.6875rem] font-semibold tracking-[0.14em] text-white uppercase">{group.heading}</h2>
              <ul className="mt-4 space-y-0.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-9 items-center text-sm transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="relative border-t border-white/12">
        <div className="container-page flex flex-col gap-4 py-8 text-xs leading-relaxed lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-2">
            <p>
              © {year} {legal.legalName ?? site.name}.{" "}
              {legal.registrationNumber && legal.registeredOffice
                ? `Registered number ${legal.registrationNumber}. Registered office: ${legal.registeredOffice}.`
                : "Ample Associates is the brand name of the companies and projects shown on this website."}
            </p>
            <p>
              This website provides information only. It is not an offer or solicitation, does not accept investments,
              and nothing on it is financial advice. Investment involves risk, including loss of capital.{" "}
              <Link href="/risk-disclosure/" className="text-slate-200 underline underline-offset-2">
                Read the risk disclosure
              </Link>
              .
            </p>
          </div>
          <CookieSettingsButton />
        </div>
      </div>
    </footer>
  );
}
