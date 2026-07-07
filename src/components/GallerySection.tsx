import Image from "next/image";
import { images } from "@/lib/site-data";

export function GallerySection() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-[1325px] px-6 text-center lg:px-12">
        <h2 className="gp-section-title">Gabinety Lekarsko-Psychologiczne Pomorska</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-[75px]">
          {images.gallery.map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={src}
                alt="Wnętrze gabinetu"
                fill
                className="object-cover transition duration-300 hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
