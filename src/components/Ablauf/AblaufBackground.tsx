const STROKE = "rgba(0,0,0,0.075)";
const STROKE_SOFT = "rgba(0,0,0,0.05)";

/**
 * Straight lines and right angles — a blueprint reference mark, not an arc.
 * The contrast with Hero's organic bows is the point: this section should
 * feel measured and technical, matching a "process" section.
 */
export default function AblaufBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="animate-lines-drift-a absolute -left-6 top-10 h-56 w-56 opacity-90 sm:h-64 sm:w-64"
        viewBox="0 0 220 220"
        fill="none"
      >
        <line x1="0" y1="46" x2="180" y2="46" stroke={STROKE} strokeWidth="1" />
        <line x1="46" y1="0" x2="46" y2="180" stroke={STROKE} strokeWidth="1" />
        {[20, 46, 72, 98, 124, 150].map((x) => (
          <line key={x} x1={x} y1="40" x2={x} y2="52" stroke={STROKE} strokeWidth="1" />
        ))}
        {[16, 46, 76, 106, 136, 166].map((y) => (
          <line key={y} x1="40" y1={y} x2="52" y2={y} stroke={STROKE} strokeWidth="1" />
        ))}
        <circle cx="46" cy="46" r="4" stroke={STROKE} strokeWidth="1" />
        <line x1="46" y1="46" x2="200" y2="46" stroke={STROKE_SOFT} strokeWidth="1" strokeDasharray="1 6" />
        <line x1="46" y1="46" x2="46" y2="200" stroke={STROKE_SOFT} strokeWidth="1" strokeDasharray="1 6" />
      </svg>

      <svg
        className="animate-lines-drift-b absolute -right-10 bottom-0 h-72 w-72 opacity-90 sm:h-80 sm:w-80"
        viewBox="0 0 280 280"
        fill="none"
      >
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={i}
            x1={20 + i * 34}
            y1="280"
            x2={20 + i * 34 + 90}
            y2="190"
            stroke={i % 2 === 0 ? STROKE : STROKE_SOFT}
            strokeWidth="1"
          />
        ))}
        <line x1="0" y1="190" x2="280" y2="190" stroke={STROKE} strokeWidth="1" />
        <line x1="0" y1="130" x2="280" y2="130" stroke={STROKE_SOFT} strokeWidth="1" strokeDasharray="1 8" />
      </svg>

      <svg className="absolute right-[8%] top-[6%] h-24 w-24 opacity-80" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="34" stroke={STROKE_SOFT} strokeWidth="1" />
        <circle cx="50" cy="50" r="46" stroke={STROKE_SOFT} strokeWidth="1" strokeDasharray="1 7" />
        <line x1="50" y1="0" x2="50" y2="16" stroke={STROKE} strokeWidth="1" />
        <line x1="50" y1="84" x2="50" y2="100" stroke={STROKE} strokeWidth="1" />
      </svg>
    </div>
  );
}
