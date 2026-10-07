import { beforeEach, describe, expect, it } from "vitest";
import {
  addPerformance,
  castVote,
  closeSessionVoting,
  findPerformance,
  movePerformance,
  palcoScore,
  removePerformance,
  reportOnStage,
  sessionPerformances,
  sessionView,
  setGroupWithdrawn,
  setStageStatus,
  setUserBlocked,
  visiblePalcoScores,
} from "./logic";
import type { Db } from "./schema";
import { seedDb } from "./seed";

const TODAY = "2027-01-10";
const NOW = new Date("2027-01-10T21:40:00Z");
const minutesLater = (m: number) => new Date(NOW.getTime() + m * 60000);
let db: Db;

beforeEach(() => {
  db = seedDb(TODAY, NOW);
});

describe("votar", () => {
  it("guarda el voto y lo cambia si se vuelve a votar", () => {
    expect(castVote(db, { userId: "u1", performanceId: "p3", score: 70, now: NOW })).toEqual({ ok: true });
    expect(castVote(db, { userId: "u1", performanceId: "p3", score: 90, now: NOW })).toEqual({ ok: true });
    const mine = db.votes.filter((v) => v.userId === "u1");
    expect(mine).toHaveLength(1);
    expect(mine[0].score).toBe(90);
  });

  it("rechaza votar con la votación cerrada, notas no válidas o cuentas bloqueadas", () => {
    expect(castVote(db, { userId: "u1", performanceId: "p5", score: 70, now: NOW })).toEqual({ ok: false, error: "closed" });
    expect(castVote(db, { userId: "u1", performanceId: "p3", score: 101, now: NOW })).toEqual({ ok: false, error: "invalid" });
    castVote(db, { userId: "u1", performanceId: "p3", score: 70, now: NOW });
    setUserBlocked(db, "u1", true, "multicuentas");
    expect(castVote(db, { userId: "u1", performanceId: "p1", score: 70, now: NOW })).toEqual({ ok: false, error: "blocked" });
  });

  it("los votos de cuentas bloqueadas dejan de contar para El Palco", () => {
    const before = palcoScore(db, "p1");
    for (let i = 0; i < 50; i++) castVote(db, { userId: `troll-${i}`, performanceId: "p1", score: 0, now: NOW });
    const attacked = palcoScore(db, "p1");
    for (let i = 0; i < 50; i++) setUserBlocked(db, `troll-${i}`, true);
    expect(attacked).not.toEqual(before);
    expect(palcoScore(db, "p1")).toEqual(before);
  });

  it("no enseña la nota de una votación abierta a quien no ha votado (PAL-01)", () => {
    expect(visiblePalcoScores(db, "u1", ["p1"])).toEqual({});
    castVote(db, { userId: "u1", performanceId: "p1", score: 80, now: NOW });
    expect(Object.keys(visiblePalcoScores(db, "u1", ["p1"]))).toEqual(["p1"]);
    closeSessionVoting(db, "s3", NOW);
    expect(Object.keys(visiblePalcoScores(db, "u2", ["p1", "p2"]))).toEqual(["p1", "p2"]);
  });
});

describe("en escena", () => {
  it("con 5 avisos de la afición, la siguiente pasa a escena y la anterior termina", () => {
    const later = minutesLater(15);
    for (let i = 1; i <= 4; i++) {
      expect(reportOnStage(db, { userId: `u${i}`, performanceId: "p4", now: later })).toEqual({ ok: true, confirmed: false });
    }
    expect(reportOnStage(db, { userId: "u5", performanceId: "p4", now: later })).toEqual({ ok: true, confirmed: true });
    expect(findPerformance(db, "p4")).toMatchObject({ stageStatus: "on_stage", confirmedBy: "crowd", votingOpen: true });
    expect(findPerformance(db, "p3")?.stageStatus).toBe("finished");
    expect(findPerformance(db, "p5")?.stageStatus).toBe("next");
  });

  it("la misma persona solo cuenta una vez", () => {
    const later = minutesLater(15);
    for (let i = 0; i < 10; i++) reportOnStage(db, { userId: "u1", performanceId: "p4", now: later });
    expect(findPerformance(db, "p4")?.stageStatus).toBe("next");
  });

  it("no se puede confirmar demasiado pronto ni saltarse el orden", () => {
    expect(reportOnStage(db, { userId: "u1", performanceId: "p4", now: minutesLater(2) })).toEqual({ ok: false, error: "too_soon" });
    expect(reportOnStage(db, { userId: "u1", performanceId: "p6", now: minutesLater(15) })).toEqual({ ok: false, error: "not_next" });
  });

  it("si una agrupación no actúa, la siguiente pasa a ser la próxima", () => {
    setStageStatus(db, "p4", "not_performing", NOW);
    expect(findPerformance(db, "p4")?.stageStatus).toBe("not_performing");
    expect(findPerformance(db, "p5")?.stageStatus).toBe("next");
  });
});

describe("gestión de sesiones", () => {
  it("cerrar la sesión cierra todas sus votaciones", () => {
    expect(closeSessionVoting(db, "s3", NOW)).toBe(3);
    expect(db.performances.every((p) => !p.votingOpen)).toBe(true);
  });

  it("añadir, mover y quitar actuaciones mantiene el orden", () => {
    const p = addPerformance(db, "s3", "g1", "01:30");
    expect(p.runningOrder).toBe(8);
    movePerformance(db, p.id, "up");
    expect(sessionPerformances(db, "s3").map((x) => x.id).slice(-2)).toEqual([p.id, "p7"]);
    expect(removePerformance(db, p.id)).toBe(true);
    expect(sessionPerformances(db, "s3").map((x) => x.runningOrder)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("no deja quitar una actuación que ya tiene votos", () => {
    expect(removePerformance(db, "p1")).toBe(false);
  });

  it("una agrupación retirada desaparece de la sesión y no se puede votar", () => {
    setGroupWithdrawn(db, "g3", true);
    expect(sessionView(db, "s3", TODAY)?.performances.map((p) => p.id)).not.toContain("p3");
    expect(castVote(db, { userId: "u1", performanceId: "p3", score: 70, now: NOW })).toEqual({ ok: false, error: "not_found" });
  });
});
