import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
 title: "Konfigurator: personalizowany obraz",
 description:
 "Wgraj skin Minecraft lub wpisz nick. Zobacz podgląd obrazu na płótnie i zamów canvas na ścianę.",
 path: "/konfigurator",
});

export default function ConfiguratorLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
