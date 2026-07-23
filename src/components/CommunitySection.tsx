import Image from "next/image";
import Link from "next/link";

import { youtubeVideos } from "@/lib/raycast-content";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    label: "Slack",
    href: "https://raycast.com/community",
    description: "37k members",
  },
  {
    label: "X/Twitter",
    href: "https://twitter.com/raycast",
    description: "90k followers",
  },
  {
    label: "GitHub",
    href: "https://github.com/raycast",
    description: "Open source",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/raycast",
    description: "Design",
  },
] as const;

function YoutubeTicker() {
  const tickerVideos = [...youtubeVideos, ...youtubeVideos];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex w-max animate-marquee gap-4">
        {tickerVideos.map((video, index) => (
          <a
            key={`${video.href}-${index}`}
            href={video.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0"
            aria-label={video.title}
          >
            <div className="relative h-[120px] w-[214px] overflow-hidden rounded-xl border border-ray-border bg-ray-surface transition-colors group-hover:border-white/10 md:h-[140px] md:w-[250px]">
              <Image
                src={video.thumbSrc}
                alt={video.title}
                fill
                sizes="250px"
                className="object-cover"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function CommunitySection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <Image
        src="/images/raycast/features/community-background.31147d7b.png"
        alt=""
        width={818}
        height={818}
        className="pointer-events-none absolute top-1/2 right-0 z-0 w-[min(818px,90vw)] -translate-y-1/2 translate-x-1/4 opacity-[0.35] md:opacity-[0.45]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[948px] flex-col items-center px-6">
        <div className="mb-16 text-center md:mb-[120px]">
          <h2 className="ray-section-title">Stay in the loop.</h2>
          <p className="ray-section-subtitle mt-4 max-w-[486px]">
            Join the community and learn how other people get the most out of
            Raycast.
          </p>
        </div>

        <div className="mb-16 grid w-full gap-4 sm:grid-cols-2 md:mb-[120px] md:gap-5">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex flex-col gap-2 rounded-2xl border border-ray-border bg-ray-surface/80 p-6",
                "transition-colors hover:border-white/10 hover:bg-ray-surface",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-base font-medium text-white">
                  {social.label}
                </span>
                <span className="text-sm text-ray-muted">{social.description}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="w-full max-w-[1204px]">
          <YoutubeTicker />
        </div>

        <div className="mt-16 max-w-[360px] text-center md:mt-[72px]">
          <p className="text-sm font-medium leading-[1.6] tracking-[0.2px] text-ray-muted">
            Check out our YouTube channel to learn about features you didn&apos;t
            even know existed.
          </p>
          <Link
            href="https://www.youtube.com/@raycast"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-1 text-base font-medium tracking-[0.3px] text-ray-muted transition-colors hover:text-white"
          >
            Visit YouTube
          </Link>
        </div>
      </div>
    </section>
  );
}
