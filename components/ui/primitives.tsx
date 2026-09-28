import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "./icons";

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  className,
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <Tag id={id} className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </Tag>
      {lead ? <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p> : null}
    </div>
  );
}

export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "brand" | "accent" }) {
  const tones = {
    neutral: "bg-sunken text-ink-soft",
    brand: "bg-brand-soft text-brand-strong",
    accent: "bg-accent-soft text-accent",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}

/**
 * External link that announces it opens a new tab and leaves the site.
 */
export function ExternalLink({
  href,
  children,
  className,
  showIcon = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("group inline-flex items-center gap-1", className)}>
      {children}
      {showIcon ? (
        <ArrowUpRight className="size-[1em] shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : null}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
