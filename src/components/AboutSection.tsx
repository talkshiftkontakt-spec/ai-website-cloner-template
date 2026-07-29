"use client";

import { ABOUT_HIGHLIGHTS } from "@/types/content";
import { useReveal } from "@/hooks/useReveal";
import {
  FeatureIcon,
  SectionDivider,
  SectionEyebrow,
  SectionTitle,
} from "@/components/SiteChrome";

export function AboutSection() {
  const { ref, className } = useReveal<HTMLElement>();

  return (
    <section
      id="omnie"
      ref={ref}
      className={`relative flex min-h-[85vh] items-center overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 bg-[#83AC86] bg-cover bg-top bg-no-repeat max-md:hidden xl:bg-fixed"
        style={{
          backgroundImage: "url(/images/Projekt-bez-nazwy.avif)",
        }}
      />
      <div
        className="absolute inset-0 max-md:hidden"
        style={{
          backgroundImage: "linear-gradient(90deg, #C25F7000 40%, #FFFFFF 100%)",
          opacity: 0.8,
        }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-right bg-no-repeat max-md:block"
        style={{
          backgroundImage: "url(/images/Kopia-Bez-nazwy-Tapeta-na-telefon.png)",
        }}
      />
      <div
        className="absolute inset-0 hidden max-md:block"
        style={{
          backgroundImage: "linear-gradient(180deg, #FFFFFFB3 0%, #FFFFFFE6 55%, #FFFFFFF2 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block" aria-hidden />
        <div className="px-5 py-[50px] md:w-full md:px-5 lg:px-8">
          <SectionEyebrow>
            <span className="block text-left max-md:text-center">O MNIE</span>
          </SectionEyebrow>
          <SectionDivider align="left" width="20%" />
          <SectionTitle align="left">
            Hej! Jestem studentką medycyny i prowadzę korepetycje z matematyki
          </SectionTitle>

          <div className="mt-5 space-y-4 text-left font-sans text-[16px] leading-relaxed text-[#334155] max-md:text-center">
            <p>
              Pomagam uczniom szkoły podstawowej i liceum zrozumieć matematykę,
              odrobić zadania domowe, przygotować się do sprawdzianów i
              kartkówek.
            </p>
            <p>
              Podczas moich lekcji uczniowie również nabierają pewności siebie.
              Stawiam na cierpliwość, dobrą atmosferę i indywidualne podejście
              do każdego ucznia.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {ABOUT_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mb-3 flex justify-center">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#83AC86] text-white">
                    <FeatureIcon
                      name={item.icon}
                      size={28}
                      className="text-white"
                    />
                  </span>
                </div>
                <h3 className="mb-2 font-sans text-[18px] font-medium text-[#424242]">
                  {item.title}
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#334155]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
