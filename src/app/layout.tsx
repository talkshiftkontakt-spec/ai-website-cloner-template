import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

interface LinearManifest {
  title: string;
  description: string;
}

async function getManifest(): Promise<LinearManifest> {
  const raw = await readFile(
    join(process.cwd(), "public/linear/manifest.json"),
    "utf8",
  );
  return JSON.parse(raw) as LinearManifest;
}

export async function generateMetadata(): Promise<Metadata> {
  const manifest = await getManifest();
  return {
    metadataBase: new URL("https://linear.app"),
    title: manifest.title,
    description: manifest.description,
    openGraph: {
      type: "website",
      siteName: "Linear",
      title: manifest.title,
      description: manifest.description,
      url: "https://linear.app/",
    },
    twitter: {
      card: "summary_large_image",
      title: manifest.title,
      description: manifest.description,
    },
    icons: {
      icon: "https://linear.app/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
