# Brief: Sovereign Modernity redesign (shared by all page agents)

Project: `C:\Users\$uman\Desktop\ampleassociates` (Next.js 16 App Router, React 19, Tailwind v4, TypeScript strict). Read `AGENTS.md`: this Next.js has breaking changes; check `node_modules/next/dist/docs/` before using any Next API you are not sure of.

Plan: `docs/redesign-sovereign-modernity-plan.md`. Design source: `new design/` (each folder has `code.html` and `screen.png`; design system in `new design/sovereign_modernity/DESIGN.md`). The homepage (`src/app/page.tsx`) is already rebuilt in the new style: **read it first and copy its patterns**.

## Already built (use, do not edit)

- Tokens in `src/app/globals.css`. Colours: `navy-950 #070D26`, `navy-900`, `navy-700 #262E52`, `canvas #FBF8FF`, `mist-100 #F4F1FF`, `mist-200 #E9E3FF`, `mist-300 #DDE1FF`, `brand-600 #3D03FA`, `brand-800`, `brand-100`, `sky-500 #2287FD`, `sky-200`, `amber-pale`, `amber-dark`, `ink`, `ink-muted`, `ink-soft`, `line`, `line-strong`. Radii: `rounded-xl` = 14px (nested items, icon tiles), `rounded-2xl` = 28px (cards), `rounded-3xl` = 36px (hero/feature panels), `rounded-full` (buttons, chips). Shadows: `shadow-lift` (cards), `shadow-dossier` (floating panels), `shadow-glow` (primary buttons). Text: `text-display-xl`, `text-display`, `text-heading`, `text-heading-sm`, `text-lead`.
- Utility classes: `.container-page`, `.section-label` (pill label with dot; works inside `.on-dark`), `.eyebrow` (plain uppercase micro-label), `.ghost-number`, `.card`, `.dot-grid`, `.dot-grid-light`, `.reveal` (scroll reveal), `.on-dark` (put on dark sections).
- Components: `PageHero` (props: `title` with `<strong>` for the royal-blue semibold accent, `intro`, `breadcrumbs`, `meta` string[] dotted facts row, `aside`, `actions`, `tone` light|dark, `eyebrow`), `SectionHeading` (props: `label` pill, `title`, `intro`, `action`, `onDark`) and `GhostNumber` (`n`, `side`, `onDark`; parent section must be `relative`), `ButtonLink`/`Button` (variants primary, secondary, onDark, onDarkOutline, text; `withArrow` adds the arrow disc; `mobileFull`), `ArrowLink`, `Icon` (Phosphor; names in `src/components/ui/Icon.tsx`; you may add new icon names there), `Mountains` (`variant` hero|dark), `VerificationBadge`, `InvestorCTA` (closing royal-blue band; default title "Let's build what's next."), `Back2NepalSection`, `HeroMap`.
- Header, footer, mobile tab bar, layout are done. The header floats over the top of the page: **every page's first section must have top padding of at least `pt-28 md:pt-32`**. `PageHero` already does this.

## Style rules

- Headlines: Poppins, mix light (`font-light`/`font-extralight`) with semibold accents, tight tracking. Section headings are `text-ink`; royal blue is for accents, links and buttons.
- Section rhythm: `py-24 md:py-32`; alternate canvas / `bg-mist-100` / dark `bg-navy-700` or `bg-navy-950` sections like the homepage. Use `GhostNumber` 01, 02, 03... on major sections like the design does.
- Cards: white `rounded-2xl` with `shadow-lift` (or `border border-line`), padding `p-7 md:p-8`; dark cards `bg-navy-950 border border-white/10`; icon tiles `size-12 rounded-xl`.
- Chips: `rounded-full bg-mist-200 px-3 py-1 text-xs font-medium`. Micro-labels: `text-[0.6875rem] font-semibold tracking-[0.12em] uppercase`.
- Mobile first; everything must work at 375px with no horizontal scroll.

## Content rules (strict; this is an investment site)

- **Do not copy text from the Stitch `code.html` files.** Their copy is invented (fake addresses, phone numbers, "100 Bishopsgate", "[Name Confirmed via Dossier]", "Sovereign", "institutional", regulatory claims, FCA/Companies House numbers, timelines, investor categories, statistics). Use the layout only. All facts must come from the existing page code and `src/content/*` (which is verified). Keep every existing fact, status badge, citation and disclaimer on the page; you may reorder, regroup and restyle, and you may cut repetition.
- Name is always "Ample Associates" (never "Ample Group"). Sectors are always in this order: Education Consultancy, College, Energy Sector, Property Development, Financial Channel.
- One public email only: `site.contact.email`. No phone numbers, addresses or forms (static site; no `<form>`, no inputs). Unverified values render as `VerificationBadge`.
- No em-dashes (—) in visible copy. Contact buttons say "Talk to Our Team".
- Keep `metadata`/`buildMetadata`, JSON-LD and `generateStaticParams` exactly as they are.
- Do not use the image in `new design/architectural_3d_render_of_ample_cozy_homes...` (not client-approved). Only images already in `public/images`.

## Working rules

- Only edit the files assigned to you. If you need a page-local helper component, put it next to the page in a `_components` folder inside that route folder.
- Do NOT edit `globals.css`, `src/components/ui/{Button,SectionHeading,Mountains}.tsx`, `src/components/sections/{PageHero,InvestorCTA,Back2NepalSection,HeroMap}.tsx`, `src/components/layout/*`, or `src/content/*`.
- Do NOT start a dev server or use a browser; another agent owns the preview. Verify with `npx tsc --noEmit` and `npx eslint <your files>` (run from the project root) and fix anything in your files.
- Finish with a short report: files changed, what each page now looks like (sections in order), any fact you removed or could not place, and any problem you noticed in a file you do not own.
