import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Korepetycje Online - Liceum oraz szkoła podstawowa 4-8",
  description:
    "Prowadzę korepetycje online dla uczniów liceum oraz szkoły podstawowej (4-8). Pomagam w przygotowaniach do matury i egzaminu ósmoklasisty.",
  icons: {
    icon: [
      { url: "/seo/cropped-Projekt-bez-nazwy-1-32x32.png", sizes: "32x32" },
      { url: "/seo/cropped-Projekt-bez-nazwy-1-192x192.png", sizes: "192x192" },
    ],
    apple: "/seo/cropped-Projekt-bez-nazwy-1-180x180.png",
  },
  openGraph: {
    title: "Korepetycje Online - Liceum oraz szkoła podstawowa 4-8",
    description:
      "Prowadzę korepetycje online dla uczniów liceum oraz szkoły podstawowej (4-8).",
    images: ["/seo/wizytowka.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${notoSerif.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans antialiased text-[#334155] bg-white">
        {children}
      </body>
    </html>
  );
}
