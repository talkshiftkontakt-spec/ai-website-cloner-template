"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/tutoreo-content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const light = scrolled || menuOpen;

  return (
    <>
      <nav
        id="MainNavbar"
        className={cn(
          "fixed inset-x-0 top-0 z-[1000] h-20 transition-[background-color] duration-200 ease-in-out",
          light && "bg-white shadow-[var(--PopOffShadow)]"
        )}
      >
        <div
          id="NavbarWidthRestrainer"
          className="mx-auto flex h-20 max-w-[1440px] items-center justify-end gap-6 px-4 min-[1000px]:gap-12 min-[1000px]:px-6 min-[1000px]:mx-[37px] min-[1000px]:max-w-none xl:mx-auto xl:max-w-[1366px]"
        >
          <Link
            id="LogoLink"
            href="/"
            className="mr-auto flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              id="MainNavbarLogo"
              src={light ? "/images/Logo_Nav.webp" : "/images/Logo_Nav_White.webp"}
              alt="Logo"
              width={178}
              height={38}
              className="h-[38px] w-auto"
              priority
            />
          </Link>

          <div className="hidden items-center gap-12 min-[1000px]:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-[18px] font-bold leading-[18px] transition-colors duration-200",
                  light ? "text-[var(--AccentColor)]" : "text-white",
                  link.active &&
                    "after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:content-['']",
                  link.active && (light ? "after:bg-[var(--AccentColor)]" : "after:bg-white")
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              id="NavbarCTA"
              href="/login"
              className={cn(
                "tutoreo-standard-btn !h-12 !px-8 !text-[18px] !leading-[48px]",
                light
                  ? "tutoreo-standard-btn--accent"
                  : "tutoreo-standard-btn--white"
              )}
            >
              Zaloguj
            </Link>
          </div>

          <button
            id="NavbarToggle"
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl shadow-[var(--PopOffShadow),var(--ShinyShadow)] min-[1000px]:hidden",
              light ? "bg-[var(--AccentColor)]" : "bg-[var(--AccentColor2)]"
            )}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 rounded bg-white transition-all duration-200",
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 rounded bg-white transition-opacity duration-200",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 rounded bg-white transition-all duration-200",
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="MobileNavbar"
        className={cn(
          "fixed inset-0 z-[999] flex flex-col bg-white px-6 pt-28 transition-transform duration-300 min-[1000px]:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[24px] font-bold text-[var(--AccentColor)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="tutoreo-standard-btn tutoreo-standard-btn--accent w-fit"
            onClick={() => setMenuOpen(false)}
          >
            Zaloguj
          </Link>
        </div>
      </div>
    </>
  );
}
