import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SharedCardPage } from "@/components/SharedCardPage";
import { loadVoteCard, parseScore } from "@/lib/share/data";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ n?: string }> };

async function load({ params, searchParams }: Props) {
  const [{ id }, { n }] = await Promise.all([params, searchParams]);
  const score = parseScore(n ?? null);
  const data = score === null ? null : await loadVoteCard(id, score);
  return data && { id, score: score!, data };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const found = await load(props);
  if (!found) return {};
  const title = `Le he dado un ${found.score} a ${found.data.groupName} · El Falla`;
  const image = `/tarjeta/nota/${found.id}?n=${found.score}&formato=enlace`;
  return {
    title,
    description: "¿Y tú, qué nota le das? Puntúa en El Falla, el jurado de la afición.",
    openGraph: { title, images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, images: [image] },
  };
}

export default async function SharedVotePage(props: Props) {
  const found = await load(props);
  if (!found) notFound();
  return (
    <SharedCardPage
      imageUrl={`/tarjeta/nota/${found.id}?n=${found.score}`}
      alt={`Nota de ${found.score} a ${found.data.groupName}`}
      cta="Puntúa tú también"
      href="/"
    />
  );
}
