type CrossedOutOverlayProps = {
  columns?: number;
  rows?: number;
};

export function CrossedOutOverlay({ columns = 5, rows = 4 }: CrossedOutOverlayProps) {
  const marks = Array.from({ length: columns * rows }, (_, index) => index);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-canvas/50" />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-destructive opacity-90"
        preserveAspectRatio="none"
      >
        <line x1="4" y1="4" x2="96" y2="96" stroke="currentColor" strokeWidth="6" />
        <line x1="96" y1="4" x2="4" y2="96" stroke="currentColor" strokeWidth="6" />
        <line x1="4" y1="50" x2="96" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.35" />
        <line x1="50" y1="4" x2="50" y2="96" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      </svg>

      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {marks.map((mark) => (
          <div key={mark} className="flex items-center justify-center">
            <span className="font-[family-name:var(--font-display)] text-2xl font-black leading-none text-destructive/75 sm:text-3xl md:text-4xl lg:text-5xl">
              X
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
