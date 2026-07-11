"use client";

import { useEffect } from "react";

function revealVisible(nodes: NodeListOf<HTMLElement>) {
  const viewport = window.innerHeight * 0.92;
  for (const node of nodes) {
    const rect = node.getBoundingClientRect();
    if (rect.top < viewport) {
      node.classList.add("is-visible");
    }
  }
}

export function ScrollRevealProvider() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const nodes = document.querySelectorAll<HTMLElement>(".linear-reveal");
    if (!nodes.length) return;

    revealVisible(nodes);

    // Show in-viewport sections immediately
    requestAnimationFrame(() => revealVisible(nodes));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.05 },
    );

    for (const node of nodes) {
      if (!node.classList.contains("is-visible")) {
        observer.observe(node);
      }
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
