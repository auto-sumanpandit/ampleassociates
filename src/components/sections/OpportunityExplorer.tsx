"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import type { OpportunityStatus, Project, SectorSlug } from "@/types/content";
import { Icon } from "@/components/ui/Icon";

interface Filters {
  sector: "" | SectorSlug;
  location: string;
  status: "" | OpportunityStatus;
  stage: string;
}

const empty: Filters = { sector: "", location: "", status: "", stage: "" };

interface OpportunityExplorerProps {
  projects: Project[];
  sectorLabels: Record<string, string>;
  /** Server-rendered cards keyed by slug, so cards stay server components. */
  cards: Record<string, ReactNode>;
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-2 text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-soft uppercase">
      {label}
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block min-h-12 w-full appearance-none rounded-full border border-line bg-mist-100 px-5 pr-11 text-base font-normal tracking-normal text-ink normal-case transition-colors hover:border-line-strong focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-600/20 focus:outline-none"
        >
          <option value="">All</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevronDown"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-brand-600"
        />
      </span>
    </label>
  );
}

/** Client-side filtering of the (small) opportunity list. Desktop: inline bar. Mobile: filter drawer. */
export function OpportunityExplorer({ projects, sectorLabels, cards }: OpportunityExplorerProps) {
  const [filters, setFilters] = useState<Filters>(empty);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const options = useMemo(() => {
    const uniq = (xs: string[]) => [...new Set(xs)].map((x) => ({ value: x, label: sectorLabels[x] ?? x }));
    return {
      sector: uniq(projects.map((p) => p.sector)),
      location: uniq(projects.map((p) => p.location)),
      status: uniq(projects.map((p) => p.status)),
      stage: uniq(projects.map((p) => p.stage)),
    };
  }, [projects, sectorLabels]);

  const results = projects.filter(
    (p) =>
      (!filters.sector || p.sector === filters.sector) &&
      (!filters.location || p.location === filters.location) &&
      (!filters.status || p.status === filters.status) &&
      (!filters.stage || p.stage === filters.stage),
  );
  const activeCount = Object.values(filters).filter(Boolean).length;
  const set = (key: keyof Filters) => (v: string) => setFilters((f) => ({ ...f, [key]: v }));

  const fields = (
    <>
      <Select label="Sector" value={filters.sector} onChange={set("sector")} options={options.sector} />
      <Select label="Location" value={filters.location} onChange={set("location")} options={options.location} />
      <Select label="Opportunity status" value={filters.status} onChange={set("status")} options={options.status} />
      <Select label="Project stage" value={filters.stage} onChange={set("stage")} options={options.stage} />
    </>
  );

  return (
    <div>
      <div className="hidden grid-cols-4 gap-5 rounded-2xl border border-line bg-white p-6 shadow-lift lg:grid">
        {fields}
      </div>

      <div className="flex items-center justify-between gap-4 lg:hidden">
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-white px-6 text-[0.8125rem] font-semibold tracking-[0.08em] text-ink uppercase shadow-lift"
          aria-haspopup="dialog"
        >
          <Icon name="layers" className="size-5 text-brand-600" />
          Filters{activeCount > 0 && ` (${activeCount})`}
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Filter opportunities"
        className="m-0 mt-auto max-h-[85dvh] w-full max-w-none overflow-hidden rounded-t-3xl border-0 bg-white p-0 backdrop:bg-navy-950/60 backdrop:backdrop-blur-sm open:flex open:flex-col"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="text-lg font-semibold text-ink">Filter opportunities</h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex size-11 items-center justify-center rounded-full bg-mist-200 text-ink transition-colors hover:bg-mist-300"
          >
            <Icon name="close" className="size-5" />
            <span className="sr-only">Close filters</span>
          </button>
        </div>
        <div className="grid gap-5 overflow-y-auto p-6">{fields}</div>
        <div className="grid grid-cols-2 gap-3 border-t border-line p-6">
          <button
            type="button"
            onClick={() => setFilters(empty)}
            className="min-h-12 rounded-full border border-line bg-white text-[0.8125rem] font-semibold tracking-[0.08em] text-ink uppercase"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="min-h-12 rounded-full bg-brand-600 text-[0.8125rem] font-semibold tracking-[0.08em] text-white uppercase shadow-glow"
          >
            Show {results.length} {results.length === 1 ? "result" : "results"}
          </button>
        </div>
      </dialog>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="text-sm text-ink-muted">
          Showing {results.length} of {projects.length} {projects.length === 1 ? "opportunity" : "opportunities"}
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => setFilters(empty)}
            className="min-h-11 text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-6 md:gap-8">
          {results.map((p) => (
            <li key={p.slug}>{cards[p.slug]}</li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-white p-10 text-center">
          <p className="font-semibold text-ink">No opportunities match these filters.</p>
          <p className="mt-2 text-ink-muted">Clear the filters, or contact the team to hear about new projects.</p>
        </div>
      )}
    </div>
  );
}
