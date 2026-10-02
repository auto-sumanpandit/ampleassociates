import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The Ample Associates icon (official artwork in public/brand/). `onDark` uses the
 * variant whose white cut-outs take the navy background colour.
 */
export function Emblem({ className, onDark }: { className?: string; onDark?: boolean }) {
  return (
    <Image
      src={onDark ? "/brand/ample-associates-icon-dark.svg" : "/brand/ample-associates-icon.svg"}
      alt=""
      width={420}
      height={420}
      unoptimized
      aria-hidden
      className={cn("object-contain", className)}
    />
  );
}

/** Logo lockup as supplied: icon, "AMPLE" in deep blue, "ASSOCIATES" letter-spaced below. */
export function Logo({ onDark, className, tagline }: { onDark?: boolean; className?: string; tagline?: boolean }) {
  return (
    <Link href="/" className={cn("flex min-h-11 items-center gap-2", className)} aria-label="Ample Associates home">
      <Emblem onDark={onDark} className="-my-1 size-11 shrink-0" />
      <span className="flex flex-col">
        <span
          className={cn(
            "text-[1.375rem] leading-none font-bold tracking-[0.04em]",
            onDark ? "text-white" : "text-[#0B4EA2]",
          )}
        >
          AMPLE
        </span>
        <span
          className={cn(
            "mt-1 text-[0.625rem] leading-none font-medium tracking-[0.34em] uppercase",
            onDark ? "text-[#5AB0F5]" : "text-[#1E88E5]",
          )}
        >
          Associates
        </span>
        {tagline && (
          <span
            className={cn(
              "mt-2 text-[0.5625rem] leading-none font-medium tracking-[0.14em] uppercase",
              onDark ? "text-slate-400" : "text-[#29466B]",
            )}
          >
            People | Partnerships | Progress
          </span>
        )}
      </span>
    </Link>
  );
}
