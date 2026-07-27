"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { BottomLeftLines, TopRightLines } from "@/components/LineArt";

/**
 * Hero's own backdrop — large elegant arcs and two soft fields. Scoped to
 * this section only, so it doesn't repeat behind everything else on the page.
 */
export default function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 35, damping: 20, mass: 1 });
  const springY = useSpring(my, { stiffness: 35, damping: 20, mass: 1 });

  useEffect(() => {
    if (reduceMotion) return;
    function onMove(e: MouseEvent) {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const farX = useTransform(springX, (v) => v * 6);
  const farY = useTransform(springY, (v) => v * 4);
  const nearX = useTransform(springX, (v) => v * 14);
  const nearY = useTransform(springY, (v) => v * 10);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-[-4%]" style={{ x: farX, y: farY }}>
        <div
          className="animate-blob-1 absolute -left-[18%] top-[-18%] h-[62vw] max-h-[740px] w-[62vw] max-w-[740px] rounded-full opacity-60 blur-[110px]"
          style={{ background: "radial-gradient(circle, #ffffff 0%, #f5f5f5 45%, #efefef 70%, transparent 88%)" }}
        />
        <div
          className="animate-blob-3 absolute bottom-[-22%] left-[16%] h-[40vw] max-h-[500px] w-[40vw] max-w-[500px] rounded-full opacity-45 blur-[100px]"
          style={{ background: "radial-gradient(circle, #f5f5f5 0%, #efefef 50%, transparent 82%)" }}
        />
        <BottomLeftLines />
      </motion.div>

      <motion.div className="absolute inset-[-4%]" style={{ x: nearX, y: nearY }}>
        <div
          className="animate-blob-2 absolute -right-[12%] top-[0%] h-[46vw] max-h-[580px] w-[46vw] max-w-[580px] rounded-full opacity-55 blur-[100px]"
          style={{ background: "radial-gradient(circle, #ffffff 0%, #efefef 50%, transparent 84%)" }}
        />
        <div
          className="animate-blob-4 absolute bottom-[8%] right-[20%] h-[26vw] max-h-[340px] w-[26vw] max-w-[340px] rounded-full opacity-35 blur-[80px]"
          style={{ background: "radial-gradient(circle, #ffffff 0%, #f0f0ed 55%, transparent 80%)" }}
        />
        <TopRightLines />
      </motion.div>
    </div>
  );
}
