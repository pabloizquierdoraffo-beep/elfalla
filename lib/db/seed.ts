// Datos de prueba para arrancar. Todos los nombres de agrupaciones y autores son INVENTADOS.

import { DEFAULT_PALCO_SETTINGS } from "../palco";
import type { Category, StageStatus } from "../types";
import type { Db, DbPerformance } from "./schema";

const GROUPS: { id: string; name: string; category: Category; authors: string }[] = [
  { id: "g1", name: "El Vapor de Levante", category: "coro", authors: "M. Ruiz" },
  { id: "g2", name: "Tres Gaviotas y un Farol", category: "cuarteto", authors: "A. Gómez" },
  { id: "g3", name: "Los del Muelle Viejo", category: "comparsa", authors: "J. Pérez" },
  { id: "g4", name: "Las de la Marea Baja", category: "chirigota", authors: "R. Sánchez" },
  { id: "g5", name: "Brisa de Poniente", category: "coro", authors: "L. Moreno" },
  { id: "g6", name: "Los Faroleros de Santa María", category: "comparsa", authors: "P. Díaz" },
  { id: "g7", name: "Los que Llegan Tarde", category: "chirigota", authors: "C. Romero" },
];

const PERFORMANCES: [id: string, groupId: string, time: string, status: StageStatus][] = [
  ["p1", "g1", "20:00", "finished"],
  ["p2", "g2", "20:55", "finished"],
  ["p3", "g3", "21:35", "on_stage"],
  ["p4", "g4", "22:20", "next"],
  ["p5", "g5", "23:05", "scheduled"],
  ["p6", "g6", "23:55", "scheduled"],
  ["p7", "g7", "00:40", "scheduled"],
];

// Votos de una afición inventada, para que haya notas de El Palco que enseñar.
const SIMULATED: Record<string, { count: number; mean: number }> = {
  p1: { count: 212, mean: 79 },
  p2: { count: 45, mean: 74 },
  p3: { count: 18, mean: 82 },
};

export function seedDb(today: string, now: Date): Db {
  const performances: DbPerformance[] = PERFORMANCES.map(([id, groupId, time, status], i) => ({
    id,
    sessionId: "s3",
    groupId,
    runningOrder: i + 1,
    expectedTime: time,
    stageStatus: status,
    confirmedBy: status === "finished" || status === "on_stage" ? "crowd" : null,
    onStageAt: status === "finished" || status === "on_stage" ? now.toISOString() : null,
    votingOpen: status === "finished" || status === "on_stage",
    votingClosedAt: null,
  }));

  const maxVoters = Math.max(...Object.values(SIMULATED).map((s) => s.count));
  const users = Array.from({ length: maxVoters }, (_, i) => ({
    id: `demo-${String(i + 1).padStart(4, "0")}`,
    alias: `Aficionado ${i + 1}`,
    status: "active" as const,
    createdAt: now.toISOString(),
    demo: true,
  }));

  const votes = Object.entries(SIMULATED).flatMap(([performanceId, conf]) =>
    simulatedScores(performanceId, conf.count, conf.mean).map((score, i) => ({
      userId: users[i].id,
      performanceId,
      score,
      kind: "quick" as const,
      at: now.toISOString(),
    })),
  );

  return {
    version: 1,
    users,
    groups: GROUPS.map((g) => ({ ...g, withdrawn: false })),
    sessions: [{ id: "s3", phase: "preliminares", number: 3, date: today, startsAt: "20:00" }],
    performances,
    votes,
    reports: [],
    settings: {
      ...DEFAULT_PALCO_SETTINGS,
      crowdThreshold: 5,
      crowdWindowMinutes: 2,
      minMinutesBetweenPerformances: 10,
      currentSessionId: "s3",
    },
    audit: [],
  };
}

function simulatedScores(seed: string, count: number, mean: number): number[] {
  const rand = seeded(seed);
  return Array.from({ length: count }, () => {
    // Suma de tres aleatorios ≈ campana alrededor de la media.
    const noise = (rand() + rand() + rand() - 1.5) * 24;
    return Math.max(0, Math.min(100, Math.round(mean + noise)));
  });
}

function seeded(seed: string): () => number {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}
