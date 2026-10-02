/**
 * Illustrative schematic of an 11-home planned community. The number of
 * homes is a project fact; the arrangement is not a survey or approved plan.
 */
export function SiteSchematic() {
  const plots = [
    ...Array.from({ length: 6 }, (_, i) => ({ x: 40 + i * 92, y: 40 })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: 86 + i * 92, y: 236 })),
  ];
  return (
    <figure className="rounded-2xl border border-line bg-white p-4 shadow-lift md:p-6">
      <svg viewBox="0 0 640 380" role="img" aria-labelledby="schematic-title schematic-desc" className="h-auto w-full">
        <title id="schematic-title">Illustrative layout of 11 homes</title>
        <desc id="schematic-desc">
          Eleven plots arranged on either side of a shared internal access road. Illustrative only; not a survey plan.
        </desc>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#E9E3FF" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="640" height="380" fill="url(#grid)" />
        <path d="M0 190 H640" stroke="#DDE1FF" strokeWidth="44" />
        <path d="M0 190 H640" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="10 10" />
        <text
          x="320"
          y="195"
          textAnchor="middle"
          fontSize="11"
          fill="#475569"
          fontFamily="inherit"
          fontWeight="600"
          letterSpacing="2"
        >
          SHARED ACCESS ROAD
        </text>
        {plots.map((p, i) => (
          <g key={i}>
            <rect
              x={p.x}
              y={p.y}
              width="80"
              height="104"
              rx="10"
              fill="#F4F1FF"
              stroke="#3D03FA"
              strokeOpacity="0.45"
              strokeWidth="1.25"
            />
            <rect
              x={p.x + 20}
              y={p.y + (i < 6 ? 44 : 16)}
              width="40"
              height="36"
              fill="#FFFFFF"
              rx="4"
              stroke="#10193C"
              strokeWidth="1"
            />
            <text
              x={p.x + 40}
              y={p.y + (i < 6 ? 28 : 84)}
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill="#3D03FA"
              fontFamily="inherit"
            >
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 text-sm text-ink-muted">
        <span>11 homes around a planned internal road.</span>
        <span className="rounded-full border border-dashed border-line-strong bg-mist-100 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.08em] text-ink-muted uppercase">
          Illustrative only. Not a survey or approved plan
        </span>
      </figcaption>
    </figure>
  );
}
