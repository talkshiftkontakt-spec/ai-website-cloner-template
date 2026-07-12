"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const onScroll = () => {
      if (window.scrollY > 8) {
        document.documentElement.dataset.scrolled = "";
      } else {
        delete document.documentElement.dataset.scrolled;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
