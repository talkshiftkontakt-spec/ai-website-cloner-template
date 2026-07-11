import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lekcjerazem.pl"),
  title: "LekcjeRazem.pl — Prowadź korepetycje profesjonalnie i zdobywaj więcej uczniów",
  description:
    "LekcjeRazem.pl – platforma dla korepetytorów do lekcji online i stacjonarnych. Kalendarz, rozliczenia, materiały, zadania, panel ucznia, interaktywna tablica online, baza wzorów i definicji oraz AI dla korepetytora w jednym miejscu. Pierwszy miesiąc za darmo.",
  keywords: [
    "korepetycje online",
    "korepetycje stacjonarne",
    "platforma dla korepetytorów",
    "tablica online",
    "ai dla korepetytora",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://lekcjerazem.pl/",
  },
  openGraph: {
    type: "website",
    siteName: "LekcjeRazem.pl",
    locale: "pl_PL",
    title:
      "LekcjeRazem.pl — Prowadź korepetycje profesjonalnie i zdobywaj więcej uczniów",
    description:
      "LekcjeRazem.pl – platforma dla korepetytorów do lekcji online i stacjonarnych. Kalendarz, rozliczenia, materiały, zadania, panel ucznia, interaktywna tablica online, baza wzorów i definicji oraz AI dla korepetytora w jednym miejscu. Pierwszy miesiąc za darmo.",
    url: "https://lekcjerazem.pl/",
    images: ["/images/lekcjerazem/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "LekcjeRazem.pl — Prowadź korepetycje profesjonalnie i zdobywaj więcej uczniów",
    description:
      "LekcjeRazem.pl – platforma dla korepetytorów do lekcji online i stacjonarnych.",
    images: ["/images/lekcjerazem/logo.svg"],
  },
  icons: {
    icon: [
      { url: "/seo/favicon.svg", type: "image/svg+xml" },
      { url: "/seo/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/seo/favicon.ico",
    apple: "/seo/apple-touch-icon.png",
  },
  manifest: "/seo/site.webmanifest",
  other: {
    "theme-color": "#1D4ED8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${plusJakarta.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
