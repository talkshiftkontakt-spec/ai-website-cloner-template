import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqItems } from "@/lib/cms/data";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
 title: "FAQ",
 description:
 "Najczęściej zadawane pytania o kolekcjonerskie główki Minecraft Twój Skinek: materiały, wysyłka, personalizacja, zwroty.",
 path: "/faq",
});

export default function FaqPage() {
 return (
 <>
 <JsonLd
 data={{
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: faqItems.map((item) => ({
 "@type": "Question",
 name: item.question,
 acceptedAnswer: {
 "@type": "Answer",
 text: item.answer,
 },
 })),
 }}
 />

 <div className="container-site section-padding">
 <div className="mx-auto max-w-2xl">
 <h1 className="font-display text-4xl font-bold">
 Często zadawane pytania
 </h1>
 <p className="mt-4 text-muted-foreground">
 Wszystko, co musisz wiedzieć przed zamówieniem.
 </p>
 <div className="mt-10">
 <FaqAccordion />
 </div>
 </div>
 </div>
 </>
 );
}
