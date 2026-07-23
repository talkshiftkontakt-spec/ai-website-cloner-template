"use client";

import Image from "next/image";

import { testimonials } from "@/lib/raycast-content";
import type { Testimonial } from "@/types/raycast";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="flex w-[280px] shrink-0 flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#111214] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
      <div className="flex items-center gap-3">
        <Image
          src={testimonial.avatarSrc}
          alt={testimonial.name}
          width={40}
          height={40}
          className="size-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {testimonial.name}
          </p>
          <p className="truncate text-sm text-ray-muted">
            {testimonial.handle}
          </p>
        </div>
      </div>

      <p className="text-sm text-ray-muted-2">{testimonial.role}</p>

      {testimonial.quote ? (
        <div className="mt-auto flex flex-col gap-2 border-t border-white/[0.06] pt-4">
          <p className="text-sm leading-relaxed text-white">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          {testimonial.favoriteFeature ? (
            <span className="inline-flex w-fit rounded-md bg-white/[0.06] px-2 py-1 text-xs font-medium text-ray-muted">
              {testimonial.favoriteFeature}
            </span>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export function Testimonials() {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-[#07080a] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-xl font-medium tracking-[0.2px] text-white">
          Built for professionals like you.
        </h2>
        <p className="text-xl font-medium tracking-[0.2px] text-ray-muted-2">
          Used by seriously productive people.
        </p>
      </div>

      <div className="relative mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#07080a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#07080a] to-transparent" />

        <div className="flex w-max animate-marquee gap-4">
          {marqueeItems.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.handle}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
