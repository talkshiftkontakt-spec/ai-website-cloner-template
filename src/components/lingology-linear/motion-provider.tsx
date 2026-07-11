"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

const HEADER_OFFSET = 72;

function revealVisible(nodes: NodeListOf<HTMLElement>) {
  const viewport = window.innerHeight * 0.9;
  for (const node of nodes) {
    const rect = node.getBoundingClientRect();
    if (rect.top < viewport) {
      node.classList.add("is-visible");
    }
  }
}

function ScrollEffects() {
  const lenis = useLenis();

  useEffect(() => {
    document.documentElement.classList.add("js");

    const revealNodes = document.querySelectorAll<HTMLElement>(".linear-reveal");
    if (!revealNodes.length) return;

    revealVisible(revealNodes);
    requestAnimationFrame(() => revealVisible(revealNodes));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    for (const node of revealNodes) {
      if (!node.classList.contains("is-visible")) {
        observer.observe(node);
      }
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lenis) return;

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -HEADER_OFFSET, duration: 1.15 });
    };

    document.addEventListener("click", onAnchorClick);
    return () => document.removeEventListener("click", onAnchorClick);
  }, [lenis]);

  useLenis((instance) => {
    const layers = document.querySelectorAll<HTMLElement>("[data-parallax]");
    for (const layer of layers) {
      const speed = Number(layer.dataset.parallax ?? "0.12");
      const rect = layer.getBoundingClientRect();
      const center = rect.top + rect.height * 0.5 - window.innerHeight * 0.5;
      const offset = center * speed * -1;
      layer.style.transform = `translate3d(0, ${offset}px, 0)`;
    }

    void instance.scroll;
  });

  return null;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.1,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      }}
    >
      <ScrollEffects />
      {children}
    </ReactLenis>
  );
}
