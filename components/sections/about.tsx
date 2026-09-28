import { approach } from "@/content/skills";

export function About() {
  return (
    <section aria-labelledby="about-title" id="about" className="border-t border-line bg-surface py-20 sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="reveal">
          <p className="eyebrow mb-4">About</p>
          <h2 id="about-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            A statistician&apos;s habits, <span className="serif-accent text-brand">applied to business data.</span>
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              I ventured into data analysis through my background in statistics. I earned a Distinction in my Higher National
              Diploma in Statistics from the Federal Polytechnic, Ilaro. For my research, I used quality-control charts to track
              confirmed Monkeypox cases across Nigerian states.
            </p>
            <p>
              Since then, I have worked with digital payment transactions, retail and gaming sales, and marketing campaign data. I
              do most of my work in Excel and Power BI, using SQL to query databases and R or Python for advanced analysis.
            </p>
            <p>
              What I enjoy most is turning raw, messy data into clear insights—like showing which states drive revenue, where
              payment transactions fail, or which marketing channel converts best.
            </p>
          </div>
        </div>

        <div className="reveal">
          <h3 className="eyebrow mb-6">How I work</h3>
          <ol className="relative space-y-0">
            {approach.map((a, i) => (
              <li key={a.step} className="relative grid grid-cols-[3rem_1fr] gap-4 pb-8 last:pb-0">
                {i < approach.length - 1 ? (
                  <span className="absolute left-[1.2rem] top-11 h-[calc(100%-2.75rem)] w-px bg-line-strong" aria-hidden="true" />
                ) : null}
                <span className="grid size-10 place-items-center rounded-full border border-line-strong bg-paper font-mono text-xs text-brand-strong">
                  {a.step}
                </span>
                <div className="pt-1.5">
                  <p className="font-semibold tracking-tight text-ink">{a.title}</p>
                  <p className="mt-1.5 leading-relaxed text-muted">{a.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
