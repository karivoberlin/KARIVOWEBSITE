import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ExampleSite from "@/components/Beispiele/ExampleSite";
import type { ExampleSlug } from "@/components/Beispiele/ExampleSite";
import LocandaSite from "@/components/Beispiele/LocandaSite";

const SLUGS: ExampleSlug[] = ["restaurant", "fahrschule", "fitness"];

const META: Record<ExampleSlug, { title: string; description: string }> = {
  restaurant: {
    title: "Beispiel: Restaurant-Website",
    description: "Beispiel-Website für ein Restaurant, umgesetzt von Karivo.",
  },
  fahrschule: {
    title: "Beispiel: Fahrschul-Website",
    description: "Beispiel-Website für eine Fahrschule, umgesetzt von Karivo.",
  },
  fitness: {
    title: "Beispiel: Fitnessstudio-Website",
    description: "Beispiel-Website für ein Fitnessstudio, umgesetzt von Karivo.",
  },
};

function isExampleSlug(value: string): value is ExampleSlug {
  return (SLUGS as string[]).includes(value);
}

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isExampleSlug(slug)) return {};
  return META[slug];
}

export default async function ExamplePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isExampleSlug(slug)) notFound();

  if (slug === "restaurant") return <LocandaSite />;

  return <ExampleSite slug={slug} />;
}
