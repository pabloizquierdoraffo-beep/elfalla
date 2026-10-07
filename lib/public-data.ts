import "server-only";

// Lo que necesita cada página pública, leído en el servidor.

import { sessionView, userVotes, visiblePalcoScores } from "./db/logic";
import { readDb, todayInCadiz } from "./db/store";
import { getVisitorId } from "./visitor";

export async function loadCurrentSession() {
  const [db, userId] = await Promise.all([readDb(), getVisitorId()]);
  const sessionId = db.settings.currentSessionId;
  const session = sessionId ? sessionView(db, sessionId, todayInCadiz()) : null;
  if (!session) return null;
  const mine = userId ? userVotes(db, userId) : {};
  const myVotes = Object.fromEntries(Object.entries(mine).map(([id, v]) => [id, { score: v.score }]));
  const palco = visiblePalcoScores(db, userId, session.performances.map((p) => p.id));
  return { session, myVotes, palco };
}
