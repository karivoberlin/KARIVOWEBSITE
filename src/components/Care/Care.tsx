"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import CareBackground from "./CareBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

const PLANS = [
  {
    name: "Care",
    price: "19 €/Monat",
    text: "Für gelegentliche kleine Änderungen.",
    features: ["1 kleine Änderung pro Monat", "Texte / Öffnungszeiten", "Basis-Pflege"],
    highlight: false,
  },
  {
    name: "Care+",
    price: "39 €/Monat",
    text: "Der beste Standard für die meisten lokalen Unternehmen.",
    features: ["Bis zu 3 kleine Änderungen", "Bilder / Texte / Angebote", "Priorisierte Bearbeitung"],
    highlight: true,
  },
  {
    name: "Care Pro",
    price: "69 €/Monat",
    text: "Für Unternehmen, die dauerhaft aktiv und aktuell wirken wollen.",
    features: ["Bis zu 6 Änderungen", "Aktionen / neue Bereiche", "Monatscheck"],
    highlight: false,
  },
];

export default function Care() {
  return (
    <section id="care" className="relative py-28 sm:py-36">
      <CareBackground />
      <div className="container-px relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Karivo Care</p>
          <h2 className="mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[3rem] lg:text-[3.25rem]">
            Nach dem Launch bleibt
            <br />
            deine Website gepflegt.
          </h2>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.6] text-muted">
            Das Website-Paket ist einmalig. Das Care-Paket ist die monatliche Betreuung danach.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-5 sm:mt-14"
        >
          <div className="rounded-2xl border border-black/[0.06] bg-white px-6 py-4">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted">Einmalig</p>
            <p className="mt-1 text-[1.05rem] font-semibold text-ink">Website-Paket</p>
            <p className="mt-0.5 text-sm text-muted">Starter, Premium oder Business</p>
          </div>
          <span className="text-xl text-black/25">+</span>
          <div className="rounded-2xl border border-black/[0.06] bg-white px-6 py-4">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted">Monatlich</p>
            <p className="mt-1 text-[1.05rem] font-semibold text-ink">Care-Paket</p>
            <p className="mt-0.5 text-sm text-muted">Care, Care+ oder Care Pro</p>
          </div>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className={`group relative flex flex-col rounded-[2rem] border p-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${
                plan.highlight
                  ? "border-black/[0.08] bg-white shadow-[0_36px_70px_-30px_rgba(0,0,0,0.14)] lg:-translate-y-3"
                  : "border-black/[0.05] bg-white hover:border-black/[0.09] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.1)]"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-10 rounded-full bg-ink px-3 py-1 text-[0.68rem] font-medium tracking-wide text-bg">
                  Empfohlen
                </span>
              )}

              <h3 className="text-[1.3rem] font-semibold tracking-tight text-ink">{plan.name}</h3>
              <p className="mt-2 text-[1.9rem] font-semibold tracking-tight text-ink">{plan.price}</p>
              <p className="mt-3 text-[0.95rem] leading-[1.6] text-muted">{plan.text}</p>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[0.9rem] text-ink/80">
                    <span className="h-1 w-1 rounded-full bg-black/30" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href="#kontakt"
                variant={plan.highlight ? "primary" : "secondary"}
                icon={false}
                className="mt-9 w-full justify-center"
              >
                Care anfragen
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-8 flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-black/[0.06] bg-white px-8 py-8 sm:mt-10 sm:flex-row sm:items-center sm:px-10"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Beliebte Kombination</p>
            <p className="mt-2 text-[1.2rem] font-semibold tracking-tight text-ink">Premium Website + Care+</p>
            <p className="mt-1 text-[0.95rem] text-muted">
              Einmalig 599 € für die Website und 39 €/Monat für laufende Pflege.
            </p>
          </div>
          <Button href="#kontakt" icon={false} className="shrink-0">
            Diese Kombination anfragen
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
