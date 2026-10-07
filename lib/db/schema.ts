// Forma de los datos guardados (documento 07, simplificado para esta fase).
// Hoy se guardan en un archivo JSON; más adelante, en la base de datos real.

import type { PalcoSettings } from "../palco";
import type { Category, PhaseKind, StageStatus } from "../types";

export type UserStatus = "active" | "blocked";

/** Mientras no haya cuentas, cada móvil es un "visitante" anónimo con su identificador. */
export type DbUser = {
  id: string;
  alias: string | null;
  status: UserStatus;
  createdAt: string;
  blockedReason?: string;
  /** Votantes inventados para la versión de prueba. */
  demo?: boolean;
};

export type DbGroup = {
  id: string;
  name: string;
  category: Category;
  authors: string;
  photoUrl?: string;
  /** Retirada del concurso: no aparece en las sesiones ni se puede votar. */
  withdrawn: boolean;
};

export type DbSession = {
  id: string;
  phase: PhaseKind;
  number: number;
  /** "2027-01-08" */
  date: string;
  /** "20:00" */
  startsAt: string;
};

export type ConfirmedBy = "schedule" | "crowd" | "staff";

export type DbPerformance = {
  id: string;
  sessionId: string;
  groupId: string;
  runningOrder: number;
  expectedTime: string;
  stageStatus: StageStatus;
  confirmedBy: ConfirmedBy | null;
  onStageAt: string | null;
  votingOpen: boolean;
  votingClosedAt: string | null;
};

export type DbVote = {
  userId: string;
  performanceId: string;
  score: number;
  kind: "quick" | "full";
  at: string;
};

/** Avisos "¡Ya ha salido!" de la afición. */
export type DbReport = { performanceId: string; userId: string; at: string };

export type DbSettings = PalcoSettings & {
  /** Personas distintas que tienen que pulsar "¡Ya ha salido!"… */
  crowdThreshold: number;
  /** …en estos minutos. */
  crowdWindowMinutes: number;
  /** Minutos mínimos entre que sale una agrupación y se puede confirmar la siguiente. */
  minMinutesBetweenPerformances: number;
  /** La sesión que se ve en Inicio. */
  currentSessionId: string | null;
};

export type AuditEntry = { id: string; at: string; actor: string; action: string; detail: string };

export type Db = {
  version: 1;
  users: DbUser[];
  groups: DbGroup[];
  sessions: DbSession[];
  performances: DbPerformance[];
  votes: DbVote[];
  reports: DbReport[];
  settings: DbSettings;
  audit: AuditEntry[];
};
