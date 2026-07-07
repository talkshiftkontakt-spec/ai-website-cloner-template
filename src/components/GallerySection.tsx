import Image from "next/image";
import { SectionReveal } from "@/components/SectionReveal";
import { images } from "@/lib/site-data";

export function GallerySection() {
  return (
    <section className="overflow-hidden bg-[#f8faf9] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <h2 className="text-center font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#134340] md:text-4xl">
            Gabinety Lekarsko-Psychologiczne Pomorska
          </h2>
        </SectionReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {images.gallery.map((src, index) => (
            <SectionReveal key={src} delay={index * 0.08}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(19,67,64,0.1)]">
                <Image
                  src={src}
                  alt="Wnętrze gabinetu Gabinety Pomorska"
                  fill
                  className="object-cover transition duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
