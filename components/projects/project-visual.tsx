import Image from "next/image";
import type { ProjectSummary as Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * The visual for a project card. Uses the dashboard screenshot when one exists;
 * otherwise draws a typographic "data cover" from the project's own verified figures.
 */
export function ProjectVisual({
  project,
  sizes,
  className,
  preload = false,
}: {
  project: Project;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  if (project.cover) {
    return (
      <div className={cn("relative overflow-hidden bg-white", className)}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={cn(
            "transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.035]",
            // Very wide charts are shown whole; dashboards and screenshots fill the frame from the top-left.
            project.cover.width / project.cover.height > 1.75 ? "object-contain p-3" : "object-cover object-left-top",
          )}
        />
      </div>
    );
  }

  const chart = project.charts?.[0];
  const bars = chart?.data.slice(0, 5) ?? [];
  const max = Math.max(...bars.map((b) => b.value), 1);

  return (
    <div
      className={cn("dot-grid relative flex flex-col justify-between overflow-hidden bg-brand-soft p-6 sm:p-7", className)}
      aria-hidden="true"
    >
      {project.headline ? (
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-brand-strong/80">Headline</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-brand-strong sm:text-5xl">{project.headline.value}</p>
          <p className="mt-1 max-w-[16rem] text-sm text-brand-strong/80">{project.headline.label}</p>
        </div>
      ) : null}
      {bars.length ? (
        <div className="mt-6 space-y-1.5 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:translate-x-1">
          {bars.map((b, i) => (
            <div key={b.label} className="flex items-center gap-2">
              <div
                className={cn("h-3 rounded-[3px]", i === 0 ? "bg-accent" : "bg-brand/70")}
                style={{ width: `${Math.max((b.value / max) * 78, 4)}%` }}
              />
              <span className="truncate font-mono text-[0.65rem] text-brand-strong/70">{b.label}</span>
            </div>
          ))}
        </div>
      ) : project.beforeAfter ? (
        <div className="mt-6 space-y-2 font-mono text-xs">
          <p className="line-clamp-2 rounded-md bg-surface/70 px-3 py-2 text-muted line-through decoration-accent/60">
            {project.beforeAfter.before}
          </p>
          <p className="rounded-md bg-surface px-3 py-2 text-brand-strong">{project.beforeAfter.after}</p>
        </div>
      ) : null}
    </div>
  );
}
