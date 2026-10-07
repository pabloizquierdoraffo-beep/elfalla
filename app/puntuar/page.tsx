import { redirect } from "next/navigation";
import { onStagePerformance } from "@/lib/demo-data";

// La pestaña "Puntuar" lleva directamente a la agrupación que está en escena.
export default function PuntuarPage() {
  const performance = onStagePerformance();
  redirect(performance ? `/votar/${performance.id}` : "/");
}
