import { Plus } from "lucide-react";
import Image from "next/image";
import { ASSET } from "@/lib/snipeit-content";

export function HeroDecorations() {
  return (
    <>
      <div className="absolute pointer-events-none animate-union-pulse w-[300px] h-[300px] -left-[150px] top-[430px] md:w-[802px] md:h-[802px] md:-left-[401px] md:top-[112px] rotate-[-19.11deg] opacity-[0.28]">
        <img
          src={`${ASSET}/union-hero.svg`}
          className="w-full h-full"
          alt=""
        />
      </div>
      <div className="absolute pointer-events-none animate-union-pulse w-[280px] h-[280px] -right-[140px] top-[470px] md:w-[782px] md:h-[782px] md:-right-[391px] md:top-[65px] rotate-[-73.74deg] opacity-[0.40]">
        <img
          src={`${ASSET}/union-hero-right.svg`}
          className="w-full h-full"
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
      className="relative pt-[130px] md:pt-[200px] pb-10 md:pb-16 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
        <h1 className="text-[32px] md:text-[56px] lg:text-[64px] leading-[1.15] md:leading-[70px] tracking-[-0.8px] mb-4 md:mb-8 text-gradient-hero font-sf-expanded-medium">
          Monitoruj najnowsze
          <br />
          ogłoszenia w{" "}
          <span className="font-sf-expanded-bold">jednym miejscu</span>
        </h1>
        <p className="font-satoshi text-[16px] md:text-[24px] text-[#d9e5e8] leading-[24px] md:leading-[30px] tracking-[-1.2px] max-w-[654px] mx-auto mb-8 md:mb-12 font-medium">
          Wpisz frazę kluczową, bądź wybierz co Cię interesuje i bądź przed
          innymi w zakupie przedmiotu na czołowych platformach
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#plany"
            className="inline-flex items-center justify-center gap-2.5 w-[234px] h-[49px] rounded-[38px] border border-[#73ede0] text-[#1c2625] text-[18px] md:text-[20px] font-satoshi font-medium shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.6)] hover:brightness-[1.03] transition"
            style={{
              background:
                "radial-gradient(110% 130% at 30% 15%, #a6eee7 0%, #f2faff 80%)",
            }}
          >
            <Plus className="size-5" /> Zdobądź dostęp
          </a>
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2.5 w-[234px] h-[49px] border border-[#f2faff] text-[#f2faff] rounded-[38px] text-[18px] md:text-[20px] font-satoshi font-bold hover:bg-white/5 transition-all duration-200"
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
        </div>
      </div>
    </section>
  );
}
