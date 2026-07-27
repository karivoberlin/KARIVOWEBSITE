"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

const LINKS = [
  { label: "Ablauf", href: "#ablauf" },
  { label: "Pakete", href: "#pakete" },
  { label: "Care", href: "#care" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

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
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button href="#kontakt" icon={false} className="!px-5 !py-2.5 text-[0.82rem]">
          Projekt starten
        </Button>
      </nav>
    </header>
  );
}
