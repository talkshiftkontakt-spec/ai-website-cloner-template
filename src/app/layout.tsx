import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lingology.pl"),
  title: "LingoLogy | Angielski online dla dorosłych",
  description:
    "LingoLogy — korepetycje z angielskiego online dla dorosłych (1:1). Diagnoza bariery językowej, plan tygodniowy i LingoLogy App. Bezpłatna konsultacja.",
  keywords: [
    "LingoLogy",
    "Lingology",
    "angielski online dla dorosłych",
    "korepetycje z angielskiego online",
    "bariera językowa",
    "LingoLogy App",
  ],
  authors: [{ name: "Jakub Smolczewski" }],
  alternates: {
    canonical: "https://www.lingology.pl/",
  },
  openGraph: {
    type: "website",
    siteName: "LingoLogy",
    locale: "pl_PL",
    title: "LingoLogy | Angielski online dla dorosłych",
    description:
      "LingoLogy — korepetycje z angielskiego online dla dorosłych (1:1). Diagnoza bariery językowej, plan tygodniowy i LingoLogy App. Bezpłatna konsultacja.",
    url: "https://www.lingology.pl/",
    images: [
      {
        url: "/lingology/img/lingology-icon.png",
        width: 758,
        height: 766,
        alt: "LingoLogy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LingoLogy | Angielski online dla dorosłych",
    description:
      "LingoLogy — korepetycje z angielskiego online dla dorosłych (1:1).",
    images: ["/lingology/img/lingology-icon.png"],
  },
  icons: {
    icon: [
      { url: "/lingology/favicon.ico", sizes: "48x48" },
      { url: "/lingology/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/lingology/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/lingology/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/lingology/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/lingology/apple-touch-icon.png",
  },
  manifest: "/lingology/site.webmanifest",
  other: {
    "theme-color": "#3d7575",
    "msapplication-TileColor": "#3d7575",
    "msapplication-TileImage": "/lingology/favicon-192x192.png",
  },
};

const themeAntiFlash = `(function(){if(!/(?:^|;\\s*)ll_cookie_consent=1(?:;|$)/.test(document.cookie||''))return;var t=localStorage.getItem('theme');var s=location.protocol==='https:'?';Secure':'';if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');document.cookie='theme=dark;path=/;max-age=31536000;SameSite=Lax'+s;}else if(t==='light'){document.documentElement.setAttribute('data-theme','light');document.cookie='theme=light;path=/;max-age=31536000;SameSite=Lax'+s;}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeAntiFlash }} />
        <link rel="stylesheet" href="/lingology/css/tokens.css" />
        <link rel="stylesheet" href="/lingology/css/base.css" />
        <link rel="stylesheet" href="/lingology/css/critical-home.css" />
        <link rel="stylesheet" href="/lingology/css/fonts.css" />
        <link rel="stylesheet" href="/lingology/css/layout.css" />
        <link rel="stylesheet" href="/lingology/css/animations.css" />
        <link
          rel="preload"
          as="image"
          href="/lingology/img/photo-hero-480.webp"
          imageSrcSet="/lingology/img/photo-hero-480.webp 480w, /lingology/img/photo-hero-560.webp 560w, /lingology/img/photo-hero-840.webp 840w"
          imageSizes="(max-width: 600px) 90vw, 560px"
        />
      </head>
      <body className="min-h-full">
        {children}
        <Script src="/lingology/js/theme.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
