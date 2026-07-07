import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { pricingItems } from "@/lib/site-data";

export function PricingSection() {
  return (
    <section className="bg-[#134340] py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <div className="grid gap-5 md:grid-cols-2">
          {pricingItems.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.05}>
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="shrink-0 font-[family-name:var(--font-heading)] text-xl font-bold text-[#b8cfc0]">
                    {item.price}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/75">{item.description}</p>
              </article>
            </SectionReveal>
          ))}
          </div>
        </SectionReveal>

        <SectionReveal className="mt-12 text-center">
          <Link
            href="https://www.gabinetpomorska.pl/index.php/cennik/"
            className="gp-btn border border-white/30 bg-white text-[#134340] hover:bg-white/90"
          >
            Pełny cennik
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
