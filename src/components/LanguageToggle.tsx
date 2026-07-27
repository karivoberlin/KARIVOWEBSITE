"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={language === "de" ? "Switch to English" : "Auf Deutsch wechseln"}
      className="relative flex h-8 w-[60px] shrink-0 items-center rounded-full border border-black/10 bg-black/[0.03] transition-colors duration-300 hover:border-black/20"
    >
      <span
        className={`absolute top-0.5 h-7 w-[27px] rounded-full bg-ink shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          language === "en" ? "translate-x-[29px]" : "translate-x-0.5"
        }`}
      />
      <span
        className={`relative z-10 flex-1 text-center text-[0.68rem] font-semibold transition-colors duration-300 ${
          language === "de" ? "text-bg" : "text-ink/50"
        }`}
      >
        DE
      </span>
      <span
        className={`relative z-10 flex-1 text-center text-[0.68rem] font-semibold transition-colors duration-300 ${
          language === "en" ? "text-bg" : "text-ink/50"
        }`}
      >
        EN
      </span>
    </button>
  );
}
