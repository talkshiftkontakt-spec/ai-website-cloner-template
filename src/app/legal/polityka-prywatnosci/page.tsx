import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CookieBanner } from "@/components/snipeit/CookieBanner";
import { LegalDocumentView } from "@/components/snipeit/LegalDocumentView";
import { LEGAL_DOCUMENTS } from "@/lib/legal-content";

const SLUG = "polityka-prywatnosci";

export const metadata: Metadata = {
  title: "Polityka prywatności | SnipeIT",
  description: LEGAL_DOCUMENTS[SLUG]?.intro,
};

export default function PolitykaPrywatnosciPage() {
  const doc = LEGAL_DOCUMENTS[SLUG];
  if (!doc) notFound();
  return (
    <>
      <LegalDocumentView doc={doc} />
      <CookieBanner />
    </>
  );
}
