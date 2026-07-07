"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { images } from "@/lib/site-data";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative mt-16 overflow-hidden bg-[#f4f7f5]">
      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center px-6 py-16 lg:px-8 lg:py-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="max-w-xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.1] tracking-tight text-[#134340] md:text-5xl lg:text-[3.25rem]">
              Gabinety Pomorska w Krakowie
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#3d4a47]">
              Od ponad 10 lat wspieramy i leczymy dzieci, młodzież i dorosłych.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#formularz-kontaktowy" className="gp-btn gp-btn-primary">
                Formularz kontaktowy
              </Link>
              <Link href="https://www.gabinetpomorska.pl/specjalisci/" className="gp-btn gp-btn-outline">
                Specjaliści
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative min-h-[320px] lg:min-h-full"
          initial={reduce ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={images.heroInterior}
            alt="Wnętrze gabinetu psychologicznego Gabinety Pomorska"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f7f5] via-transparent to-transparent lg:w-1/4" />
        </motion.div>
      </div>
    </section>
  );
}
