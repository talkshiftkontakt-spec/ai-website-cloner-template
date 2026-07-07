import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/site-data";

export function HeroSection() {
  return (
    <section className="relative mt-[72px] overflow-hidden bg-white">
      <div className="mx-auto grid max-w-[1325px] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 lg:px-12 lg:py-24">
          <h2 className="gp-section-title">Gabinety Pomorska w Krakowie</h2>
          <p className="mb-8 max-w-md text-lg text-[#333]">
            Od ponad 10 lat wspieramy i leczymy dzieci, młodzież i dorosłych.
          </p>
          <div className="flex justify-start lg:justify-end">
            <Link href="#formularz-kontaktowy" className="gp-btn gp-btn-primary animate-pulse">
              Formularz kontaktowy
            </Link>
          </div>
        </div>
        <div className="relative min-h-[320px] lg:min-h-[480px]">
          <Image
            src={images.heroInterior}
            alt="Wnętrze gabinetu"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
