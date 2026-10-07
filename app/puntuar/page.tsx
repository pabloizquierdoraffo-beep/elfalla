import { redirect } from "next/navigation";
import { loadCurrentSession } from "@/lib/public-data";

export const dynamic = "force-dynamic";

// La pestaña "Puntuar" lleva directamente a la agrupación que está en escena.
export default async function PuntuarPage() {
  const data = await loadCurrentSession();
  const onStage = data?.session.performances.find(
    (p) => p.stageStatus === "on_stage" || p.stageStatus === "probably_on_stage",
  );
  redirect(onStage ? `/votar/${onStage.id}` : "/");
}
