import Link from "next/link";
import { profile } from "@/content/profile";
import { ExternalLink } from "@/components/ui/primitives";
import { ArrowUp } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-semibold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">
            {profile.role} · {profile.location}
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-soft">
            <li>
              <Link className="hover:text-ink" href="/projects">
                Projects
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/resume">
                Résumé
              </Link>
            </li>
            <li>
              <a className="hover:text-ink" href={`mailto:${profile.email}`}>
                Email
              </a>
            </li>
            <li>
              <ExternalLink className="hover:text-ink" href={profile.driveFolder}>
                Portfolio files
              </ExternalLink>
            </li>
            <li>
              <a href="#top" className="inline-flex items-center gap-1 hover:text-ink">
                Back to top <ArrowUp className="size-3.5" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-page pb-10">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
