"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineArrowDown } from "react-icons/hi2";
import Button from "@/components/ui/Button";
import BrowserStack from "./BrowserStack";
import HeroBackground from "./HeroBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

const reveal = (delay: number, reduceMotion: boolean | null) => ({
  initial: { opacity: 0, y: reduceMotion ? 0 : 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: reduceMotion ? 0 : delay, ease: EASE },
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-x-clip pt-28"
    >
      <HeroBackground />
      <div className="container-px relative z-10 grid w-full items-center gap-16 py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8">
        <div>
          <h1 className="max-w-xl text-[3.1rem] font-semibold leading-[1.02] tracking-[-0.02em] text-ink sm:text-[3.6rem] lg:text-[3.35rem] xl:text-[3.75rem]">
            <motion.span {...reveal(0.2, reduceMotion)} className="block overflow-hidden">
              Websites,
            </motion.span>
            <motion.span {...reveal(0.32, reduceMotion)} className="block overflow-hidden">
              die Kunden
            </motion.span>
            <motion.span {...reveal(0.44, reduceMotion)} className="block overflow-hidden">
              gewinnen.
            </motion.span>
          </h1>

          <motion.p {...reveal(0.58, reduceMotion)} className="mt-7 max-w-md text-[1.05rem] leading-[1.6] text-muted">
            Wir erstellen moderne und verkaufsstarke Websites für Unternehmen, die mehr erreichen wollen.
          </motion.p>

          <motion.div {...reveal(0.7, reduceMotion)} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#kontakt">Projekt starten</Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: reduceMotion ? 0 : 0.35, ease: EASE }}
        >
          <BrowserStack scrollTargetRef={sectionRef} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduceMotion ? 0 : 1.1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-muted sm:flex"
      >
        Scrollen
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiOutlineArrowDown />
        </motion.span>
      </motion.div>
    </section>
  );
}
