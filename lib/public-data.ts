import "server-only";

// Lo que necesita cada página pública, leído en el servidor.
// Lo que es igual para todo el mundo (sesión, actuaciones, agrupaciones y notas) se guarda
// en caché unos segundos (GEN-07); lo de cada persona (sus votos) se lee siempre al momento.

import { unstable_cache } from "next/cache";
import { sessionView, shareHashtags, userVotes, visiblePalcoScores } from "./db/logic";
import { read, todayInCadiz } from "./db/firestore-store";
import type { Db } from "./db/schema";
import { getVisitorId } from "./visitor";

export const PUBLIC_TAG = "publico";

/** Datos comunes de una sesión (o de la sesión actual si no se indica). Caché de 5 segundos. */
export const publicSlice = unstable_cache(
  async (sessionId: string | null): Promise<Db> => {
    const base = await read({});
    const id = sessionId ?? base.settings.currentSessionId;
    if (!id) return base;
    return read({ sessionPerformancesOf: [id], talliesOfLoaded: true });
  },
  ["slice-publico"],
  { revalidate: 5, tags: [PUBLIC_TAG] },
);

/** Añade a los datos comunes los votos y la ficha de esta persona. */
export async function withPersonalData(db: Db, userId: string | null): Promise<Db> {
  if (!userId) return db;
  const personal = await read({
    users: [userId],
    votes: db.performances.map((p) => ({ userId, performanceId: p.id })),
  });
  return { ...db, users: personal.users, votes: personal.votes };
}

export async function loadCurrentSession() {
  const userId = await getVisitorId();
  const db = await withPersonalData(await publicSlice(null), userId);
  const sessionId = db.settings.currentSessionId;
  const session = sessionId ? sessionView(db, sessionId, todayInCadiz()) : null;
  if (!session) return null;
  const mine = userId ? userVotes(db, userId) : {};
  const myVotes = Object.fromEntries(Object.entries(mine).map(([id, v]) => [id, { score: v.score }]));
  const palco = visiblePalcoScores(db, userId, session.performances.map((p) => p.id));
  const canShareNight = session.performances.some((p) => {
    const dbp = db.performances.find((x) => x.id === p.id);
    return dbp && !dbp.votingOpen && dbp.votingClosedAt && palco[p.id] && palco[p.id].status !== "no_score";
  });
  return { session, myVotes, palco, canShareNight, hashtags: shareHashtags(db) };
}

