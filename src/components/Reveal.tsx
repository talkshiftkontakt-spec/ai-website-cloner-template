"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in ms after entering view */
  delay?: number;
  /** animation variant */
  variant?: "fade-up" | "fade" | "slide-in" | "scale-up";
  /** Only animate once (default true) */
  once?: boolean;
  style?: CSSProperties;
  as?: "div" | "section" | "li" | "article";
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  once = true,
  style,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const animClass =
    variant === "fade"
      ? "ray-anim-fade"
      : variant === "slide-in"
        ? "ray-anim-slide-in"
        : variant === "scale-up"
          ? "ray-anim-scale-up"
          : "ray-anim-fade-up";

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "ray-reveal",
        animClass,
        visible && "ray-reveal-visible",
        className,
      )}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
