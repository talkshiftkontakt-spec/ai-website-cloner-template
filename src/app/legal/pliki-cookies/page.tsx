import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CookieBanner } from "@/components/snipeit/CookieBanner";
import { LegalDocumentView } from "@/components/snipeit/LegalDocumentView";
import { LEGAL_DOCUMENTS } from "@/lib/legal-content";

const SLUG = "pliki-cookies";

export const metadata: Metadata = {
  title: "Polityka Cookies | SnipeIT",
  description: LEGAL_DOCUMENTS[SLUG]?.intro,
};

export default function PlikiCookiesPage() {
  const doc = LEGAL_DOCUMENTS[SLUG];
  if (!doc) notFound();
  return (
    <>
      <LegalDocumentView doc={doc} />
      <CookieBanner />
    </>
  );
}
