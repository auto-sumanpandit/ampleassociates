import Link from "next/link";
import { primaryNav } from "@/content/site";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { MobileNavigation } from "./MobileNavigation";

const mobileSecondary = [
  { label: "Ample Cozy Homes", href: "/investments/ample-homes-pokhara/" },
  { label: "Why Nepal", href: "/invest-nepal/" },
  { label: "Leadership", href: "/leadership/" },
  { label: "Insights", href: "/insights/" },
];

/**
 * Floating white pill header that stays pinned while the page scrolls.
 * The pill sits in a zero-height sticky wrapper, so heroes run underneath it; every hero
 * reserves room for it with top padding (see PageHero).
 */
export function Header() {
  return (
    <>
      <header className="sticky top-0 z-40 h-0">
        <div className="container-page pt-3 md:pt-4">
          <div className="flex h-16 items-center justify-between gap-4 rounded-full border border-line-strong/40 bg-white/90 pr-2 pl-5 shadow-lift backdrop-blur-xl md:pl-7">
            <Logo />
            <nav aria-label="Primary" className="hidden lg:block">
              <NavLinks items={primaryNav} />
            </nav>
            <div className="flex items-center gap-1">
              <Link
                href="/contact/"
                className="hidden min-h-11 items-center rounded-full bg-brand-600 px-6 text-xs font-semibold tracking-[0.08em] text-white uppercase shadow-glow transition-colors hover:bg-brand-800 sm:inline-flex"
              >
                Talk to Our Team
              </Link>
              <MobileNavigation items={primaryNav} secondary={mobileSecondary} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
