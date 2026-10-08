"use server";

// Acciones que hace la afición. Todas se comprueban en el servidor:
// la web del móvil nunca decide si un voto vale.

import { revalidateTag } from "next/cache";
import { castVote, palcoScore, reportOnStage, type ReportError, type VoteError } from "@/lib/db/logic";
import { loadTallies, read, transact } from "@/lib/db/firestore-store";
import type { PalcoScore } from "@/lib/palco";
import { PUBLIC_TAG } from "@/lib/public-data";
import { getVisitorId } from "@/lib/visitor";

export type VoteResult = { ok: true; palco: PalcoScore } | { ok: false; error: VoteError | "no_visitor" };

export async function submitVote(performanceId: string, score: number): Promise<VoteResult> {
  const userId = await getVisitorId();
  if (!userId) return { ok: false, error: "no_visitor" };
  const now = new Date();
  const result = await transact(
    // Solo lo imprescindible: la actuación, su agrupación, la persona y su voto anterior.
    { performances: [performanceId], users: [userId], votes: [{ userId, performanceId }] },
    (db) => castVote(db, { userId, performanceId, score, now }),
  );
  if (!result.ok) return result;

  // La nota se lee después de guardar el voto, fuera de la transacción, para que miles de
  // votos a la vez no compitan por leer el mismo histograma.
  const db = await read({});
  db.tallies = await loadTallies([performanceId]);
  return { ok: true, palco: palcoScore(db, performanceId) };
}

export type ReportResult = { ok: true; confirmed: boolean } | { ok: false; error: ReportError | "no_visitor" };

export async function reportOnStageAction(performanceId: string): Promise<ReportResult> {
  const userId = await getVisitorId();
  if (!userId) return { ok: false, error: "no_visitor" };
  const now = new Date();
  const result = await transact(
    { performanceWithSession: performanceId, users: [userId], reportsOf: performanceId },
    (db) => reportOnStage(db, { userId, performanceId, now }),
  );
  // Si con este aviso sale a escena, que todo el mundo lo vea ya, sin esperar a la caché.
  if (result.ok && result.confirmed) revalidateTag(PUBLIC_TAG);
  return result;
}
