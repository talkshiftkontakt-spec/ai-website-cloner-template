"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

import { BackgroundCover } from "@/components/ui/background-cover";
import { siteConfig } from "@/lib/site";

const heroProducts = [
 {
 src: "/images/products/twojskinek/product-steve-skin.png",
 alt: "Obraz ze skinem Steve na płótnie, trzymany w dłoni",
 },
 {
 src: "/images/products/twojskinek/product-dog-skin.png",
 alt: "Personalizowany obraz ze skinem Minecraft na płótnie",
 },
];

export function HeroSection() {
 const [active, setActive] = useState(0);

 useEffect(() => {
 const timer = setInterval(() => {
 setActive((i) => (i + 1) % heroProducts.length);
 }, 4500);
 return () => clearInterval(timer);
 }, []);

 return (
 <section className="hero-cinematic relative flex items-center">
 <BackgroundCover
 src="/images/hero/minecraft-sunset.jpg"
 priority
 position="center 35%"
 className="z-0"
 />
 <div className="absolute inset-0 z-[2] grain-overlay" aria-hidden />

 <div className="container-site relative z-10 py-12 md:py-20 lg:py-24">
 <div className="flex flex-col items-center gap-10 text-center lg:gap-12">
 <div className="relative max-w-3xl space-y-5">
 <p className="pixel-label text-grass">
 Personalizowane obrazy · Druk na płótnie
 </p>
 <div className="relative inline-block">
 <h1 className="font-display text-[2rem] font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl text-balance">
 <span className="whitespace-nowrap">Twój skin z Minecrafta</span>
 <span className="mt-1 block text-grass sm:mt-2">na ścianie</span>
 </h1>
 <div
 className="absolute -top-3 -right-2 rotate-12 sm:-top-5 sm:-right-6"
 aria-hidden
 >
 <span className="inline-block rounded-md border-2 border-white bg-gradient-to-br from-red-500 to-orange-500 px-3 py-1 font-display text-sm font-black text-white shadow-lg sm:text-lg">
 HIT!
 </span>
 </div>
 </div>
 <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl text-pretty">
 Personalizowany <strong>obraz z główką Twojego skina</strong>.
 Wysokiej jakości druk na płótnie, nie 3D kostka, nie plakat
 z marketplacu. Prawdziwy canvas na ścianę.
 </p>
 </div>

 {/* Prawdziwe zdjęcia produktu z twojskinek.pl */}
 <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border-4 border-border shadow-2xl sm:max-w-md">
 {heroProducts.map((product, index) => (
 <Image
 key={product.src}
 src={product.src}
 alt={product.alt}
 fill
 priority={index === 0}
 sizes="(max-width: 640px) 90vw, 400px"
 className={`bg-neutral-900/30 object-contain transition-opacity duration-1000 ${
 index === active ? "opacity-100" : "opacity-0"
 }`}
 />
 ))}
 </div>

 <div className="flex flex-col items-center gap-4">
 <Link href="/konfigurator" className="mc-button">
 Zamów swój obrazek
 <ArrowDown className="size-5" aria-hidden />
 </Link>
 <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/75">
 <li>Formaty od 20×20 cm</li>
 <li>Od 59 zł w promocji</li>
 <li>Wysyłka {siteConfig.stats.shippingDays}</li>
 </ul>
 </div>
 </div>
 </div>
 </section>
 );
}
