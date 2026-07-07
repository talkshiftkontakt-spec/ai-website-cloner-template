import Image from "next/image";

import { GALLERY_IMAGES } from "@/lib/constants/content";
import { FadeUp } from "@/components/motion/fade-up";
import { Section } from "@/components/layout/section";

export function TransformationGallery() {
  return (
    <Section id="transformacje">
      <FadeUp>
        <p className="text-label text-brand">Codzienne życie</p>
        <h2 className="text-display mt-3 max-w-2xl text-primary">
          Zmiana, którą widać w codzienności — nie na zdjęciach „przed i po”.
        </h2>
      </FadeUp>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_IMAGES.map((image, index) => (
          <FadeUp key={image.src} delay={index * 0.05}>
            <figure className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-canvas-raised">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-opacity duration-500 group-hover:opacity-90"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas/90 to-transparent p-4 text-sm text-primary">
                {image.caption}
              </figcaption>
            </figure>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
