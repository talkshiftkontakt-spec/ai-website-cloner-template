"use client";

interface LinearPageProps {
  html: string;
  scripts: string[];
}

export function LinearPage({ html, scripts }: LinearPageProps) {
  return (
    <div className="linear-root">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {scripts.map((src) => (
        <script key={src} src={src} type="module" defer />
      ))}
    </div>
  );
}
