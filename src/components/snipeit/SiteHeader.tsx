"use client";

import { Menu, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ASSET, NAV_LINKS } from "@/lib/snipeit-content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = ["#hero", "#produkt", "#plany", "#kontakt"];
      let current = "#hero";
      for (const id of ids) {
        const el = document.querySelector(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-b border-white/10 bg-[#0e1716]/80 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent shadow-none backdrop-blur-0"
      )}
    >
      <div className="relative mx-auto flex h-[70px] max-w-[1480px] items-center justify-between px-6 md:h-[94px]">
        <Link href="#hero" className="flex items-center">
          <Image
            src={`${ASSET}/navbar-logo.png`}
            alt="Snipelt"
            width={105}
            height={32}
            className="h-[32px] w-[105px]"
            priority
          />
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0 md:flex">
          {NAV_LINKS.map((link, i) => (
            <div key={link.href} className="flex items-center">
              <a
                href={link.href}
                className="font-satoshi relative px-5 py-2 text-[20px] font-medium transition-colors duration-200"
              >
                <span className="text-white hover:text-white/80">{link.label}</span>
                {active === link.href ? (
                  <div className="absolute bottom-0 left-1/2 h-[5px] w-6 -translate-x-1/2 rounded-[30px] bg-[#49768d]" />
                ) : null}
              </a>
              {i < NAV_LINKS.length - 1 ? (
                <div className="mx-1 h-[27px] w-px bg-white/20" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href="/auth/login"
            className="font-satoshi text-[20px] font-medium text-white transition-colors hover:text-white/80"
          >
            Zaloguj się
          </a>
          <a
            href="#plany"
            className="font-satoshi relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-2.5 text-[19px] font-bold text-[#1c2625] transition-colors duration-200 hover:bg-[#f2faff]"
          >
            <Plus className="relative z-10 h-[18px] w-[18px]" strokeWidth={2.5} />
            <span className="relative z-10">Zdobądź dostęp</span>
          </a>
        </div>

        <button
          type="button"
          className="p-2 text-white md:hidden"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#0e1716]/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-satoshi py-2 text-[18px] font-medium text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/auth/login"
              className="font-satoshi py-2 text-[18px] font-medium text-white"
            >
              Zaloguj się
            </a>
            <a
              href="#plany"
              onClick={() => setOpen(false)}
              className="font-satoshi inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[17px] font-bold text-[#1c2625]"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              Zdobądź dostęp
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
