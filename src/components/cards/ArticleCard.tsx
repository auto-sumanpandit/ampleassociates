import Image from "next/image";
import Link from "next/link";
import type { Insight } from "@/types/content";
import { getInsightCategory } from "@/lib/cms";
import { formatDate } from "@/components/ui/SourceCitation";
import { Icon } from "@/components/ui/Icon";

/**
 * Insight card: cover photo (when the article has one), category chip, title, excerpt,
 * then date and an arrow disc. The whole card is one link; the photo credit stays outside it.
 */
export function ArticleCard({ insight }: { insight: Insight }) {
  const category = getInsightCategory(insight.category);
  const cover = insight.cover;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
      {cover && (
        <div className="relative aspect-[16/9] overflow-hidden bg-mist-200">
          <Image
            src={cover.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {category && (
            <p className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase backdrop-blur-md">
              {category.title}
            </p>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-7 md:p-8">
        {category && !cover && (
          <p className="mb-5 self-start rounded-full bg-mist-200 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase">
            {category.title}
          </p>
        )}
        <h3 className="text-[1.25rem] leading-snug font-semibold tracking-[-0.01em] text-ink md:text-[1.375rem]">
          <Link
            href={`/insights/${insight.category}/${insight.slug}/`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {insight.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{insight.excerpt}</p>
        <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-5">
          <time
            dateTime={insight.publishedAt}
            className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-soft uppercase"
          >
            {formatDate(insight.publishedAt)}
          </time>
          <span aria-hidden className="flex items-center gap-2 text-sm font-semibold text-brand-600">
            Read
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-mist-200 transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand-600 group-hover:text-white">
              <Icon name="arrowUpRight" className="size-4" />
            </span>
          </span>
        </div>
        {cover?.credit && (
          <p className="relative z-10 mt-4 text-[0.6875rem] text-ink-soft">
            Photo:{" "}
            {cover.creditUrl ? (
              <a href={cover.creditUrl} rel="noopener" target="_blank" className="underline underline-offset-2">
                {cover.credit}
              </a>
            ) : (
              cover.credit
            )}
          </p>
        )}
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-brand-600 ring-offset-2 group-has-[a:focus-visible]:ring-2"
      />
    </article>
  );
}
