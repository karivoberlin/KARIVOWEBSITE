"use client";

import { useRef } from "react";
import type { PointerEvent, RefObject } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import BrowserWindow from "./BrowserWindow";

interface BrowserStackProps {
  scrollTargetRef: RefObject<HTMLElement | null>;
}

type CardId = "restaurant" | "fahrschule" | "fitness";

const HOVER_SPRING = { stiffness: 200, damping: 24, mass: 0.5 };

export default function BrowserStack({ scrollTargetRef }: BrowserStackProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(pointerY, { stiffness: 120, damping: 20, mass: 0.6 });
  const tiltY = useSpring(pointerX, { stiffness: 120, damping: 20, mass: 0.6 });

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    // Touch/pen drags shouldn't drive the 3D tilt — there's no hover intent
    // behind a finger crossing the cards while scrolling.
    if (e.pointerType !== "mouse") return;
    const rect = zoneRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    pointerX.set(Math.max(-1, Math.min(1, relX)));
    pointerY.set(Math.max(-1, Math.min(1, relY)));
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  // -1 (another card is focused, recede a touch) · 0 (resting) · 1 (this card is hovered, step forward)
  const restaurantFocusRaw = useMotionValue(0);
  const fahrschuleFocusRaw = useMotionValue(0);
  const fitnessFocusRaw = useMotionValue(0);
  const restaurantFocus = useSpring(restaurantFocusRaw, HOVER_SPRING);
  const fahrschuleFocus = useSpring(fahrschuleFocusRaw, HOVER_SPRING);
  const fitnessFocus = useSpring(fitnessFocusRaw, HOVER_SPRING);

  function focusCard(card: CardId) {
    restaurantFocusRaw.set(card === "restaurant" ? 1 : -0.4);
    fahrschuleFocusRaw.set(card === "fahrschule" ? 1 : -0.4);
    fitnessFocusRaw.set(card === "fitness" ? 1 : -0.4);
  }

  function resetFocus() {
    restaurantFocusRaw.set(0);
    fahrschuleFocusRaw.set(0);
    fitnessFocusRaw.set(0);
  }

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start start", "end start"],
  });

  // The focus card recedes slightly as the visitor scrolls past the hero...
  const frontScrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const frontOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const frontScale = useTransform([frontScrollScale, restaurantFocus], ([s, f]: number[]) => s + f * 0.08);
  const frontBlur = useTransform(restaurantFocus, (f) => (f < 0 ? Math.abs(f) * 2.5 : 0));
  const frontFilter = useTransform(frontBlur, (v) => `blur(${v}px)`);
  // On hover, whichever card is focused jumps to the same absolute depth (120) —
  // guaranteed to beat the other two's resting z, so it visually steps in front
  // of all of them, including the default-front restaurant card.
  const frontZ = useTransform(restaurantFocus, (f) => (f > 0 ? 40 + f * 80 : 40 + f * 20));

  // ...while the Fahrschule layer advances toward it, taking its place.
  const midX = useTransform(scrollYProgress, [0, 1], ["-8%", "4%"]);
  const midScrollScale = useTransform(scrollYProgress, [0, 1], [0.86, 0.98]);
  const midRotate = useTransform(scrollYProgress, [0, 1], [-7, -1]);
  const midScrollBlur = useTransform(scrollYProgress, [0, 1], [1.5, 0]);
  const midScale = useTransform([midScrollScale, fahrschuleFocus], ([s, f]: number[]) => s + f * 0.08);
  const midBlur = useTransform([midScrollBlur, fahrschuleFocus], ([b, f]: number[]) =>
    f > 0 ? 0 : b + Math.abs(Math.min(f, 0)) * 2.5
  );
  const midFilter = useTransform(midBlur, (v) => `blur(${v}px)`);
  const midZ = useTransform(fahrschuleFocus, (f) => (f > 0 ? -30 + f * 150 : -30 + f * 20));

  // The rearmost layer stays put — depth, not a second act. It does need to
  // come up to full opacity on hover though, or "in front" would look "faded".
  const backScrollOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.4]);
  const backOpacity = useTransform([backScrollOpacity, fitnessFocus], ([b, f]: number[]) =>
    f > 0 ? Math.max(b, 0.7 + f * 0.3) : b
  );
  const backScale = useTransform(fitnessFocus, (f) => 1 + f * 0.08);
  const backBlur = useTransform(fitnessFocus, (f) => (f > 0 ? 0 : 1 + Math.abs(Math.min(f, 0)) * 2.5));
  const backFilter = useTransform(backBlur, (v) => `blur(${v}px)`);
  const backZ = useTransform(fitnessFocus, (f) => (f > 0 ? -80 + f * 200 : -80 + f * 20));

  return (
    <div
      ref={zoneRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto h-[420px] w-full max-w-[620px] sm:h-[480px] lg:mx-0 lg:h-[560px]"
      style={{ perspective: 1800 }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{
          rotateX: useTransform(tiltX, (v) => v * -6),
          rotateY: useTransform(tiltY, (v) => v * 8),
          transformStyle: "preserve-3d",
        }}
      >
        {/* Back layer — Fitnessstudio. Anchored to the right edge, mostly cropped off. */}
        <motion.div
          className="absolute right-[-24%] top-[3%] h-[78%] w-[64%] origin-bottom-right cursor-pointer drop-shadow-[0_20px_45px_rgba(0,0,0,0.22)]"
          style={{ opacity: backOpacity, rotate: 8, scale: backScale, filter: backFilter, translateZ: backZ }}
          onMouseEnter={() => focusCard("fitness")}
          onMouseLeave={resetFocus}
        >
          <motion.div
            className="h-full w-full"
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <BrowserWindow variant="fitness" url="momentum-fitness.de" scale="lg" />
          </motion.div>
        </motion.div>

        {/* Mid layer — Fahrschule. Anchored to the left edge, cropped, and the one that advances on scroll. */}
        <motion.div
          className="absolute left-[-18%] top-[3%] h-[78%] w-[64%] origin-bottom-left cursor-pointer"
          style={{ x: midX, scale: midScale, rotate: midRotate, filter: midFilter, translateZ: midZ }}
          onMouseEnter={() => focusCard("fahrschule")}
          onMouseLeave={resetFocus}
        >
          <motion.div
            className="h-full w-full shadow-[0_30px_60px_-25px_rgba(0,0,0,0.28)]"
            animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <BrowserWindow variant="fahrschule" url="drive-academy.de" scale="lg" />
          </motion.div>
        </motion.div>

        {/* Front layer — the one project in focus by default. */}
        <motion.div
          className="absolute inset-x-[18%] top-[3%] h-[78%] w-[64%] origin-bottom cursor-pointer"
          style={{ scale: frontScale, y: frontY, opacity: frontOpacity, filter: frontFilter, translateZ: frontZ }}
          onMouseEnter={() => focusCard("restaurant")}
          onMouseLeave={resetFocus}
        >
          <motion.div
            className="h-full w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.14)]"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
          >
            <BrowserWindow variant="restaurant" url="locanda-berlin.de" scale="lg" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
