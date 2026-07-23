import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { aiFeatures } from "@/lib/raycast-content";

function AiEyebrow() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-24 bg-gradient-to-r from-transparent to-white/20" />
      <span className="rounded-full bg-[radial-gradient(13.65%_50%_at_50%_50%,rgba(245,48,107,0.1)_0%,rgba(255,103,167,0)_100%)] px-3 py-1 text-sm font-medium tracking-[0.2px] text-ray-red">
        AI
      </span>
      <span className="h-px w-24 bg-gradient-to-l from-transparent to-white/20" />
    </div>
  );
}

export function AIShowcase() {
  return (
    <section className="bg-[#07080a] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-12 text-center">
          <AiEyebrow />

          <div>
            <h2 className="text-xl font-medium tracking-[0.2px] text-white">
              Your Mac just got smarter.
            </h2>
            <p className="mt-0 text-xl font-medium tracking-[0.2px] text-ray-muted-2">
              AI where it&apos;s most useful - on your OS.
            </p>
          </div>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ul className="flex flex-col gap-10">
            {aiFeatures.map((feature) => (
              <li key={feature.title} className="flex flex-col gap-2">
                <h3 className="text-base font-medium tracking-[0.2px] text-white">
                  {feature.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-ray-muted">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <Image
              src="/images/raycast/features/quick-ai-mobile.a1c4047f.png"
              alt="Raycast Quick AI on mobile"
              width={640}
              height={640}
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/core-features/ai"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-ray-red"
          >
            More about AI
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
