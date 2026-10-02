import Image from "next/image";
import type { ReactNode } from "react";
import type { MediaImage } from "@/types/content";
import { cn } from "@/lib/cn";

interface MediaFigureProps {
  image: MediaImage;
  sizes: string;
  preload?: boolean;
  /** Applied to the figure. Pass the aspect ratio and radius here (e.g. "aspect-[4/3] rounded-2xl"). */
  className?: string;
  imageClassName?: string;
  /** Show the kind ("Location Image", "Concept Image", etc.) as a chip on the image. */
  showKind?: boolean;
  caption?: string;
  /** Optional right-hand item in the caption row (e.g. a location). */
  captionAside?: ReactNode;
}

/**
 * Image with its kind chip and a caption row (caption and licence credit), so
 * imagery is never mistaken for an Ample project. The figure sits in a white
 * frame and the image fills the space left above the caption row.
 */
export function MediaFigure({
  image,
  sizes,
  preload,
  className,
  imageClassName,
  showKind = true,
  caption,
  captionAside,
}: MediaFigureProps) {
  const hasCaptionRow = Boolean(caption || image.credit || captionAside);
  return (
    // The outer frame takes the caller's classes (aspect, radius, display), so the
    // figure's own flex layout cannot be overridden by e.g. "hidden lg:block".
    <div className={cn("relative overflow-hidden bg-white", className)}>
      <figure className="flex h-full flex-col">
        <div className="relative min-h-32 flex-1 overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            preload={preload}
            loading={preload ? "eager" : undefined}
            className={cn("object-cover", imageClassName)}
          />
          {showKind && (
            <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase backdrop-blur-md">
              {image.kind}
            </span>
          )}
        </div>
        {hasCaptionRow && (
          <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3.5 text-[0.8125rem] leading-snug text-ink-muted">
            <span className="min-w-0">
              {caption && <span className="block text-sm text-ink-muted">{caption}</span>}
              {image.credit && (
                <span className={cn("block text-xs text-ink-soft", caption && "mt-0.5")}>
                  Photo:{" "}
                  {image.creditUrl ? (
                    <a
                      href={image.creditUrl}
                      className="relative z-10 underline underline-offset-2 hover:text-ink"
                      rel="noopener"
                      target="_blank"
                    >
                      {image.credit}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    image.credit
                  )}
                </span>
              )}
            </span>
            {captionAside && (
              <span className="flex shrink-0 items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-sky-500 uppercase">
                {captionAside}
              </span>
            )}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
