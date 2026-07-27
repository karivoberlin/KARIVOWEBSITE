"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { translations } from "./translations";
import type { Language } from "./translations";

const STORAGE_KEY = "karivo-language";

function isLanguage(value: string | null): value is Language {
  return value === "de" || value === "en";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Language {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLanguage(stored) ? stored : "de";
}

function getServerSnapshot(): Language {
  return "de";
}

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: (typeof translations)["de"];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    const next: Language = language === "de" ? "en" : "de";
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event("storage"));
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, toggleLanguage, t: translations[language] }),
    [language, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
