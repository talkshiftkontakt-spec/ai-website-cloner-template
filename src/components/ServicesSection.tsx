import Link from "next/link";
import { Brain, Heart, Users, Stethoscope, MagnifyingGlass, BowlFood, House, Baby } from "@phosphor-icons/react/dist/ssr";
import { SectionReveal } from "@/components/SectionReveal";
import { services } from "@/lib/site-data";
import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";

const iconMap: Record<string, ComponentType<IconProps>> = {
  Psychiatria: Stethoscope,
  "Psychoterapia par": Heart,
  Psychoterapia: Brain,
  "Terapia pedagogiczna": Baby,
  Diagnoza: MagnifyingGlass,
  "Poradnictwo dietetyczne": BowlFood,
  "Psychoterapia rodzinna": House,
  "Konsultacje dla rodziców": Users,
};

const cellTints = [
  "bg-[#eef4f1]",
  "bg-[#f3f0ea]",
  "bg-white",
  "bg-[#eef4f1]",
  "bg-white",
  "bg-[#f3f0ea]",
  "bg-[#eef4f1]",
  "bg-white",
];

export function ServicesSection() {
  return (
    <section className="bg-[#f8faf9] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.title] ?? Brain;
            const content = (
              <div
                className={`group flex h-full flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(19,67,64,0.1)] ${cellTints[index % cellTints.length]}`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#134340] shadow-sm ring-1 ring-[#134340]/10">
                  <Icon size={24} weight="duotone" aria-hidden />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#134340]">
                  {service.title}
                </h3>
              </div>
            );

            return (
              <SectionReveal key={service.title} delay={index * 0.04}>
                {service.href ? (
                  <Link href={service.href} className="block h-full">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
