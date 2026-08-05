import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://karivo.website";
const TITLE = "Karivo — Websites, die Kunden gewinnen.";
const DESCRIPTION =
  "Karivo entwickelt moderne, verkaufsstarke Websites für Unternehmen, die mehr erreichen wollen — von der Premium-Website bis zur laufenden Betreuung danach.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Karivo",
  },
  description: DESCRIPTION,
  keywords: [
    "Webdesign Agentur",
    "Website erstellen lassen",
    "Premium Website",
    "Homepage für Unternehmen",
    "Website mit Betreuung",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "Karivo",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Karivo",
  url: SITE_URL,
  description: DESCRIPTION,
  areaServed: "DE",
  priceRange: "€€",
  knowsAbout: ["Webdesign", "Website-Erstellung", "SEO", "Website-Betreuung"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
