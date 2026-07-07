"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-canvas/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-canvas"
      >
        Przejdź do treści
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8 lg:px-12">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl tracking-tight text-primary"
        >
          LekkiStart
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Główne">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-secondary transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            size="lg"
            render={<a href="#aplikacja" />}
            nativeButton={false}
          >
            Złóż aplikację
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md border border-border text-primary md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-16 z-40 bg-canvas md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-6" aria-label="Mobilne">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-3 text-lg text-primary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            size="lg"
            className="mt-4 w-full"
            render={<a href="#aplikacja" onClick={() => setOpen(false)} />}
            nativeButton={false}
          >
            Złóż aplikację
          </Button>
        </nav>
      </div>
    </header>
  );
}
