import { NightCard } from "@/lib/share/cards";
import { loadNightCard } from "@/lib/share/data";
import { parseFormat, renderCard } from "@/lib/share/render";

// Imagen de "La clasificación de la noche": /tarjeta/noche/<sesión>?formato=historia|enlace
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await loadNightCard(id);
  if (!data) return new Response("Todavía no hay clasificación", { status: 404 });
  const format = parseFormat(new URL(request.url).searchParams.get("formato"));
  return renderCard(format, data.sponsor, (ctx) => <NightCard ctx={ctx} data={data} />);
}
