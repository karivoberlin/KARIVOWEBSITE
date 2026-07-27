"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiPlus } from "react-icons/hi2";
import FAQBackground from "./FAQBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

const QUESTIONS = [
  {
    q: "Kann man Website und Care kombinieren?",
    a: "Ja. Das ist sogar der empfohlene Weg: einmaliger Aufbau + monatliche Betreuung.",
  },
  {
    q: "Kann ich auch ohne Care buchen?",
    a: "Ja. Care ist optional, aber sinnvoll, wenn Inhalte regelmäßig aktuell bleiben sollen.",
  },
  {
    q: "Für wen ist Premium am besten?",
    a: "Premium passt meistens am besten, weil genug Platz für Vertrauen, Bilder, Leistungen und Kontaktwege da ist.",
  },
  {
    q: "Was ist, wenn ich noch keine guten Bilder habe?",
    a: "Dann kann die Seite erstmal mit sauberem Aufbau, passenden Platzhaltern und später mit echten Bildern erweitert werden.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-28 sm:py-36">
      <FAQBackground />
      <div className="container-px relative z-10 grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">FAQ</p>
          <h2 className="mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[3rem]">
            Wichtige Fragen
            <br />
            vor der Anfrage.
          </h2>
          <p className="mt-6 max-w-sm text-[1.05rem] leading-[1.6] text-muted">
            Am schnellsten geht es, wenn du direkt fragst — aber die häufigsten Punkte klären wir hier schon vorab.
          </p>
        </motion.div>

        <div className="border-t border-black/[0.06]">
          {QUESTIONS.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            >
              <FAQItem question={item.q} answer={item.a} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/[0.06]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between gap-8 py-8 text-left sm:py-10"
        aria-expanded={open}
      >
        <span
          className={`text-[1.4rem] font-semibold tracking-tight transition-colors duration-300 sm:text-[1.75rem] ${
            open ? "text-ink" : "text-ink/70 group-hover:text-ink"
          }`}
        >
          {question}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            open ? "border-transparent bg-ink text-bg" : "border-black/[0.1] text-ink/60 group-hover:border-black/25"
          }`}
        >
          <HiPlus className={`h-4 w-4 transition-transform duration-500 ${open ? "rotate-45" : ""}`} />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`max-w-xl pb-9 text-[1.05rem] leading-[1.65] text-muted transition-opacity duration-300 ${
              open ? "opacity-100 delay-150" : "opacity-0"
            }`}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
