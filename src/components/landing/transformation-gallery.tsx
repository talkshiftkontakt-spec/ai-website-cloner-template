import Image from "next/image";

import { GALLERY_IMAGES } from "@/lib/constants/content";
import { Section } from "@/components/layout/section";

export function TransformationGallery() {
  return (
    <Section id="transformacje">
      <p className="text-label text-secondary">Codzienne życie</p>
      <h2 className="text-display mt-3 max-w-3xl text-primary">
        Nie „przed i po”. Normalne życie, tylko lżejsze.
      </h2>

      <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-12">
        {GALLERY_IMAGES.map((image, index) => (
          <figure
            key={image.src}
            className={`relative overflow-hidden bg-canvas-raised ${
              index === 0
                ? "aspect-[4/5] sm:col-span-2 lg:col-span-7 lg:row-span-2"
                : index < 3
                  ? "aspect-[4/3] lg:col-span-5"
                  : "aspect-[4/3] sm:col-span-1 lg:col-span-4"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas to-transparent px-4 py-4 text-xs font-semibold uppercase tracking-wider text-primary">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
