import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SharedCardPage } from "@/components/SharedCardPage";
import { loadNightCard } from "@/lib/share/data";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await loadNightCard(id);
  if (!data) return {};
  const title = `La clasificación de la noche · ${data.title} · El Falla`;
  const image = `/tarjeta/noche/${id}?formato=enlace`;
  return {
    title,
    description: "Lo que opina la afición, en El Palco de El Falla.",
    openGraph: { title, images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, images: [image] },
  };
}

export default async function SharedNightPage({ params }: Props) {
  const { id } = await params;
  const data = await loadNightCard(id);
  if (!data) notFound();
  return (
    <SharedCardPage
      imageUrl={`/tarjeta/noche/${id}`}
      alt={`La clasificación de la noche: ${data.title}`}
      cta="Vota tú también"
      href="/"
    />
  );
}
