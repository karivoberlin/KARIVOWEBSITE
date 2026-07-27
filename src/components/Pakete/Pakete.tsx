"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import PaketeBackground from "./PaketeBackground";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Pakete() {
  const { t } = useLanguage();
  const PLANS = t.pakete.plans;

  return (
    <section id="pakete" className="relative py-28 sm:py-36">
      <PaketeBackground />
      <div className="container-px relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">{t.pakete.eyebrow}</p>
            <h2 className="mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[3rem] lg:text-[3.25rem]">
              {t.pakete.titleLines[0]}
              <br />
              {t.pakete.titleLines[1]}
            </h2>
            <p className="mt-6 text-[1.05rem] leading-[1.6] text-muted">{t.pakete.text}</p>
          </div>
          <p className="max-w-[220px] text-sm leading-[1.6] text-muted">
            <span className="font-medium text-ink">{t.pakete.note.bold}</span> {t.pakete.note.text}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-3 lg:items-center">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className={`group relative flex flex-col rounded-[2rem] border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${
                plan.popular
                  ? "z-10 border-black/[0.08] bg-white p-11 shadow-[0_44px_90px_-35px_rgba(0,0,0,0.18)] lg:-my-4 lg:p-14 lg:shadow-[0_50px_100px_-35px_rgba(0,0,0,0.2)]"
                  : "border-black/[0.05] bg-white p-9 hover:border-black/[0.09] hover:shadow-[0_26px_50px_-28px_rgba(0,0,0,0.1)] lg:p-10"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-11 rounded-full bg-ink px-3 py-1 text-[0.68rem] font-medium tracking-wide text-bg lg:left-14">
                  {t.pakete.recommended}
                </span>
              )}

              <h3 className={`font-semibold tracking-tight text-ink ${plan.popular ? "text-[1.4rem]" : "text-[1.2rem]"}`}>
                {plan.name}
              </h3>
              <p
                className={`mt-2 font-semibold tracking-tight text-ink ${
                  plan.popular ? "text-[2.4rem] lg:text-[2.6rem]" : "text-[1.7rem]"
                }`}
              >
                {plan.price}
              </p>
              <p className={`mt-3 leading-[1.6] text-muted ${plan.popular ? "text-[1rem]" : "text-[0.9rem]"}`}>
                {plan.text}
              </p>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-center gap-2.5 text-ink/80 ${plan.popular ? "text-[0.95rem]" : "text-[0.88rem]"}`}
                  >
                    <span className="h-1 w-1 rounded-full bg-black/30" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href="#kontakt"
                variant={plan.popular ? "primary" : "secondary"}
                icon={false}
                className="mt-9 w-full justify-center transition-transform duration-300 group-hover:scale-[1.02]"
              >
                {t.pakete.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
