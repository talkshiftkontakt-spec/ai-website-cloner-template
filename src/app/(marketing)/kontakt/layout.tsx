import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
 title: "Kontakt",
 description: "Skontaktuj się z zespołem Twój Skinek: pytania o zamówienia, produkty i współprace.",
 path: "/kontakt",
});

export default function ContactLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
