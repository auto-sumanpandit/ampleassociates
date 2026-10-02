import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/types/content";
import { VerificationBadge } from "@/components/ui/StatusBadge";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const portraitSizes = {
  md: { box: "size-16", px: 128, radius: "rounded-xl" },
  lg: { box: "w-32 sm:w-40", px: 320, radius: "rounded-xl" },
  xl: { box: "w-40 md:w-48", px: 384, radius: "rounded-2xl" },
} as const;

/**
 * Director's own photograph (square, rounded; or a circle with `shape="circle"`).
 * Only real photographs are shown: with no photograph nothing is rendered,
 * never a monogram or generated placeholder.
 */
export function Portrait({
  member,
  size = "lg",
  shape = "square",
  className,
}: {
  member: TeamMember;
  size?: keyof typeof portraitSizes;
  shape?: "square" | "circle";
  className?: string;
}) {
  if (!member.photo) return null;
  const { box, px, radius } = portraitSizes[size];
  return (
    <Image
      src={member.photo.src}
      alt={member.photo.alt}
      width={px}
      height={px}
      sizes={`${px / 2}px`}
      className={cn(
        "aspect-square shrink-0 object-cover",
        box,
        shape === "circle" ? "rounded-full" : radius,
        className,
      )}
    />
  );
}

/** Leader card: photograph, name, royal-blue role micro-label with its badge, expertise chips and profile link. */
export function TeamCard({ member }: { member: TeamMember }) {
  const first = member.name.split(" ")[0];
  return (
    <article className="group relative flex h-full flex-col gap-6 rounded-2xl border border-line bg-white p-6 shadow-lift transition-transform duration-300 hover:-translate-y-1 sm:flex-row md:p-8">
      <Portrait member={member} />
      <div className="flex flex-1 flex-col">
        <h3 className="text-[1.375rem] leading-tight font-semibold tracking-[-0.01em] text-ink">{member.name}</h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand-600 uppercase">
          {member.role}
          {member.roleStatus !== "VERIFIED" && member.roleStatus !== "CLIENT_CONFIRMED" && (
            <VerificationBadge status={member.roleStatus} />
          )}
        </p>
        <ul className="mt-5 flex flex-wrap content-start gap-2">
          {member.expertise.map((x) => (
            <li key={x} className="rounded-full bg-mist-200 px-3 py-1 text-xs font-medium text-ink-muted">
              {x}
            </li>
          ))}
        </ul>
        <Link
          href={`/leadership/#${member.slug}`}
          className="mt-auto flex min-h-11 items-center justify-between gap-4 pt-6 text-sm font-semibold text-brand-600 after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
        >
          Read {first}&rsquo;s profile
          <span
            aria-hidden
            className="inline-flex size-9 items-center justify-center rounded-full bg-mist-200 transition-colors group-hover:bg-brand-600 group-hover:text-white"
          >
            <Icon name="arrowRight" className="size-4" />
          </span>
        </Link>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-brand-600 ring-offset-2 group-has-[a:focus-visible]:ring-2"
      />
    </article>
  );
}
