import type { FaqItem } from "@/types/content";

export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "about-ample",
    title: "About Ample Associates",
    items: [
      {
        question: "What is Ample Associates?",
        answer:
          "Ample Associates is the brand behind all of our companies and projects, and its journey began in 2009. It brings together experience, partnerships and development opportunities in the United Kingdom and Nepal across education, renewable energy, hospitality and property development.",
      },
      {
        question: "Who leads Ample?",
        answer:
          "Ample Associates was founded by Pramod Adhikari with his sister, Samjhana Adhikari, as a partner from the early years. Their profiles are on the Leadership page.",
      },
    ],
  },
  {
    id: "investing",
    title: "Investing and getting in touch",
    items: [
      {
        question: "How do I invest in a project in Nepal through Ample?",
        answer:
          "Explore the opportunities on this site and contact the team. If a project fits, you receive project information, carry out due diligence with your own advisers, and only then decide whether to enter into any agreement.",
      },
      {
        question: "What is NRN Back 2 Nepal Investment Company?",
        answer:
          "It is Ample Associates' investment company, operating from Kathmandu since 2025. It gives people who know Ample, especially former clients who have known us for a decade, a way to invest in Ample Associates projects in Nepal and the UK. Legal documents are prepared under the rules of the Government of Nepal or of the UK, as applicable.",
      },
      {
        question: "Does contacting Ample commit me to anything?",
        answer: "No. An enquiry or conversation is not an investment commitment and does not create any agreement.",
      },
      {
        question: "Is there a minimum investment?",
        answer:
          "Through NRN Back 2 Nepal Investment Company, the minimum investment is NPR 5 lakh (NPR 500,000). Individual projects may set their own terms, and whether you can take part depends on your citizenship and residence, so take independent advice.",
      },
      {
        question: "Can I invest online through this website?",
        answer: "No. This website provides information only. It does not accept payments or process investments.",
      },
      {
        question: "Are returns guaranteed?",
        answer:
          "No. All investment and property involves risk, including the loss of money invested. Ample does not publish or promise guaranteed returns.",
      },
    ],
  },
  {
    id: "overseas",
    title: "Investing from overseas",
    items: [
      {
        question: "Can Nepalis living in the UK take part?",
        answer:
          "Yes, you can contact the team from anywhere. Whether and how you can own property or shares in Nepal depends on your citizenship and the structure of the project, so we recommend independent legal advice.",
      },
      {
        question: "Can foreign nationals buy property in Nepal?",
        answer:
          "Generally, foreign nationals cannot own land in Nepal in their own name, and real estate business is on the list of sectors closed to foreign investment under Nepal's Foreign Investment and Technology Transfer Act. Non-Resident Nepalis have separate, limited rights. Always check your position with a Nepal-qualified lawyer.",
      },
      {
        question: "What is the minimum for foreign direct investment in Nepal?",
        answer:
          "Nepal set the general minimum for foreign direct investment at NPR 20 million per project from the 2022/23 budget, with exceptions such as information technology. Rules change, so confirm the current position with the Department of Industry or a lawyer.",
      },
    ],
  },
  {
    id: "information",
    title: "Information and documents",
    items: [
      {
        question: "Why are some figures marked 'to be confirmed'?",
        answer:
          "Because we only publish figures we can stand behind. Where information is still being verified, we say so rather than show a number that may change.",
      },
      {
        question: "How do I get more project information?",
        answer:
          "Contact the team through the Contact page. Some documents are shared only after an initial conversation.",
      },
      {
        question: "How is my personal information used?",
        answer: "Only to respond to your enquiry. See the Privacy Policy for details.",
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((g) => g.items);
