import Link from "next/link";

import { ExternalLinkIcon, RaycastLogoIcon } from "@/components/icons";
import { footerColumns } from "@/lib/raycast-content";
import { cn } from "@/lib/utils";

function FooterLink({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  const className = cn(
    "inline-flex items-center gap-1 text-sm text-ray-muted transition-colors hover:text-white",
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
        <ExternalLinkIcon className="size-3.5 opacity-70" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden pt-32 md:pt-[200px]">
      <div className="relative border-t border-[#1b1c1e] bg-[linear-gradient(rgba(7,8,10,0.8)_0.1%,#07080a_32.45%)] shadow-[0_-4px_10px_rgba(0,0,0,0.11)] backdrop-blur-[20px]">
        <div className="mx-auto flex w-full max-w-[1064px] flex-col gap-16 px-6 pb-16 pt-16 md:gap-24 md:pt-24">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-6 md:gap-10">
                <h3 className="text-sm font-medium text-white">{column.title}</h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink
                        label={link.label}
                        href={link.href}
                        external={link.external}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mx-auto w-full max-w-[480px]">
            <h3 className="text-center text-base font-medium text-white">
              Subscribe to our newsletter.
            </h3>
            <p className="mt-2 text-center text-sm text-ray-muted">
              Get product updates and news in your inbox. No spam.
            </p>

            <form className="mt-6 flex flex-col gap-3 sm:flex-row" action="#">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                name="email"
                placeholder="Your email address"
                className="h-10 flex-1 rounded-lg border border-ray-border bg-ray-surface px-3 text-sm text-white placeholder:text-ray-muted-2 focus:border-white/20 focus:outline-none"
              />
              <button
                type="submit"
                className="h-10 shrink-0 rounded-lg bg-ray-button px-4 text-sm font-medium text-ray-button-fg transition-opacity hover:opacity-90"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-center text-xs leading-relaxed text-ray-muted-2">
              By submitting your email address, you agree to receive
              Raycast&apos;s monthly newsletter. For more information, please
              read our{" "}
              <Link href="/privacy" className="underline hover:text-ray-muted">
                privacy policy
              </Link>
              . You can always withdraw your consent.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-ray-border pt-8 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2">
              <RaycastLogoIcon className="size-7" />
              <span className="text-sm font-semibold text-white">Raycast</span>
            </div>
            <p className="text-sm text-ray-muted-2">
              © {year} Raycast Technologies Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
