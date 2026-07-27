import Image from "next/image";
import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Variant = "restaurant" | "fahrschule" | "fitness";
type Scale = "lg" | "md" | "sm";

interface BrowserWindowProps {
  variant: Variant;
  url?: string;
  scale?: Scale;
}

const DOT_COLORS = ["#ff5f57", "#febc2e", "#28c840"];

const SIZES: Record<Scale, { logo: string; nav: string; headline: string; text: string; textW: string; btn: string; gap: string }> = {
  lg: { logo: "text-[0.95rem]", nav: "text-[0.62rem] gap-5", headline: "text-[1.4rem]", text: "text-[0.74rem] mt-2.5", textW: "max-w-[260px]", btn: "text-[0.68rem] px-4 py-2.5", gap: "mt-4" },
  md: { logo: "text-[0.8rem]", nav: "text-[0.58rem] gap-4", headline: "text-[1.1rem]", text: "text-[0.65rem] mt-2", textW: "max-w-[210px]", btn: "text-[0.62rem] px-3.5 py-2", gap: "mt-3.5" },
  sm: { logo: "text-[0.72rem]", nav: "text-[0.52rem] gap-3", headline: "text-[0.92rem]", text: "text-[0.58rem] mt-1.5", textW: "max-w-[170px]", btn: "text-[0.56rem] px-3 py-1.5", gap: "mt-3" },
};

/**
 * One shared template for all three — same nav row, same headline/text/button
 * rhythm, same spacing logic — just re-skinned per brand and re-scaled per
 * depth layer. That's what keeps the stack reading as "one design system"
 * rather than three unrelated screenshots.
 */
function MiniHero({
  scale,
  dark,
  background,
  logo,
  navLinks,
  headline,
  text,
  primary,
  secondary,
}: {
  scale: Scale;
  dark: boolean;
  background: ReactNode;
  logo: string;
  navLinks: [string, string, string];
  headline: [string, string];
  text: string;
  primary: string;
  secondary: string;
}) {
  const s = SIZES[scale];
  const ink = dark ? "text-white" : "text-ink";
  const muted = dark ? "text-white/70" : "text-muted";
  const navColor = dark ? "text-white/75" : "text-ink/60";
  const primaryBtn = dark ? "bg-white text-ink" : "bg-ink text-white";
  const secondaryBtn = dark ? "border border-white/35 text-white" : "border border-black/15 text-ink";

  return (
    <div className="relative h-full w-full overflow-hidden">
      {background}

      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-4">
        <span className={`${s.logo} font-semibold tracking-tight ${ink}`}>{logo}</span>
        <div className={`hidden items-center font-medium uppercase tracking-[0.09em] sm:flex ${s.nav} ${navColor}`}>
          {navLinks.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-5">
        <h3 className={`${s.headline} font-semibold leading-[1.14] ${ink}`}>
          {headline[0]}
          <br />
          {headline[1]}
        </h3>
        <p className={`${s.text} ${s.textW} leading-[1.45] ${muted}`}>{text}</p>
        <div className={`flex flex-wrap items-center gap-2 ${s.gap}`}>
          <span className={`rounded-full font-medium ${s.btn} ${primaryBtn}`}>{primary}</span>
          <span className={`rounded-full font-medium ${s.btn} ${secondaryBtn}`}>{secondary}</span>
        </div>
      </div>
    </div>
  );
}

export default function BrowserWindow({ variant, url, scale = "lg" }: BrowserWindowProps) {
  const { t } = useLanguage();
  const content = t.browserWindows[variant];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.1rem] border border-black/[0.06] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
      <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-black/[0.05] bg-[#fbfbfa] px-4">
        {DOT_COLORS.map((c) => (
          <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c, opacity: url ? 1 : 0.55 }} />
        ))}
        {url && (
          <div className="mx-auto flex items-center gap-1.5 rounded-full bg-black/[0.03] px-3 py-1 text-[10px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
            {url}
          </div>
        )}
      </div>

      <div className="relative flex-1">
        {variant === "restaurant" && (
          <MiniHero
            scale={scale}
            dark
            background={
              <PhotoBg src="/restauraunt.png" alt="Restaurant Locanda" position="object-[50%_38%]" eager highPriority />
            }
            logo={content.logo}
            navLinks={content.navLinks as [string, string, string]}
            headline={content.headline as [string, string]}
            text={content.text}
            primary={content.primary}
            secondary={content.secondary}
          />
        )}
        {variant === "fahrschule" && (
          <MiniHero
            scale={scale}
            dark
            background={<PhotoBg src="/Fahrschule.png" alt="Drive Academy Fahrschule" position="object-[82%_42%]" eager />}
            logo={content.logo}
            navLinks={content.navLinks as [string, string, string]}
            headline={content.headline as [string, string]}
            text={content.text}
            primary={content.primary}
            secondary={content.secondary}
          />
        )}
        {variant === "fitness" && (
          <MiniHero
            scale={scale}
            dark
            background={<PhotoBg src="/fitnessstudio.png" alt="Momentum Fitnessstudio" position="object-[32%_48%]" eager />}
            logo={content.logo}
            navLinks={content.navLinks as [string, string, string]}
            headline={content.headline as [string, string]}
            text={content.text}
            primary={content.primary}
            secondary={content.secondary}
          />
        )}
      </div>
    </div>
  );
}

function PhotoBg({
  src,
  alt,
  position,
  eager,
  highPriority,
}: {
  src: string;
  alt: string;
  position: string;
  eager?: boolean;
  highPriority?: boolean;
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="640px"
        loading={eager ? "eager" : undefined}
        fetchPriority={highPriority ? "high" : undefined}
        className={`object-cover ${position}`}
      />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
    </>
  );
}
