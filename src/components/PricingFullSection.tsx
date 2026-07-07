import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import type { FaqItem, PricingSection } from "@/lib/pages-data";

interface PricingFullSectionProps {
  sections: PricingSection[];
  faq: FaqItem[];
  intro?: string;
  cancellationNote?: string;
}

export function PricingFullSection({ sections, faq, intro, cancellationNote }: PricingFullSectionProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16">
      {intro ? <p className="mb-4 text-lg leading-relaxed text-[#3d4a47]">{intro}</p> : null}
      {cancellationNote ? (
        <p className="mb-10 rounded-xl border border-[#879d91]/30 bg-[#f8faf9] p-4 text-sm leading-relaxed text-[#3d4a47]">
          {cancellationNote}
        </p>
      ) : null}

      <div className="space-y-12">
        {sections.map((section, index) => (
          <SectionReveal key={section.title} delay={index * 0.05}>
            <section>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#134340]">
                {section.title}
              </h2>
              {section.note ? <p className="mt-2 text-sm text-[#879d91]">{section.note}</p> : null}
              <div className="mt-6 divide-y divide-[#134340]/10 rounded-2xl border border-[#134340]/10 bg-white">
                {section.items.map((item) => (
                  <div
                    key={`${section.title}-${item.title}`}
                    className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-[#134340]">{item.title}</p>
                      {item.note ? <p className="mt-1 text-sm text-[#879d91]">{item.note}</p> : null}
                    </div>
                    {item.price ? (
                      <p className="shrink-0 font-[family-name:var(--font-heading)] text-lg font-bold text-[#134340]">
                        {item.price}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          </SectionReveal>
        ))}
      </div>

      {faq.length > 0 ? (
        <SectionReveal className="mt-16">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#134340]">
            Pytania i odpowiedzi
          </h2>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-[#134340]/10 bg-[#f8faf9] px-5 py-4"
              >
                <summary className="cursor-pointer list-none font-medium text-[#134340] [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                <p className="mt-3 text-[17px] leading-relaxed text-[#3d4a47]">{item.answer}</p>
              </details>
            ))}
          </div>
        </SectionReveal>
      ) : null}

      <div className="mt-12 text-center">
        <Link href="/kontakt#formularz-kontaktowy" className="gp-btn gp-btn-primary">
          Umów wizytę
        </Link>
      </div>
    </div>
  );
}
