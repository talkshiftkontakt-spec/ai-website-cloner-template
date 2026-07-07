import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Strona główna - Gabinety Pomorska",
  description: "Od ponad 10 lat wspieramy i leczymy dzieci, młodzież i dorosłych.",
  icons: {
    icon: "/images/gabinetpomorska/cropped-Tlo-usuniete-logo-male.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl-PL" className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-[#333]">{children}</body>
    </html>
  );
}
