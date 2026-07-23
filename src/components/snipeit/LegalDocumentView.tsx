import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { LegalDocument } from "@/lib/legal-content";

export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <main className="min-h-screen bg-[#0e1716] px-6 py-16 md:py-24">
      <div className="mx-auto w-full max-w-[760px]">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-[15px] text-[#9ebdbb] transition-colors hover:text-[#f0f0f0]"
        >
          <ChevronLeft className="h-[18px] w-[18px]" aria-hidden />
          Powrót
        </Link>
        <h1 className="font-sf-expanded-bold mb-2 text-[32px] tracking-[-1px] text-[#f0f0f0] md:text-[44px]">
          {doc.title}
        </h1>
        <p className="mb-8 text-[14px] text-[#6d8886]">
          Ostatnia aktualizacja: {doc.updatedAt}
        </p>
        <p className="mb-10 text-[17px] leading-[28px] text-[#c4d6d4]">
          {doc.intro}
        </p>
        <div className="flex flex-col gap-8">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-satoshi mb-2 text-[20px] font-bold text-[#f0f0f0] md:text-[22px]">
                {section.heading}
              </h2>
              <p className="text-[16px] leading-[26px] text-[#9ebdbb]">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
