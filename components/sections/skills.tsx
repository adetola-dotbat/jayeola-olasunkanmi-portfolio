import Link from "next/link";
import { skillGroups } from "@/content/skills";
import { projectsUsing } from "@/content/projects";
import { SectionHeading } from "@/components/ui/primitives";
import { ArrowRight } from "@/components/ui/icons";

export function Skills() {
  return (
    <section aria-labelledby="skills-title" id="skills" className="border-t border-line py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow="Toolkit"
          title="Tools, backed by projects"
          lead="Every tool below links to the case studies where it was used, so you can check the work, not just the label."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="reveal flex flex-col bg-paper p-6 sm:p-8">
              <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{group.description}</p>
              <ul className="mt-6 space-y-3">
                {group.tools.map(({ tool, label, detail }) => {
                  const count = projectsUsing(tool).length;
                  return (
                    <li key={tool}>
                      <Link
                        href={`/projects?tool=${encodeURIComponent(tool)}`}
                        className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-surface px-4 py-3 transition-colors hover:border-ink"
                      >
                        <span className="min-w-0">
                          <span className="block font-medium text-ink">{label}</span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-muted">{detail}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-brand">
                          <span className="num">
                            {count} {count === 1 ? "project" : "projects"}
                          </span>
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {group.also?.length ? (
                <p className="mt-5 text-sm text-muted">
                  <span className="text-ink-soft">Also: </span>
                  {group.also.join(" · ")}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
