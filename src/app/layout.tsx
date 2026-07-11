import type { Metadata } from "next";

import { linearStylesheets } from "@/lib/linear-styles";

import "./globals.css";

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
    <html lang="pl" className="js h-full" data-theme="dark">
      <head>
        {linearStylesheets.map((href) => (
          <link key={href} rel="stylesheet" href={href} precedence="default" />
        ))}
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
