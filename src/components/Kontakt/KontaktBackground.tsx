/**
 * The quietest background on the page, on purpose — this is the section
 * where the visitor is about to fill in a form. One soft light field, a few
 * long straight lines fading into nothing. Nothing to look at, just light.
 */
export default function KontaktBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -left-[10%] top-[-6%] h-[40vw] max-h-[460px] w-[40vw] max-w-[460px] rounded-full opacity-45 blur-[120px]"
        style={{ background: "radial-gradient(circle, #ffffff 0%, #f3f3f0 55%, transparent 82%)" }}
      />
      <svg className="animate-lines-drift-a absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="none">
        <line x1="0%" y1="18%" x2="46%" y2="0%" stroke="rgba(0,0,0,0.055)" strokeWidth="1" />
        <line x1="100%" y1="70%" x2="58%" y2="100%" stroke="rgba(0,0,0,0.055)" strokeWidth="1" />
        <line x1="0%" y1="40%" x2="22%" y2="30%" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
      </svg>
    </div>
  );
}
