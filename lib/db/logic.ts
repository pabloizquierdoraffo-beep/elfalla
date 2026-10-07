// Reglas de negocio sobre los datos. Funciones puras: reciben los datos y los
// consultan o modifican en memoria; guardarlos es cosa de store.ts.

import { computePalcoScore, type PalcoScore } from "../palco";
import type { Category, Performance, PhaseKind, Session, StageStatus } from "../types";
import { DEFAULT_HASHTAGS } from "../share/links";
import type { ConfirmedBy, Db, DbGroup, DbPerformance, DbSettings, DbUser } from "./schema";

const ON_STAGE: StageStatus[] = ["on_stage", "probably_on_stage"];

// ─── Consultas ───────────────────────────────────────────────────────────────

export function findUser(db: Db, id: string): DbUser | undefined {
  return db.users.find((u) => u.id === id);
}

export function findGroup(db: Db, id: string): DbGroup | undefined {
  return db.groups.find((g) => g.id === id);
}

export function findPerformance(db: Db, id: string): DbPerformance | undefined {
  return db.performances.find((p) => p.id === id);
}

export function sessionPerformances(db: Db, sessionId: string): DbPerformance[] {
  return db.performances
    .filter((p) => p.sessionId === sessionId)
    .sort((a, b) => a.runningOrder - b.runningOrder);
}

export function toPerformanceView(db: Db, p: DbPerformance): Performance | null {
  const g = findGroup(db, p.groupId);
  if (!g) return null;
  return {
    id: p.id,
    group: { id: g.id, name: g.name, category: g.category, authors: g.authors, photoUrl: g.photoUrl },
    runningOrder: p.runningOrder,
    expectedTime: p.expectedTime,
    stageStatus: p.stageStatus,
    votingOpen: p.votingOpen,
  };
}

const NEXT_PHASE: Record<PhaseKind, PhaseKind> = {
  preliminares: "cuartos",
  cuartos: "semifinal",
  semifinal: "final",
  final: "final",
};

/** La sesión tal como la ve la afición (sin agrupaciones retiradas). */
export function sessionView(db: Db, sessionId: string, today: string): Session | null {
  const s = db.sessions.find((x) => x.id === sessionId);
  if (!s) return null;
  const performances = sessionPerformances(db, s.id)
    .filter((p) => !findGroup(db, p.groupId)?.withdrawn)
    .map((p) => toPerformanceView(db, p))
    .filter((p): p is Performance => p !== null);
  return {
    id: s.id,
    phase: s.phase,
    number: s.number,
    dateLabel: dateLabel(s.date, today),
    startsAt: s.startsAt,
    nextPhase: NEXT_PHASE[s.phase],
    performances,
  };
}

export function dateLabel(date: string, today: string): string {
  if (date === today) return "Hoy";
  const d = new Date(`${date}T12:00:00Z`);
  return new Intl.DateTimeFormat("es-ES", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(d);
}

/** Votos que cuentan: los de personas no bloqueadas (documento 02, apartado 1). */
export function validScores(db: Db, performanceId: string): number[] {
  const blocked = new Set(db.users.filter((u) => u.status === "blocked").map((u) => u.id));
  return db.votes.filter((v) => v.performanceId === performanceId && !blocked.has(v.userId)).map((v) => v.score);
}

export function palcoScore(db: Db, performanceId: string): PalcoScore {
  return computePalcoScore(validScores(db, performanceId), db.settings);
}

export function userVotes(db: Db, userId: string): Record<string, { score: number; kind: "quick" | "full" }> {
  const out: Record<string, { score: number; kind: "quick" | "full" }> = {};
  for (const v of db.votes) if (v.userId === userId) out[v.performanceId] = { score: v.score, kind: v.kind };
  return out;
}

/**
 * Notas de El Palco que esta persona puede ver: las de actuaciones que ya ha votado
 * y las que tienen la votación cerrada (PAL-01). Las demás no salen del servidor.
 */
export function visiblePalcoScores(db: Db, userId: string | null, performanceIds: string[]): Record<string, PalcoScore> {
  const mine = userId ? userVotes(db, userId) : {};
  const out: Record<string, PalcoScore> = {};
  for (const id of performanceIds) {
    const p = findPerformance(db, id);
    if (!p) continue;
    const closedAfterVoting = !p.votingOpen && p.votingClosedAt !== null;
    if (mine[id] || closedAfterVoting) out[id] = palcoScore(db, id);
  }
  return out;
}

// ─── Votar ───────────────────────────────────────────────────────────────────

export type VoteError = "not_found" | "closed" | "blocked" | "invalid";

export function ensureUser(db: Db, userId: string, now: Date): DbUser {
  let user = findUser(db, userId);
  if (!user) {
    user = { id: userId, alias: null, status: "active", createdAt: now.toISOString() };
    db.users.push(user);
  }
  return user;
}

export function castVote(
  db: Db,
  input: { userId: string; performanceId: string; score: number; now: Date },
): { ok: true } | { ok: false; error: VoteError } {
  const { userId, performanceId, score, now } = input;
  if (!Number.isInteger(score) || score < 0 || score > 100) return { ok: false, error: "invalid" };
  const p = findPerformance(db, performanceId);
  if (!p || findGroup(db, p.groupId)?.withdrawn) return { ok: false, error: "not_found" };
  if (!p.votingOpen) return { ok: false, error: "closed" };
  const user = ensureUser(db, userId, now);
  if (user.status === "blocked") return { ok: false, error: "blocked" };

  const existing = db.votes.find((v) => v.userId === userId && v.performanceId === performanceId);
  if (existing) {
    existing.score = score;
    existing.at = now.toISOString();
  } else {
    db.votes.push({ userId, performanceId, score, kind: "quick", at: now.toISOString() });
  }
  return { ok: true };
}

// ─── En escena ───────────────────────────────────────────────────────────────

/** Tras cualquier cambio, la "siguiente" es la primera programada después de la última que ya salió. */
export function recomputeNext(db: Db, sessionId: string): void {
  const perfs = sessionPerformances(db, sessionId);
  for (const p of perfs) if (p.stageStatus === "next") p.stageStatus = "scheduled";
  const lastStarted = perfs.reduce(
    (acc, p, i) => (ON_STAGE.includes(p.stageStatus) || p.stageStatus === "finished" ? i : acc),
    -1,
  );
  const next = perfs.slice(lastStarted + 1).find((p) => p.stageStatus === "scheduled");
  if (next) next.stageStatus = "next";
}

/** Pone una actuación en escena: la anterior termina y se abre su votación (ESC-01). */
export function setOnStage(db: Db, performanceId: string, by: ConfirmedBy, now: Date): void {
  const target = findPerformance(db, performanceId);
  if (!target) return;
  for (const p of sessionPerformances(db, target.sessionId)) {
    if (p.id !== target.id && ON_STAGE.includes(p.stageStatus)) p.stageStatus = "finished";
  }
  target.stageStatus = "on_stage";
  target.confirmedBy = by;
  target.onStageAt = now.toISOString();
  target.votingOpen = true;
  target.votingClosedAt = null;
  recomputeNext(db, target.sessionId);
}

export type ReportError = "not_found" | "not_next" | "blocked" | "too_soon";

/** Botón "¡Ya ha salido!" (ESC-03). Devuelve si con este aviso ya se confirma. */
export function reportOnStage(
  db: Db,
  input: { userId: string; performanceId: string; now: Date },
): { ok: true; confirmed: boolean } | { ok: false; error: ReportError } {
  const { userId, performanceId, now } = input;
  const p = findPerformance(db, performanceId);
  if (!p) return { ok: false, error: "not_found" };
  if (p.stageStatus !== "next") return { ok: false, error: "not_next" };
  const user = ensureUser(db, userId, now);
  if (user.status === "blocked") return { ok: false, error: "blocked" };

  // Tiempo mínimo desde que salió la anterior, para que nadie "adelante" la sesión.
  const previous = sessionPerformances(db, p.sessionId)
    .filter((x) => x.runningOrder < p.runningOrder && x.onStageAt)
    .at(-1);
  if (previous?.onStageAt) {
    const minutes = (now.getTime() - new Date(previous.onStageAt).getTime()) / 60000;
    if (minutes < db.settings.minMinutesBetweenPerformances) return { ok: false, error: "too_soon" };
  }

  if (!db.reports.some((r) => r.performanceId === performanceId && r.userId === userId)) {
    db.reports.push({ performanceId, userId, at: now.toISOString() });
  }

  const since = now.getTime() - db.settings.crowdWindowMinutes * 60000;
  const blocked = new Set(db.users.filter((u) => u.status === "blocked").map((u) => u.id));
  const recent = db.reports.filter(
    (r) => r.performanceId === performanceId && !blocked.has(r.userId) && new Date(r.at).getTime() >= since,
  );
  if (recent.length >= db.settings.crowdThreshold) {
    setOnStage(db, performanceId, "crowd", now);
    return { ok: true, confirmed: true };
  }
  return { ok: true, confirmed: false };
}

/** Correcciones del equipo (ESC-04). */
export function setStageStatus(db: Db, performanceId: string, status: StageStatus, now: Date): void {
  if (status === "on_stage") return setOnStage(db, performanceId, "staff", now);
  const p = findPerformance(db, performanceId);
  if (!p) return;
  p.stageStatus = status;
  if (status === "not_performing") {
    p.votingOpen = false;
  }
  if (status === "scheduled") {
    p.confirmedBy = null;
    p.onStageAt = null;
  }
  recomputeNext(db, p.sessionId);
}

// ─── Votaciones ──────────────────────────────────────────────────────────────

export function setVotingOpen(db: Db, performanceId: string, open: boolean, now: Date): void {
  const p = findPerformance(db, performanceId);
  if (!p) return;
  p.votingOpen = open;
  p.votingClosedAt = open ? null : now.toISOString();
}

export function closeSessionVoting(db: Db, sessionId: string, now: Date): number {
  let closed = 0;
  for (const p of sessionPerformances(db, sessionId)) {
    if (p.votingOpen) {
      setVotingOpen(db, p.id, false, now);
      closed++;
    }
  }
  return closed;
}

// ─── Usuarios ────────────────────────────────────────────────────────────────

export function setUserBlocked(db: Db, userId: string, blocked: boolean, reason?: string): void {
  const u = findUser(db, userId);
  if (!u) return;
  u.status = blocked ? "blocked" : "active";
  if (blocked) u.blockedReason = reason?.trim() || undefined;
  else delete u.blockedReason;
}

// ─── Agrupaciones y sesiones ─────────────────────────────────────────────────

export function upsertGroup(
  db: Db,
  data: { id?: string; name: string; category: Category; authors: string; photoUrl?: string },
): DbGroup {
  const clean = {
    name: data.name.trim(),
    category: data.category,
    authors: data.authors.trim(),
    photoUrl: data.photoUrl?.trim() || undefined,
  };
  const existing = data.id ? findGroup(db, data.id) : undefined;
  if (existing) {
    Object.assign(existing, clean);
    return existing;
  }
  const group: DbGroup = { id: crypto.randomUUID(), withdrawn: false, ...clean };
  db.groups.push(group);
  return group;
}

export function setGroupWithdrawn(db: Db, groupId: string, withdrawn: boolean): void {
  const g = findGroup(db, groupId);
  if (g) g.withdrawn = withdrawn;
}

export function addPerformance(db: Db, sessionId: string, groupId: string, expectedTime: string): DbPerformance {
  const order = sessionPerformances(db, sessionId).reduce((max, p) => Math.max(max, p.runningOrder), 0) + 1;
  const p: DbPerformance = {
    id: crypto.randomUUID(),
    sessionId,
    groupId,
    runningOrder: order,
    expectedTime,
    stageStatus: "scheduled",
    confirmedBy: null,
    onStageAt: null,
    votingOpen: false,
    votingClosedAt: null,
  };
  db.performances.push(p);
  recomputeNext(db, sessionId);
  return p;
}

export function movePerformance(db: Db, performanceId: string, direction: "up" | "down"): void {
  const p = findPerformance(db, performanceId);
  if (!p) return;
  const perfs = sessionPerformances(db, p.sessionId);
  const i = perfs.findIndex((x) => x.id === p.id);
  const other = perfs[direction === "up" ? i - 1 : i + 1];
  if (!other) return;
  [p.runningOrder, other.runningOrder] = [other.runningOrder, p.runningOrder];
  recomputeNext(db, p.sessionId);
}

/** Solo se puede quitar una actuación sin votos (para no perder datos por error). */
export function removePerformance(db: Db, performanceId: string): boolean {
  if (db.votes.some((v) => v.performanceId === performanceId)) return false;
  const p = findPerformance(db, performanceId);
  if (!p) return false;
  db.performances = db.performances.filter((x) => x.id !== performanceId);
  sessionPerformances(db, p.sessionId).forEach((x, i) => (x.runningOrder = i + 1));
  recomputeNext(db, p.sessionId);
  return true;
}

// ─── Ajustes y registro ──────────────────────────────────────────────────────

export const SETTING_LIMITS: Record<
  keyof Omit<DbSettings, "currentSessionId" | "shareSponsor" | "shareHashtags">,
  { min: number; max: number; label: string }
> = {
  minVotes: { min: 1, max: 1000, label: "Votos mínimos para publicar la nota" },
  consolidatedVotes: { min: 1, max: 10000, label: "Votos para que deje de ser provisional" },
  trimEvery: { min: 2, max: 100, label: "De cada N votos se quita uno arriba y uno abajo" },
  crowdThreshold: { min: 1, max: 100, label: "Personas que deben pulsar «¡Ya ha salido!»" },
  crowdWindowMinutes: { min: 1, max: 30, label: "…en estos minutos" },
  minMinutesBetweenPerformances: { min: 0, max: 60, label: "Minutos mínimos entre actuaciones" },
};

export function audit(db: Db, actor: string, action: string, detail: string, now: Date): void {
  db.audit.unshift({ id: crypto.randomUUID(), at: now.toISOString(), actor, action, detail });
  if (db.audit.length > 2000) db.audit.length = 2000;
}

export function shareHashtags(db: Db): string[] {
  return db.settings.shareHashtags ?? DEFAULT_HASHTAGS;
}
