import Link from "next/link";

import { site } from "@/lib/lingology-content";

export function LingologyFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--ll-bg-panel)]">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="text-[15px] font-semibold text-[var(--ll-text-primary)]">{site.name}</p>
          <p className="mt-1 text-sm text-[var(--ll-text-tertiary)]">Angielski online dla dorosłych · Korepetycje 1:1</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-[var(--ll-text-tertiary)]">
          <Link href="#offer" className="hover:text-[var(--ll-text-primary)]">
            Oferta
          </Link>
          <Link href="#faq" className="hover:text-[var(--ll-text-primary)]">
            FAQ
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-[var(--ll-text-primary)]">
            {site.email}
          </a>
          <a href={site.appUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ll-text-primary)]">
            LingoLogy App
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-[var(--ll-text-quaternary)]">
        © {new Date().getFullYear()} LingoLogy · Styl inspirowany Linear.app
      </div>
    </footer>
  );
}
