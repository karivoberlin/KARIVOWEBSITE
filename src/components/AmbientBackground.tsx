"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * The only thing shared by every section: a hair of atmosphere, a cursor-lit
 * warmth, a vignette, grain. Everything with an actual silhouette — arcs,
 * blobs, glass — now lives locally inside each section, so no two sections
 * share the same backdrop as you scroll past them.
 */
export default function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spotX = useSpring(px, { stiffness: 50, damping: 26, mass: 1 });
  const spotY = useSpring(py, { stiffness: 50, damping: 26, mass: 1 });
  const [spotVisible, setSpotVisible] = useState(false);

  useEffect(() => {
    px.set(window.innerWidth / 2);
    py.set(window.innerHeight * 0.35);

    if (reduceMotion) return;
    function onMove(e: MouseEvent) {
      px.set(e.clientX);
      py.set(e.clientY);
      setSpotVisible(true);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
      {/* Vertical atmosphere — a hair brighter up top, gone by mid-page */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 38%)" }}
      />

      {/* Cursor reaction — felt as a faint warmth, not a visible spotlight.
          Hidden on touch devices via CSS: there's no cursor to react to, and
          it's otherwise a permanently-mounted blurred layer costing GPU time
          for nothing. */}
      <motion.div
        className="ambient-spotlight absolute h-[820px] w-[820px] rounded-full blur-[160px]"
        style={{
          left: spotX,
          top: spotY,
          x: "-50%",
          y: "-50%",
          opacity: reduceMotion ? 0 : spotVisible ? 0.14 : 0,
          background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          transition: "opacity 0.8s ease-out",
        }}
      />

      {/* Soft vignette — the far edges read a shade quieter, so the middle feels lit */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 65% at 50% 30%, transparent 55%, rgba(0,0,0,0.025) 100%)" }}
      />

      {/* Grain to kill banding — the only texture allowed to cover the whole frame */}
      <div className="grain absolute inset-0 opacity-[0.02] mix-blend-multiply" />
    </div>
  );
}
