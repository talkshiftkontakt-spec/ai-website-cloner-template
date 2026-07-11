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
      <header className="TZTsQG_header">
        <div className="TZTsQG_innerWrapper">
          <div className="TZTsQG_menuRoot" style={{ flex: 1, justifyContent: "space-between", width: "100%" }}>
            <Link href="/" className="TZTsQG_logoLink">
              <span
                className="flex size-7 items-center justify-center rounded-full text-xs text-white"
                style={{ background: "var(--color-brand-bg)" }}
              >
                L
              </span>
              <span style={{ marginLeft: 8, fontWeight: 600 }}>{site.name}</span>
            </Link>

            <ul className="TZTsQG_list hide-mobile" style={{ flex: 1, justifyContent: "center" }}>
              {navLinks.map((link) => (
                <li key={link.href} className="TZTsQG_item">
                  <Link href={link.href} className="TZTsQG_anchor linear-nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="TZTsQG_buttons hide-mobile">
              <li className="TZTsQG_buttonItem">
                <LinearButton href={site.appUrl} variant="ghost" external className="S36ykG_size-small">
                  Aplikacja
                </LinearButton>
              </li>
              <li className="TZTsQG_buttonItem">
                <LinearButton href="#contact" variant="invert" className="S36ykG_size-small">
                  Umów konsultację
                </LinearButton>
              </li>
            </ul>

            <button
              type="button"
              className="TZTsQG_mobileMenuTrigger show-mobile"
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[90] backdrop-blur-xl transition-opacity show-mobile",
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
        className="show-mobile fixed inset-x-0 bottom-0 z-[80] flex items-center justify-between gap-3 border-t px-4 py-3 backdrop-blur-[20px]"
        style={{
          borderColor: "var(--header-border)",
          background: "var(--header-bg)",
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
