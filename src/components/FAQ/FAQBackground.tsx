const STROKE = "rgba(0,0,0,0.055)";

/**
 * A fine, regular dot grid plus a couple of precise geometric strokes —
 * small-scale and quiet, unlike Ablauf's larger technical lines or Hero's arcs.
 */
export default function FAQBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-y-0 right-0 w-full sm:w-2/3"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.065,
          maskImage: "radial-gradient(ellipse 60% 70% at 80% 40%, black 0%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 80% 40%, black 0%, transparent 72%)",
        }}
      />
      <svg
        className="animate-lines-drift-b absolute -right-8 top-[8%] h-64 w-64 opacity-90"
        viewBox="0 0 240 240"
        fill="none"
      >
        <line x1="0" y1="120" x2="240" y2="120" stroke={STROKE} strokeWidth="1" />
        <line x1="120" y1="0" x2="120" y2="240" stroke={STROKE} strokeWidth="1" />
        <line x1="0" y1="0" x2="240" y2="240" stroke={STROKE} strokeWidth="1" strokeDasharray="1 8" />
        <circle cx="120" cy="120" r="60" stroke={STROKE} strokeWidth="1" strokeDasharray="1 7" />
      </svg>
    </div>
  );
}
