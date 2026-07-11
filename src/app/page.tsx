import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { LingologyPage } from "@/components/lingology/LingologyPage";

export default async function Home() {
  const html = await readFile(
    join(process.cwd(), "public/lingology/content.html"),
    "utf8",
  );

  return <LingologyPage html={html} />;
}
