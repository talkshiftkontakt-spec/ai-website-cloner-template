"use client";

import { HERO_BULLETS } from "@/types/content";
import { WaveBottom } from "@/components/icons";
import { HeroBulletIcon } from "@/components/SiteChrome";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden border-t border-black/10">
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat max-md:hidden"
        style={{
          backgroundImage: "url(/images/6-webp-scaled.webp)",
        }}
      />
      <div
        className="absolute inset-0 max-md:hidden"
        style={{
          backgroundImage: "linear-gradient(220deg, #FFFFFF00 30%, #FFFFFF 70%)",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-left bg-no-repeat max-md:block"
        style={{
          backgroundImage: "url(/images/Bez-nazwy-Tapeta-na-telefon.png)",
        }}
      />
      <div
        className="absolute inset-0 hidden max-md:block"
        style={{
          backgroundImage: "linear-gradient(180deg, #FFFFFFCC 0%, #FFFFFF99 45%, #FFFFFFEE 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-16 md:px-8 md:py-20 max-md:pt-[70px]">
        <div className="w-full md:w-[45%] max-[1366px]:md:w-1/2 animate-fade-up">
          <h1 className="font-sans text-[50px] font-medium leading-[65px] text-[#424242] max-[1366px]:text-[30px] max-[1366px]:leading-[1.3] max-md:text-center">
            Matematyka
            <br />
            bez stresu,
            <br />
            na Twoich zasadach
          </h1>

          <div className="my-3 flex max-md:justify-center">
            <span className="block h-px w-[40%] bg-[#83AC86]" />
          </div>

          <p className="mb-8 max-w-xl font-sans text-[20px] font-medium leading-snug text-[#424242eb] max-[1366px]:text-[16px] max-md:text-center">
            Korepetycje online dla uczniów szkoły podstawowej
            <br className="max-md:hidden" />
            (klasy 1-8) oraz liceum.
          </p>

          <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-[10%] max-md:mx-auto max-md:max-w-xs">
            <a href="#kontakt" className="kp-btn kp-btn-primary w-full">
              Napisz do mnie
            </a>
            <a href="#oferta" className="kp-btn kp-btn-outline w-full">
              Zobacz ofertę
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-[10%] sm:grid-cols-3 max-md:justify-items-center max-md:pt-4">
            {HERO_BULLETS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 max-md:flex-col max-md:text-center"
              >
                <HeroBulletIcon name={item.icon} />
                <span className="whitespace-pre-line font-sans text-[18px] font-normal text-[#1A1A1A] max-[1366px]:text-[16px]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WaveBottom fill="#F3F6EE" />
    </section>
  );
}
