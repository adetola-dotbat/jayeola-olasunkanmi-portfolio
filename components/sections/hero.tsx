import Image from "next/image";
import { profile } from "@/content/profile";
import { projects, projectsUsing, toolsInUse } from "@/content/projects";
import { credentials } from "@/content/credentials";
import { AnchorButton, ButtonLink } from "@/components/ui/button";
import { ArrowRight, Download, MapPin } from "@/components/ui/icons";

export function Hero() {
  const tools = toolsInUse();

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-16">
        <div>
          <p className="hero-enter inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-soft">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            {profile.role}
            <span className="text-line-strong" aria-hidden="true">
              /
            </span>
            <MapPin className="size-3.5 text-muted" />
            {profile.location}
          </p>

          <h1
            id="hero-title"
            className="hero-enter mt-7 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.25rem]"
          >
            Jayeola
            <br />
            Olasunkanmi Idyat
          </h1>

          <p className="hero-enter-delay mt-6 max-w-xl text-2xl leading-snug tracking-tight text-ink-soft sm:text-[1.7rem]">
            <span className="serif-accent text-[1.15em] text-brand">I turn raw data</span> into answers people can act on.
          </p>

          <p className="hero-enter-delay mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.intro}</p>

          <div className="hero-enter-delay-2 mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#work" icon={<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}>
              View my work
            </ButtonLink>
            <AnchorButton href={profile.cv} download variant="secondary" icon={<Download className="size-4" />}>
              Download CV
            </AnchorButton>
          </div>

          <dl className="hero-enter-delay-2 mt-12 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
            <div className="bg-paper px-4 py-4">
              <dt className="text-xs text-muted">HND Statistics</dt>
              <dd className="mt-1 font-semibold tracking-tight">Distinction</dd>
            </div>
            <div className="bg-paper px-4 py-4">
              <dt className="text-xs text-muted">Case studies</dt>
              <dd className="num mt-1 font-semibold tracking-tight">{projects.length}</dd>
            </div>
            <div className="bg-paper px-4 py-4">
              <dt className="text-xs text-muted">Certificates</dt>
              <dd className="num mt-1 font-semibold tracking-tight">{credentials.length}</dd>
            </div>
          </dl>
        </div>

        <div className="hero-enter-delay relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="dot-grid absolute -inset-3 -z-10 sm:-inset-6 rounded-[2rem] opacity-70 [mask-image:radial-gradient(closest-side,black,transparent)]" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-sunken shadow-lift">
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              fill
              preload
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 28rem, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </div>

          {/* Signature detail: a query result listing the tools used across projects. */}
          <div className="absolute -bottom-8 left-3 right-3 rounded-lg border border-line bg-surface/95 p-4 shadow-lift backdrop-blur sm:-left-8 sm:right-auto sm:w-[19rem]">
            <p className="font-mono text-[0.72rem] text-muted">
              <span className="text-brand">SELECT</span> tool, <span className="text-brand">COUNT</span>(*)
              <br />
              <span className="text-brand">FROM</span> projects <span className="text-brand">GROUP BY</span> tool;
            </p>
            <ul className="mt-3 space-y-1.5" aria-label="Tools used across projects">
              {tools.map((tool) => {
                const count = projectsUsing(tool).length;
                return (
                  <li key={tool} className="flex items-center gap-2 text-xs">
                    <span className="w-16 shrink-0 text-ink-soft">{tool}</span>
                    <span className="h-1.5 flex-1 rounded-full bg-sunken" aria-hidden="true">
                      <span
                        className="block h-full rounded-full bg-brand"
                        style={{ width: `${(count / projects.length) * 100}%` }}
                      />
                    </span>
                    <span className="num w-20 shrink-0 text-right font-mono text-[0.7rem] text-muted">
                      {count} {count === 1 ? "project" : "projects"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
