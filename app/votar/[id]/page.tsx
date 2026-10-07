import Link from "next/link";
import { notFound } from "next/navigation";
import { VoteScreen } from "@/components/VoteScreen";
import { findGroup, findPerformance, findUser, sessionView, toPerformanceView } from "@/lib/db/logic";
import { readDb, todayInCadiz } from "@/lib/db/store";
import { getVisitorId } from "@/lib/visitor";

export const dynamic = "force-dynamic";

export default async function VotarPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, db, userId] = await Promise.all([params, readDb(), getVisitorId()]);
  const dbPerformance = findPerformance(db, id);
  if (!dbPerformance || findGroup(db, dbPerformance.groupId)?.withdrawn) notFound();
  const performance = toPerformanceView(db, dbPerformance);
  const session = sessionView(db, dbPerformance.sessionId, todayInCadiz());
  if (!performance || !session) notFound();

  if (!performance.votingOpen) {
    return (
      <div className="px-4 pt-10 text-center">
        <h1 className="font-display text-2xl">{performance.group.name}</h1>
        <p className="mt-2 text-texto-2">
          {dbPerformance.votingClosedAt
            ? "La votación de esta actuación ya está cerrada."
            : "La votación se abre cuando la agrupación sale a escena."}
        </p>
        <Link href="/" className="mt-6 inline-block text-marca underline">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  const previous = userId ? db.votes.find((v) => v.userId === userId && v.performanceId === id) : undefined;
  const blocked = userId ? findUser(db, userId)?.status === "blocked" : false;

  return (
    <VoteScreen
      performance={performance}
      phase={session.phase}
      nextPhase={session.nextPhase}
      previousScore={previous?.score ?? null}
      blocked={blocked}
    />
  );
}
