"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { SectionReveal } from "@/components/SectionReveal";
import { specialists } from "@/lib/site-data";

export function TeamSection() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#134340] md:text-4xl">
              Nasz zespół
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#3d4a47]">
              Zespół Gabinetów Pomorska tworzą specjaliści z wieloletnim doświadczeniem:
            </p>
          </div>
        </SectionReveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {specialists.map((spec, index) => (
            <SectionReveal key={spec.name} delay={index * 0.03}>
              <motion.div whileHover={reduce ? undefined : { y: -3 }} transition={{ duration: 0.2 }}>
                <Link
                  href={spec.href}
                  className="flex items-center gap-4 rounded-2xl border border-[#134340]/8 bg-[#f8faf9] p-4 transition hover:border-[#879d91]/40 hover:bg-white hover:shadow-[0_12px_32px_rgba(19,67,64,0.08)]"
                >
                  <Image
                    src={spec.image}
                    alt={spec.name}
                    width={88}
                    height={88}
                    className="h-[88px] w-[88px] shrink-0 rounded-full object-cover ring-2 ring-white"
                  />
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-montserrat)] text-sm leading-relaxed text-[#134340]">
                      {spec.role}
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-heading)] text-base font-black capitalize tracking-wide text-[#879d91]">
                      {spec.name}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-12 text-center">
          <Link href="/specjalisci" className="gp-btn gp-btn-outline">
            Dowiedz się więcej
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
