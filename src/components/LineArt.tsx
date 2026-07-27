const STROKE = "rgba(0,0,0,0.065)";

const shared = {
  fill: "none",
  stroke: STROKE,
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

/**
 * Hand-drawn, not generated — every arc is a one-off bezier or off-center
 * circular arc, never a repeating unit. That asymmetry is what keeps this
 * from reading as "a grid" or "a pattern" the eye can lock onto.
 */
export function TopRightLines() {
  return (
    <div className="animate-lines-drift-a absolute -right-[8%] -top-[12%] h-[54vw] max-h-[640px] w-[54vw] max-w-[640px]">
      <svg viewBox="0 0 640 640" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
        <path d="M -40 380 C 120 180 380 60 660 160" {...shared} />
        <path
          d="M 520 -20 A 300 300 0 0 1 660 420"
          {...shared}
          className="animate-line-flow-slow"
          strokeDasharray="4 56"
        />
        <path d="M 440 40 A 220 235 0 0 1 620 340" {...shared} />
        <path
          d="M 60 520 C 180 420 260 560 380 480 C 460 430 500 500 560 460"
          {...shared}
          className="animate-line-flow-slower"
          strokeDasharray="3 42"
        />
        <path d="M 260 -20 Q 420 40 500 160" {...shared} />
        <path d="M 40 100 C 220 -20 480 20 620 260" {...shared} />
        <path d="M 340 -40 A 180 190 0 0 1 480 140" {...shared} />
        <path d="M 200 600 C 300 540 340 620 440 560" {...shared} />
      </svg>
    </div>
  );
}

export function BottomLeftLines() {
  return (
    <div className="animate-lines-drift-b absolute -bottom-[14%] -left-[10%] h-[54vw] max-h-[640px] w-[54vw] max-w-[640px]">
      <svg viewBox="0 0 640 640" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 680 260 C 480 420 220 480 -40 380" {...shared} />
        <path
          d="M 120 660 A 300 280 0 0 1 -20 300"
          {...shared}
          className="animate-line-flow-slow"
          strokeDasharray="4 56"
        />
        <path d="M 200 600 A 220 210 0 0 1 60 260" {...shared} />
        <path
          d="M 560 120 C 460 200 500 260 400 240 C 320 225 300 300 220 260"
          {...shared}
          className="animate-line-flow-slower"
          strokeDasharray="3 42"
        />
        <path d="M 380 660 Q 260 560 220 460" {...shared} />
        <path d="M 600 40 C 420 -40 220 20 60 200" {...shared} />
        <path d="M 300 700 A 180 190 0 0 1 160 560" {...shared} />
        <path d="M 440 40 C 340 100 300 20 200 80" {...shared} />
      </svg>
    </div>
  );
}
