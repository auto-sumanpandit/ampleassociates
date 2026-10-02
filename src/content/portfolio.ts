import type { MediaImage, PortfolioEntity, PortfolioGroup } from "@/types/content";
import { media } from "@/content/media";

/**
 * Portfolio as listed by the client (Pramod Adhikari, 26 Sep 2026), with the
 * client's group names and order. CLIENT_CONFIRMED means Ample stated the
 * relationship directly; VERIFIED is reserved for documentary evidence.
 */
export const portfolioGroups: {
  slug: PortfolioGroup;
  title: string;
  summary: string;
  /** Photograph for the group header, where one fits. */
  image?: MediaImage;
  /** Caption shown under the group header photo. */
  imageCaption?: string;
}[] = [
  {
    slug: "education-consultancy",
    title: "Education Consultancy",
    summary: "Where Ample began: international education services in the UK, Kathmandu and Pokhara.",
  },
  {
    slug: "college",
    title: "College",
    summary: "Higher education in London.",
  },
  {
    slug: "energy",
    title: "Energy Sector",
    summary: "Hydropower and solar generation in Nepal.",
    image: media.himalayanSolarSite,
    imageCaption: "Himalayan Solar Power, Sitalpati, Khandbari",
  },
  {
    slug: "property-development",
    title: "Property Development",
    summary: "Housing and a hotel development in Pokhara.",
    image: media.lakesideHotelConcept,
    imageCaption: "Design concept for the Lakeside hotel development",
  },
  {
    slug: "financial-channel",
    title: "Financial Channel",
    summary: "The financial channel between Ample Associates and its community in the UK and Nepal.",
  },
];

/** Ample International Education crest (as on ampleedu.com). */
const ampleEducationLogo = { src: "/images/logos/ample-international-education.png", width: 490, height: 512 };

export const portfolio: PortfolioEntity[] = [
  {
    // One company with three branch offices (client, 2 Oct 2026); previously listed as three companies.
    slug: "ample-international-education",
    name: "Ample International Education",
    country: "United Kingdom",
    branches: [
      { city: "London", country: "United Kingdom" },
      { city: "Kathmandu", country: "Nepal" },
      { city: "Pokhara", country: "Nepal" },
    ],
    sector: "education-consultancy",
    relationshipType: "Ample Associates Company",
    relationshipStatus: "CLIENT_CONFIRMED",
    description:
      "International education consultancy with branch offices in London, Kathmandu and Pokhara, where the Ample story started. In the UK it has supported international students since the end of 2010, including more than 4,500 students whose colleges closed mid-course.",
    website: "https://www.ampleedu.com",
    websiteVerified: true,
    logo: ampleEducationLogo,
    featured: true,
  },
  {
    slug: "sams-college-london",
    name: "SAMS College London",
    legalName: "Ample International E College, trading as SAMS College London",
    country: "United Kingdom",
    sector: "college",
    relationshipType: "Ample Associates Company",
    relationshipStatus: "CLIENT_CONFIRMED",
    description: "Ample Associates' college in London.",
    featured: true,
  },
  {
    slug: "sikles-hydropower",
    name: "Sikles Hydropower",
    country: "Nepal",
    sector: "energy",
    relationshipType: "Promoter",
    relationshipStatus: "CLIENT_CONFIRMED",
    description: "Developer of the 13 MW Madkyu Khola Hydropower Project in Kaski district.",
    sourceScale: "13 MW",
    website: "https://www.sikleshydro.com.np/about/",
    websiteVerified: true,
    /** Logo supplied by the client (2 Oct 2026). */
    logo: { src: "/images/logos/sikles-hydropower.png", width: 100, height: 100 },
    note: "Spelt 'Siklesh' in the client's material; the company's own website uses 'Sikles Hydropower Ltd'.",
    featured: true,
  },
  {
    slug: "upper-richet-hydropower",
    name: "Upper Richet Hydropower",
    country: "Nepal",
    sector: "energy",
    // Ample Associates is a promoter (client, 2 Oct 2026).
    relationshipType: "Promoter",
    relationshipStatus: "CLIENT_CONFIRMED",
    description: "A 2 MW hydropower project in Nepal.",
    /** Logo supplied by the client (2 Oct 2026). */
    logo: { src: "/images/logos/upper-richet-hydropower.png", width: 201, height: 59 },
    sourceScale: "2 MW",
    featured: true,
  },
  {
    slug: "himalayan-solar-power",
    name: "Himalayan Solar Power",
    country: "Nepal",
    sector: "energy",
    // An associate project, not a promoter role (client, 2 Oct 2026).
    relationshipType: "Associate Project",
    relationshipStatus: "CLIENT_CONFIRMED",
    description: "10 MW solar generation company based in Sitalpati, Khandbari.",
    sourceScale: "10 MW",
    website: "https://himalayansolarpower.com",
    websiteVerified: true,
    /** Logo supplied by the client (2 Oct 2026). */
    logo: { src: "/images/logos/himalayan-solar-power.png", width: 800, height: 232 },
    featured: true,
  },
  {
    slug: "sams-energy-development",
    name: "SAMS Energy Development Company",
    country: "Nepal",
    sector: "energy",
    // An associate project (client, 2 Oct 2026); previously listed as founded by Ample.
    relationshipType: "Associate Project",
    relationshipStatus: "CLIENT_CONFIRMED",
    description: "Energy company working in partnership with Rudrakshya Hydropower (8 MW + 4 MW).",
    sourceScale: "8 + 4 MW",
    website: "https://www.samsenergy.com",
    websiteVerified: false,
    featured: true,
  },
  {
    slug: "ample-cozy-homes",
    name: "Ample Cozy Homes",
    country: "Nepal",
    sector: "property-development",
    relationshipType: "Ample Associates Company",
    relationshipStatus: "CLIENT_CONFIRMED",
    description: "Housing development in Pokhara Lekhnath: 11 planned homes in a shared-design community.",
    featured: true,
  },
  {
    slug: "lakeside-pokhara-hotel",
    name: "Lakeside Hotel Development",
    country: "Nepal",
    sector: "property-development",
    relationshipType: "Investment",
    relationshipStatus: "CLIENT_CONFIRMED",
    stage: "COMING_SOON",
    description:
      "Ample Associates has invested in property in Lakeside, Pokhara (Kaski) for a hotel development, which is now in progress.",
    featured: true,
  },
  {
    slug: "back2nepal-investment",
    name: "NRN Back 2 Nepal Investment Company",
    legalName: "NRN Back 2 Nepal Investment Company Pvt. Limited",
    country: "Nepal",
    sector: "financial-channel",
    relationshipType: "Ample Associates Company",
    relationshipStatus: "CLIENT_CONFIRMED",
    description:
      "Operating from Kathmandu since 2025, it lets Ample's community invest in Ample Associates projects in Nepal and the UK.",
    featured: true,
  },
];
