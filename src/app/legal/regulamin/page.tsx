import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CookieBanner } from "@/components/snipeit/CookieBanner";
import { LegalDocumentView } from "@/components/snipeit/LegalDocumentView";
import { LEGAL_DOCUMENTS } from "@/lib/legal-content";

const SLUG = "regulamin";

export const metadata: Metadata = {
  title: "Regulamin | SnipeIT",
  description: LEGAL_DOCUMENTS[SLUG]?.intro,
};

export default function RegulaminPage() {
  const doc = LEGAL_DOCUMENTS[SLUG];
  if (!doc) notFound();
  return (
    <>
      <LegalDocumentView doc={doc} />
      <CookieBanner />
    </>
  );
}
