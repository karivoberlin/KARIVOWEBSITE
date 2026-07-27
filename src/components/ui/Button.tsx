"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import type { MouseEvent, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  icon?: boolean;
  className?: string;
}

const MAGNETIC_PULL = 0.28;
const MAGNETIC_MAX = 10;

export default function Button({ children, href, variant = "primary", icon = true, className = "" }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relX * MAGNETIC_PULL)));
    y.set(Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relY * MAGNETIC_PULL)));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[0.9rem] font-medium tracking-[-0.01em] transition-all duration-300 ease-out";

  const styles =
    variant === "primary"
      ? "bg-ink text-bg shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-[#2a2a2a] hover:shadow-[0_14px_30px_-10px_rgba(0,0,0,0.35)]"
      : "bg-transparent text-ink border border-black/10 hover:border-black/20 hover:bg-black/[0.02] hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.14)]";

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`${base} ${styles} ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <span>{children}</span>
      {icon && (
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45 ${
            variant === "primary" ? "bg-white/15" : "bg-black/[0.05]"
          }`}
        >
          <HiArrowUpRight className="h-3.5 w-3.5" />
        </span>
      )}
    </motion.a>
  );
}
