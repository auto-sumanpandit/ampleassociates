import type { Project } from "@/types/content";
import { media } from "./media";

/**
 * Projects. Facts come from the Ample Associates project document. Where that
 * document is internally inconsistent (plot size, total cost) the value is
 * withheld and listed in docs/content-verification-needed.md.
 */
export const projects: Project[] = [
  {
    slug: "ample-homes-pokhara",
    title: "Ample Cozy Homes, Pokhara",
    shortTitle: "Ample Cozy Homes",
    sector: "property-development",
    location: "Pokhara Lekhnath",
    region: "Kaski District, Gandaki Province",
    country: "Nepal",
    summary:
      "A planned community of 11 British-inspired homes in Pokhara Lekhnath, about 6.5 km from Prithvi Chowk, with a coordinated road layout, organised plots and utility-ready planning.",
    status: "Open for Enquiries",
    stage: "Project information being finalised",
    stageStatus: "IN_DEVELOPMENT",
    projectType: "Residential development of 11 homes",
    amplesRole: "Developer",
    amplesRoleStatus: "TO_BE_CONFIRMED",
    relationshipType: "Ample Associates Company",
    projectOwner: {
      label: "Project owner",
      value: "Ample Associates, through Ample Cozy Homes",
      status: "TO_BE_CONFIRMED",
      note: "Legal owner of the land and the project company to be confirmed.",
    },
    heroImage: media.cozyHomesConcept,
    gallery: [media.begnasLake],
    keyFacts: [
      { label: "Location", value: "Pokhara Lekhnath, Kaski", status: "VERIFIED" },
      { label: "Distance to Prithvi Chowk", value: "Approx. 6.5 km", status: "VERIFIED" },
      { label: "Number of homes", value: "11", status: "VERIFIED" },
      { label: "Architectural concept", value: "British-inspired", status: "VERIFIED" },
      { label: "Community type", value: "Planned, gated neighbourhood", status: "VERIFIED" },
      { label: "Plot size per home", value: "To be confirmed", status: "TO_BE_CONFIRMED" },
      { label: "Pricing", value: "Available on request", status: "AVAILABLE_ON_REQUEST" },
      { label: "Project stage", value: "Information being finalised", status: "IN_DEVELOPMENT" },
    ],
    overview: [
      "Ample Cozy Homes is a small residential community planned for Pokhara Lekhnath, in the eastern part of Pokhara. It brings together 11 homes built to a shared design standard, on a site with its own road layout and planned utilities.",
      "The idea is simple: an isolated house on an isolated plot gives the owner no control over what happens around it. A planned community of 11 homes lets roads, plot boundaries, services and the look of the neighbourhood be decided once, together.",
      "The homes are designed for two groups. The first is families who want more space and a settled, organised neighbourhood. The second is buyers, including Nepalis living abroad, who want to own a well-documented home in Pokhara for the long term.",
    ],
    overviewHeading: "Designed for space, practicality and long-term living",
    locationDetails: {
      heading: "Connected to Pokhara. Designed for quieter living.",
      paragraphs: [
        "The site is in Pokhara Lekhnath, Kaski District, approximately 6.5 km from Prithvi Chowk, one of central Pokhara's main junctions.",
        "Lekhnath is the eastern part of Pokhara Metropolitan City: greener and quieter than the city centre, and home to Begnas and Rupa lakes.",
      ],
      points: [
        "Approx. 6.5 km to Prithvi Chowk",
        "Pokhara Metropolitan City (Lekhnath area)",
        "Kaski District, Gandaki Province",
        "Exact site location shared on request",
      ],
      heroCaption: "Design concept for Ample Cozy Homes",
      guide: {
        label: "Read our guide to buying a home in Pokhara Lekhnath",
        href: "/insights/market-insights/pokhara-lekhnath-guide-for-home-buyers/",
      },
    },
    design: {
      heading: "International inspiration. Local practicality.",
      intro:
        "Beyond individual homes, the project plans the neighbourhood as a whole, because isolated builds give owners no control over their surroundings.",
      showSiteSchematic: true,
    },
    audiences: [
      {
        title: "For home buyers and families",
        points: [
          "Families wanting more space",
          "Buyers who value larger plots",
          "People who want an organised, planned neighbourhood",
        ],
      },
      {
        title: "For long-term owners",
        points: [
          "A limited development of 11 homes",
          "Nepalis abroad wanting a well-documented home in Pokhara",
          "Owners planning to hold for the long term",
        ],
      },
    ],
    developmentPlan: [
      {
        title: "Clean British-style exteriors",
        body: "Pitched roofs, symmetrical façades and restrained detailing, adapted to Pokhara's climate.",
      },
      {
        title: "Functional modern layouts",
        body: "Floor plans organised around everyday family use rather than show rooms.",
      },
      {
        title: "Natural light",
        body: "Window placement and orientation planned to bring daylight into the main living spaces.",
      },
      {
        title: "Considered finishes",
        body: "A consistent finishing standard across all 11 homes, so the neighbourhood reads as one place.",
      },
      {
        title: "Planned road layout",
        body: "Internal access roads designed as part of the site plan, not added plot by plot.",
      },
      {
        title: "Organised plots and utility-ready planning",
        body: "Plot boundaries and service routes planned together to support a cohesive neighbourhood.",
      },
    ],
    timeline: [
      { title: "Site & concept", description: "Location and residential concept defined.", state: "complete" },
      { title: "Design", description: "Architectural concept and home layouts.", state: "current" },
      {
        title: "Title & approvals",
        description: "Land records, plot demarcation and municipal approvals.",
        state: "unconfirmed",
      },
      {
        title: "Pricing & structure",
        description: "Confirmed costs, pricing and purchase or investment structure.",
        state: "upcoming",
      },
      { title: "Site works", description: "Access roads, drainage and utility routes.", state: "upcoming" },
      { title: "Construction", description: "Building the 11 homes.", state: "upcoming" },
      { title: "Handover", description: "Completion and transfer to owners.", state: "upcoming" },
    ],
    investmentInformation: [
      {
        label: "Land / plot cost",
        value: "Available on request",
        status: "AVAILABLE_ON_REQUEST",
        note: "The source document gives an indicative range that is being re-confirmed.",
      },
      {
        label: "Construction cost",
        value: "Available on request",
        status: "AVAILABLE_ON_REQUEST",
        note: "Depends on final specification and contractor pricing.",
      },
      {
        label: "Total cost per home",
        value: "To be confirmed",
        status: "TO_BE_CONFIRMED",
        note: "Two different figures appear in the source material; neither is published until confirmed.",
      },
      {
        label: "How to participate",
        value: "Purchase of a home (investment structure to be confirmed)",
        status: "TO_BE_CONFIRMED",
      },
      { label: "Legal vehicle / project company", value: "To be confirmed", status: "TO_BE_CONFIRMED" },
      {
        label: "Minimum participation",
        value: "Not applicable until structure is confirmed",
        status: "TO_BE_CONFIRMED",
      },
      { label: "Delivery timeline", value: "To be confirmed", status: "TO_BE_CONFIRMED" },
      {
        label: "Expected returns",
        value: "Not published",
        status: "PROJECT_SPECIFIC",
        note: "Ample does not publish projected returns for this project.",
      },
    ],
    risks: [
      {
        title: "Title and boundaries",
        body: "Land ownership, plot demarcation and any encumbrances must be confirmed through official records and independent legal review before any agreement.",
      },
      {
        title: "Planning and approvals",
        body: "Municipal approvals, building permits and access-road arrangements can take longer than expected or be granted with conditions.",
      },
      {
        title: "Construction cost and delay",
        body: "Material prices, labour availability and weather can raise costs and extend timelines.",
      },
      {
        title: "Market and resale",
        body: "Demand for larger homes in Pokhara Lekhnath may change. Resale can take time and prices can fall as well as rise.",
      },
      {
        title: "Currency",
        body: "For buyers earning in pounds or other currencies, movements against the Nepali rupee change the real cost and value.",
      },
      {
        title: "Eligibility to own",
        body: "Whether you can hold land in Nepal depends on your citizenship status. Foreign nationals face restrictions; Non-Resident Nepali rules have their own limits.",
      },
    ],
    documents: [
      {
        title: "Project overview brochure",
        description: "Concept, location and design summary.",
        visibility: "AVAILABLE_ON_REQUEST",
        status: "AVAILABLE_ON_REQUEST",
      },
      {
        title: "Site layout (illustrative)",
        description: "Indicative arrangement of the 11 plots and access roads.",
        visibility: "AVAILABLE_ON_REQUEST",
        status: "IN_DEVELOPMENT",
      },
      {
        title: "Pricing and cost breakdown",
        description: "Confirmed land and construction costs per home.",
        visibility: "QUALIFIED_ACCESS",
        status: "TO_BE_CONFIRMED",
      },
      {
        title: "Land title and ownership documents",
        description: "Ownership records and legal review, for serious enquirers.",
        visibility: "QUALIFIED_ACCESS",
        status: "TO_BE_CONFIRMED",
      },
      {
        title: "Floor plans",
        description: "Home layouts and specification.",
        visibility: "COMING_SOON",
        status: "COMING_SOON",
      },
    ],
    updates: [],
    faqs: [
      {
        question: "Where is Ample Cozy Homes?",
        answer: "In Pokhara Lekhnath, Kaski District, about 6.5 km from Prithvi Chowk in central Pokhara.",
      },
      {
        question: "How many homes are planned?",
        answer: "Eleven. The community is deliberately small.",
      },
      {
        question: "What style are the homes?",
        answer:
          "A British-inspired design: clean exteriors, pitched roofs and practical modern layouts, adapted to local conditions.",
      },
      {
        question: "Is pricing available?",
        answer:
          "Pricing is available on request. Figures in earlier material are being re-confirmed, so Ample shares current numbers directly rather than publishing them here.",
      },
      {
        question: "Can I invest in the project without buying a home?",
        answer:
          "Not at present. Any investment or co-development structure will only be offered once its legal vehicle and terms are confirmed.",
      },
      {
        question: "Can I buy if I live in the UK?",
        answer:
          "Nepali citizens living abroad can generally buy property in Nepal. If you hold foreign citizenship, eligibility depends on Non-Resident Nepali rules and other law. Take independent legal advice before committing.",
      },
      {
        question: "When will construction start and finish?",
        answer: "The delivery timeline has not yet been confirmed. It will be published here when it is.",
      },
    ],
    seo: {
      title: "Ample Cozy Homes Pokhara | 11 Planned Homes in Pokhara Lekhnath",
      description:
        "Ample Cozy Homes: 11 British-inspired homes in a planned community in Pokhara Lekhnath, 6.5 km from Prithvi Chowk. Project facts, risks and how to request details.",
    },
    featured: true,
  },
];
