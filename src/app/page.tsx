import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { LinearPage } from "@/components/linear/LinearPage";

interface LinearManifest {
  cssUrls: string[];
  scripts?: string[];
  title: string;
  description: string;
}

export default async function Home() {
  const [html, manifestRaw] = await Promise.all([
    readFile(join(process.cwd(), "public/linear/content.html"), "utf8"),
    readFile(join(process.cwd(), "public/linear/manifest.json"), "utf8"),
  ]);

  const manifest = JSON.parse(manifestRaw) as LinearManifest;
  const scriptMatch = html.match(
    /<script[^>]+src="(https:\/\/static\.linear\.app[^"]+)"[^>]*><\/script>/,
  );
  const scripts = manifest.scripts ?? (scriptMatch ? [scriptMatch[1]] : []);

  const htmlWithoutScripts = html.replace(
    /<script[^>]+src="https:\/\/static\.linear\.app[^"]+"[^>]*><\/script>/g,
    "",
  );

  return <LinearPage html={htmlWithoutScripts} scripts={scripts} />;
}
