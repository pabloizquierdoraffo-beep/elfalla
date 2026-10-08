// Pruebas contra el simulador de Firestore (npm run test:firestore).
// Comprueban lo que solo se ve con una base de datos de verdad: transacciones y votos a la vez.

import { beforeAll, describe, expect, it } from "vitest";
import { castVote, palcoScore, setUserBlocked } from "@/lib/db/logic";
import { ensureData, loadTallies, read, transact } from "@/lib/db/firestore-store";
import { computePalcoScore } from "@/lib/palco";

const PROJECT = process.env.FIREBASE_PROJECT_ID ?? "demo-elfalla";

async function vote(userId: string, performanceId: string, score: number) {
  return transact({ performances: [performanceId], users: [userId], votes: [{ userId, performanceId }] }, (db) =>
    castVote(db, { userId, performanceId, score, now: new Date() }),
  );
}

async function scoreOf(performanceId: string) {
  const db = await read({});
  db.tallies = await loadTallies([performanceId]);
  return palcoScore(db, performanceId);
}

beforeAll(async () => {
  await fetch(`http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT}/databases/(default)/documents`, {
    method: "DELETE",
  });
  await ensureData();
});

describe("Firestore (simulador)", () => {
  it("carga los datos de prueba con sus notas", async () => {
    const score = await scoreOf("p1");
    expect(score).toMatchObject({ status: "published", votes: 212 });
  });

  it("80 personas votando a la vez la misma actuación: no se pierde ningún voto", async () => {
    const votes = Array.from({ length: 80 }, (_, i) => (i * 37) % 101);
    const results = await Promise.all(votes.map((score, i) => vote(`masivo-${i}`, "p4", score)));
    expect(results.every((r) => r.ok === false)).toBe(true); // p4 aún no está en escena: votación cerrada

    const open = await Promise.all(votes.map((score, i) => vote(`masivo-${i}`, "p3", score)));
    expect(open.every((r) => r.ok)).toBe(true);
    const db = await read({});
    const seeded = (await loadTallies(["p3"]))["p3"].reduce((a, b) => a + b, 0);
    expect(seeded).toBe(18 + 80);
    expect(db.settings.minVotes).toBe(30);
  });

  it("cambiar el voto no suma un voto nuevo y la nota coincide con el cálculo voto a voto", async () => {
    await vote("cambia", "p2", 10);
    await vote("cambia", "p2", 90);
    const tally = (await loadTallies(["p2"]))["p2"];
    expect(tally.reduce((a, b) => a + b, 0)).toBe(45 + 1);
    expect(tally[10]).toBeGreaterThanOrEqual(0);

    const all = await read({ sessionPerformancesOf: ["s3"] });
    const votesSnap = await import("@/lib/firebase/admin").then(({ getDb }) =>
      getDb().collection("votes").where("performanceId", "==", "p2").get(),
    );
    const scores = votesSnap.docs.map((d) => d.get("score") as number);
    expect(scores).toHaveLength(46);
    expect(await scoreOf("p2")).toEqual(computePalcoScore(scores, all.settings));
  });

  it("bloquear resta todos sus votos de El Palco y desbloquear los devuelve", async () => {
    await vote("troll", "p1", 0);
    await vote("troll", "p2", 0);
    const before = { p1: await scoreOf("p1"), p2: await scoreOf("p2") };

    await transact({ votesOfUser: "troll" }, (db) => setUserBlocked(db, "troll", true, "prueba"));
    expect((await scoreOf("p1")).votes).toBe(before.p1.votes - 1);
    expect((await scoreOf("p2")).votes).toBe(before.p2.votes - 1);

    // Bloqueado, ya no puede votar.
    expect(await vote("troll", "p3", 0)).toEqual({ ok: false, error: "blocked" });

    await transact({ votesOfUser: "troll" }, (db) => setUserBlocked(db, "troll", false));
    expect(await scoreOf("p1")).toEqual(before.p1);
    expect(await scoreOf("p2")).toEqual(before.p2);
  });

  it("un voto por persona: el documento del voto lleva su identificador fijo", async () => {
    await vote("unico", "p1", 50);
    await vote("unico", "p1", 60);
    const { getDb } = await import("@/lib/firebase/admin");
    const mine = await getDb().collection("votes").where("userId", "==", "unico").get();
    expect(mine.size).toBe(1);
    expect(mine.docs[0].id).toBe("unico_p1");
    const user = await getDb().collection("users").doc("unico").get();
    expect(user.get("votesCount")).toBe(1);
  });
});
