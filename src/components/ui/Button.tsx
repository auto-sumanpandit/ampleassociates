import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "onDark" | "onDarkOutline" | "text";

const base =
  "group inline-flex min-h-13 items-center justify-center gap-3 rounded-full px-7 text-[0.8125rem] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-out-quart active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-glow hover:bg-brand-800",
  secondary: "border border-line bg-white text-ink shadow-lift hover:bg-mist-100",
  onDark: "bg-white text-ink hover:bg-mist-100",
  onDarkOutline: "border border-white/20 bg-transparent text-white hover:border-brand-600 hover:bg-brand-600",
  text: "min-h-11 px-0 normal-case tracking-normal text-brand-600 underline-offset-4 hover:underline",
};

/** Arrow disc: a small white (or royal-blue) circle that nudges right on hover. */
function ArrowDisc({ variant }: { variant: Variant }) {
  const tone =
    variant === "primary"
      ? "bg-white text-brand-600"
      : variant === "onDark"
        ? "bg-brand-600 text-white"
        : variant === "onDarkOutline"
          ? "bg-white/10 text-white"
          : "bg-mist-200 text-brand-600";
  return (
    <span
      className={cn(
        "-mr-4 inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5",
        tone,
      )}
    >
      <Icon name="arrowRight" className="size-4" />
    </span>
  );
}

interface CommonProps {
  variant?: Variant;
  /** Full width below the sm breakpoint (mobile primary CTAs). */
  mobileFull?: boolean;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}

export function ButtonLink({
  href,
  variant = "primary",
  mobileFull,
  withArrow,
  children,
  className,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, "className">) {
  return (
    <Link href={href} className={cn(base, variants[variant], mobileFull && "w-full sm:w-auto", className)} {...rest}>
      {children}
      {withArrow && <ArrowDisc variant={variant} />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  mobileFull,
  withArrow,
  children,
  className,
  type = "button",
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "className">) {
  return (
    <button type={type} className={cn(base, variants[variant], mobileFull && "w-full sm:w-auto", className)} {...rest}>
      {children}
      {withArrow && <ArrowDisc variant={variant} />}
    </button>
  );
}

/** Inline "tertiary" link with arrow, used under cards and sections. */
export function ArrowLink({
  href,
  children,
  className,
  onDark,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-[0.02em] transition-colors",
        onDark ? "text-sky-200 hover:text-white" : "text-brand-600 hover:text-brand-800",
        className,
      )}
    >
      <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">
        {children}
      </span>
      <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
