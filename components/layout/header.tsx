"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { Close, Download, Menu } from "@/components/ui/icons";

export const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#credentials", label: "Credentials" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => dialogRef.current?.showModal();
  const closeMenu = () => dialogRef.current?.close();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-b border-line/80 bg-paper/85 shadow-[0_1px_0_rgb(21_23_28/0.02)] backdrop-blur-md"
          : "border-b border-transparent bg-paper/0",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-full bg-ink font-mono text-[0.7rem] font-semibold tracking-wider text-white transition-colors group-hover:bg-brand"
          >
            {profile.monogram}
          </span>
          <span className="text-[0.95rem] font-semibold tracking-tight text-ink">
            Jayeola<span className="hidden text-muted sm:inline"> Olasunkanmi</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm text-ink-soft transition-colors hover:bg-sunken hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.cv}
            download
            className="hidden h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-white transition-colors hover:bg-brand-strong sm:inline-flex"
          >
            Download CV
            <Download className="size-4" />
          </a>
          <button
            type="button"
            onClick={openMenu}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface text-ink md:hidden"
            aria-haspopup="dialog"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-paper p-0 text-ink backdrop:bg-transparent md:hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <span className="text-[0.95rem] font-semibold tracking-tight">Menu</span>
          <button
            type="button"
            onClick={closeMenu}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface"
            aria-label="Close menu"
            autoFocus
          >
            <Close className="size-5" />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-page mt-6">
          <ul className="divide-y divide-line border-y border-line">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-baseline justify-between py-5 text-3xl font-semibold tracking-tight"
                >
                  {item.label}
                  <span className="font-mono text-xs text-muted" aria-hidden="true">
                    0{i + 1}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/projects" onClick={closeMenu} className="flex items-baseline justify-between py-5 text-3xl font-semibold tracking-tight">
                All projects
                <span className="font-mono text-xs text-muted" aria-hidden="true">
                  06
                </span>
              </Link>
            </li>
          </ul>
          <a
            href={profile.cv}
            download
            className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-base font-medium text-white"
          >
            Download CV <Download className="size-4" />
          </a>
          <p className="mt-6 text-sm text-muted">
            <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
              {profile.email}
            </a>
          </p>
        </nav>
      </dialog>
    </header>
  );
}
