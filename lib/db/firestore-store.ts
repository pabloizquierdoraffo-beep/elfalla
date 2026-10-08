import "server-only";

// Almacén en Firestore.
//
// Las reglas de negocio (lib/db/logic.ts) trabajan sobre un objeto `Db` en memoria. Aquí:
// 1. se carga en un `Db` solo el trozo de datos que necesita cada operación ("slice"),
// 2. se ejecuta la regla de siempre,
// 3. se guardan solo los documentos que han cambiado, todo dentro de una transacción.
//
// La nota de El Palco no se calcula leyendo todos los votos: cada actuación tiene un histograma
// (cuántos votos hay de cada nota) repartido en 10 trozos, que se actualiza con incrementos.

import {
  FieldValue,
  type DocumentReference,
  type DocumentSnapshot,
  type Firestore,
  type Query,
  type QuerySnapshot,
  type Transaction,
} from "firebase-admin/firestore";
import { getDb, usingEmulator } from "../firebase/admin";
import { DEFAULT_PALCO_SETTINGS, emptyHistogram } from "../palco";
import type { Db, DbSettings, DbUser, DbVote } from "./schema";
import { seedDb } from "./seed";

export const TALLY_SHARDS = 10;

const COL = {
  settings: "settings",
  users: "users",
  groups: "groups",
  sessions: "sessions",
  performances: "performances",
  votes: "votes",
  reports: "reports",
  audit: "audit",
  tallies: "palcoTallies",
} as const;

export const DEFAULT_SETTINGS: DbSettings = {
  ...DEFAULT_PALCO_SETTINGS,
  crowdThreshold: 5,
  crowdWindowMinutes: 2,
  minMinutesBetweenPerformances: 10,
  currentSessionId: null,
};

export const voteId = (userId: string, performanceId: string) => `${userId}_${performanceId}`;
const reportId = (performanceId: string, userId: string) => `${performanceId}_${userId}`;

// ─── Lectura ─────────────────────────────────────────────────────────────────

/** Lee igual dentro o fuera de una transacción. */
type Reader = {
  doc(ref: DocumentReference): Promise<DocumentSnapshot>;
  docs(refs: DocumentReference[]): Promise<DocumentSnapshot[]>;
  query(q: Query): Promise<QuerySnapshot>;
};

function reader(tx?: Transaction): Reader {
  return {
    doc: (ref) => (tx ? tx.get(ref) : ref.get()),
    docs: async (refs) => (refs.length === 0 ? [] : tx ? tx.getAll(...refs) : getDb().getAll(...refs)),
    query: (q) => (tx ? tx.get(q) : q.get()),
  };
}

export function emptySlice(settings: DbSettings = DEFAULT_SETTINGS): Db {
  return {
    version: 1,
    users: [],
    groups: [],
    sessions: [],
    performances: [],
    votes: [],
    reports: [],
    settings,
    audit: [],
    tallies: {},
  };
}

/** Qué hay que cargar para una operación. */
export type SliceSpec = {
  allSessions?: boolean;
  allGroups?: boolean;
  sessions?: string[];
  /** Todas las actuaciones de estas sesiones, con sus agrupaciones. */
  sessionPerformancesOf?: string[];
  /** Esta actuación y todas las de su sesión, con sus agrupaciones. */
  performanceWithSession?: string;
  /** Solo estas actuaciones, con su sesión y su agrupación (lo mínimo para votar). */
  performances?: string[];
  groups?: string[];
  users?: string[];
  votes?: { userId: string; performanceId: string }[];
  /** Todos los votos de esta persona (para bloquear o desbloquear). */
  votesOfUser?: string;
  /** Un voto cualquiera de la actuación (para saber si ya tiene votos). */
  anyVoteOf?: string;
  /** Avisos "¡Ya ha salido!" de esta actuación, con sus autores. */
  reportsOf?: string;
  /** Histogramas de estas actuaciones (solo fuera de transacciones). */
  tallies?: string[];
  /** Histogramas de todas las actuaciones cargadas (solo fuera de transacciones). */
  talliesOfLoaded?: boolean;
};

function push<T>(list: T[], items: T[], key: (x: T) => string) {
  const seen = new Set(list.map(key));
  for (const item of items) if (!seen.has(key(item))) list.push(item), seen.add(key(item));
}

const data = <T>(snap: DocumentSnapshot): T | null => (snap.exists ? (snap.data() as T) : null);

export async function loadSlice(spec: SliceSpec, tx?: Transaction): Promise<Db> {
  const fs = getDb();
  const r = reader(tx);
  const settings = data<DbSettings>(await r.doc(fs.collection(COL.settings).doc("global")));
  const db = emptySlice({ ...DEFAULT_SETTINGS, ...settings });

  const sessionIds = new Set(spec.sessions ?? []);
  const groupIds = new Set(spec.groups ?? []);
  const userIds = new Set(spec.users ?? []);

  if (spec.allSessions) {
    const snap = await r.query(fs.collection(COL.sessions));
    push(db.sessions, snap.docs.map((d) => d.data() as Db["sessions"][number]), (s) => s.id);
  }

  const perfSessions = new Set(spec.sessionPerformancesOf ?? []);
  if (spec.performanceWithSession) {
    const p = data<Db["performances"][number]>(await r.doc(fs.collection(COL.performances).doc(spec.performanceWithSession)));
    if (p) perfSessions.add(p.sessionId);
  }
  for (const snap of await r.docs((spec.performances ?? []).map((id) => fs.collection(COL.performances).doc(id)))) {
    const p = data<Db["performances"][number]>(snap);
    if (!p) continue;
    push(db.performances, [p], (x) => x.id);
    sessionIds.add(p.sessionId);
    groupIds.add(p.groupId);
  }
  for (const sessionId of perfSessions) {
    sessionIds.add(sessionId);
    const snap = await r.query(fs.collection(COL.performances).where("sessionId", "==", sessionId));
    const perfs = snap.docs.map((d) => d.data() as Db["performances"][number]);
    push(db.performances, perfs, (p) => p.id);
    perfs.forEach((p) => groupIds.add(p.groupId));
  }

  const missingSessions = [...sessionIds].filter((id) => !db.sessions.some((s) => s.id === id));
  for (const snap of await r.docs(missingSessions.map((id) => fs.collection(COL.sessions).doc(id)))) {
    const s = data<Db["sessions"][number]>(snap);
    if (s) push(db.sessions, [s], (x) => x.id);
  }

  if (spec.allGroups) {
    const snap = await r.query(fs.collection(COL.groups));
    push(db.groups, snap.docs.map((d) => d.data() as Db["groups"][number]), (g) => g.id);
  }
  const missingGroups = [...groupIds].filter((id) => !db.groups.some((g) => g.id === id));
  for (const snap of await r.docs(missingGroups.map((id) => fs.collection(COL.groups).doc(id)))) {
    const g = data<Db["groups"][number]>(snap);
    if (g) push(db.groups, [g], (x) => x.id);
  }

  const votes: DbVote[] = [];
  for (const snap of await r.docs((spec.votes ?? []).map((v) => fs.collection(COL.votes).doc(voteId(v.userId, v.performanceId))))) {
    const v = data<DbVote>(snap);
    if (v) votes.push(v);
  }
  if (spec.votesOfUser) {
    userIds.add(spec.votesOfUser);
    const snap = await r.query(fs.collection(COL.votes).where("userId", "==", spec.votesOfUser));
    votes.push(...snap.docs.map((d) => d.data() as DbVote));
  }
  if (spec.anyVoteOf) {
    const snap = await r.query(fs.collection(COL.votes).where("performanceId", "==", spec.anyVoteOf).limit(1));
    votes.push(...snap.docs.map((d) => d.data() as DbVote));
  }
  push(db.votes, votes, (v) => voteId(v.userId, v.performanceId));
  // Cada voto cargado lleva cargada a su persona: hace falta para saber si cuenta (bloqueos).
  db.votes.forEach((v) => userIds.add(v.userId));

  if (spec.reportsOf) {
    const snap = await r.query(fs.collection(COL.reports).where("performanceId", "==", spec.reportsOf));
    const reports = snap.docs.map((d) => d.data() as Db["reports"][number]);
    push(db.reports, reports, (x) => reportId(x.performanceId, x.userId));
    reports.forEach((x) => userIds.add(x.userId));
  }

  for (const snap of await r.docs([...userIds].map((id) => fs.collection(COL.users).doc(id)))) {
    const u = data<DbUser>(snap);
    if (u) push(db.users, [u], (x) => x.id);
  }

  if (!tx) {
    const ids = new Set(spec.tallies ?? []);
    if (spec.talliesOfLoaded) db.performances.forEach((p) => ids.add(p.id));
    db.tallies = await loadTallies([...ids]);
  }
  return db;
}

/** Suma los 10 trozos del histograma de cada actuación. */
export async function loadTallies(performanceIds: string[]): Promise<Record<string, number[]>> {
  const fs = getDb();
  const out: Record<string, number[]> = {};
  await Promise.all(
    performanceIds.map(async (id) => {
      const snap = await fs.collection(COL.tallies).doc(id).collection("shards").get();
      const histogram = emptyHistogram();
      for (const shard of snap.docs) {
        const counts = (shard.get("c") ?? {}) as Record<string, number>;
        for (const [score, n] of Object.entries(counts)) histogram[Number(score)] += n;
      }
      out[id] = histogram;
    }),
  );
  return out;
}

// ─── Escritura ───────────────────────────────────────────────────────────────

type Keyed = { col: string; key: (x: never) => string; list: (db: Db) => unknown[] };

const KEYED: Keyed[] = [
  { col: COL.users, key: (x: DbUser) => x.id, list: (db) => db.users },
  { col: COL.groups, key: (x: Db["groups"][number]) => x.id, list: (db) => db.groups },
  { col: COL.sessions, key: (x: Db["sessions"][number]) => x.id, list: (db) => db.sessions },
  { col: COL.performances, key: (x: Db["performances"][number]) => x.id, list: (db) => db.performances },
  { col: COL.votes, key: (x: DbVote) => voteId(x.userId, x.performanceId), list: (db) => db.votes },
  { col: COL.reports, key: (x: Db["reports"][number]) => reportId(x.performanceId, x.userId), list: (db) => db.reports },
] as Keyed[];

/** Lo que aporta cada voto al histograma: 1 si su autor no está bloqueado. */
function contributions(db: Db): Map<string, number> {
  const blocked = new Set(db.users.filter((u) => u.status === "blocked").map((u) => u.id));
  const out = new Map<string, number>();
  for (const v of db.votes) {
    if (blocked.has(v.userId)) continue;
    const key = `${v.performanceId}|${v.score}`;
    out.set(key, (out.get(key) ?? 0) + 1);
  }
  return out;
}

/** Guarda en la transacción solo lo que ha cambiado entre `before` y `after`. */
function writeChanges(fs: Firestore, tx: Transaction, before: Db, after: Db) {
  for (const k of KEYED) {
    const old = new Map((k.list(before) as never[]).map((x) => [k.key(x), JSON.stringify(x)]));
    const now = new Map((k.list(after) as never[]).map((x) => [k.key(x), x]));
    for (const [id, doc] of now) {
      if (old.get(id) !== JSON.stringify(doc)) tx.set(fs.collection(k.col).doc(id), JSON.parse(JSON.stringify(doc)));
    }
    for (const id of old.keys()) if (!now.has(id)) tx.delete(fs.collection(k.col).doc(id));
  }

  if (JSON.stringify(before.settings) !== JSON.stringify(after.settings)) {
    tx.set(fs.collection(COL.settings).doc("global"), JSON.parse(JSON.stringify(after.settings)));
  }

  const known = new Set(before.audit.map((a) => a.id));
  for (const entry of after.audit) if (!known.has(entry.id)) tx.set(fs.collection(COL.audit).doc(entry.id), entry);

  // Histogramas: diferencia de aportaciones antes y después, con incrementos en un trozo al azar.
  const was = contributions(before);
  const is = contributions(after);
  const deltas = new Map<string, Record<string, FieldValue>>();
  for (const key of new Set([...was.keys(), ...is.keys()])) {
    const d = (is.get(key) ?? 0) - (was.get(key) ?? 0);
    if (d === 0) continue;
    const [performanceId, score] = key.split("|");
    const counts = deltas.get(performanceId) ?? {};
    counts[score] = FieldValue.increment(d);
    deltas.set(performanceId, counts);
  }
  for (const [performanceId, counts] of deltas) {
    const shard = String(Math.floor(Math.random() * TALLY_SHARDS));
    tx.set(fs.collection(COL.tallies).doc(performanceId).collection("shards").doc(shard), { c: counts }, { merge: true });
  }
}

/**
 * Carga un trozo de datos, aplica una regla y guarda los cambios, todo en una transacción.
 * Si dos personas cambian lo mismo a la vez, Firestore repite la operación con los datos nuevos.
 */
export async function transact<T>(spec: SliceSpec, change: (db: Db) => T): Promise<T> {
  await ensureData();
  const fs = getDb();
  return fs.runTransaction(async (tx) => {
    const db = await loadSlice({ ...spec, tallies: undefined, talliesOfLoaded: false }, tx);
    const before: Db = JSON.parse(JSON.stringify(db));
    const result = change(db);
    writeChanges(fs, tx, before, db);
    return result;
  });
}

/** Lectura sin transacción (con histogramas, si se piden). */
export async function read(spec: SliceSpec): Promise<Db> {
  await ensureData();
  return loadSlice(spec);
}

// ─── Consultas del panel ─────────────────────────────────────────────────────

export type UserFilter = "reales" | "bloqueados" | "prueba";

export async function listUsers(filter: UserFilter, limit = 100): Promise<DbUser[]> {
  await ensureData();
  const col = getDb().collection(COL.users);
  const q =
    filter === "bloqueados"
      ? col.where("status", "==", "blocked")
      : col.where("demo", "==", filter === "prueba");
  const snap = await q.limit(1000).get();
  return snap.docs
    .map((d) => d.data() as DbUser)
    .sort((a, b) => (b.lastVoteAt ?? b.createdAt).localeCompare(a.lastVoteAt ?? a.createdAt))
    .slice(0, limit);
}

export async function userCounts(): Promise<{ real: number; blocked: number; votes: number }> {
  await ensureData();
  const fs = getDb();
  const [real, blocked, votes] = await Promise.all([
    fs.collection(COL.users).where("demo", "==", false).count().get(),
    fs.collection(COL.users).where("status", "==", "blocked").count().get(),
    fs.collection(COL.votes).count().get(),
  ]);
  return { real: real.data().count, blocked: blocked.data().count, votes: votes.data().count };
}

export async function listAudit(limit = 200): Promise<Db["audit"]> {
  await ensureData();
  const snap = await getDb().collection(COL.audit).orderBy("at", "desc").limit(limit).get();
  return snap.docs.map((d) => d.data() as Db["audit"][number]);
}

// ─── Datos iniciales ─────────────────────────────────────────────────────────

let ready: Promise<void> | null = null;

/**
 * La primera vez crea los ajustes. En el simulador (o con ELFALLA_DATOS_PRUEBA=1) carga además
 * las agrupaciones inventadas de prueba. En el proyecto real nunca se cargan sin pedirlo.
 */
export function ensureData(): Promise<void> {
  ready ??= (async () => {
    const fs = getDb();
    const ref = fs.collection(COL.settings).doc("global");
    if ((await ref.get()).exists) return;
    const demo = usingEmulator() || process.env.ELFALLA_DATOS_PRUEBA === "1";
    if (!demo) {
      await ref.create(DEFAULT_SETTINGS).catch(() => undefined);
      return;
    }
    await writeSeed(fs, seedDb(todayInCadiz(), new Date()));
  })().catch((error) => {
    ready = null; // si falla (por ejemplo, sin conexión), se reintenta en la siguiente petición
    throw error;
  });
  return ready;
}

async function writeSeed(fs: Firestore, db: Db) {
  const writes: [DocumentReference, object][] = [];
  for (const k of KEYED) {
    for (const item of k.list(db) as never[]) writes.push([fs.collection(k.col).doc(k.key(item)), item]);
  }
  const tallies = new Map<string, Record<string, number>>();
  for (const v of db.votes) {
    const counts = tallies.get(v.performanceId) ?? {};
    counts[v.score] = (counts[v.score] ?? 0) + 1;
    tallies.set(v.performanceId, counts);
  }
  for (const [id, c] of tallies) writes.push([fs.collection(COL.tallies).doc(id).collection("shards").doc("0"), { c }]);
  for (let i = 0; i < writes.length; i += 400) {
    const batch = fs.batch();
    writes.slice(i, i + 400).forEach(([ref, value]) => batch.set(ref, value));
    await batch.commit();
  }
  // Los ajustes van los últimos: si existen, los datos de prueba están completos.
  await fs.collection(COL.settings).doc("global").set(db.settings);
}

/** Fecha de hoy en Cádiz, "AAAA-MM-DD". */
export function todayInCadiz(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(now);
}
