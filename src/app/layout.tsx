import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raycast - Your shortcut to everything",
  description:
    "A collection of powerful productivity tools all within an extendable launcher.",
  icons: {
    icon: "/seo/favicon.png",
  },
  openGraph: {
    title: "Raycast - Your shortcut to everything",
    description:
      "A collection of powerful productivity tools all within an extendable launcher.",
    images: ["/seo/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#07080a] text-white">
        {children}
      </body>
    </html>
  );
}
