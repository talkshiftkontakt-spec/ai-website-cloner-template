"use client";

import Image from "next/image";
import { Reveal } from "@/components/snipeit/Reveal";
import { ASSET } from "@/lib/snipeit-content";

const NAV_ITEMS = [
  { href: "#hero", label: "Strona główna" },
  { href: "#produkt", label: "Produkt" },
  { href: "#plany", label: "Dla firm" },
  { href: "#kontakt", label: "Kontakt" },
  { href: "#", label: "Panel" },
] as const;

const LEGAL_ITEMS = [
  { href: "/legal/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/legal/regulamin", label: "Regulamin" },
  { href: "/legal/pliki-cookies", label: "Pliki Cookies" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#1c2625] px-6 pt-16 pb-10">
      <div className="absolute inset-0 bg-[#1c2625]" />
      <div
        className="pointer-events-none absolute top-0 right-[-200px] h-[631px] w-[631px] opacity-[0.06]"
        style={{ transform: "rotate(150deg) scaleY(-1)" }}
      >
        <Image
          src={`${ASSET}/union-cross.svg`}
          alt=""
          width={631}
          height={631}
          className="h-full w-full"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1480px]">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          <Reveal>
            <div className="mb-4">
              <Image
                src={`${ASSET}/footer-logo.svg`}
                alt="Snipelt"
                width={161}
                height={51}
                className="h-[51px] w-[161px]"
              />
            </div>
            <p className="font-satoshi mb-4 max-w-[272px] text-[18px] leading-[20px] text-[#9ebdbb]">
              Kompleksowy monitor ogłoszeń internetowych, bądź przed innymi
            </p>
            <a
              href="mailto:hello@snipeit.pl"
              className="font-satoshi mt-8 block text-[18px] font-bold text-[#f0f0f0] transition-colors hover:text-[#8badab]"
            >
              hello@snipeit.pl
            </a>
            <div className="mt-4 flex items-center gap-3">
              <a href="#" className="transition-opacity hover:opacity-70">
                <Image
                  src={`${ASSET}/social-instagram.svg`}
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </a>
              <a href="#" className="transition-opacity hover:opacity-70">
                <Image
                  src={`${ASSET}/social-facebook.svg`}
                  alt="Facebook"
                  width={11}
                  height={20}
                  className="h-5 w-[11px]"
                />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h4 className="font-sf-expanded-medium mb-5 text-[24px] text-[#f0f0f0]">
              Nawigacja
            </h4>
            <ul className="space-y-0">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-satoshi text-[18px] leading-[35px] text-[#f0f0f0] transition-colors hover:text-[#9ebdbb]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <h4 className="font-sf-expanded-medium mb-5 text-[24px] text-[#f0f0f0]">
              Dane prawne
            </h4>
            <ul className="space-y-0">
              {LEGAL_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-satoshi text-[18px] leading-[35px] text-[#f0f0f0] transition-colors hover:text-[#9ebdbb]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="font-satoshi text-left text-[18px] leading-[35px] text-[#f0f0f0] transition-colors hover:text-[#9ebdbb]"
                >
                  Ustawienia cookies
                </button>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-[#2a3938]/60 pt-6 text-center">
          <p className="font-satoshi text-[14px] tracking-[-0.3px] text-[#6d8886]">
            Nie jesteśmy powiązani z żadnym portalem
          </p>
        </div>
      </div>
    </footer>
  );
}
