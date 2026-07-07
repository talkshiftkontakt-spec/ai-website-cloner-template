"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-canvas/95 backdrop-blur-md">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-canvas"
        >
          Przejdź do treści
        </a>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-[72px] md:px-8 lg:px-12">
          <Link
            href="/"
            className="relative z-[60] font-[family-name:var(--font-display)] text-lg font-extrabold uppercase tracking-[0.12em] text-primary"
          >
            LekkiStart
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Główne">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-secondary transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#aplikacja"
            className="relative z-[60] hidden h-11 items-center justify-center bg-primary px-6 text-sm font-semibold text-canvas transition-colors hover:bg-brand-hover md:inline-flex"
          >
            Złóż aplikację
          </a>

          <button
            type="button"
            className="relative z-[60] inline-flex size-12 shrink-0 items-center justify-center border border-border bg-canvas-raised text-primary active:bg-canvas-sunken md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          >
            {open ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[100] md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-canvas/80 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
          aria-label="Zamknij menu"
          tabIndex={open ? 0 : -1}
        />

        <nav
          aria-label="Mobilne"
          className={cn(
            "absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-border bg-canvas-sunken px-6 pb-8 pt-20 shadow-2xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-border py-4 text-lg font-medium text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#aplikacja"
            className="mt-8 flex h-14 items-center justify-center bg-primary text-base font-semibold text-canvas"
            onClick={() => setOpen(false)}
          >
            Złóż aplikację
          </a>

          <p className="mt-auto pt-10 text-sm leading-relaxed text-tertiary">
            Coaching dla osób z nadwagą i otyłością. Od 399 zł/mies.
          </p>
        </nav>
      </div>
    </>
  );
}
