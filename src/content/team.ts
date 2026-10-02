import type { TeamMember } from "@/types/content";

/**
 * Leadership. Photos are the directors' own photographs from ampleedu.com
 * (Ample International Education, an Ample Associates company), cropped to headshots.
 * AI-generated portraits must never be used for real people.
 */
export const team: TeamMember[] = [
  {
    slug: "pramod-adhikari",
    name: "Pramod Adhikari",
    role: "Founder & Director",
    roleStatus: "CLIENT_CONFIRMED",
    shortBio:
      "Started as an office boy in Pokhara at 16 and opened his own education consultancy in 2009. Since then he has grown Ample, step by step, into a group across the UK and Nepal.",
    biography: [
      "Pramod's story starts in Pokhara in 2004. He was 16, working as an office boy at the local branch of Orbit International Education and earning NPR 3,000 a month, about £15. It was a humble start, and it taught him early that progress comes from discipline and persistence, not shortcuts.",
      "After four years learning the education business, he opened his own consultancy in 2009: the beginning of Ample. A year later he came to the UK to continue his studies, and with his sister Samjhana beside him, Ample went on to support more than 4,500 students whose colleges closed mid-course.",
      "Those relationships became the foundation for everything that followed: hydropower and solar in Nepal, Ample Cozy Homes and a hotel development in Pokhara, SAMS College London and, in 2025, NRN Back 2 Nepal Investment Company.",
      "Along the way he kept studying in both countries: humanities in Nepal, then business management and a Master's in Marketing Innovation and Design in the UK.",
    ],
    education: [
      { qualification: "Bachelor's in Humanities", institution: "PNC, Nepal", status: "CLIENT_CONFIRMED" },
      {
        qualification: "Postgraduate qualification in Business Management",
        institution: "Edexcel, UK",
        status: "CLIENT_CONFIRMED",
      },
      {
        qualification: "Master's in Marketing Innovation and Design",
        institution: "Anglia Ruskin University, UK",
        status: "CLIENT_CONFIRMED",
      },
    ],
    expertise: ["Business building", "Education services", "Property", "Energy partnerships"],
    photo: {
      src: "/images/team/pramod-adhikari.jpg",
      alt: "Pramod Adhikari",
      width: 600,
      height: 600,
      kind: "Portrait",
      credit: "Ample International Education",
    },
    profileLinks: [],
  },
  {
    slug: "samjhana-adhikari",
    name: "Samjhana Adhikari",
    role: "Founder & Director",
    roleStatus: "CLIENT_CONFIRMED",
    shortBio:
      "Pramod's sister and his partner in building Ample from the early years. She brings a background in tourism management, studied in the UK.",
    biography: [
      "Samjhana has been part of the Ample story from the early years, as Pramod's sister and as his partner in building it.",
      "When Ample began helping students in the UK, the two of them worked side by side, and together they supported more than 4,500 students whose colleges had closed in the middle of their courses. Through the uncertain early years they chose long-term trust over shortcuts, and that choice still shapes how Ample works today.",
      "Samjhana studied in the UK, earning a Bachelor's degree in Tourism Management and a postgraduate diploma in London. Her tourism background fits naturally with Ample Associates' plans in hospitality, including the hotel development in Lakeside, Pokhara.",
    ],
    education: [
      {
        qualification: "Bachelor's in Tourism Management",
        institution: "Glyndŵr University, Wrexham, UK",
        status: "CLIENT_CONFIRMED",
      },
      {
        qualification: "Postgraduate Diploma",
        institution: "Docklands College, London",
        status: "CLIENT_CONFIRMED",
      },
    ],
    expertise: ["Tourism and hospitality", "Organisational development", "Education services"],
    photo: {
      src: "/images/team/samjhana-adhikari.jpg",
      alt: "Samjhana Adhikari",
      width: 600,
      height: 600,
      kind: "Portrait",
      credit: "Ample International Education",
    },
    profileLinks: [],
  },
];
