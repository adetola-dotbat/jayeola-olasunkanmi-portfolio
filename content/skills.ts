import type { Tool } from "@/lib/types";

export interface SkillGroup {
  title: string;
  description: string;
  /** Tools linked to projects that use them. */
  tools: { tool: Tool; label: string; detail: string }[];
  /** Skills listed on the CV without a project on this site yet. */
  also?: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Spreadsheets & modelling",
    description: "Where most of my analysis starts: cleaning, structuring and calculating.",
    tools: [
      {
        tool: "Excel",
        label: "Microsoft Excel",
        detail: "PivotTables, SUMIFS/COUNTIFS, INDEX/MATCH, text functions, slicers, dashboards",
      },
    ],
    also: ["Google Sheets"],
  },
  {
    title: "Visualisation & BI",
    description: "Dashboards that answer the question in the first few seconds.",
    tools: [
      { tool: "Power BI", label: "Power BI", detail: "KPI cards, report pages, interactive visuals" },
    ],
    also: ["Excel dashboards", "ggplot2", "PowerPoint"],
  },
  {
    title: "Databases & SQL",
    description: "Querying large tables to answer specific business questions.",
    tools: [
      { tool: "SQL", label: "SQL · PostgreSQL", detail: "Aggregation, grouping, ranking, filtering thresholds" },
    ],
  },
  {
    title: "Statistics & programming",
    description: "A statistics background, applied with code.",
    tools: [
      { tool: "R", label: "R", detail: "Control charts, dplyr, ggplot2, summary statistics" },
      { tool: "Python", label: "Python", detail: "pandas for profiling and independent checks" },
    ],
    also: ["Statistical process control", "SPSS", "Matplotlib"],
  },
];

export const approach = [
  {
    step: "01",
    title: "Understand the question",
    detail: "Start from the decision someone needs to make, and turn it into questions the data can answer.",
  },
  {
    step: "02",
    title: "Profile and clean",
    detail: "Check types, gaps, duplicates and labels before trusting a single number.",
  },
  {
    step: "03",
    title: "Analyse and validate",
    detail: "Build the analysis, then check the headline figures a second way.",
  },
  {
    step: "04",
    title: "Present and recommend",
    detail: "Lead with the finding, show the evidence, and separate what I observed from what I recommend.",
  },
];
