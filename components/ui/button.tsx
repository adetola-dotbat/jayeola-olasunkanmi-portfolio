import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-brand-strong shadow-soft px-5 h-11",
  secondary:
    "bg-surface text-ink border border-line-strong hover:border-ink px-5 h-11",
  ghost: "text-ink hover:text-brand px-2 h-9 underline-offset-4 hover:underline",
};

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
}

export function ButtonLink({ variant = "primary", className, icon, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
      {icon}
    </Link>
  );
}

interface AnchorButtonProps extends ComponentProps<"a"> {
  variant?: Variant;
  icon?: ReactNode;
}

/** For files and external URLs where next/link is not appropriate. */
export function AnchorButton({ variant = "primary", className, icon, children, ...props }: AnchorButtonProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
      {icon}
    </a>
  );
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}
