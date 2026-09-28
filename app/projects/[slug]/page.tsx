import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentProject, getProject, projects } from "@/content/projects";
import { profile, siteUrl } from "@/content/profile";
import { BarChart } from "@/components/projects/bar-chart";
import { Screenshot } from "@/components/projects/case-study-media";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ExternalLink, Tag } from "@/components/ui/primitives";
import { ArrowLeft, ArrowRight, Download, FileText, Folder, Lightbulb, Table } from "@/components/ui/icons";
import type { EvidenceLink, Project } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `/projects/${project.slug}`;
  const images = project.cover
    ? [{ url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt }]
    : [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name}, Data Analyst` }];
  return {
    title: project.shortTitle,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: `${project.title} · ${profile.name}`, description: project.summary, images },
    twitter: { card: "summary_large_image", title: project.title, description: project.summary, images: images.map((i) => i.url) },
  };
}

const evidenceIcon: Record<EvidenceLink["kind"], typeof Folder> = {
  drive: Folder,
  sheet: Table,
  pdf: FileText,
  download: Download,
};

function EvidenceList({ links }: { links: EvidenceLink[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {links.map((link) => {
        const Icon = evidenceIcon[link.kind];
        const inner = (
          <>
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-brand-soft text-brand-strong">
              <Icon className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium text-ink">{link.label}</span>
              <span className="block text-xs text-muted">{link.local ? "Download from this site" : "Opens on Google Drive"}</span>
            </span>
          </>
        );
        const cls =
          "group flex w-full items-center gap-3 rounded-lg border border-line bg-surface p-3.5 text-left text-sm transition-colors hover:border-ink";
        return (
          <li key={link.href}>
            {link.local ? (
              <a href={link.href} download className={cls}>
                {inner}
                <Download className="size-4 text-muted group-hover:text-ink" />
              </a>
            ) : (
              <ExternalLink href={link.href} className={cls}>
                {inner}
              </ExternalLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function sectionsFor(p: Project) {
  return [
    { id: "overview", label: "Overview" },
    { id: "data", label: "Data" },
    { id: "approach", label: "Approach" },
    ...(p.charts?.length || p.gallery?.length || p.code || p.table || p.beforeAfter ? [{ id: "analysis", label: "Visual analysis" }] : []),
    { id: "findings", label: "Key findings" },
    ...(p.recommendations?.length ? [{ id: "recommendations", label: "Recommendations" }] : []),
    { id: "evidence", label: "Evidence" },
  ];
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getAdjacentProject(slug);
  const sections = sectionsFor(project);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteUrl()}/projects/${project.slug}`,
    author: { "@type": "Person", name: profile.name, url: siteUrl() },
    keywords: [...project.tools, ...project.categories].join(", "),
    ...(project.cover ? { image: `${siteUrl()}${project.cover.src}` } : {}),
  };

  return (
    <article>
      <header className="container-page pt-8 sm:pt-12">
        <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" /> All projects
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Tag tone="brand">{project.type}</Tag>
          <Tag>{project.context}</Tag>
          {project.date ? <Tag>{project.date}</Tag> : null}
        </div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{project.summary}</p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
          <div>
            <dt className="eyebrow">Tools</dt>
            <dd className="mt-1.5 font-medium text-ink">{project.tools.join(", ")}</dd>
          </div>
          <div>
            <dt className="eyebrow">Focus</dt>
            <dd className="mt-1.5 font-medium text-ink">{project.categories.join(", ")}</dd>
          </div>
          <div>
            <dt className="eyebrow">Evidence</dt>
            <dd className="mt-1.5">
              <a href="#evidence" className="font-medium text-brand underline-offset-4 hover:underline">
                {project.evidence.length} source {project.evidence.length === 1 ? "file" : "files"}
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-10">
          {project.cover ? (
            <Screenshot image={project.cover} preload sizes="(min-width: 1152px) 1088px, 100vw" />
          ) : (
            <ProjectVisual project={project} sizes="100vw" className="aspect-[21/9] min-h-64 rounded-xl border border-line" />
          )}
        </div>

        {project.stats?.length ? (
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
            {project.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse bg-surface p-5 sm:p-6">
                <dt className="mt-1.5 text-sm text-muted">{s.label}</dt>
                <dd className="num text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </header>

      <div className="container-page mt-16 grid gap-12 pb-24 lg:grid-cols-[13rem_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="eyebrow mb-4">On this page</p>
            <ul className="space-y-2.5 border-l border-line text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-ink hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="min-w-0 max-w-3xl space-y-20">
          <section aria-labelledby="overview">
            <h2 id="overview" className="text-2xl font-semibold tracking-tight">
              Overview
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
              {project.overview.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <div className="mt-8 rounded-xl border-l-4 border-brand bg-brand-soft/60 px-6 py-5">
              <p className="eyebrow !text-brand-strong">The question</p>
              <p className="mt-2 text-xl font-medium leading-snug tracking-tight text-ink">{project.question}</p>
            </div>
          </section>

          <section aria-labelledby="data">
            <h2 id="data" className="text-2xl font-semibold tracking-tight">
              Data
            </h2>
            <dl className="mt-6 divide-y divide-line rounded-xl border border-line bg-surface">
              {project.data.map((d) => (
                <div key={d.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-sm text-muted">{d.label}</dt>
                  <dd className="text-ink">{d.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="approach">
            <h2 id="approach" className="text-2xl font-semibold tracking-tight">
              Approach
            </h2>
            <ol className="mt-6 space-y-3">
              {project.approach.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 rounded-xl border border-line bg-surface p-5">
                  <span className="num grid size-9 place-items-center rounded-full bg-ink font-mono text-xs text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {sections.some((s) => s.id === "analysis") ? (
            <section aria-labelledby="analysis" className="space-y-8">
              <h2 id="analysis" className="text-2xl font-semibold tracking-tight">
                Visual analysis
              </h2>
              {project.charts?.map((chart) => (
                <BarChart key={chart.title} chart={chart} />
              ))}
              {project.beforeAfter ? (
                <figure className="rounded-xl border border-line bg-surface p-5 sm:p-6">
                  <figcaption className="font-semibold">{project.beforeAfter.caption}</figcaption>
                  <div className="mt-4 grid gap-3">
                    <p className="rounded-lg bg-danger-soft/60 px-4 py-3 font-mono text-sm text-ink-soft">
                      <span className="mb-1 block font-sans text-xs font-medium uppercase tracking-wider text-danger">Before</span>
                      {project.beforeAfter.before}
                    </p>
                    <p className="rounded-lg bg-success-soft px-4 py-3 font-mono text-sm text-ink">
                      <span className="mb-1 block font-sans text-xs font-medium uppercase tracking-wider text-success">After</span>
                      {project.beforeAfter.after}
                    </p>
                  </div>
                </figure>
              ) : null}
              {project.code ? (
                <figure className="overflow-hidden rounded-xl border border-ink bg-ink text-white">
                  <figcaption className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-xs text-white/60">
                    <span>{project.code.caption}</span>
                    <span className="uppercase">{project.code.language}</span>
                  </figcaption>
                  <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-white/90">
                    <code>{project.code.snippet}</code>
                  </pre>
                </figure>
              ) : null}
              {project.table ? (
                <div className="overflow-x-auto rounded-xl border border-line bg-surface">
                  <table className="w-full text-sm">
                    <caption className="px-5 pt-5 text-left text-sm text-muted">{project.table.caption}</caption>
                    <thead>
                      <tr className="border-b border-line">
                        {project.table.columns.map((c) => (
                          <th key={c} scope="col" className="px-5 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-muted">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {project.table.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, i) =>
                            i === 0 ? (
                              <th key={i} scope="row" className="num px-5 py-3 text-left font-mono font-normal text-ink-soft">
                                {cell}
                              </th>
                            ) : (
                              <td key={i} className={`num px-5 py-3 font-mono ${i === 1 ? "font-semibold text-brand-strong" : "text-muted"}`}>
                                {cell}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
              {project.gallery?.length ? (
                <div className={project.gallery.length > 1 ? "grid gap-8 sm:grid-cols-2" : ""}>
                  {project.gallery.map((img) => (
                    <Screenshot
                      key={img.src}
                      image={img}
                      sizes={project.gallery!.length > 1 ? "(min-width: 640px) 380px, 100vw" : "(min-width: 1024px) 768px, 100vw"}
                    />
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          <section aria-labelledby="findings">
            <h2 id="findings" className="text-2xl font-semibold tracking-tight">
              Key findings
            </h2>
            <p className="mt-2 text-sm text-muted">Observed in the data and reported in the project documentation.</p>
            <ol className="mt-6 space-y-3">
              {project.findings.map((f, i) => (
                <li key={f} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-line pb-4 last:border-0">
                  <span className="num pt-0.5 font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-lg leading-relaxed text-ink">{f}</p>
                </li>
              ))}
            </ol>
          </section>

          {project.recommendations?.length ? (
            <section aria-labelledby="recommendations">
              <h2 id="recommendations" className="text-2xl font-semibold tracking-tight">
                Recommendations
              </h2>
              <p className="mt-2 text-sm text-muted">Suggested actions drawn from the findings. These are proposals, not observed results.</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.recommendations.map((r) => (
                  <li key={r} className="flex gap-3 rounded-xl border border-dashed border-line-strong bg-paper p-4 leading-relaxed text-ink-soft">
                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-labelledby="evidence">
            <h2 id="evidence" className="text-2xl font-semibold tracking-tight">
              Evidence
            </h2>
            <p className="mt-2 text-sm text-muted">The original files behind this case study.</p>
            <div className="mt-6">
              <EvidenceList links={project.evidence} />
            </div>
          </section>
        </div>
      </div>

      <nav aria-label="Next project" className="border-t border-line bg-surface">
        <Link href={`/projects/${next.slug}`} className="group container-page flex items-center justify-between gap-6 py-12 sm:py-16">
          <span>
            <span className="eyebrow block">Next case study</span>
            <span className="mt-3 block text-2xl font-semibold tracking-tight text-ink sm:text-4xl">{next.shortTitle}</span>
            <span className="mt-2 block text-muted">{next.tools.join(" · ")}</span>
          </span>
          <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </article>
  );
}
