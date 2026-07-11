import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LingoLogy | Angielski online dla dorosłych",
  description:
    "Korepetycje z angielskiego pod mówienie i plan między spotkaniami w LingoLogy App. Konsultacja 0 zł.",
  metadataBase: new URL("https://www.lingology.pl"),
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "LingoLogy",
    title: "LingoLogy | Angielski online dla dorosłych",
    description: "Korepetycje 1:1 nastawione na mówienie. Plan między lekcjami w LingoLogy App.",
  },
  icons: {
    icon: "/lingology/favicon.ico",
    apple: "/lingology/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} h-full`} data-theme="dark">
      <body className="min-h-full bg-[var(--ll-bg-primary)] font-sans text-[var(--ll-text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
