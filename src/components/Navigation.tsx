"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

const NAV_ITEMS = [
  { key: "ablauf", href: "#ablauf" },
  { key: "pakete", href: "#pakete" },
  { key: "care", href: "#care" },
  { key: "kontakt", href: "#kontakt" },
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-border bg-white/75 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-px flex h-20 items-center justify-between">
        <a href="#top" className="text-[1.05rem] font-semibold tracking-tight text-ink">
          Karivo
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {t.nav[item.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Button href="#kontakt" icon={false} className="!px-5 !py-2.5 text-[0.82rem]">
            {t.nav.cta}
          </Button>
        </div>
      </nav>
    </header>
  );
}
