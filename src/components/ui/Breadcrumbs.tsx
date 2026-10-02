import Link from "next/link";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/schema";
import { cn } from "@/lib/cn";
import { JsonLd } from "./JsonLd";

/** Visible breadcrumb trail plus BreadcrumbList JSON-LD. The last crumb is the current page. */
export function Breadcrumbs({ items, onDark, className }: { items: Crumb[]; onDark?: boolean; className?: string }) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-[0.6875rem] font-semibold tracking-[0.12em] uppercase", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={onDark ? "text-white" : "text-brand-600"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={c.path}
                      className={cn("underline-offset-4 hover:underline", onDark ? "text-slate-300" : "text-ink-muted")}
                    >
                      {c.name}
                    </Link>
                    <span aria-hidden className={onDark ? "text-slate-500" : "text-ink-soft"}>
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
