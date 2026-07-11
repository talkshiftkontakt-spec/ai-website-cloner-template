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
      <header className="TZTsQG_header" style={{ position: "fixed", insetInline: 0, top: 0, zIndex: 100 }}>
        <div className="TZTsQG_innerWrapper" style={{ maxWidth: "var(--homepage-max-width)", marginInline: "auto" }}>
          <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold" style={{ color: "var(--color-text-primary)" }}>
            <span
              className="flex size-7 items-center justify-center rounded-full text-xs text-white"
              style={{ background: "var(--color-brand-bg)" }}
            >
              L
            </span>
            {site.name}
          </Link>

          <nav className="TZTsQG_list hide-mobile">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="TZTsQG_anchor">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="TZTsQG_buttons hide-mobile">
            <LinearButton href={site.appUrl} variant="ghost" external className="S36ykG_size-small">
              Aplikacja
            </LinearButton>
            <LinearButton href="#contact" variant="invert" className="S36ykG_size-small">
              Umów konsultację
            </LinearButton>
          </div>

          <button
            type="button"
            className="show-mobile inline-flex size-10 items-center justify-center rounded-full border border-[var(--color-border-translucent)]"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 backdrop-blur-xl transition-opacity show-mobile",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ background: "color-mix(in srgb, var(--color-bg-primary) 95%, transparent)" }}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-6 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-medium"
              style={{ color: "var(--color-text-primary)" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="S36ykG_root S36ykG_variant S36ykG_variant-invert S36ykG_size-default mt-4"
            onClick={() => setOpen(false)}
          >
            Umów konsultację
          </Link>
        </nav>
      </div>

      <div
        className="show-mobile fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t px-4 py-3 backdrop-blur-[20px]"
        style={{
          borderColor: "var(--header-border, #ffffff14)",
          background: "var(--header-bg, #0b0b0bcc)",
        }}
      >
        <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
          Konsultacja 0 zł · 20 min
        </span>
        <LinearButton href="#contact" variant="invert" className="S36ykG_size-small">
          Umów konsultację
        </LinearButton>
      </div>
    </>
  );
}
