import "server-only";

// Datos de cada tarjeta. Solo incluyen la nota de El Palco cuando la votación está
// cerrada, para no adelantársela a quien todavía no ha votado (PRD 3.4).

import { findGroup, findPerformance, palcoScore, sessionPerformances } from "../db/logic";
import { readDb } from "../db/store";
import { CATEGORY_LABEL, PHASE_LABEL, type Category } from "../types";

export type VoteCardData = {
  groupName: string;
  category: Category;
  subtitle: string;
  myScore: number;
  palco: { score: number; votes: number } | null;
  sponsor: string;
};

export function parseScore(value: string | null): number | null {
  if (value === null || !/^\d{1,3}$/.test(value)) return null;
  const n = Number(value);
  return n <= 100 ? n : null;
}

export async function loadVoteCard(performanceId: string, myScore: number): Promise<VoteCardData | null> {
  const db = await readDb();
  const p = findPerformance(db, performanceId);
  const group = p && findGroup(db, p.groupId);
  const session = p && db.sessions.find((s) => s.id === p.sessionId);
  if (!p || !group || !session) return null;
  const score = palcoScore(db, p.id);
  const closed = !p.votingOpen && p.votingClosedAt !== null;
  return {
    groupName: group.name,
    category: group.category,
    subtitle: `${CATEGORY_LABEL[group.category]} · ${PHASE_LABEL[session.phase]}`,
    myScore,
    palco: closed && score.status !== "no_score" ? { score: score.score, votes: score.votes } : null,
    sponsor: db.settings.shareSponsor ?? "",
  };
}

export type NightCardData = {
  title: string;
  rows: { name: string; category: Category; score: number }[];
  sponsor: string;
};

/** Clasificación de El Palco de una sesión, solo con las votaciones ya cerradas. */
export async function loadNightCard(sessionId: string): Promise<NightCardData | null> {
  const db = await readDb();
  const session = db.sessions.find((s) => s.id === sessionId);
  if (!session) return null;
  const rows = sessionPerformances(db, session.id)
    .filter((p) => !p.votingOpen && p.votingClosedAt !== null)
    .map((p) => ({ p, group: findGroup(db, p.groupId), score: palcoScore(db, p.id) }))
    .filter((x) => x.group && !x.group.withdrawn && x.score.status !== "no_score")
    .map((x) => ({
      name: x.group!.name,
      category: x.group!.category,
      score: x.score.status === "no_score" ? 0 : x.score.score,
    }))
    .sort((a, b) => b.score - a.score);
  if (rows.length === 0) return null;
  return { title: `${PHASE_LABEL[session.phase]} · Sesión ${session.number}`, rows, sponsor: db.settings.shareSponsor ?? "" };
}
