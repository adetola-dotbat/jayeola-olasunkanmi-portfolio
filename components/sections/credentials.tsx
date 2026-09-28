import Image from "next/image";
import { certificationsFolder, credentials } from "@/content/credentials";
import { education } from "@/content/experience";
import { ExternalLink, SectionHeading } from "@/components/ui/primitives";
import { Lightbox } from "@/components/ui/lightbox";
import { Expand } from "@/components/ui/icons";
import type { Credential } from "@/lib/types";

function CredentialRow({ credential }: { credential: Credential }) {
  const alt = `${credential.title} certificate issued to Olasunkanmi Idyat Jayeola by ${credential.issuer}, dated ${credential.date}`;
  return (
    <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-5 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:gap-6">
      <Lightbox
        image={{ ...credential.image, alt }}
        caption={`${credential.title} · ${credential.issuer} · ${credential.date}`}
        label={`View ${credential.title} certificate`}
        triggerClassName="group relative block aspect-[4/3] w-full overflow-hidden rounded-md border border-line bg-white"
      >
        <Image
          src={credential.image.src}
          alt=""
          fill
          sizes="112px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition-all group-hover:bg-ink/45 group-hover:opacity-100 group-focus-visible:bg-ink/45 group-focus-visible:opacity-100">
          <Expand className="size-5" />
        </span>
      </Lightbox>
      <div className="min-w-0">
        <h4 className="font-semibold leading-snug tracking-tight text-ink">{credential.title}</h4>
        <p className="mt-1 text-sm text-ink-soft">
          {credential.issuer}
          {credential.partner ? <span className="text-muted"> with {credential.partner}</span> : null}
          <span className="text-muted">
            {" "}
            · <time dateTime={credential.isoDate}>{credential.date}</time>
          </span>
        </p>
        {credential.reference ? (
          <p className="mt-1.5 break-all font-mono text-[0.7rem] text-muted">
            {credential.reference.label} {credential.reference.value}
          </p>
        ) : null}
        <div className="mt-2 sm:hidden">
          <ExternalLink href={credential.original} className="text-sm font-medium text-brand hover:text-brand-strong">
            Original PDF
          </ExternalLink>
        </div>
      </div>
      <div className="hidden sm:block">
        <ExternalLink
          href={credential.original}
          className="shrink-0 rounded-full border border-line-strong px-3.5 py-2 text-sm font-medium whitespace-nowrap text-ink transition-colors hover:border-ink"
        >
          Original PDF
        </ExternalLink>
      </div>
    </li>
  );
}

export function Credentials() {
  const groups = [
    { title: "Data & analysis", items: credentials.filter((c) => c.group === "Data") },
    { title: "Professional skills", items: credentials.filter((c) => c.group === "Professional skills") },
  ];

  return (
    <section aria-labelledby="credentials-title" id="credentials" className="border-t border-line py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="credentials-title"
          eyebrow="Credentials"
          title="Education & certifications"
          lead="Formal training in statistics, followed by focused courses in analysis, visualisation and Python. Select a certificate to view it full size."
        />

        <h3 className="sr-only">Education</h3>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {education.map((e) => (
            <li key={e.qualification} className="reveal flex gap-5 rounded-xl border border-line bg-surface p-6 sm:p-7">
              <span className="num font-mono text-sm text-muted">{e.year}</span>
              <div>
                <p className="text-xl font-semibold tracking-tight">{e.field}</p>
                <p className="mt-1 text-ink-soft">{e.qualification}</p>
                <p className="mt-1 text-sm text-muted">{e.institution}</p>
                <p className="mt-4 inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand-strong">{e.result}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          {groups.map((group) => (
            <div key={group.title} className="reveal">
              <div className="flex items-baseline justify-between gap-4 border-b border-line-strong pb-3">
                <h3 className="font-semibold tracking-tight">{group.title}</h3>
                <p className="num font-mono text-xs text-muted">{group.items.length} certificates</p>
              </div>
              <ul className="divide-y divide-line">
                {group.items.map((c) => (
                  <CredentialRow key={c.title} credential={c} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          All certificate files are in one{" "}
          <ExternalLink href={certificationsFolder} className="font-medium text-brand hover:text-brand-strong">
            Google Drive folder
          </ExternalLink>
          .
        </p>
      </div>
    </section>
  );
}
