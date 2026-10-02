import type { Office } from "@/types/content";

/**
 * Global site configuration. Values marked null are unverified and are
 * intentionally not rendered. Office addresses: client, 2 Oct 2026 (Kathmandu and Pokhara are the
 * Ample International Education branches; London is Ample International E College Limited). See docs/content-verification-needed.md.
 */
export const site = {
  name: "Ample Associates",
  descriptor: "Investment & Development Opportunities in Nepal",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ampleassociates.com").replace(/\/$/, ""),
  locale: "en_GB",
  defaultOgImage: "/og/ample-associates-og.png",
  positioning:
    "Ample Associates brings together experience, partnerships and development opportunities across education, renewable energy, property development and a diaspora investment channel in the United Kingdom and Nepal.",
  foundedYear: 2009,
  /** Legal entity details: none published until verified. */
  legal: {
    legalName: null as string | null,
    registrationNumber: null as string | null,
    registeredOffice: null as string | null,
  },
  /** One public email only (client, 27 Sep 2026). */
  contact: {
    email: "contact@ampleassociates.com" as string | null,
    phone: null as string | null,
  },
  social: [] as { label: string; url: string }[],
} as const;

export const offices: Office[] = [
  {
    city: "Kathmandu",
    country: "Nepal",
    description:
      "Home to the Kathmandu branch of Ample International Education and the NRN Back 2 Nepal Investment Company.",
    address: "Ramshah Path, Kathmandu",
    status: "CLIENT_CONFIRMED",
  },
  {
    city: "Pokhara",
    country: "Nepal",
    description:
      "Where the Ample story began. Home to the Pokhara branch of Ample International Education, Ample Cozy Homes and the Lakeside hotel development.",
    address: "Siddhartha Chowk, Pokhara 33700",
    status: "CLIENT_CONFIRMED",
  },
  {
    city: "London",
    country: "United Kingdom",
    description: "Base for the London branch of Ample International Education and SAMS College London.",
    address: "Unit G-02, 106 Plumstead High Street, London SE18 1DU",
    status: "CLIENT_CONFIRMED",
  },
];

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

/** Primary navigation, as in the Oct 2026 design. Everything else lives in the footer. */
export const primaryNav: NavItem[] = [
  { label: "About", href: "/about/" },
  { label: "Sectors", href: "/sectors/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Investors", href: "/investors/" },
  { label: "Contact", href: "/contact/" },
];

export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About Ample Associates", href: "/about/" },
      { label: "Leadership", href: "/leadership/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    heading: "Opportunities",
    links: [
      { label: "Ample Cozy Homes, Pokhara", href: "/investments/ample-homes-pokhara/" },
      { label: "Portfolio", href: "/portfolio/" },
      { label: "Sectors", href: "/sectors/" },
      { label: "Investing in Nepal", href: "/invest-nepal/" },
    ],
  },
  {
    heading: "Investors",
    links: [
      { label: "Investor Centre", href: "/investors/" },
      { label: "Insights", href: "/insights/" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Risk Disclosure", href: "/risk-disclosure/" },
      { label: "Investment Disclaimer", href: "/investment-disclaimer/" },
      { label: "Privacy Policy", href: "/privacy-policy/" },
      { label: "Cookie Policy", href: "/cookie-policy/" },
      { label: "Terms of Use", href: "/terms/" },
    ],
  },
];
