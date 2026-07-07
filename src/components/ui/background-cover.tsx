import Image from "next/image";

import { cn } from "@/lib/utils";

type BackgroundCoverProps = {
  src: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Fine-tune focal point, e.g. "center 25%" for sky-heavy hero shots */
  position?: string;
};

export function BackgroundCover({
  src,
  alt = "",
  priority = false,
  className,
  imageClassName,
  position = "center",
}: BackgroundCoverProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden={alt === ""}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        quality={85}
        className={cn("object-cover object-center", imageClassName)}
        style={{ objectFit: "cover", objectPosition: position }}
        draggable={false}
      />
    </div>
  );
}
