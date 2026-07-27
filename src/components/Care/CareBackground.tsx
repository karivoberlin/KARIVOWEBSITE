const STROKE = "rgba(0,0,0,0.06)";

/**
 * Organic, not circular — irregular blob silhouettes instead of Hero's
 * perfect radial fields, plus a couple of soft flowing strokes and one glass
 * panel. "Care" should feel soft and looked-after, not technical.
 */
export default function CareBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="animate-blob-3 absolute -left-[8%] top-[4%] h-[46vw] max-h-[540px] w-[46vw] max-w-[540px] opacity-[0.55] blur-[70px]"
        viewBox="0 0 400 400"
      >
        <path
          d="M120 40 C220 10 340 60 370 150 C400 240 340 320 240 360 C140 400 30 360 20 260 C10 160 30 70 120 40Z"
          fill="#f1f0eb"
        />
      </svg>
      <svg
        className="animate-blob-4 absolute -right-[10%] bottom-[-6%] h-[38vw] max-h-[440px] w-[38vw] max-w-[440px] opacity-50 blur-[70px]"
        viewBox="0 0 400 400"
      >
        <path
          d="M150 30 C260 20 380 90 370 190 C360 290 270 380 160 370 C60 360 -10 270 20 170 C45 90 60 40 150 30Z"
          fill="#eceae3"
        />
      </svg>

      <svg
        className="animate-lines-drift-a absolute inset-0 h-full w-full overflow-visible opacity-90"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
      >
        <path
          d="M -20 120 C 160 60 260 180 420 130 S 640 40 820 100"
          fill="none"
          stroke={STROKE}
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M -20 480 C 140 520 260 430 420 470 S 660 550 820 490"
          fill="none"
          stroke={STROKE}
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="absolute right-[6%] top-[14%] h-64 w-48 rounded-[2rem] border border-black/[0.05] bg-white/40 backdrop-blur-md sm:h-72 sm:w-56" />
    </div>
  );
}
