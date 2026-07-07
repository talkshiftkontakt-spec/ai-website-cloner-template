import type { Metadata } from "next";

import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import { siteMetadata, metadataBase } from "@/lib/metadata";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import {
  faqSchema,
  organizationSchema,
  professionalServiceSchema,
} from "@/lib/schema";
import { FAQ_ITEMS } from "@/lib/constants/faq";
import "./globals.css";

export const metadata: Metadata = {
  ...siteMetadata,
  metadataBase,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} h-full`}
    >
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={professionalServiceSchema()} />
        <JsonLd data={faqSchema(FAQ_ITEMS)} />
      </head>
      <body className="min-h-full bg-canvas font-sans text-primary antialiased">
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
