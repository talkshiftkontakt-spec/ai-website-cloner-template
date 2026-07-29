"use client";

import { FEATURES } from "@/types/content";
import { useReveal } from "@/hooks/useReveal";
import {
  FeatureIcon,
  SectionDivider,
  SectionEyebrow,
  SectionTitle,
} from "@/components/SiteChrome";

export function FeaturesSection() {
  const { ref, className } = useReveal<HTMLElement>();

  return (
    <section
      id="zajecia"
      ref={ref}
      className={`bg-white px-4 pb-[100px] md:px-8 ${className}`}
    >
      <div className="mx-auto max-w-[1400px] pt-4">
        <div className="mb-2">
          <SectionEyebrow>JAK WYGLĄDAJĄ ZAJĘCIA?</SectionEyebrow>
          <SectionTitle>Skutecznie i bez stresu!</SectionTitle>
          <SectionDivider />
        </div>

        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <article
              key={feature.title}
              className="flex flex-col items-start rounded-[20px] border border-[#83AC865E] bg-white px-2.5 py-[50px] shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-[5px]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="mb-4 flex w-full justify-center text-[#83AC86]">
                <FeatureIcon name={feature.icon} size={70} className="max-md:size-[50px]" />
              </div>
              <h3 className="mb-3 w-full text-center font-sans text-[22px] font-medium text-[#424242] max-md:text-[18px]">
                {feature.title}
              </h3>
              <p className="w-full text-center font-sans text-[16px] font-normal leading-relaxed text-[#334155]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
