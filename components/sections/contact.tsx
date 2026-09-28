import { profile } from "@/content/profile";
import { isContactFormEnabled } from "@/lib/contact";
import { ExternalLink } from "@/components/ui/primitives";
import { Download, Folder, Mail, Phone } from "@/components/ui/icons";
import { ContactForm } from "./contact-form";
import { CopyEmail } from "./copy-email";

export function Contact() {
  const formEnabled = isContactFormEnabled();

  return (
    <section aria-labelledby="contact-title" id="contact" className="border-t border-line bg-ink py-20 text-white sm:py-28">
      <div className={formEnabled ? "container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16" : "container-page"}>
        <div className={formEnabled ? "" : "mx-auto max-w-3xl text-center"}>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-white/60">Contact</p>
          <h2 id="contact-title" className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s work <span className="serif-accent text-[#f0b48f]">with data.</span>
          </h2>
          <p className={formEnabled ? "mt-5 max-w-md text-lg leading-relaxed text-white/75" : "mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75"}>
            Have a role, a project, a dataset or a question? Send a message and I&apos;ll reply by email.
          </p>

          <ul className={formEnabled ? "mt-10 grid grid-cols-1 gap-3" : "mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3"}>
            <li className={`flex items-center justify-between gap-3 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 ${formEnabled ? "" : "sm:col-span-3"}`}>
              <a href={`mailto:${profile.email}`} className="flex min-w-0 items-center gap-3 hover:text-[#f0b48f]">
                <Mail className="size-4 shrink-0 text-white/60" />
                <span className="truncate">{profile.email}</span>
              </a>
              <CopyEmail email={profile.email} />
            </li>
            <li>
              <a
                href={profile.phoneHref}
                className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 hover:text-[#f0b48f]"
              >
                <Phone className="size-4 shrink-0 text-white/60" />
                {profile.phone}
              </a>
            </li>
            <li>
              <ExternalLink
                href={profile.driveFolder}
                className="flex w-full items-center gap-3 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 hover:text-[#f0b48f]"
              >
                <Folder className="size-4 shrink-0 text-white/60" />
                <span className="flex-1">Portfolio files</span>
              </ExternalLink>
            </li>
            <li>
              <a
                href={profile.cv}
                download
                className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 hover:text-[#f0b48f]"
              >
                <Download className="size-4 shrink-0 text-white/60" />
                Download CV (PDF)
              </a>
            </li>
          </ul>

          {!formEnabled ? (
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Hello Jayeola")}`}
              className="mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-ink transition-colors hover:bg-[#f0b48f]"
            >
              <Mail className="size-4" /> Email Jayeola
            </a>
          ) : null}
        </div>

        {formEnabled ? (
          <div className="text-ink">
            <ContactForm />
          </div>
        ) : null}
      </div>
    </section>
  );
}
