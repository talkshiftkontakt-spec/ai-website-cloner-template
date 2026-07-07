import { Hanken_Grotesk, Syne } from "next/font/google";

export const fontDisplay = Syne({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
