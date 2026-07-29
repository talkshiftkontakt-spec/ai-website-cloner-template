"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { OFFERS } from "@/types/content";
import { useReveal } from "@/hooks/useReveal";
import { WaveTop } from "@/components/icons";
import {
  SectionDivider,
  SectionEyebrow,
  SectionTitle,
} from "@/components/SiteChrome";

export function OfferSection() {
  const { ref, className } = useReveal<HTMLElement>();

  return (
    <section
      id="oferta"
      ref={ref}
      className={`relative bg-[#83AC8621] px-4 pb-[100px] pt-10 md:px-8 ${className}`}
    >
      <WaveTop fill="#ffffff" />
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <SectionEyebrow>OFERTA</SectionEyebrow>
        <SectionTitle>Dla kogo są moje zajęcia?</SectionTitle>
        <SectionDivider />

        <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
          {OFFERS.map((offer) => (
            <article
              key={offer.title}
              className="flex flex-col items-stretch gap-2 rounded-[50px] border border-[#83AC865E] bg-white p-5 md:flex-row md:items-start"
            >
              <div className="relative mx-auto aspect-square w-[60%] max-w-[220px] shrink-0 md:w-[40%]">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-contain"
                  sizes="220px"
                />
              </div>
              <div className="flex-1 pt-[5%] md:pt-[5%]">
                <h3 className="mb-4 text-center font-sans text-[28px] font-semibold text-[#424242] md:text-left">
                  {offer.title}
                </h3>
                <ul className="space-y-[15px] pl-2.5">
                  {offer.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-sans text-[16px] text-[#424242]"
                    >
                      <Check
                        size={14}
                        className="mt-1 shrink-0 text-[#83AC86]"
                        strokeWidth={3}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-[50px] flex justify-center">
          <a href="#kontakt" className="kp-btn kp-btn-primary kp-btn-lg">
            Kontakt
          </a>
        </div>
      </div>
    </section>
  );
}
