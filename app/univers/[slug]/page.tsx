import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UNIVERSES, getUniverse } from "@/lib/universes";
import { UniverseView } from "@/components/universe-view";
import { BRAND_NAME } from "@/lib/contact";

export function generateStaticParams() {
  return UNIVERSES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const universe = getUniverse(slug);
  if (!universe) return { title: BRAND_NAME };
  return {
    title: `${universe.name} — ${BRAND_NAME}`,
    description: universe.description,
  };
}

export default async function UniversePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const universe = getUniverse(slug);
  if (!universe) notFound();
  return <UniverseView universe={universe} />;
}
