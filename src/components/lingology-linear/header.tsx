"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { navLinks, site } from "@/lib/lingology-content";
import { cn } from "@/lib/utils";

import { LinearButton } from "./ui";

export function LingologyHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b0b0bcc] backdrop-blur-[20px]">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-4 md:h-[72px] md:px-8">
          <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold text-[var(--ll-text-primary)]">
            <span className="flex size-7 items-center justify-center rounded-full bg-[var(--ll-brand)] text-xs text-white">
              L
            </span>
            {site.name}
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-[13px] text-[var(--ll-text-tertiary)] transition-colors hover:bg-white/10 hover:text-[var(--ll-text-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LinearButton href={site.appUrl} variant="ghost" external className="h-8 px-4 text-[13px]">
              Aplikacja
            </LinearButton>
            <LinearButton href="#contact" variant="invert" className="h-8 px-4 text-[13px]">
              Umów konsultację
            </LinearButton>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-[var(--ll-text-primary)] md:hidden"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#08090a]/95 backdrop-blur-xl transition-opacity md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-6 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-medium text-[var(--ll-text-primary)]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-[var(--ll-button-invert)] px-5 text-[15px] font-medium text-[#08090a]"
            onClick={() => setOpen(false)}
          >
            Umów konsultację
          </Link>
        </nav>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-white/10 bg-[#0b0b0bcc] px-4 py-3 backdrop-blur-[20px] md:hidden">
        <span className="text-xs text-[var(--ll-text-tertiary)]">Konsultacja 0 zł · 20 min</span>
        <LinearButton href="#contact" variant="invert" className="h-8 px-4 text-[13px]">
          Umów konsultację
        </LinearButton>
      </div>
    </>
  );
}
