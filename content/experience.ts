import type { Education, ExperienceItem } from "@/lib/types";

export const experience: ExperienceItem[] = [
  {
    role: "Data Analyst (Contract / Freelance)",
    organization: "Digital Payment & FinTech Analytics Services",
    kind: "Contract",
    start: "May 2024",
    end: "Aug 2025",
    location: "Lagos",
    summary:
      "Transaction analytics for digital payments, covering processing health, revenue drivers and executive reporting.",
    points: [
      "Analysed multi-channel transaction data (2,500 records across wallets, bill payments, USSD, POS and transfers) to assess processing health and revenue drivers.",
      "Built Excel models and KPI summaries tracking total processing volume, average ticket size and the impact of gateway failures (about 9%).",
      "Designed interactive executive dashboards with month-on-month trends, revenue by state and a top-customer leaderboard.",
      "Identified Lagos, Abuja and Rivers as the commercial hubs, driving over 55% of processing value.",
    ],
    relatedProjects: ["fintech-transaction-analysis"],
  },
  {
    role: "Data Analyst Intern",
    organization: "Pixel Interactive Studios",
    kind: "Internship",
    start: "Sep 2024",
    end: "Apr 2025",
    location: "Remote",
    summary: "Sales analytics on a global video game catalogue.",
    points: [
      "Analysed global video game sales across 16,500+ titles and regional markets: North America, Europe, Japan and other regions.",
      "Built PivotTable models and trend charts on publisher performance (Nintendo first, then Electronic Arts and Activision) and platform dominance.",
      "Evaluated genre-level performance across Action, Sports, Shooter and Role-Playing titles.",
    ],
    relatedProjects: ["video-game-sales-analysis"],
  },
  {
    role: "Departmental Administrative Assistant (NYSC)",
    organization: "Akwa-Ibom State Polytechnic",
    kind: "National service",
    start: "Jul 2024",
    end: "Jun 2025",
    location: "Akwa-Ibom State",
    summary: "National Youth Service Corps placement.",
    points: [
      "Collated and organised student academic performance records for departmental processing, statistical evaluation and internal reporting.",
    ],
  },
  {
    role: "Data Analyst Trainee",
    organization: "3 Million Technical Talent (3MTT)",
    kind: "Training programme",
    start: "Jan 2024",
    end: "May 2024",
    location: "Remote",
    summary: "Data Analysis & Visualization track of the national 3MTT programme.",
    points: [
      "Completed online and physical applied learning in data analysis and visualization, certified on 20 May 2024 through the SAIL Innovation Lab learning cluster.",
    ],
  },
  {
    role: "Data Analyst Intern",
    organization: "Vephla Tech",
    kind: "Internship",
    start: "Feb 2024",
    end: "Apr 2024",
    location: "Remote",
    summary: "Data entry, cleaning, analysis and dashboard tasks in Excel and Power BI.",
    points: [
      "Standardised a global AI and data salary dataset across currencies (USD, GBP, EUR) and remote ratios.",
      "Cleaned raw datasets and built sales dashboards in Excel and Power BI.",
    ],
    relatedProjects: ["hugo-group-sales-report", "music-industry-analysis"],
  },
];

export const education: Education[] = [
  {
    qualification: "Higher National Diploma (HND)",
    field: "Statistics",
    institution: "Federal Polytechnic, Ilaro",
    year: "2023",
    result: "Distinction · CGPA 3.50",
  },
  {
    qualification: "National Diploma (ND)",
    field: "Mathematics & Statistics",
    institution: "Lagos State Polytechnic",
    year: "2019",
    result: "Upper Credit · CGPA 3.34",
  },
];
