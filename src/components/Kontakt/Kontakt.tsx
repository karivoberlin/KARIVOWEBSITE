"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineCheckCircle, HiOutlineExclamationCircle } from "react-icons/hi2";
import KontaktBackground from "./KontaktBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdaqywge";

const TRUST = [
  { n: "01", label: "Kostenlose Ersteinschätzung" },
  { n: "02", label: "Antwort innerhalb von 24 Stunden" },
  { n: "03", label: "Persönlicher Ansprechpartner" },
  { n: "04", label: "Keine Verpflichtung" },
];

const PAKET = ["Starter · 349 €", "Premium · 599 €", "Business · 899 €", "Noch unsicher"];
const CARE = ["Care · 19 €/Monat", "Care+ · 39 €/Monat", "Care Pro · 69 €/Monat", "Keine Betreuung", "Noch unsicher"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Kontakt() {
  return (
    <section id="kontakt" className="relative py-28 sm:py-36">
      <KontaktBackground />
      <div className="container-px relative z-10 grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Kontakt</p>
          <h2 className="mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[3rem]">
            Kostenlose
            <br />
            Ersteinschätzung sichern.
          </h2>
          <p className="mt-6 max-w-md text-[1.05rem] leading-[1.6] text-muted">
            Schick kurz ein paar Eckdaten zu deinem Unternehmen. Danach bekommst du eine klare Empfehlung, welches
            Paket wirklich Sinn macht.
          </p>

          <div className="mt-12 max-w-sm">
            {TRUST.map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
                className={`flex items-baseline gap-4 py-3.5 ${i > 0 ? "border-t border-black/[0.06]" : ""}`}
              >
                <span className="text-xs font-medium text-black/30">{item.n}</span>
                <span className="text-[0.98rem] font-medium text-ink/85">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  phone: string;
  branche: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", phone: "", branche: "", message: "" };

function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [paket, setPaket] = useState<string | null>(null);
  const [care, setCare] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<"name" | "email", string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors: typeof errors = {};
    if (!form.name.trim()) nextErrors.name = "Bitte trag deinen Namen ein.";
    if (!form.email.trim()) nextErrors.email = "Bitte trag deine E-Mail ein.";
    else if (!EMAIL_RE.test(form.email)) nextErrors.email = "Das sieht nicht nach einer gültigen E-Mail aus.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setForm(EMPTY_FORM);
    setPaket(null);
    setCare(null);
    setErrors({});
    setStatus("idle");
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-[0_40px_90px_-45px_rgba(0,0,0,0.14)]">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col items-center px-8 py-20 text-center sm:px-10"
          >
            <HiOutlineCheckCircle className="h-10 w-10 text-ink" strokeWidth={1.3} />
            <h3 className="mt-5 text-[1.3rem] font-semibold tracking-tight text-ink">Anfrage angekommen.</h3>
            <p className="mt-2 max-w-xs text-[0.95rem] leading-[1.6] text-muted">
              Danke, {form.name.split(" ")[0]}. Wir melden uns in der Regel innerhalb eines Werktags bei dir.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 text-[0.85rem] font-medium text-ink underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black/50"
            >
              Neue Anfrage senden
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onSubmit={handleSubmit}
            noValidate
            className="p-8 sm:p-10"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                required
                value={form.name}
                onChange={(v) => update("name", v)}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                id="email"
                label="E-Mail"
                type="email"
                required
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
                autoComplete="email"
              />
              <Field
                id="phone"
                label="Telefon (optional)"
                type="tel"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                autoComplete="tel"
              />
              <Field
                id="branche"
                label="Unternehmen / Branche"
                value={form.branche}
                onChange={(v) => update("branche", v)}
                placeholder="z. B. Café, Praxis, Onlineshop …"
              />
            </div>

            <div className="group mt-5">
              <label
                htmlFor="message"
                className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted transition-colors duration-300 group-focus-within:text-ink"
              >
                Nachricht (optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Was sollten wir vorab wissen?"
                className="mt-3 w-full resize-none rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-black/30 placeholder:transition-opacity placeholder:duration-300 transition-all duration-300 focus:border-black/25 focus:placeholder:opacity-50 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)] focus:outline-none"
              />
            </div>

            <ChoiceGroup label="Paket-Interesse" options={PAKET} value={paket} onChange={setPaket} className="mt-8" />
            <ChoiceGroup label="Care-Interesse" options={CARE} value={care} onChange={setCare} className="mt-8" />

            <input type="hidden" name="paket_interesse" value={paket ?? ""} />
            <input type="hidden" name="care_interesse" value={care ?? ""} />
            <input type="hidden" name="_subject" value="Neue Anfrage über karivo.website" />

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-10 flex w-full items-center justify-center gap-2.5 rounded-full bg-ink py-4 text-[0.95rem] font-medium text-bg transition-colors duration-300 hover:bg-[#2a2a2a] disabled:opacity-70"
            >
              {status === "submitting" && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg/30 border-t-bg" />
              )}
              {status === "submitting" ? "Wird gesendet …" : "Kostenlose Anfrage senden"}
            </button>
            {status === "error" ? (
              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-red-500">
                <HiOutlineExclamationCircle className="h-4 w-4 shrink-0" />
                Senden hat nicht geklappt. Bitte versuch es gleich noch einmal.
              </p>
            ) : (
              <p className="mt-4 text-center text-xs text-muted">Deine Anfrage wird sicher an KARIVO gesendet.</p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted transition-colors duration-300 group-focus-within:text-ink"
      >
        {label}
        {required && <span className="text-ink/40"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-3 w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-black/30 placeholder:transition-opacity placeholder:duration-300 transition-all duration-300 focus:placeholder:opacity-50 focus:outline-none focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)] ${
          error ? "border-red-300 focus:border-red-400" : "border-black/[0.08] focus:border-black/25"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
  className = "",
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-[0.85rem] font-medium transition-all duration-300 ${
                active
                  ? "border-ink bg-ink text-bg"
                  : "border-black/[0.08] bg-white text-ink/75 hover:border-black/20"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
