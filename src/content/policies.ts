import type { Policy } from "@/types/content";

/**
 * Legal pages, written to reflect how the site actually operates.
 * Reviewed and confirmed by the client on 2 Oct 2026.
 */
const draft = "2026-09-25";

export const policies: Policy[] = [
  {
    slug: "risk-disclosure",
    title: "Risk Disclosure",
    summary: "The main risks of property and project investment in Nepal, in plain language.",
    lastUpdated: draft,
    status: "CLIENT_CONFIRMED",
    seo: {
      title: "Risk Disclosure | Ample Associates",
      description:
        "The main risks of investing in property and development projects in Nepal: capital loss, title, construction, currency, liquidity, regulation and more.",
    },
    sections: [
      {
        heading: "Please read this before acting on anything on this website",
        paragraphs: [
          "Investing in property and development projects involves risk. You may get back less than you put in, or lose all of it. Past performance of any Ample business is not a guide to the future of any project.",
          "The risks below apply generally. Each project page lists the risks specific to that project, and project documents will set out risks in more detail.",
        ],
      },
      {
        heading: "Risks that apply to most projects",
        paragraphs: [],
        list: [
          "Capital risk: the value of an investment or property can fall, and you may lose money.",
          "Title and ownership risk: land records may be incomplete, disputed or inconsistent with the physical boundaries.",
          "Planning and approval risk: permits may be delayed, refused or granted with conditions.",
          "Construction risk: costs can rise and timelines can slip because of materials, labour, weather or contractor performance.",
          "Market risk: demand and prices can change, and a buyer may not be available when you want to sell.",
          "Liquidity risk: property and private project interests can be difficult to sell quickly.",
          "Currency risk: if you earn or measure wealth in another currency, changes in the Nepali rupee affect your returns.",
          "Regulatory and legal risk: laws on foreign investment, land ownership, tax and repatriation can change.",
          "Political and natural-hazard risk: political change, earthquakes, floods and landslides can affect projects in Nepal.",
          "Execution risk: projects depend on the people delivering them; key people may leave or partners may not perform.",
        ],
      },
      {
        heading: "Eligibility",
        paragraphs: [
          "Whether you can legally own land, property or shares in Nepal depends on your citizenship and residence. Foreign nationals face significant restrictions. Take independent legal advice before committing.",
        ],
      },
      {
        heading: "Independent advice",
        paragraphs: [
          "Ample Associates does not provide personal financial, legal or tax advice. You should consult your own qualified advisers before making any decision.",
        ],
      },
    ],
  },
  {
    slug: "investment-disclaimer",
    title: "Investment Disclaimer",
    summary: "What this website is, and what it is not.",
    lastUpdated: draft,
    status: "CLIENT_CONFIRMED",
    seo: {
      title: "Investment Disclaimer | Ample Associates",
      description:
        "This website provides information about Ample Associates and its projects. It is not an offer, a solicitation or investment advice.",
    },
    sections: [
      {
        heading: "Information only",
        paragraphs: [
          "The content on this website is provided for general information about Ample Associates, its companies and its projects. It is not an offer to sell, or a solicitation of an offer to buy, any security, property or investment in any jurisdiction.",
          "Nothing on this website is personal financial, legal, tax or investment advice.",
        ],
      },
      {
        heading: "No online investment",
        paragraphs: [
          "This website does not accept payments or process investments. Contacting us or requesting information does not create an agreement or an obligation for you or for Ample Associates.",
        ],
      },
      {
        heading: "Forward-looking information and estimates",
        paragraphs: [
          "Where the website describes plans, timelines or estimates, these are forward-looking and may change. Figures marked 'to be confirmed' or 'available on request' have not been verified for publication. Ample Associates does not publish guaranteed or projected returns.",
        ],
      },
      {
        heading: "Jurisdiction",
        paragraphs: [
          "Investment opportunities may not be available to people in all countries. It is your responsibility to understand and comply with the laws that apply to you. Any specific opportunity will be offered only through documentation reviewed for the relevant jurisdiction.",
        ],
      },
      {
        heading: "Third-party information",
        paragraphs: [
          "Market statistics are taken from the sources cited next to them. Ample Associates does not guarantee the accuracy of third-party information.",
        ],
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "How Ample Associates handles personal information from website visitors and people who contact us.",
    lastUpdated: "2026-10-02",
    status: "CLIENT_CONFIRMED",
    seo: {
      title: "Privacy Policy | Ample Associates",
      description:
        "How Ample Associates handles personal information from website visitors and people who contact us, including analytics cookies.",
    },
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "This website is operated by Ample Associates, the brand name of the companies and projects shown on it. For any question about your personal data, contact us at contact@ampleassociates.com.",
        ],
      },
      {
        heading: "What we collect",
        paragraphs: [
          "This website has no user accounts. We receive personal information only when you contact us, through the contact form or by email, and it is limited to what you choose to send: your name, email address, country (optional), area of interest and message. The form also records, for spam protection only, the time it was opened and your internet address for rate limiting; neither is stored.",
          "If you accept analytics cookies, we also receive anonymous usage data (see below).",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "We use the information you send only to respond to your enquiry. The lawful basis is our legitimate interest in responding to people who contact us, or your consent where applicable.",
          "We do not sell your personal information.",
        ],
      },
      {
        heading: "Who we share it with",
        paragraphs: [
          "We use service providers to host the website and handle email. They process data on our instructions. Some providers may store data outside Nepal or the UK; where required, appropriate safeguards will apply.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "We keep enquiry correspondence for one year from our last contact with you, and then delete or anonymise it, unless a continuing relationship or a legal obligation requires us to keep it longer.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Depending on where you live, you may have the right to access, correct or delete your information, to object to or restrict its use, and to withdraw consent at any time. UK residents may also complain to the Information Commissioner's Office.",
        ],
      },
      {
        heading: "Analytics and cookies",
        paragraphs: ["Analytics cookies are only set if you accept them. See the Cookie Policy for details."],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    summary: "The cookies this website uses and how to control them.",
    lastUpdated: draft,
    status: "CLIENT_CONFIRMED",
    seo: {
      title: "Cookie Policy | Ample Associates",
      description:
        "Which cookies the Ample Associates website uses, why, and how to accept or decline analytics cookies.",
    },
    sections: [
      {
        heading: "Essential storage",
        paragraphs: [
          "The website stores your cookie choice in your browser so that we do not ask you again on every page. This is necessary for the site to respect your choice.",
        ],
      },
      {
        heading: "Analytics cookies (optional)",
        paragraphs: [
          "If you accept analytics, we use Google Analytics 4 to understand how visitors use the site, for example which project pages are read. Google Analytics sets cookies such as _ga and _ga_<id>. These are not set unless you accept.",
        ],
      },
      {
        heading: "Changing your choice",
        paragraphs: [
          "You can change your choice at any time using the 'Cookie settings' link in the footer, or by clearing this site's data in your browser.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    summary: "The terms that apply when you use this website.",
    lastUpdated: "2026-10-02",
    status: "CLIENT_CONFIRMED",
    seo: {
      title: "Terms of Use | Ample Associates",
      description:
        "Terms that apply to your use of the Ample Associates website, including information use, intellectual property and liability.",
    },
    sections: [
      {
        heading: "Using this website",
        paragraphs: [
          "By using this website you agree to these terms. If you do not agree, please do not use the site.",
        ],
      },
      {
        heading: "Information on the site",
        paragraphs: [
          "We aim to keep information accurate and up to date and mark information that is still being confirmed. However, the site is provided for general information and we do not guarantee that it is complete or current. Please read the Investment Disclaimer and Risk Disclosure.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Content, design and branding on this website belong to Ample Associates or its licensors. Third-party photographs are used under the licences credited next to them.",
        ],
      },
      {
        heading: "Links to other websites",
        paragraphs: ["Links to other websites are provided for convenience. We are not responsible for their content."],
      },
      {
        heading: "Liability",
        paragraphs: [
          "To the extent permitted by law, Ample Associates is not liable for any loss arising from reliance on information on this website.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the law of the country where the relevant project or company is based: the laws of Nepal for projects and companies in Nepal, and the laws of England and Wales for those in the United Kingdom. The courts of that country have jurisdiction over any dispute.",
        ],
      },
    ],
  },
];
