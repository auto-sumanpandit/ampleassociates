import type { Insight, InsightCategory } from "@/types/content";
import { sources } from "./sources";
import { media } from "./media";

export const insightCategories: InsightCategory[] = [
  {
    slug: "investment-guides",
    title: "Investment Guides",
    description: "Practical guides to how investment and property ownership work in Nepal.",
  },
  {
    slug: "market-insights",
    title: "Market Insights",
    description: "Context on the places and sectors where Ample is active, with sources.",
  },
  {
    slug: "project-updates",
    title: "Project Updates",
    description: "Dated progress updates on Ample projects.",
  },
  {
    slug: "company-updates",
    title: "Company Updates",
    description: "News about Ample Associates and its companies.",
  },
];

const editorial = "Ample Associates Editorial";

export const insights: Insight[] = [
  {
    slug: "how-to-invest-in-nepal-from-overseas",
    cover: media.annapurna,
    title: "How to Invest in Nepal From Overseas: A Practical Guide",
    category: "investment-guides",
    author: editorial,
    publishedAt: "2026-09-25",
    excerpt:
      "The routes, rules and checks that matter when you invest in Nepal from the UK or elsewhere, whether you are a Nepali citizen abroad, a Non-Resident Nepali or a foreign national.",
    body: [
      {
        paragraphs: [
          "The short answer: how you can invest in Nepal depends first on who you are legally, and second on what you are investing in. A Nepali citizen living in London has different options from a British citizen of Nepali origin, and both have different options from a foreign investor with no Nepali connection.",
          "This guide sets out the main routes, the rules that most often catch people out, and the checks worth making before you send money. It is general information, not legal or financial advice.",
        ],
      },
      {
        heading: "Step 1: Work out which category you are in",
        paragraphs: [
          "Nepali citizens living abroad are, for most purposes, treated as Nepali citizens. They can generally buy land and property and invest in Nepali companies in the same way as residents.",
          "Non-Resident Nepalis (NRNs) who hold foreign citizenship have a separate legal status. NRN rules allow some property ownership and investment, but with limits, including ceilings on residential land. Check the current rules for your situation with a Nepal-qualified lawyer.",
          "Foreign nationals invest under Nepal's Foreign Investment and Technology Transfer Act, 2019 (FITTA). This route requires approval and is subject to sector restrictions and a minimum investment amount.",
        ],
      },
      {
        heading: "Step 2: Check whether the sector is open",
        paragraphs: [
          "FITTA lists sectors closed to foreign investment. Real estate business (buying and selling property as a business, excluding the construction industry) is on that list. In practice this means a foreign national generally cannot invest in Nepal simply to own or trade land.",
          "Hydropower, tourism and many industries are open to foreign investment and are actively promoted by the Government of Nepal.",
        ],
      },
      {
        heading: "Step 3: Understand the thresholds and approvals",
        paragraphs: [
          "From the 2022/23 budget, the general minimum for foreign direct investment is NPR 20 million per project, with exceptions such as the information technology sector. Larger investments are approved by the Investment Board Nepal; most others by the Department of Industry.",
          "These thresholds and procedures change. Before relying on any figure, confirm it with the Department of Industry, the Investment Board Nepal or a lawyer.",
        ],
      },
      {
        heading: "Step 4: Do your own due diligence",
        paragraphs: [
          "Whatever the route, the checks are similar. Who legally owns the land or the company? Are the approvals in place, or only applied for? What structure will you hold your investment through, and what rights does it give you? How and when can you get your money out?",
          "Ask for documents, not assurances. Have title records and company documents reviewed by a lawyer you appoint, not one supplied by the seller.",
        ],
      },
      {
        heading: "Step 5: Plan for currency and time",
        paragraphs: [
          "If you earn in pounds, dollars or euros, the value of your investment will move with the Nepali rupee. Property and infrastructure projects in Nepal also tend to take longer than planned. Invest money you will not need for several years.",
        ],
      },
      {
        heading: "How Ample fits in",
        paragraphs: [
          "Ample Associates presents opportunities in Nepal and supports investors through a staged process: explore, speak with the team, receive project information, carry out due diligence, and only then consider agreements. You can see the full process on our How We Work page, and current projects on the Investment Opportunities page.",
        ],
      },
    ],
    sources: [sources.fdiThreshold, sources.fittaRealEstate, sources.investNepal, sources.ibn],
    relatedProjects: ["ample-homes-pokhara"],
    seo: {
      title: "How to Invest in Nepal From Overseas: NRN & Foreign Investor Guide",
      description:
        "How investing in Nepal works for Nepalis abroad, NRNs and foreign nationals: FITTA rules, the NPR 20 million FDI threshold, property restrictions and due diligence.",
    },
  },
  {
    slug: "pokhara-lekhnath-guide-for-home-buyers",
    cover: media.begnasLake,
    title: "Pokhara Lekhnath: What Home Buyers Should Know",
    category: "market-insights",
    author: editorial,
    publishedAt: "2026-09-25",
    excerpt:
      "Where Lekhnath is, how it became part of Pokhara, and the practical questions to ask before buying a home in the area.",
    body: [
      {
        paragraphs: [
          "Lekhnath is the eastern part of Pokhara. Until 2017 it was a separate municipality. That year it was merged with Pokhara Sub-Metropolitan City to form a single metropolitan city, first named Pokhara Lekhnath, later Pokhara Metropolitan City. The combined city covers 464.24 square kilometres, which made it Nepal's largest metropolitan city by area at the time.",
          "Many people still use 'Pokhara Lekhnath' or simply 'Lekhnath' to describe the area, and property listings use both names.",
        ],
      },
      {
        heading: "The setting",
        paragraphs: [
          "Lekhnath is quieter and greener than central Pokhara and the Lakeside tourist strip. It is home to Begnas Lake and Rupa Lake, and much of the area is hill and farmland rather than dense town.",
          "For home buyers this is the attraction: more space and less traffic, while still within reach of central Pokhara. Ample Cozy Homes, for example, is about 6.5 km from Prithvi Chowk, a central junction in Pokhara.",
        ],
      },
      {
        heading: "Questions to ask before buying",
        paragraphs: [
          "Road access: is the access road public, already built and wide enough for year-round use, or planned? Planned roads can be delayed.",
          "Title: does the seller hold clear title (lalpurja) to the exact plot you are buying, and do the boundaries match the survey records?",
          "Services: are electricity, water and drainage connected, or will they be? Who pays for connection?",
          "Approvals: does the house or project have municipal building approval, and does the design match what was approved?",
          "Neighbourhood: what can be built on the plots around you? This is one reason planned communities appeal to buyers: the neighbourhood is decided together.",
        ],
      },
      {
        heading: "A note on prices",
        paragraphs: [
          "Asking prices on listing sites vary widely and are often negotiable. Treat them as a starting point, compare several, and have any plot you are serious about independently valued.",
        ],
      },
    ],
    sources: [sources.lekhnathMerger],
    relatedProjects: ["ample-homes-pokhara"],
    seo: {
      title: "Pokhara Lekhnath Guide for Home Buyers | Buying a House in Pokhara",
      description:
        "Where Lekhnath is, how it joined Pokhara Metropolitan City in 2017, and what to check on road access, title and approvals before buying a home in the area.",
    },
  },
  {
    slug: "hydropower-in-nepal-investor-overview",
    cover: media.kaliGandaki,
    title: "Hydropower in Nepal: An Overview for Investors",
    category: "market-insights",
    author: editorial,
    publishedAt: "2026-09-25",
    excerpt:
      "How Nepal's hydropower sector is structured, where it stands today, and the risks that matter to anyone considering involvement.",
    body: [
      {
        paragraphs: [
          "Hydropower supplies almost all of Nepal's electricity. Installed capacity reached 3,878 MW in July 2025, after 631 MW was added to the grid over the preceding year, according to figures reported by the Asian Development Bank's SASEC programme.",
          "That growth is why hydropower features in most conversations about investing in Nepal. It is also a sector with long timelines and real physical risks.",
        ],
      },
      {
        heading: "How projects are usually structured",
        paragraphs: [
          "Most private hydropower projects are developed through a dedicated project company. The founders who initiate the project, secure licences and put in early capital are known as promoters. Promoter shares are distinct from shares later offered to the public.",
          "Projects typically need a survey licence, then a generation licence, a grid connection agreement and a power purchase agreement before construction financing can be completed.",
        ],
      },
      {
        heading: "The risks",
        paragraphs: [
          "Hydrology and climate: floods, landslides and sediment can damage headworks and interrupt generation.",
          "Time: moving from licence to commercial operation commonly takes several years, and delays are frequent.",
          "Grid and offtake: generation is only valuable if it can be evacuated and sold. Transmission constraints have affected projects in the past.",
          "Liquidity: promoter shares can be subject to lock-in periods and may be hard to sell.",
        ],
      },
      {
        heading: "Ample's involvement",
        paragraphs: [
          "Ample Associates is a promoter of Sikles Hydropower, the developer of the 13 MW Madkyu Khola project in Kaski district, and of Upper Richet Hydropower, a 2 MW project. Himalayan Solar Power, a 10 MW solar project, and SAMS Energy Development Company are associate projects. Documentation of these relationships is being confirmed. No energy investment opportunity is currently open through Ample Associates.",
        ],
      },
    ],
    sources: [sources.installedCapacity2025, sources.siklesHydro, sources.himalayanSolar],
    relatedProjects: [],
    seo: {
      title: "Hydropower in Nepal: Investor Overview, Structure & Risks",
      description:
        "Nepal's hydropower sector in 2025: 3,878 MW installed, how promoter-led project companies work, and the hydrological, grid and liquidity risks to understand.",
    },
  },
];
