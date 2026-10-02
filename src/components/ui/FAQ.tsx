import type { FaqItem } from "@/types/content";
import { faqSchema } from "@/lib/seo/schema";
import { JsonLd } from "./JsonLd";
import { Icon } from "./Icon";

/**
 * Accessible accordion built on <details>/<summary>: works without JavaScript,
 * is keyboard operable, and keeps answers in the DOM for search engines.
 * Each question is a white rounded row with the chevron in a lavender disc.
 * Set `withSchema` only once per page, on the page's primary FAQ block.
 */
export function FAQ({ items, withSchema = false }: { items: FaqItem[]; withSchema?: boolean }) {
  return (
    <>
      <div className="flex flex-col gap-3 md:gap-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-line bg-white transition-shadow duration-300 open:shadow-lift hover:shadow-lift"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-left font-semibold text-ink md:gap-6 md:p-7 [&::-webkit-details-marker]:hidden">
              <span className="text-[1.0625rem] leading-snug md:text-lg">{item.question}</span>
              <span
                aria-hidden
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-mist-200 text-brand-600 transition-[background-color,color,transform] duration-300 group-open:rotate-180 group-open:bg-brand-600 group-open:text-white"
              >
                <Icon name="chevronDown" className="size-4" />
              </span>
            </summary>
            <p className="max-w-3xl px-5 pb-6 leading-relaxed text-ink-muted md:px-7 md:pb-7">{item.answer}</p>
          </details>
        ))}
      </div>
      {withSchema && <JsonLd data={faqSchema(items)} />}
    </>
  );
}
