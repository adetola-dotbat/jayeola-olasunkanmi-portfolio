import Link from "next/link";
import { featuredProjects, projects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";

export function Work() {
  const [lead, ...rest] = featuredProjects;
  const others = projects.filter((p) => !p.featured);

  return (
    <section aria-labelledby="work-title" id="work" className="border-t border-line bg-paper py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs text-muted">
              <span className="text-brand">SELECT</span> * <span className="text-brand">FROM</span> projects{" "}
              <span className="text-brand">WHERE</span> featured;
            </p>
            <h2 id="work-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Selected work
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Each case study starts with the question, shows the process, and ends with findings taken from the project&apos;s own
              documentation.
            </p>
          </div>
          <ButtonLink href="/projects" variant="secondary" className="self-start sm:self-auto" icon={<ArrowRight className="size-4" />}>
            All {projects.length} projects
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-6">
          {lead ? (
            <div className="reveal">
              <ProjectCard project={lead} layout="wide" />
            </div>
          ) : null}
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((p) => (
              <div key={p.slug} className="reveal flex">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>

        <div className="reveal mt-16">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-semibold tracking-tight">More projects</h3>
            <p className="font-mono text-xs text-muted">{others.length} rows returned</p>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-line bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-sunken/60 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                    Project
                  </th>
                  <th scope="col" className="hidden px-4 py-3 font-medium md:table-cell">
                    Tools
                  </th>
                  <th scope="col" className="hidden px-4 py-3 font-medium lg:table-cell">
                    Headline
                  </th>
                  <th scope="col" className="w-12 px-4 py-3">
                    <span className="sr-only">Open</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {others.map((p) => (
                  <tr key={p.slug} className="group relative transition-colors hover:bg-paper">
                    <th scope="row" className="px-4 py-4 font-normal sm:px-5">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="font-medium text-ink after:absolute after:inset-0 after:content-['']"
                      >
                        {p.shortTitle}
                      </Link>
                      <span className="mt-0.5 block text-xs text-muted md:hidden">{p.tools.filter((t) => t !== "PostgreSQL").join(" · ")}</span>
                    </th>
                    <td className="hidden px-4 py-4 text-muted md:table-cell">{p.tools.filter((t) => t !== "PostgreSQL").join(" · ")}</td>
                    <td className="hidden px-4 py-4 text-muted lg:table-cell">
                      {p.headline ? (
                        <>
                          <span className="num font-medium text-ink">{p.headline.value}</span> {p.headline.label}
                        </>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <ArrowRight className="ml-auto size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
