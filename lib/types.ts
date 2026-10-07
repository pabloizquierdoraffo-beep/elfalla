// Tipos del dominio (documento 07, modelo de datos).

export type Category = "coro" | "comparsa" | "chirigota" | "cuarteto";

export const CATEGORY_LABEL: Record<Category, string> = {
  coro: "Coro",
  comparsa: "Comparsa",
  chirigota: "Chirigota",
  cuarteto: "Cuarteto",
};

export const CATEGORY_PLURAL: Record<Category, string> = {
  coro: "Coros",
  comparsa: "Comparsas",
  chirigota: "Chirigotas",
  cuarteto: "Cuartetos",
};

export const CATEGORIES: Category[] = ["comparsa", "chirigota", "coro", "cuarteto"];

export type PhaseKind = "preliminares" | "cuartos" | "semifinal" | "final";

export const PHASE_LABEL: Record<PhaseKind, string> = {
  preliminares: "Preliminares",
  cuartos: "Cuartos",
  semifinal: "Semifinal",
  final: "Final",
};

export type StageStatus =
  | "scheduled"
  | "next"
  | "probably_on_stage"
  | "on_stage"
  | "finished"
  | "not_performing";

export type Group = {
  id: string;
  name: string;
  category: Category;
  authors: string;
};

export type Performance = {
  id: string;
  group: Group;
  runningOrder: number;
  /** Hora prevista ya ajustada con el retraso de la noche, "HH:MM". */
  expectedTime: string;
  stageStatus: StageStatus;
  votingOpen: boolean;
};

export type Session = {
  id: string;
  phase: PhaseKind;
  number: number;
  dateLabel: string;
  startsAt: string;
  /** Fase siguiente, para preguntas como "¿La ves en Cuartos?". */
  nextPhase: PhaseKind;
  performances: Performance[];
};
