"use client";

import Image from "next/image";
import Link from "next/link";
import { footerColumns } from "@/lib/tutoreo-content";

export function Footer() {
  return (
    <footer className="relative z-0 -mt-[50px] flex flex-col items-center justify-center gap-10 bg-[linear-gradient(135deg,var(--AccentColor),var(--AccentColor1))] px-6 pb-12 pt-[98px] text-white min-[900px]:flex-row min-[900px]:items-start min-[900px]:gap-12">
      <div className="flex max-w-[320px] flex-col items-center gap-4 text-center min-[900px]:items-start min-[900px]:text-left">
        <Link id="FooterLogo" href="/" className="inline-block">
          <Image
            src="/images/Logo_Nav_White.webp"
            alt="Logo"
            width={200}
            height={48}
            className="h-12 w-auto"
          />
        </Link>
        <p className="text-[18px] font-bold leading-[22px]">
          Tutoreo Franciszek Majewski
        </p>
        <p className="text-[16px] font-normal leading-[20px] text-white/90">
          NIP: 6263073608
          <br />
          REGON: 544226792
        </p>
      </div>

      {footerColumns.map((column, index) => (
        <div key={index} className="flex flex-col items-center gap-4 min-[900px]:items-start">
          {column.links.map((link) =>
            link.href === "#cookies" ? (
              <button
                key={link.label}
                type="button"
                className="text-[18px] font-normal text-white transition-opacity hover:opacity-80"
                onClick={() => {
                  window.localStorage.removeItem("tutoreo-cookies-consent");
                  window.location.reload();
                }}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-[18px] font-normal text-white transition-opacity hover:opacity-80"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      ))}
    </footer>
  );
}
