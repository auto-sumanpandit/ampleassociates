import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: ReactNode;
  intro?: ReactNode;
  /** Small uppercase pill above the headline. */
  label?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  id?: string;
  className?: string;
  /** A single link beside the heading, aligned to its baseline. */
  action?: ReactNode;
  onDark?: boolean;
}

/**
 * Section heading: optional pill label, a semibold headline (wrap a phrase in
 * <span className="font-light"> for the light/bold contrast) and an intro.
 */
export function SectionHeading({
  title,
  intro,
  label,
  as: Tag = "h2",
  align = "left",
  id,
  className,
  action,
  onDark,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {label && <p className="section-label mb-5">{label}</p>}
        <Tag
          id={id}
          className={cn(
            "text-heading-sm font-semibold text-balance md:text-heading",
            onDark ? "text-white" : "text-ink",
          )}
        >
          {title}
        </Tag>
        {intro && (
          <div
            className={cn(
              "mt-4 max-w-[60ch] text-lg leading-relaxed font-light",
              onDark ? "text-slate-400" : "text-ink-muted",
            )}
          >
            {intro}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/**
 * Outlined chapter number in a section's top-right corner. The section must be `relative`.
 * `side` is kept for call sites; numbers always sit on the right so they never cover a section label.
 */
export function GhostNumber({ n, onDark }: { n: string; side?: "left" | "right"; onDark?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn("ghost-number top-6 right-6 hidden md:block lg:right-16", onDark ? "text-white" : "text-ink")}
    >
      {n}
    </span>
  );
}
