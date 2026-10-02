import type { Sector, SectorSlug } from "@/types/content";

/**
 * Sectors mirror the client's portfolio groups exactly, in the client's order
 * (Pramod Adhikari, 26-27 Sep 2026): Education Consultancy, College, Energy
 * Sector, Property Development, Financial Channel.
 */
export const sectors: Sector[] = [
  {
    slug: "education-consultancy",
    title: "Education Consultancy",
    shortTitle: "Education",
    accent: "bronze",
    summary: "International education services in the UK, Kathmandu and Pokhara, where the Ample journey began.",
    intro:
      "Education consultancy is where the Ample story began. Pramod Adhikari started as an office boy at an education consultancy in Pokhara in 2004 and opened his own in 2009. Today Ample International Education has branch offices in London, Kathmandu and Pokhara, and has supported more than 4,500 students whose colleges closed mid-course.",
    ampleInvolvement: [
      "Ample International Education, one company with three branch offices: London, Kathmandu and Pokhara.",
      "London branch: supporting international students living in the United Kingdom since the end of 2010.",
      "Pokhara branch: where the Ample story started.",
    ],
    focusAreas: [
      {
        title: "Study-abroad guidance",
        body: "Guidance for students planning to study abroad, including counselling, applications and test preparation.",
      },
      {
        title: "Support for students in the UK",
        body: "Help for international students already living in the UK, including those whose colleges closed in the middle of a course.",
      },
    ],
    considerations: [
      {
        title: "Regulation",
        body: "Education services are regulated in both Nepal and the UK, and requirements change.",
      },
    ],
    faqs: [
      {
        question: "Is Ample Associates the same as Ample International Education?",
        answer:
          "No. Ample International Education is one of the businesses in the Ample Associates portfolio, focused on international education services. Ample Associates is the wider group.",
      },
      {
        question: "Where does Ample International Education operate?",
        answer: "It has three branch offices: London, Kathmandu and Pokhara. Its website is ampleedu.com.",
      },
    ],
    seo: {
      title: "Education Consultancy in the UK & Nepal | Ample Associates",
      description:
        "Ample International Education in the UK, Kathmandu and Pokhara: where the Ample journey began in 2009, supporting more than 4,500 students.",
    },
  },
  {
    slug: "college",
    title: "College",
    shortTitle: "College",
    accent: "bronze",
    summary: "Higher education in London through SAMS College London.",
    intro:
      "Ample Associates runs a college in London: Ample International E College, trading as SAMS College London. It sits alongside its education consultancy offices in the UK, Kathmandu and Pokhara.",
    ampleInvolvement: ["SAMS College London: the trading name of Ample International E College, London."],
    focusAreas: [
      {
        title: "Higher education in London",
        body: "A college base in London, connected to Ample Associates' long experience of supporting international students.",
      },
    ],
    considerations: [
      {
        title: "Regulation",
        body: "Colleges in England are regulated, and course approvals and student visa rules change. Check a college's current status with the relevant bodies.",
      },
    ],
    faqs: [
      {
        question: "What is SAMS College London?",
        answer:
          "SAMS College London is the trading name of Ample International E College, Ample Associates' college in London.",
      },
    ],
    seo: {
      title: "SAMS College London | Ample Associates College",
      description:
        "SAMS College London, the trading name of Ample International E College: the Ample Associates college in London.",
    },
  },
  {
    slug: "energy",
    title: "Energy Sector",
    shortTitle: "Energy",
    accent: "forest",
    summary: "Hydropower and solar generation in Nepal, as a promoter and through associate projects.",
    intro:
      "Ample Associates is involved in four energy projects in Nepal, across hydropower and solar. Energy is a sector where Ample participates alongside specialist developers rather than one where it builds plants alone.",
    ampleInvolvement: [
      "Sikles Hydropower: 13 MW (Madkyu Khola, Kaski), with Ample as a promoter.",
      "Upper Richet Hydropower: 2 MW, with Ample as a promoter.",
      "Himalayan Solar Power: 10 MW (Sitalpati, Khandbari), an associate project.",
      "SAMS Energy Development Company: an associate project, in partnership with Rudrakshya Hydropower (8 MW + 4 MW).",
    ],
    focusAreas: [
      {
        title: "Hydropower",
        body: "Run-of-river generation is the backbone of Nepal's grid. Projects are licensed, long-dated and usually structured through dedicated project companies.",
      },
      {
        title: "Solar",
        body: "Grid-connected solar is a smaller but growing complement to hydropower, particularly in the dry season.",
      },
      {
        title: "Energy companies",
        body: "Businesses around generation, such as SAMS Energy Development Company, an Ample Associates associate project.",
      },
    ],
    considerations: [
      {
        title: "Licensing and grid connection",
        body: "Generation and connection licences, and power purchase terms, determine whether a project can proceed.",
      },
      {
        title: "Hydrological and climate risk",
        body: "Floods, sediment and landslides can damage infrastructure and interrupt generation.",
      },
      {
        title: "Long time horizons",
        body: "Energy projects typically take several years from licence to commercial operation.",
      },
    ],
    faqs: [
      {
        question: "What is Ample's involvement in energy?",
        answer:
          "Ample is a promoter of Sikles Hydropower (13 MW, Kaski) and Upper Richet Hydropower (2 MW). Himalayan Solar Power (10 MW) and SAMS Energy Development Company, which partners with Rudrakshya Hydropower (8 MW + 4 MW), are associate projects.",
      },
      {
        question: "Are energy investment opportunities currently open?",
        answer:
          "No energy opportunity is currently listed. Contact the team if you would like to hear when a suitable, documented opportunity becomes available.",
      },
    ],
    seo: {
      title: "Energy Sector: Hydropower & Solar in Nepal | Ample Associates",
      description:
        "The Ample Associates energy sector in Nepal: Sikles and Upper Richet hydropower, Himalayan Solar Power and SAMS Energy Development Company.",
    },
  },
  {
    slug: "property-development",
    title: "Property Development",
    shortTitle: "Property",
    accent: "bronze",
    summary: "Housing and a hotel development in Pokhara: Ample Cozy Homes and a Lakeside hotel.",
    intro:
      "Property is where Ample's development activity is most visible today. Ample Cozy Homes is an 11-home planned residential community in Pokhara Lekhnath, and Ample Associates has invested in property in Lakeside, Pokhara for a hotel development that is now in progress.",
    ampleInvolvement: [
      "Housing: Ample Cozy Homes, Pokhara, Ample Associates' first fully documented residential project: 11 homes, approximately 6.5 km from Prithvi Chowk.",
      "Hotel: property in Lakeside, Pokhara (Kaski) that Ample Associates has invested in for a hotel development, coming soon.",
    ],
    focusAreas: [
      {
        title: "Planned residential communities",
        body: "Small, organised developments with a coordinated road layout, plot design and utility planning, rather than isolated individual builds.",
      },
      {
        title: "Homes for families and long-term owners",
        body: "Housing for owner-occupiers, including Nepali families living abroad who want a well-documented home in Nepal.",
      },
      {
        title: "Hotel development",
        body: "A hotel in Lakeside, Pokhara, one of Nepal's main visitor gateways, where operating experience matters as much as the building.",
      },
    ],
    considerations: [
      {
        title: "Title and plot demarcation",
        body: "Land ownership records and boundaries must be checked independently before any purchase agreement.",
      },
      {
        title: "Who may own land",
        body: "Rules differ for Nepali citizens, Non-Resident Nepalis holding foreign citizenship, and foreign nationals. Take advice from a Nepal-qualified lawyer.",
      },
      {
        title: "Liquidity",
        body: "Residential property outside central city areas can take time to resell. Plan for a long holding period.",
      },
      {
        title: "Seasonality",
        body: "Visitor numbers in Nepal vary strongly through the year, which affects hotel occupancy and cash flow.",
      },
    ],
    faqs: [
      {
        question: "Does Ample develop residential property in Nepal?",
        answer:
          "Yes. Ample Cozy Homes in Pokhara Lekhnath is an 11-home planned residential project presented by Ample. Ample's exact legal role in each project is stated on the project page once confirmed.",
      },
      {
        question: "Can Nepali people living in the UK buy a home through Ample?",
        answer:
          "Nepali citizens living abroad can generally buy property in Nepal. If you hold foreign citizenship, different rules apply, including those for Non-Resident Nepalis. Ample can share project information, but you should take independent legal advice on eligibility.",
      },
      {
        question: "Is the Lakeside hotel open for investment?",
        answer:
          "Not yet. The Lakeside, Pokhara hotel development is in progress, and any opportunity to take part will be announced when it is ready.",
      },
    ],
    seo: {
      title: "Property Development in Nepal | Homes & Hotel in Pokhara",
      description:
        "Ample Associates property development in Pokhara: Ample Cozy Homes in Pokhara Lekhnath and a hotel development in Lakeside, and what to check first.",
    },
  },
  {
    slug: "financial-channel",
    title: "Financial Channel",
    shortTitle: "Financial Channel",
    accent: "bronze",
    summary: "NRN Back 2 Nepal Investment Company: the financial channel between Ample Associates and its community.",
    intro:
      "NRN Back 2 Nepal Investment Company, operating from Kathmandu since 2025, is the financial channel between Ample Associates and its community in the UK and Nepal. People who know Ample, especially former clients who have known us for a decade, can invest in Ample Associates projects from a minimum of NPR 5 lakh.",
    ampleInvolvement: ["NRN Back 2 Nepal Investment Company Pvt. Limited: Kathmandu, operating since 2025."],
    focusAreas: [
      {
        title: "Community investment",
        body: "A way for Ample's community to take part in Ample Associates projects in Nepal and the UK, from NPR 5 lakh.",
      },
      {
        title: "Documented investment",
        body: "Legal documents are prepared under the rules of the Government of Nepal or the UK, and the documents needed for investment assurance are provided.",
      },
      {
        title: "Published opportunities",
        body: "Opportunities are announced on the Back2Nepal news portal when they open.",
      },
    ],
    considerations: [
      {
        title: "Eligibility",
        body: "Whether and how you can invest depends on your citizenship and residence. Take independent legal advice.",
      },
      {
        title: "Capital at risk",
        body: "Investing involves risk, including the loss of money invested. Returns are not guaranteed.",
      },
    ],
    faqs: [
      {
        question: "What is the minimum investment?",
        answer:
          "Through NRN Back 2 Nepal Investment Company, the minimum investment is NPR 5 lakh (NPR 500,000). Individual projects may set their own terms.",
      },
      {
        question: "How are investments documented?",
        answer:
          "Legal documents are prepared under the rules of the Government of Nepal or of the UK, as applicable, and the documents needed for investment assurance are provided.",
      },
    ],
    seo: {
      title: "NRN Back 2 Nepal Investment Company | Ample Associates",
      description:
        "NRN Back 2 Nepal Investment Company, the Ample Associates financial channel: community investment from NPR 5 lakh, documented under Nepal or UK rules.",
    },
  },
];

export const sectorSlugs = sectors.map((s) => s.slug);

export function sectorTitle(slug: SectorSlug): string {
  return sectors.find((s) => s.slug === slug)?.title ?? slug;
}
