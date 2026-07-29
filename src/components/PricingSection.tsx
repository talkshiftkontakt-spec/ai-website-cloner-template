"use client";

import { PRICING } from "@/types/content";
import { useCountUp, useReveal } from "@/hooks/useReveal";
import { WaveBottom, WaveTop } from "@/components/icons";
import {
  FeatureIcon,
  SectionDivider,
  SectionEyebrow,
  SectionTitle,
} from "@/components/SiteChrome";

function PriceCard({
  title,
  price,
  unit,
  note,
  icon,
  enabled,
}: {
  title: string;
  price: number;
  unit: string;
  note: string;
  icon: "book" | "calculator" | "graduation";
  enabled: boolean;
}) {
  const value = useCountUp(price, 1000, enabled);

  return (
    <article className="flex flex-col items-center rounded-[20px] border border-[#83AC865E] bg-white px-2.5 py-[50px] shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-[5px] max-md:py-5">
      <FeatureIcon name={icon} size={70} className="max-[1366px]:size-[50px]" />
      <p className="mt-5 font-sans text-[30px] font-normal text-[#424242] max-[1366px]:text-[28px]">
        {title}
      </p>
      <p className="mt-5 font-sans text-[50px] font-semibold text-[#424242] max-[1366px]:text-[50px]">
        {value} zł
      </p>
      <p className="mt-1 font-sans text-[22px] font-normal text-[#424242] max-[1366px]:text-[18px]">
        {unit}
      </p>
      <div className="my-4 flex w-full justify-center">
        <span className="block h-px w-[60%] bg-[#83AC86]" />
      </div>
      <p className="font-sans text-[16px] text-[#424242]">{note}</p>
    </article>
  );
}

export function PricingSection() {
  const { ref, visible, className } = useReveal<HTMLElement>();

  return (
    <section
      id="cennik"
      ref={ref}
      className={`relative bg-[#f7f9f5] px-4 pb-[100px] pt-10 md:px-8 ${className}`}
      style={{ backgroundColor: "var(--e-global-color-astglobalcolor4, #f7f9f5)" }}
    >
      <WaveTop fill="#83AC861F" />
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <SectionEyebrow>CENNIK</SectionEyebrow>
        <SectionTitle>Proste zasady, jasne ceny</SectionTitle>
        <SectionDivider />

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING.map((plan) => (
            <PriceCard key={plan.title} {...plan} enabled={visible} />
          ))}
        </div>

        <p className="mt-5 text-center font-sans text-[16px] text-[#424242]">
          Możliwość stałych terminów lub godzin ruchomych
        </p>

        <div className="mt-[50px] flex justify-center">
          <a href="#kontakt" className="kp-btn kp-btn-primary kp-btn-lg">
            Pierwsze zajęcia BEZPŁATNE
          </a>
        </div>
      </div>
      <WaveBottom fill="#83AC861F" />
    </section>
  );
}
