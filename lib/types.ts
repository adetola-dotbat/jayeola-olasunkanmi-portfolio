export type Tool =
  | "Excel"
  | "Power BI"
  | "SQL"
  | "PostgreSQL"
  | "R"
  | "Python"
  | "SPSS"
  | "Google Sheets";

export type ProjectCategory =
  | "Dashboards"
  | "Data Cleaning"
  | "Statistics"
  | "SQL Analysis";

export type ProjectType =
  | "Freelance project"
  | "Internship task"
  | "Training project"
  | "Research study";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

export interface EvidenceLink {
  label: string;
  href: string;
  kind: "drive" | "download" | "sheet" | "pdf";
  /** File hosted on this site rather than an external service. */
  local?: boolean;
}

export interface ChartDatum {
  label: string;
  value: number;
}

export interface ProjectChart {
  title: string;
  unit: string;
  source: string;
  data: ChartDatum[];
  /** Format large values (e.g. "1,787") — defaults to locale number. */
  decimals?: number;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  /** One sentence used on cards and meta descriptions. */
  summary: string;
  question: string;
  type: ProjectType;
  context: string;
  date?: string;
  tools: Tool[];
  categories: ProjectCategory[];
  featured?: boolean;
  cover?: ProjectImage;
  /** Headline finding shown on cards — only when documented. */
  headline?: Stat;
  overview: string[];
  data: { label: string; value: string }[];
  approach: { title: string; detail: string }[];
  stats?: Stat[];
  gallery?: ProjectImage[];
  charts?: ProjectChart[];
  findings: string[];
  recommendations?: string[];
  /** Short code excerpt copied from the project's own documentation. */
  code?: { language: string; caption: string; snippet: string };
  beforeAfter?: { before: string; after: string; caption: string };
  table?: { caption: string; columns: string[]; rows: string[][] };
  evidence: EvidenceLink[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  kind: "Contract" | "Internship" | "National service" | "Training programme";
  start: string;
  end: string;
  location: string;
  summary: string;
  points: string[];
  relatedProjects?: string[];
}

export interface Credential {
  title: string;
  issuer: string;
  partner?: string;
  date: string;
  isoDate: string;
  group: "Data" | "Professional skills";
  description: string;
  reference?: { label: string; value: string };
  image: { src: string; width: number; height: number };
  original: string;
}

export interface Education {
  qualification: string;
  field: string;
  institution: string;
  year: string;
  result: string;
}

/** The subset of a project needed to render a card (keeps client payloads small). */
export type ProjectSummary = Pick<
  Project,
  "slug" | "title" | "shortTitle" | "summary" | "question" | "type" | "tools" | "categories" | "cover" | "headline" | "beforeAfter"
> & { charts?: ProjectChart[] };
