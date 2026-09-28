import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { education, experience } from "@/content/experience";
import { credentials } from "@/content/credentials";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { AnchorButton } from "@/components/ui/button";
import { Download } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Web résumé of ${profile.name}, data analyst: experience, education, certifications and skills.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="container-page pb-24 pt-10 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Résumé</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
            <p className="mt-3 text-lg text-ink-soft">
              {profile.role} · {profile.location}
            </p>
            <p className="mt-2 text-sm text-muted">
              <a className="hover:text-ink" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>{" "}
              ·{" "}
              <a className="hover:text-ink" href={profile.phoneHref}>
                {profile.phone}
              </a>
            </p>
          </div>
          <AnchorButton href={profile.cv} download icon={<Download className="size-4" />}>
            Download PDF
          </AnchorButton>
        </div>

        <p className="mt-6 rounded-lg bg-sunken px-4 py-3 text-sm text-muted">
          This page is a readable summary. The downloadable PDF is the authoritative CV.
        </p>

        <section aria-labelledby="r-summary" className="mt-12">
          <h2 id="r-summary" className="eyebrow">
            Summary
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{profile.intro}</p>
        </section>

        <section aria-labelledby="r-experience" className="mt-12">
          <h2 id="r-experience" className="eyebrow">
            Experience
          </h2>
          <ol className="mt-4 divide-y divide-line">
            {experience.map((e) => (
              <li key={`${e.organization}-${e.start}`} className="py-6">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="font-semibold tracking-tight">
                    {e.role}, <span className="font-normal text-ink-soft">{e.organization}</span>
                  </h3>
                  <p className="num shrink-0 font-mono text-xs text-muted">
                    {e.start} – {e.end}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {e.kind} · {e.location}
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-soft marker:text-line-strong">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="r-education" className="mt-12">
          <h2 id="r-education" className="eyebrow">
            Education
          </h2>
          <ul className="mt-4 space-y-4">
            {education.map((e) => (
              <li key={e.qualification} className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <p>
                  <span className="font-semibold">
                    {e.qualification} in {e.field}
                  </span>
                  <span className="text-ink-soft">, {e.institution}</span>
                  <span className="block text-sm text-muted">{e.result}</span>
                </p>
                <p className="num font-mono text-xs text-muted">{e.year}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="r-projects" className="mt-12">
          <h2 id="r-projects" className="eyebrow">
            Selected projects
          </h2>
          <ul className="mt-4 space-y-3">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="font-semibold underline-offset-4 hover:underline">
                  {p.shortTitle}
                </Link>
                <span className="text-ink-soft">: {p.summary}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="r-certs" className="mt-12">
          <h2 id="r-certs" className="eyebrow">
            Certifications
          </h2>
          <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {credentials.map((c) => (
              <li key={c.title} className="text-ink-soft">
                <span className="text-ink">{c.title}</span>
                <span className="block text-sm text-muted">
                  {c.issuer} · {c.date}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="r-skills" className="mt-12">
          <h2 id="r-skills" className="eyebrow">
            Skills
          </h2>
          <dl className="mt-4 space-y-3">
            {skillGroups.map((g) => (
              <div key={g.title} className="grid gap-1 sm:grid-cols-[14rem_1fr]">
                <dt className="font-medium">{g.title}</dt>
                <dd className="text-ink-soft">{[...g.tools.map((t) => t.label), ...(g.also ?? [])].join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
