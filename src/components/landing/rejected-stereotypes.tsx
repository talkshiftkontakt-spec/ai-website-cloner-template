import Image from "next/image";

import { CrossedOutOverlay } from "@/components/landing/crossed-out-overlay";
import { REJECTED_STEREOTYPE_IMAGES } from "@/lib/constants/content";
import { Section } from "@/components/layout/section";

export function RejectedStereotypes() {
  return (
    <Section id="odrzucamy" theme="sunken">
      <p className="text-label text-secondary">Koniec z kliszą</p>
      <h2 className="text-display mt-3 max-w-3xl text-primary">
        Tego obrazu już nie chcemy
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary md:text-base">
        Wstyd, samoobwinianie i stockowe zdjęcia nieszczęścia. Odrzucamy to w swojej
        pracy. Coaching to nie kolejna scena z reklamy dietetycznej.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {REJECTED_STEREOTYPE_IMAGES.map((image) => (
          <figure
            key={image.src}
            className="relative aspect-[4/5] overflow-hidden border border-border bg-canvas-raised"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover grayscale contrast-125 brightness-75 saturate-50"
            />
            <CrossedOutOverlay columns={6} rows={5} />
            <figcaption className="absolute inset-x-0 bottom-0 z-20 bg-canvas/90 px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-sm">
              {image.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
