export function CrossedOutOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-canvas/50" />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-destructive opacity-90"
        preserveAspectRatio="none"
      >
        <line x1="8" y1="8" x2="92" y2="92" stroke="currentColor" strokeWidth="8" />
        <line x1="92" y1="8" x2="8" y2="92" stroke="currentColor" strokeWidth="8" />
      </svg>
    </div>
  );
}
