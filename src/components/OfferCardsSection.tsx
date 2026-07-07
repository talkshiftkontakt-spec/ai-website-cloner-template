import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SectionReveal } from "@/components/SectionReveal";
import type { OfferCard } from "@/lib/pages-data";

interface OfferCardsSectionProps {
  cards: OfferCard[];
}

export function OfferCardsSection({ cards }: OfferCardsSectionProps) {
  return (
    <section className="border-t border-[#134340]/10 bg-white px-6 py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-[family-name:var(--font-heading)] text-2xl font-bold text-[#134340] md:text-3xl">
          Nasze usługi
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <SectionReveal key={card.href} delay={index * 0.04}>
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-2xl border border-[#134340]/10 bg-[#f8faf9] p-6 transition hover:border-[#879d91]/50 hover:shadow-lg"
              >
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#134340]">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#3d4a47]">{card.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#879d91] group-hover:text-[#134340]">
                  Dowiedz się więcej
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
