import Link from "next/link";
import { experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { SectionHeading } from "@/components/ui/primitives";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const kindTone: Record<string, string> = {
  Contract: "bg-brand-soft text-brand-strong",
  Internship: "bg-accent-soft text-accent",
  "National service": "bg-sunken text-ink-soft",
  "Training programme": "bg-sunken text-ink-soft",
};

export function Experience() {
  return (
    <section aria-labelledby="experience-title" id="experience" className="border-t border-line bg-surface py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="experience-title"
            eyebrow="Experience"
            title="Where the work happened"
            lead="Contract work, internships, national service and training, labelled as what they are."
          />
        </div>

        <ol className="relative border-l border-line-strong">
          {experience.map((item) => (
            <li key={`${item.organization}-${item.start}`} className="reveal relative pb-12 pl-8 last:pb-0 sm:pl-10">
              <span
                className="absolute -left-[5px] top-2 size-[9px] rounded-full border-2 border-surface bg-brand ring-1 ring-brand"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="num font-mono text-xs text-muted">
                  {item.start} – {item.end}
                </p>
                <span className={cn("rounded-full px-2 py-0.5 text-[0.7rem] font-medium", kindTone[item.kind])}>{item.kind}</span>
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{item.role}</h3>
              <p className="mt-1 text-ink-soft">
                {item.organization}
                <span className="text-muted"> · {item.location}</span>
              </p>
              <p className="mt-3 text-muted">{item.summary}</p>
              <ul className="mt-4 space-y-2.5">
                {item.points.map((point) => (
                  <li key={point} className="relative pl-5 leading-relaxed text-ink-soft">
                    <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-line-strong" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              {item.relatedProjects?.length ? (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Related case studies">
                  {item.relatedProjects.map((slug) => {
                    const p = getProject(slug);
                    if (!p) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/projects/${slug}`}
                          className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-ink"
                        >
                          Case study: {p.shortTitle}
                          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
