import Link from "next/link";
import { notFound } from "next/navigation";
import { VoteScreen } from "@/components/VoteScreen";
import { demoSession, findPerformance } from "@/lib/demo-data";

export default async function VotarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const performance = findPerformance(id);
  if (!performance) notFound();

  if (!performance.votingOpen) {
    return (
      <div className="px-4 pt-10 text-center">
        <h1 className="font-display text-2xl">{performance.group.name}</h1>
        <p className="mt-2 text-texto-2">
          La votación se abre cuando la agrupación sale a escena.
        </p>
        <Link href="/" className="mt-6 inline-block text-marca underline">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  return <VoteScreen performance={performance} phase={demoSession.phase} nextPhase={demoSession.nextPhase} />;
}
