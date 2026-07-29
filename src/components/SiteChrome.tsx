"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  Calculator,
  CalendarCheck,
  GraduationCap,
  Laptop,
  Menu,
  MessageCircleMore,
  Umbrella,
  User,
  UserCircle,
  X,
  ChevronUp,
} from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/types/content";
import { EnvelopeIcon, PhoneIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#83AC86] text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-end gap-6 px-4 py-2 text-sm md:px-8">
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center gap-2 text-white no-underline transition-opacity hover:opacity-80"
          >
            <PhoneIcon size={14} />
            <span>{CONTACT.phone}</span>
          </a>
          <a
            href={CONTACT.emailHref}
            className="inline-flex items-center gap-2 text-white no-underline transition-opacity hover:opacity-80"
          >
            <EnvelopeIcon size={14} />
            <span className="hidden sm:inline">{CONTACT.email}</span>
          </a>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-black/5 bg-white transition-shadow",
          scrolled && "shadow-md",
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-8">
          <a href="#" className="relative block h-10 w-[180px] shrink-0 md:h-12 md:w-[220px]">
            <Image
              src="/images/logo-2.2.png"
              alt="Korepetycje Pro"
              fill
              className="object-contain object-left"
              priority
              sizes="220px"
            />
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[15px] font-normal text-[#424242] no-underline transition-colors hover:text-[#83AC86]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#kontakt"
              className="kp-btn kp-btn-outline hidden text-[16px]! md:inline-flex"
            >
              Kontakt
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#424242] lg:hidden"
              aria-label="Przełącznik menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-black/5 bg-white px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-2 text-base text-[#424242] no-underline"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#kontakt"
                className="kp-btn kp-btn-primary mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                Kontakt
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export function FeatureIcon({
  name,
  className,
  size = 70,
}: {
  name:
    | "laptop"
    | "calendar"
    | "user"
    | "chat"
    | "award"
    | "book"
    | "umbrella"
    | "calculator"
    | "graduation";
  className?: string;
  size?: number;
}) {
  const props = {
    size,
    className: cn("text-[#83AC86]", className),
    strokeWidth: 1.5 as const,
  };
  switch (name) {
    case "laptop":
      return <Laptop {...props} />;
    case "calendar":
      return <CalendarCheck {...props} />;
    case "user":
      return <UserCircle {...props} />;
    case "chat":
      return <MessageCircleMore {...props} />;
    case "award":
      return <Award {...props} />;
    case "book":
      return <BookOpen {...props} />;
    case "umbrella":
      return <Umbrella {...props} />;
    case "calculator":
      return <Calculator {...props} />;
    case "graduation":
      return <GraduationCap {...props} />;
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1 text-center font-sans text-[18px] font-normal tracking-[2px] text-[#424242] max-[1366px]:text-[15px]">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <h2
      className={cn(
        "font-sans text-[50px] font-medium leading-[1.3] text-[#424242] max-[1366px]:text-[30px]",
        align === "center" ? "text-center" : "text-left max-md:text-center",
      )}
    >
      {children}
    </h2>
  );
}

export function SectionDivider({
  align = "center",
  width = "15%",
}: {
  align?: "center" | "left";
  width?: string;
}) {
  return (
    <div
      className={cn(
        "flex py-4",
        align === "center" ? "justify-center" : "justify-start max-md:justify-center",
      )}
    >
      <span
        className="block h-px bg-[#424242]"
        style={{ width }}
      />
    </div>
  );
}

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      aria-label="Do góry"
      className="fixed right-5 bottom-5 z-50 flex h-11 w-11 items-center justify-center bg-[#83AC86] text-white shadow-md transition hover:bg-[#6f9673]"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ChevronUp size={22} />
    </button>
  );
}

export function HeroBulletIcon({
  name,
}: {
  name: "laptop" | "user" | "umbrella";
}) {
  if (name === "laptop") return <Laptop size={30} className="text-[#83AC86]" strokeWidth={1.5} />;
  if (name === "user") return <User size={30} className="text-[#83AC86]" strokeWidth={1.5} />;
  return <Umbrella size={30} className="text-[#83AC86]" strokeWidth={1.5} />;
}
