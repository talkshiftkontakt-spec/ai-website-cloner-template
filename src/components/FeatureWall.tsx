import Image from "next/image";

import { featureTiles } from "@/lib/raycast-content";

export function FeatureWall() {
  return (
    <section className="mx-auto w-full max-w-[1204px] px-6 py-24 md:py-32">
      <div className="mx-auto mb-12 max-w-[640px] text-center md:mb-16">
        <h2 className="ray-section-title">What else can Raycast do?</h2>
        <p className="ray-section-subtitle mt-4">
          It can take notes. Track your flights. Convert anything. Search files.
          Run scripts. Manage your windows. Plan your day. Remind you of stuff.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
        {featureTiles.map((tile) => (
          <article
            key={tile.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-ray-border bg-ray-surface transition-colors hover:border-white/10"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ray-surface-2">
              <Image
                src={tile.imageSrc}
                alt={tile.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="px-3 py-3 md:px-4 md:py-4">
              <h3 className="text-sm font-medium text-white md:text-[15px]">
                {tile.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
