"use client";

import Script from "next/script";

interface LekcjeRazemPageProps {
  html: string;
}

export function LekcjeRazemPage({ html }: LekcjeRazemPageProps) {
  return (
    <div className="lekcjerazem-root">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/lekcjerazem/scripts.js" strategy="afterInteractive" />
    </div>
  );
}
