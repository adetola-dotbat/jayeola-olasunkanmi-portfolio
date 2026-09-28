"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProjectSummary as Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

interface Filter {
  id: string;
  label: string;
  match: (p: Project) => boolean;
}

export function ProjectBrowser({
  projects,
  tools,
  categories,
}: {
  projects: Project[];
  tools: string[];
  categories: string[];
}) {
  const filters: Filter[] = useMemo(
    () => [
      { id: "all", label: "All", match: () => true },
      ...tools.map((t) => ({ id: `tool:${t}`, label: t, match: (p: Project) => p.tools.includes(t as Project["tools"][number]) })),
      ...categories.map((c) => ({
        id: `cat:${c}`,
        label: c,
        match: (p: Project) => p.categories.includes(c as Project["categories"][number]),
      })),
    ],
    [tools, categories],
  );

  const [active, setActive] = useState("all");

  // Support deep links such as /projects?tool=Excel from the skills section.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tool = params.get("tool");
    const category = params.get("category");
    const id = tool ? `tool:${tool}` : category ? `cat:${category}` : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL once on mount
    if (id && filters.some((f) => f.id === id)) setActive(id);
  }, [filters]);

  function select(id: string) {
    setActive(id);
    const url = new URL(window.location.href);
    url.searchParams.delete("tool");
    url.searchParams.delete("category");
    if (id.startsWith("tool:")) url.searchParams.set("tool", id.slice(5));
    if (id.startsWith("cat:")) url.searchParams.set("category", id.slice(4));
    window.history.replaceState(null, "", url);
  }

  const current = filters.find((f) => f.id === active) ?? filters[0];
  const visible = projects.filter(current.match);

  const renderGroup = (label: string, items: Filter[]) => (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label}>
      <span className="mr-1 w-full font-mono text-[0.7rem] uppercase tracking-wider text-muted sm:w-auto">{label}</span>
      {items.map((f) => {
        const count = projects.filter(f.match).length;
        const on = f.id === active;
        return (
          <button
            key={f.id}
            type="button"
            aria-pressed={on}
            onClick={() => select(f.id)}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm transition-colors",
              on ? "border-ink bg-ink text-white" : "border-line-strong bg-surface text-ink-soft hover:border-ink hover:text-ink",
            )}
          >
            {f.label}
            <span className={cn("num font-mono text-[0.7rem]", on ? "text-white/70" : "text-muted")}>{count}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div>
      <div className="space-y-3 rounded-xl border border-line bg-surface p-4 sm:p-5">
        {renderGroup("Tool", filters.filter((f) => f.id === "all" || f.id.startsWith("tool:")))}
        {renderGroup("Type", filters.filter((f) => f.id.startsWith("cat:")))}
      </div>

      <p className="mt-6 font-mono text-xs text-muted" role="status" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
        {current.id !== "all" ? ` using ${current.label}` : ""}
      </p>

      <ul className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <li key={p.slug} className="flex">
            <ProjectCard project={p} headingLevel="h2" preload={i < 2} />
          </li>
        ))}
      </ul>
    </div>
  );
}
