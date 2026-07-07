import Link from "next/link";
import { pricingItems } from "@/lib/site-data";

export function PricingSection() {
  return (
    <section className="bg-[#f8f6f2] py-12 lg:py-20">
      <div className="mx-auto max-w-[900px] px-6 lg:px-12">
        <ul className="divide-y divide-[#879d91]/30">
          {pricingItems.map((item) => (
            <li key={item.title} className="py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-[family-name:var(--font-heading)] text-lg font-medium text-[#134340]">
                  {item.title}
                </span>
                <span className="hidden flex-1 border-b border-dotted border-[#879d91]/40 mx-4 sm:block" />
                <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#134340]">
                  {item.price}
                </span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-[#555]">{item.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="https://www.gabinetpomorska.pl/index.php/cennik/"
            className="gp-btn gp-btn-outline"
          >
            Pełny cennik
          </Link>
        </div>
      </div>
    </section>
  );
}
