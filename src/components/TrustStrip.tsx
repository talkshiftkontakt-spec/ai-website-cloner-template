"use client";

import Link from "next/link";
import { Clock, MapPin } from "@phosphor-icons/react";

export function TrustStrip() {
  return (
    <div className="border-y border-[#134340]/10 bg-[#f8faf9]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 text-sm text-[#134340] md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-start gap-3 md:items-center">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#879d91]" weight="duotone" aria-hidden />
          <p>
            <span className="font-medium">Godziny rejestracji:</span> poniedziałek – piątek, 15:00 – 20:00
          </p>
        </div>
        <div className="flex items-start gap-3 md:items-center">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#879d91]" weight="duotone" aria-hidden />
          <p>Kraków, ul. Pomorska 10/1 – centrum miasta</p>
        </div>
        <Link href="#formularz-kontaktowy" className="gp-btn gp-btn-primary w-full shrink-0 md:w-auto">
          Formularz kontaktowy
        </Link>
      </div>
    </div>
  );
}
