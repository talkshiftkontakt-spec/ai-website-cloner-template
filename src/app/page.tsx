import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { LekcjeRazemPage } from "@/components/lekcjerazem/LekcjeRazemPage";

export default async function Home() {
  const html = await readFile(
    join(process.cwd(), "public/lekcjerazem/content.html"),
    "utf8",
  );

  return <LekcjeRazemPage html={html} />;
}
