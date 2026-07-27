"use client";

import { useRef } from "react";
import type { MotionValue } from "framer-motion";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import AblaufBackground from "./AblaufBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { n: "01", title: "Kurz anfragen", text: "Du schickst Branche, Wunschpaket und grobe Vorstellungen." },
  {
    n: "02",
    title: "Struktur festlegen",
    text: "KARIVO plant Aufbau, Inhalte, Kontaktwege und den passenden Stil.",
  },
  { n: "03", title: "Premium-Auftritt bauen", text: "Design, Texte, Animationen und Technik werden sauber umgesetzt." },
  {
    n: "04",
    title: "Live gehen",
    text: "Die Website geht online und kann danach mit Care aktuell gehalten werden.",
  },
];

export default function Ablauf() {
  const sectionRef = useRef<HTMLElement>(null);
  // The line draws itself as the visitor scrolls through the section, and
  // whichever step the progress currently sits inside gets a brief lift —
  // a timeline you travel along, not four cards that all appear at once.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.8", "end 0.4"] });

  return (
    <section id="ablauf" ref={sectionRef} className="relative py-28 sm:py-36">
      <AblaufBackground />
      <div className="container-px relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Ablauf</p>
          <h2 className="mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[3rem] lg:text-[3.25rem]">
            Einfacher Prozess.
            <br />
            Hochwertiges Ergebnis.
          </h2>
        </motion.div>

        {/* Desktop — a single horizontal line the visitor travels along */}
        <div className="relative mt-24 hidden lg:block">
          <div className="absolute inset-x-0 top-6 h-px bg-black/[0.08]" />
          <motion.div
            className="absolute inset-x-0 top-6 h-px origin-left bg-ink"
            style={{ scaleX: scrollYProgress }}
          />
          <div className="grid grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <TimelineStep key={step.n} {...step} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* Mobile / tablet — a vertical rail, simple stagger, no scroll-linked math */}
        <div className="relative mt-16 lg:hidden">
          <div className="absolute left-6 top-1 bottom-1 w-px bg-black/[0.08]" />
          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="relative flex gap-6 pl-0"
              >
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/15 bg-bg text-sm font-semibold text-ink">
                  {step.n}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-[1.15rem] font-semibold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] leading-[1.6] text-muted">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({
  n,
  title,
  text,
  index,
  progress,
}: {
  n: string;
  title: string;
  text: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const start = index / STEPS.length;
  const end = start + 1 / STEPS.length;
  const activation = useTransform(progress, [start, end], [0, 1]);
  const nodeBg = useTransform(activation, [0, 1], ["rgba(255,255,255,0)", "#111111"]);
  const nodeBorder = useTransform(activation, [0, 1], ["rgba(0,0,0,0.15)", "rgba(0,0,0,0)"]);
  const nodeText = useTransform(activation, [0, 1], ["#6b7280", "#fafafa"]);
  // A brief lift while progress is actually passing through this step —
  // settles back down once it's fully "done".
  const lift = useTransform(activation, (v) => 1 + Math.sin(Math.min(Math.max(v, 0), 1) * Math.PI) * 0.16);
  const titleColor = useTransform(activation, [0, 0.15], ["#6b7280", "#111111"]);

  return (
    <div className="flex flex-col items-start">
      <motion.span
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold"
        style={
          reduceMotion
            ? { background: "#111111", color: "#fafafa", borderColor: "rgba(0,0,0,0)" }
            : { background: nodeBg, borderColor: nodeBorder, color: nodeText, scale: lift }
        }
      >
        {n}
      </motion.span>

      <motion.h3
        className="mt-6 text-[1.2rem] font-semibold tracking-tight"
        style={reduceMotion ? { color: "#111111" } : { color: titleColor }}
      >
        {title}
      </motion.h3>
      <p className="mt-2 max-w-[220px] text-[0.92rem] leading-[1.6] text-muted">{text}</p>
    </div>
  );
}
