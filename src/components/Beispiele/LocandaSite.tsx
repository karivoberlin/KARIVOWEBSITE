"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineArrowUpRight } from "react-icons/hi2";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function LocandaSite() {
  const { t } = useLanguage();
  const mockup = t.browserWindows.restaurant;
  const detail = t.examples.restaurant;
  const shop = t.locanda;

  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-bg">
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-black/[0.06] bg-white/85 px-5 py-3 backdrop-blur-xl sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-ink/70"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          {t.examples.back}
        </Link>
        <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-muted">
          {t.examples.badge}
        </span>
      </div>

      {/* Hero — cinematic video background, scroll parallax */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden text-white">
        <motion.div
          className="absolute inset-0"
          style={reduceMotion ? undefined : { scale: bgScale, opacity: bgOpacity }}
        >
          <video
            className="h-full w-full object-cover"
            src="/videos/locanda-hero.mp4"
            poster="/locanda-hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        </motion.div>

        <motion.div
          className="relative z-10 flex h-full w-full flex-col justify-between"
          style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <div className="container-px flex w-full items-center justify-between pt-24 sm:pt-8">
            <span className="text-[1.1rem] font-semibold tracking-tight">{mockup.logo}</span>
            <div className="hidden items-center gap-6 text-sm font-medium uppercase tracking-[0.08em] text-white/75 sm:flex">
              <a href="#menu" className="transition-colors hover:text-white">
                {mockup.navLinks[0]}
              </a>
              <a href="#about" className="transition-colors hover:text-white">
                {mockup.navLinks[1]}
              </a>
              <a href="#reservierung" className="transition-colors hover:text-white">
                {mockup.navLinks[2]}
              </a>
            </div>
          </div>

          <div className="container-px w-full pb-16 sm:pb-20">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE }}
              className="max-w-lg text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.02em] sm:text-[3.6rem]"
            >
              {mockup.headline[0]}
              <br />
              {mockup.headline[1]}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              className="mt-5 max-w-md text-[1.02rem] leading-[1.6] text-white/80"
            >
              {mockup.text}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#reservierung" className="rounded-full bg-white px-6 py-3 text-[0.9rem] font-medium text-ink">
                {mockup.primary}
              </a>
              <a
                href="#menu"
                className="rounded-full border border-white/35 px-6 py-3 text-[0.9rem] font-medium text-white"
              >
                {mockup.secondary}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Content — rises over the hero video */}
      <div className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-bg sm:-mt-16 sm:rounded-t-[3.5rem]">
        {/* Trust strip */}
        <div className="container-px border-b border-black/[0.06] py-10 sm:py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {detail.features.map((feature, i) => (
              <motion.p
                key={feature}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="text-[0.92rem] font-medium leading-[1.5] text-ink/80"
              >
                {feature}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Menu */}
        <section id="menu" className="container-px py-20 sm:py-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted"
          >
            {shop.menuEyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-4 text-[2rem] font-semibold tracking-[-0.02em] text-ink sm:text-[2.5rem]"
          >
            {shop.menuTitle}
          </motion.h2>

          <div className="mt-12 max-w-2xl divide-y divide-black/[0.06]">
            {shop.menu.map((dish, i) => (
              <motion.div
                key={dish.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                className="flex items-baseline justify-between gap-4 py-6"
              >
                <div>
                  <p className="text-[1.1rem] font-semibold tracking-tight text-ink">{dish.name}</p>
                  <p className="mt-1 text-[0.92rem] text-muted">{dish.desc}</p>
                </div>
                <p className="shrink-0 text-[1rem] font-medium text-ink/70">{dish.price}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-12 max-w-md text-[1.15rem] font-medium italic leading-[1.6] text-ink/70"
          >
            &ldquo;{shop.quote}&rdquo;
          </motion.p>
        </section>

        {/* About */}
        <section id="about" className="border-t border-black/[0.06] bg-white">
          <div className="container-px grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-80 lg:h-full"
            >
              <Image
                src="/locanda-hero-poster.jpg"
                alt={mockup.logo}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-[1.6rem] font-semibold tracking-tight text-ink sm:text-[1.9rem]">
                {detail.aboutTitle}
              </h2>
              <p className="mt-4 max-w-lg text-[1.05rem] leading-[1.7] text-muted">{detail.aboutText}</p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container-px py-20 sm:py-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted"
          >
            {shop.testimonialsEyebrow}
          </motion.p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {shop.testimonials.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="rounded-2xl border border-black/[0.06] bg-white p-7"
              >
                <p className="text-[0.98rem] leading-[1.6] text-ink/85">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-4 text-[0.85rem] font-medium text-muted">{item.name}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Reservation */}
        <section
          id="reservierung"
          className="border-t border-black/[0.06] bg-ink text-white"
        >
          <div className="container-px flex flex-col items-start justify-between gap-8 py-20 sm:flex-row sm:items-center sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">{shop.reservationEyebrow}</p>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-[-0.02em] sm:text-[2.5rem]">
                {shop.reservationTitle}
              </h2>
              <p className="mt-4 text-[0.98rem] text-white/70">{shop.address}</p>
              <p className="mt-1 text-[0.98rem] text-white/70">{shop.hours}</p>
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="shrink-0 rounded-full bg-white px-7 py-4 text-[0.95rem] font-medium text-ink"
            >
              {shop.reservationCta}
            </motion.span>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-black/[0.06] bg-white">
          <div className="container-px flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
            <div>
              <span className="text-[1.05rem] font-semibold tracking-tight text-ink">{mockup.logo}</span>
              <p className="mt-1 text-sm text-muted">{shop.footerNote}</p>
            </div>
            <Link
              href="/#kontakt"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[0.9rem] font-medium text-bg transition-colors duration-300 hover:bg-[#2a2a2a]"
            >
              {t.nav.cta}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
                <HiOutlineArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
