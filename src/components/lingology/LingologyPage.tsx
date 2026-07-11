"use client";

interface LingologyPageProps {
  html: string;
}

export function LingologyPage({ html }: LingologyPageProps) {
  return (
    <div className="lingology-root">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
