// Datos de prueba. Todos los nombres de agrupaciones y autores son INVENTADOS.
// Se sustituirán por la base de datos real (Supabase) más adelante.

import type { Performance, Session } from "./types";

const performances: Performance[] = [
  {
    id: "p1",
    group: { id: "g1", name: "El Vapor de Levante", category: "coro", authors: "M. Ruiz" },
    runningOrder: 1,
    expectedTime: "20:00",
    stageStatus: "finished",
    votingOpen: true,
  },
  {
    id: "p2",
    group: { id: "g2", name: "Tres Gaviotas y un Farol", category: "cuarteto", authors: "A. Gómez" },
    runningOrder: 2,
    expectedTime: "20:55",
    stageStatus: "finished",
    votingOpen: true,
  },
  {
    id: "p3",
    group: { id: "g3", name: "Los del Muelle Viejo", category: "comparsa", authors: "J. Pérez" },
    runningOrder: 3,
    expectedTime: "21:35",
    stageStatus: "on_stage",
    votingOpen: true,
  },
  {
    id: "p4",
    group: { id: "g4", name: "Las de la Marea Baja", category: "chirigota", authors: "R. Sánchez" },
    runningOrder: 4,
    expectedTime: "22:20",
    stageStatus: "next",
    votingOpen: false,
  },
  {
    id: "p5",
    group: { id: "g5", name: "Brisa de Poniente", category: "coro", authors: "L. Moreno" },
    runningOrder: 5,
    expectedTime: "23:05",
    stageStatus: "scheduled",
    votingOpen: false,
  },
  {
    id: "p6",
    group: { id: "g6", name: "Los Faroleros de Santa María", category: "comparsa", authors: "P. Díaz" },
    runningOrder: 6,
    expectedTime: "23:55",
    stageStatus: "scheduled",
    votingOpen: false,
  },
  {
    id: "p7",
    group: { id: "g7", name: "Los que Llegan Tarde", category: "chirigota", authors: "C. Romero" },
    runningOrder: 7,
    expectedTime: "00:40",
    stageStatus: "scheduled",
    votingOpen: false,
  },
];

export const demoSession: Session = {
  id: "s3",
  phase: "preliminares",
  number: 3,
  dateLabel: "Hoy",
  startsAt: "20:00",
  nextPhase: "cuartos",
  performances,
};

export function findPerformance(id: string): Performance | undefined {
  return demoSession.performances.find((p) => p.id === id);
}

export function onStagePerformance(): Performance | undefined {
  return demoSession.performances.find(
    (p) => p.stageStatus === "on_stage" || p.stageStatus === "probably_on_stage",
  );
}

// Votos simulados de otras personas, siempre los mismos (generador con semilla).
const SIMULATED: Record<string, { count: number; mean: number }> = {
  p1: { count: 212, mean: 79 },
  p2: { count: 45, mean: 74 },
  p3: { count: 18, mean: 82 },
};

export function simulatedVotes(performanceId: string): number[] {
  const conf = SIMULATED[performanceId];
  if (!conf) return [];
  const rand = seeded(performanceId);
  return Array.from({ length: conf.count }, () => {
    // Suma de tres aleatorios ≈ campana alrededor de la media.
    const noise = (rand() + rand() + rand() - 1.5) * 24;
    return Math.max(0, Math.min(100, Math.round(conf.mean + noise)));
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
