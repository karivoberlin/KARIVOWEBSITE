"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineArrowUpRight } from "react-icons/hi2";
import { useLanguage } from "@/context/LanguageContext";

export type ExampleSlug = "restaurant" | "fahrschule" | "fitness";

const PHOTO: Record<ExampleSlug, { src: string; position: string }> = {
  restaurant: { src: "/restauraunt.png", position: "object-[50%_38%]" },
  fahrschule: { src: "/Fahrschule.png", position: "object-[82%_42%]" },
  fitness: { src: "/fitnessstudio.png", position: "object-[32%_48%]" },
};

export default function ExampleSite({ slug }: { slug: ExampleSlug }) {
  const { t } = useLanguage();
  const mockup = t.browserWindows[slug];
  const detail = t.examples[slug];
  const photo = PHOTO[slug];

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

      <section className="relative flex h-[78vh] min-h-[520px] w-full items-end overflow-hidden text-white">
        <Image
          src={photo.src}
          alt={mockup.logo}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className={`object-cover ${photo.position}`}
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        <div className="container-px relative z-10 flex w-full items-center justify-between pt-20 pb-4">
          <span className="text-[1.1rem] font-semibold tracking-tight">{mockup.logo}</span>
          <div className="hidden items-center gap-6 text-sm font-medium uppercase tracking-[0.08em] text-white/75 sm:flex">
            {mockup.navLinks.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </div>
        </div>

        <div className="container-px relative z-10 w-full pb-16 sm:pb-20">
          <h1 className="max-w-lg text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[3.2rem]">
            {mockup.headline[0]}
            <br />
            {mockup.headline[1]}
          </h1>
          <p className="mt-5 max-w-md text-[1.02rem] leading-[1.6] text-white/80">{mockup.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white px-6 py-3 text-[0.9rem] font-medium text-ink">
              {mockup.primary}
            </span>
            <span className="rounded-full border border-white/35 px-6 py-3 text-[0.9rem] font-medium text-white">
              {mockup.secondary}
            </span>
          </div>
        </div>
      </section>

      <section className="container-px py-20 sm:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">{t.examples.featuresTitle}</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {detail.features.map((feature) => (
            <div key={feature} className="rounded-2xl border border-black/[0.06] bg-white p-7">
              <p className="text-[1rem] font-medium leading-[1.5] text-ink">{feature}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-2xl">
          <h2 className="text-[1.4rem] font-semibold tracking-tight text-ink">{detail.aboutTitle}</h2>
          <p className="mt-3 text-[1rem] leading-[1.65] text-muted">{detail.aboutText}</p>
        </div>
      </section>

      <section className="border-t border-black/[0.06] bg-white">
        <div className="container-px flex flex-col items-start justify-between gap-6 py-14 sm:flex-row sm:items-center">
          <p className="max-w-sm text-[1.15rem] font-semibold tracking-tight text-ink">{t.examples.ctaNote}</p>
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
      </section>
    </div>
  );
}
