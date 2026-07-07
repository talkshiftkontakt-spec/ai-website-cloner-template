import { cn } from "@/lib/utils";

type BackgroundCoverProps = {
  src: string;
  className?: string;
  /** Fine-tune focal point, e.g. "center 25%" for sky-heavy hero shots */
  position?: string;
};

/** Full-bleed background via CSS cover — never stretches unlike misconfigured fill images */
export function BackgroundCover({
  src,
  className,
  position = "center",
}: BackgroundCoverProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 bg-cover bg-no-repeat", className)}
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: position,
      }}
      aria-hidden
    />
  );
}
