import { VoteCard } from "@/lib/share/cards";
import { loadVoteCard, parseScore } from "@/lib/share/data";
import { parseFormat, renderCard } from "@/lib/share/render";

// Imagen de la tarjeta "Mi puntuación": /tarjeta/nota/<actuación>?n=78&formato=historia|enlace
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = new URL(request.url);
  const score = parseScore(url.searchParams.get("n"));
  if (score === null) return new Response("Nota no válida", { status: 400 });
  const data = await loadVoteCard(id, score);
  if (!data) return new Response("No encontrada", { status: 404 });
  return renderCard(parseFormat(url.searchParams.get("formato")), data.sponsor, (ctx) => <VoteCard ctx={ctx} data={data} />);
}
