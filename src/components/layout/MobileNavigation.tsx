"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { NavItem } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { isActivePath } from "./NavLinks";

/**
 * Mobile navigation drawer on the native <dialog> element: focus is trapped,
 * Escape closes it and the page behind is inert without extra libraries.
 */
export function MobileNavigation({ items, secondary }: { items: NavItem[]; secondary: NavItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-mist-100 lg:hidden"
        aria-haspopup="dialog"
        aria-controls="mobile-nav"
      >
        <Icon name="menu" className="size-6" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        id="mobile-nav"
        ref={dialogRef}
        aria-label="Site menu"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-md overflow-hidden border-0 bg-canvas p-0 text-ink backdrop:bg-navy-950/60 backdrop:backdrop-blur-sm open:flex open:flex-col"
      >
        <div className="flex h-20 items-center justify-between border-b border-line px-5">
          <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-muted uppercase">Menu</span>
          <button
            type="button"
            onClick={close}
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-mist-200"
            autoFocus
          >
            <Icon name="close" className="size-6" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="divide-y divide-line">
            {items.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-16 items-center justify-between text-[1.75rem] tracking-[-0.02em]",
                      active ? "font-semibold text-brand-600" : "font-light text-ink",
                    )}
                  >
                    {item.label}
                    <Icon name="arrowRight" className="size-5 text-ink-soft" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-1">
            {secondary.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-11 items-center text-sm text-ink-muted">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid gap-3 border-t border-line p-5">
          <Link
            href="/contact/"
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-brand-600 px-6 text-sm font-semibold tracking-[0.08em] text-white uppercase shadow-glow"
          >
            Talk to Our Team
          </Link>
          <Link
            href="/portfolio/"
            className="inline-flex min-h-13 items-center justify-center rounded-full border border-line-strong bg-white px-6 text-sm font-semibold text-ink"
          >
            View Our Portfolio
          </Link>
        </div>
      </dialog>
    </>
  );
}

const tabs = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Sectors", href: "/sectors/", icon: "layers" },
  { label: "Portfolio", href: "/portfolio/", icon: "building" },
] as const;

/** Bottom tab bar on phones: three destinations and the contact pill. */
export function MobileTabBar() {
  const pathname = usePathname() ?? "/";
  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <div className="flex h-16 items-center gap-1 px-3">
        {tabs.map((t) => {
          const active = isActivePath(pathname, t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-w-14 flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[0.6875rem] font-medium",
                active ? "text-brand-600" : "text-ink-muted",
              )}
            >
              <Icon name={t.icon} className="size-5" />
              {t.label}
            </Link>
          );
        })}
        <Link
          href="/contact/"
          className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-600 pr-2 pl-4 text-[0.6875rem] font-semibold tracking-[0.08em] text-white uppercase shadow-glow"
        >
          Talk to Our Team
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-white text-brand-600">
            <Icon name="arrowRight" className="size-3.5" />
          </span>
        </Link>
      </div>
    </nav>
  );
}
