import { cn } from "@/lib/cn";

interface Step {
  title: string;
  body: string;
}

/**
 * Numbered process as cards with light, large numerals (01, 02, 03...).
 * Without `columns` the steps stack as horizontal cards (for a narrow column
 * beside a heading); with `columns` they form a grid of vertical cards on
 * desktop. Rendered as an ordered list for screen readers.
 */
export function ProcessTimeline({
  steps,
  columns,
  onDark,
}: {
  steps: readonly Step[];
  columns?: 3 | 4 | 6 | 7;
  onDark?: boolean;
}) {
  // Six or seven steps wrap onto two rows: one row of seven would be too narrow for cards.
  const colClass = {
    3: "md:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    6: "sm:grid-cols-2 lg:grid-cols-3",
    7: "sm:grid-cols-2 lg:grid-cols-4",
  } as const;
  const stacked = !columns;
  return (
    <ol className={cn("grid gap-4 md:gap-5", columns && colClass[columns])}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={cn(
            "flex rounded-2xl p-6 transition-shadow duration-300 md:p-8",
            stacked ? "flex-row items-start gap-5 md:gap-7" : "flex-col",
            onDark ? "border border-white/10 bg-navy-950" : "border border-line bg-white hover:shadow-lift",
          )}
        >
          <div className={cn("flex items-center justify-between", stacked ? "shrink-0" : "mb-6")}>
            <span
              aria-hidden
              className={cn(
                "leading-none font-extralight tracking-[-0.04em] tabular-nums",
                stacked ? "w-14 text-[2.75rem] md:w-16 md:text-[3.25rem]" : "text-[3rem] md:text-[3.5rem]",
                onDark ? "text-sky-200" : "text-brand-600",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {!stacked && (
              <span aria-hidden className={cn("size-2 rounded-full", onDark ? "bg-sky-500" : "bg-brand-600")} />
            )}
          </div>
          <div className={cn(stacked && "pt-1 md:pt-2")}>
            <h3 className={cn("text-lg leading-snug font-semibold", onDark ? "text-white" : "text-ink")}>
              {step.title}
            </h3>
            <p className={cn("mt-2 leading-relaxed", onDark ? "text-slate-300" : "text-ink-muted")}>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
