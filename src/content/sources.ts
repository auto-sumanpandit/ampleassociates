import type { SourceReference } from "@/types/content";

/**
 * Register of external facts used on the site. Every market statistic must
 * be listed here with its publisher, reference year and last-verified date.
 */
export const sources = {
  amplePortfolioDocument: {
    label: "Ample Associates company profile and project document",
    publisher: "Ample Associates (supplied by the client)",
    referenceYear: "Undated",
    lastVerified: "2026-09-25",
  },
  tourismArrivals2025: {
    label: "1,158,459 international visitors in 2025 (1,147,548 in 2024)",
    publisher: "Nepal Tourism Board, as reported by The Himalayan Times",
    url: "https://thehimalayantimes.com/nepal/more-than-11-million-foreign-visitors-arrived-in-nepal-in-2025",
    referenceYear: "2025",
    lastVerified: "2026-09-25",
  },
  installedCapacity2025: {
    label: "Installed electricity capacity of 3,878 MW (announced July 2025)",
    publisher: "South Asia Subregional Economic Cooperation (SASEC), Asian Development Bank",
    url: "https://www.sasec.asia/index.php?page=news&nid=1655&url=installed-electricity-capacity-nepal-3878",
    referenceYear: "2025",
    lastVerified: "2026-09-25",
  },
  fdiThreshold: {
    label: "Minimum foreign direct investment of NPR 20 million per project (from FY 2022/23 budget)",
    publisher: "U.S. Department of State, 2025 Investment Climate Statement: Nepal",
    url: "https://www.state.gov/reports/2025-investment-climate-statements/nepal",
    referenceYear: "2025",
    lastVerified: "2026-09-25",
  },
  fittaRealEstate: {
    label:
      "Real estate business (excluding the construction industry) is listed among sectors closed to foreign investment",
    publisher: "Foreign Investment and Technology Transfer Act, 2019 (2075), Schedule",
    url: "https://pkf.trunco.com.np/files/publications/1657092833_Final%20FITTA%20ACT%202075%20Highlights_Updated_20220526070549.pdf",
    referenceYear: "2019 (as amended)",
    lastVerified: "2026-09-25",
  },
  lekhnathMerger: {
    label:
      "Lekhnath Municipality merged with Pokhara Sub-Metropolitan City to form Pokhara Lekhnath Metropolitan City (464.24 sq km)",
    publisher: "The Kathmandu Post",
    url: "https://kathmandupost.com/national/2017/03/13/pokhara-lekhnath-becomes-largest-metropolitan-city",
    referenceYear: "2017",
    lastVerified: "2026-09-25",
  },
  investNepal: {
    label: "Official investment promotion and facilitation portal",
    publisher: "Government of Nepal, Invest Nepal",
    url: "https://www.investnepal.gov.np/",
    lastVerified: "2026-09-25",
  },
  ibn: {
    label: "Office of the Investment Board Nepal",
    publisher: "Government of Nepal",
    url: "https://ibn.gov.np/",
    lastVerified: "2026-09-25",
  },
  siklesHydro: {
    label: "Sikles Hydropower Ltd: 13 MW Madkyu Khola Hydropower Project, Kaski",
    publisher: "Sikles Hydropower Ltd",
    url: "https://www.sikleshydro.com.np/about/",
    lastVerified: "2026-09-25",
  },
  himalayanSolar: {
    label: "Himalayan Solar Power: 10 MW, Sitalpati, Khandbari",
    publisher: "Himalayan Solar Power",
    url: "https://himalayansolarpower.com",
    lastVerified: "2026-09-25",
  },
} satisfies Record<string, SourceReference>;
