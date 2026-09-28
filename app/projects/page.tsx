import type { Metadata } from "next";
import { categoriesInUse, projects, toSummary, toolsInUse } from "@/content/projects";
import { profile } from "@/content/profile";
import { ProjectBrowser } from "@/components/projects/project-browser";

export const metadata: Metadata = {
  title: "Projects",
  description: `Data analysis case studies by ${profile.name}: FinTech transactions, public-health statistics, marketing SQL, sales dashboards and data cleaning in Excel, Power BI, SQL, R and Python.`,
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects", title: `Projects · ${profile.name}`, images: ["/opengraph-image"] },
};

export default function ProjectsPage() {
  return (
    <div className="container-page pb-24 pt-10 sm:pt-16">
      <p className="font-mono text-xs text-muted">
        <span className="text-brand">SELECT</span> * <span className="text-brand">FROM</span> projects{" "}
        <span className="text-brand">ORDER BY</span> relevance;
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">All projects</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        {projects.length} case studies across dashboards, data cleaning, SQL analysis and statistics. Filter by tool or type, then
        open any project for the question, the process and the findings.
      </p>
      <div className="mt-10">
        <ProjectBrowser
          projects={projects.map(toSummary)}
          tools={toolsInUse()}
          categories={categoriesInUse()}
        />
      </div>
    </div>
  );
}
