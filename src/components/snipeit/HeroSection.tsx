"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { ASSET } from "@/lib/snipeit-content";

export function HeroDecorations() {
  return (
    <>
      <div className="animate-union-pulse pointer-events-none absolute top-[430px] -left-[150px] h-[300px] w-[300px] rotate-[-19.11deg] opacity-[0.28] md:top-[112px] md:-left-[401px] md:h-[802px] md:w-[802px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET}/union-hero.svg`}
          className="h-full w-full"
          alt=""
        />
      </div>
      <div className="animate-union-pulse pointer-events-none absolute top-[470px] -right-[140px] h-[280px] w-[280px] rotate-[-73.74deg] opacity-[0.40] md:top-[65px] md:-right-[391px] md:h-[782px] md:w-[782px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET}/union-hero-right.svg`}
          className="h-full w-full"
          alt=""
        />
      </div>
    </>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[130px] pb-10 md:pt-[200px] md:pb-16"
    >
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
        <motion.h1
          className="font-sf-expanded-medium text-gradient-hero mb-4 text-[32px] leading-[1.15] tracking-[-0.8px] md:mb-8 md:text-[56px] md:leading-[70px] lg:text-[64px]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Monitoruj najnowsze
          <br />
          ogłoszenia w{" "}
          <span className="font-sf-expanded-bold">jednym miejscu</span>
        </motion.h1>
        <motion.p
          className="font-satoshi mx-auto mb-8 max-w-[654px] text-[16px] leading-[24px] font-medium tracking-[-1.2px] text-[#d9e5e8] md:mb-12 md:text-[24px] md:leading-[30px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          Wpisz frazę kluczową, bądź wybierz co Cię interesuje i bądź przed
          innymi w zakupie przedmiotu na czołowych platformach
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#plany"
            className="font-satoshi inline-flex h-[49px] w-[234px] items-center justify-center gap-2.5 rounded-[38px] border border-[#73ede0] text-[18px] font-medium text-[#1c2625] shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.6)] transition hover:brightness-[1.03] md:text-[20px]"
            style={{
              background:
                "radial-gradient(110% 130% at 30% 15%, #a6eee7 0%, #f2faff 80%)",
            }}
          >
            <Plus className="size-5" strokeWidth={2.5} /> Zdobądź dostęp
          </a>
          <a
            href="#kontakt"
            className="animate-cta-shimmer font-satoshi inline-flex h-[49px] w-[234px] items-center justify-center gap-2.5 rounded-[38px] border border-[#f2faff] text-[18px] font-bold text-[#f2faff] transition-all duration-200 hover:bg-white/5 md:text-[20px]"
          >
            <Image
              src={`${ASSET}/icon-send-filled.svg`}
              alt=""
              width={20}
              height={20}
              className="size-5"
            />{" "}
            Skontaktuj się
          </a>
        </motion.div>
      </div>
    </section>
  );
}
