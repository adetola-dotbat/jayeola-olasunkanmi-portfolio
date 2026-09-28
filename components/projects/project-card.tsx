import Link from "next/link";
import type { ProjectSummary as Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/icons";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({
  project,
  layout = "stacked",
  headingLevel = "h3",
  preload,
}: {
  project: Project;
  layout?: "stacked" | "wide";
  headingLevel?: "h2" | "h3";
  preload?: boolean;
}) {
  const Heading = headingLevel;
  const wide = layout === "wide";

  return (
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-xl border border-line bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift",
        wide ? "flex-col lg:flex-row" : "flex-col",
      )}
    >
      <ProjectVisual
        project={project}
        preload={preload}
        sizes={wide ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"}
        className={cn("border-line", wide ? "aspect-[16/10] lg:aspect-auto lg:w-[58%] lg:border-r" : "aspect-[16/10] border-b")}
      />
      <div className={cn("flex flex-1 flex-col p-6", wide && "lg:p-9")}>
        <p className="eyebrow">
          {project.type}
          <span aria-hidden="true"> · </span>
          {project.tools.filter((t) => t !== "PostgreSQL").join(" · ")}
        </p>
        <Heading className={cn("mt-3 font-semibold tracking-tight text-ink", wide ? "text-2xl sm:text-3xl" : "text-xl")}>
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.shortTitle}
          </Link>
        </Heading>
        <p className={cn("mt-3 leading-relaxed text-muted", wide ? "text-base" : "text-[0.95rem]")}>{project.summary}</p>

        {wide ? (
          <div className="mt-6 rounded-lg border border-line bg-paper p-4">
            <p className="eyebrow !text-[0.68rem]">The question</p>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{project.question}</p>
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          {project.headline ? (
            <p className="min-w-0">
              <span className="num block text-lg font-semibold tracking-tight text-ink">{project.headline.value}</span>
              <span className="block text-xs text-muted">{project.headline.label}</span>
            </p>
          ) : (
            <span />
          )}
          <span
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white"
            aria-hidden="true"
          >
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
      {/* Whole card is clickable via the stretched title link; focus ring shown on the card. */}
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-brand ring-offset-2 group-has-[a:focus-visible]:ring-2" aria-hidden="true" />
    </article>
  );
}
