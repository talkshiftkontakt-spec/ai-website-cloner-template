import Link from "next/link";

import { AppleIcon, RaycastLogoIcon } from "@/components/icons";
import { navLinks } from "@/lib/raycast-content";
import { cn } from "@/lib/utils";

const navLinkClassName =
  "rounded-md px-2 py-3 text-sm font-medium text-ray-muted transition-colors duration-150 hover:text-white";

export function Navbar() {
  return (
    <header className="fixed top-0 z-[2] flex h-[92px] w-full items-start justify-center bg-transparent pt-4">
      <nav
        aria-label="Main navigation"
        className={cn(
          "flex h-[76px] w-[calc(100%-32px)] max-w-[1200px] items-center justify-between gap-4",
          "rounded-2xl border border-white/[0.08] bg-[rgba(17,18,20,0.72)] px-8 backdrop-blur-[20px]",
        )}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-white transition-opacity hover:opacity-90"
        >
          <RaycastLogoIcon className="size-7 shrink-0" />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">
            Raycast
          </span>
        </Link>

        <div className="hidden items-center md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navLinkClassName}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Link
            href="/users/sign_in"
            className={cn(navLinkClassName, "hidden md:inline-flex")}
          >
            Log in
          </Link>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-ray-button px-3 text-sm font-medium tracking-[0.2px] text-ray-button-fg transition-opacity hover:opacity-90"
          >
            <AppleIcon className="size-4" />
            Download
          </button>
        </div>
      </nav>
    </header>
  );
}
