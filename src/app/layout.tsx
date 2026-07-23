import type { Metadata } from "next";
import { Catamaran } from "next/font/google";
import "./globals.css";

const catamaran = Catamaran({
  variable: "--font-catamaran",
  subsets: ["latin", "latin-ext"],
  weight: ["100", "300", "400", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Korepetycje online | Tutoreo",
  description:
    "Korepetycje online bez przepłacania. Szybkie wyszukiwanie, wygodne lekcje wideo i wspólna tablica na żywo. Dołącz do platformy, która naprawdę wspiera uczniów i korepetytorów.",
  icons: {
    icon: "/seo/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${catamaran.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
