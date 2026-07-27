const STROKE = "rgba(0,0,0,0.05)";

/**
 * Still restrained — this section's brief is whitespace — but a couple of
 * long, quiet strokes now drift through it instead of leaving it fully bare.
 */
export default function PaketeBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute right-[-10%] top-[10%] h-[36vw] max-h-[420px] w-[36vw] max-w-[420px] rounded-full opacity-40 blur-[110px]"
        style={{ background: "radial-gradient(circle, #ffffff 0%, #f2f2ef 55%, transparent 82%)" }}
      />
      <svg className="animate-lines-drift-a absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="none">
        <line x1="-2%" y1="8%" x2="60%" y2="-4%" stroke={STROKE} strokeWidth="1" />
        <line x1="40%" y1="104%" x2="102%" y2="86%" stroke={STROKE} strokeWidth="1" />
      </svg>
    </div>
  );
}
