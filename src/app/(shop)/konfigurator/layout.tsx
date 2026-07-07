import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Konfigurator — personalizowana główka",
  description:
    "Wgraj skin Minecraft lub wpisz nick. Zobacz podgląd 3D i zamów unikalną fizyczną główkę.",
  path: "/konfigurator",
});

export default function ConfiguratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
