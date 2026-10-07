"use server";

// Acciones que hace la afición. Todas se comprueban en el servidor:
// la web del móvil nunca decide si un voto vale.

import { castVote, palcoScore, reportOnStage, type ReportError, type VoteError } from "@/lib/db/logic";
import { mutate } from "@/lib/db/store";
import type { PalcoScore } from "@/lib/palco";
import { getVisitorId } from "@/lib/visitor";

export type VoteResult = { ok: true; palco: PalcoScore } | { ok: false; error: VoteError | "no_visitor" };

export async function submitVote(performanceId: string, score: number): Promise<VoteResult> {
  const userId = await getVisitorId();
  if (!userId) return { ok: false, error: "no_visitor" };
  const now = new Date();
  return mutate((db): VoteResult => {
    const result = castVote(db, { userId, performanceId, score, now });
    return result.ok ? { ok: true, palco: palcoScore(db, performanceId) } : result;
  });
}

export type ReportResult = { ok: true; confirmed: boolean } | { ok: false; error: ReportError | "no_visitor" };

export async function reportOnStageAction(performanceId: string): Promise<ReportResult> {
  const userId = await getVisitorId();
  if (!userId) return { ok: false, error: "no_visitor" };
  const now = new Date();
  return mutate((db) => reportOnStage(db, { userId, performanceId, now }));
}
