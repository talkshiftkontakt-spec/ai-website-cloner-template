import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const robotoFlex = localFont({
  src: "../../public/fonts/RobotoFlex-Variable.woff2",
  variable: "--font-roboto",
  display: "swap",
  weight: "100 1000",
});

const inter = localFont({
  src: "../../public/fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SnipeIT - Monitoruj ogłoszenia w jednym miejscu",
  description:
    "Zaawansowany agregator ogłoszeń. Skanuj portale, śledź oferty i bądź pierwszy przy zakupie.",
  icons: {
    icon: "/seo/icon.svg",
  },
  openGraph: {
    title: "SnipeIT - Monitoruj ogłoszenia w jednym miejscu",
    description:
      "Zaawansowany agregator ogłoszeń. Skanuj portale, śledź oferty i bądź pierwszy przy zakupie.",
    images: ["/seo/ogimg2.png"],
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
      className={`${robotoFlex.variable} ${inter.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-[#0e1716] text-[#f0f0f0]">
        {children}
      </body>
    </html>
  );
}
