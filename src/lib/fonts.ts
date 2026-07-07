import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

export const fontDisplay = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
