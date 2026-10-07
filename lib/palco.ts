// Nota de El Palco (documento 02).
// Función pura: recibe los votos válidos de una actuación y devuelve la nota.

export type PalcoSettings = {
  /** Votos mínimos para publicar nota. */
  minVotes: number;
  /** Votos a partir de los cuales la nota deja de ser provisional. */
  consolidatedVotes: number;
  /** De cada N votos se quita uno por arriba y uno por abajo ("como el jurado"). */
  trimEvery: number;
};

export const DEFAULT_PALCO_SETTINGS: PalcoSettings = {
  minVotes: 30,
  consolidatedVotes: 100,
  trimEvery: 5,
};

export type PalcoScore =
  | { status: "no_score"; votes: number; missing: number }
  | { status: "provisional" | "published"; votes: number; score: number };

/** Cuántos votos se quitan por cada lado. */
export function trimCount(votes: number, trimEvery = DEFAULT_PALCO_SETTINGS.trimEvery): number {
  return Math.floor(votes / trimEvery);
}

export function computePalcoScore(
  votes: readonly number[],
  settings: PalcoSettings = DEFAULT_PALCO_SETTINGS,
): PalcoScore {
  for (const v of votes) {
    if (!Number.isInteger(v) || v < 0 || v > 100) {
      throw new RangeError(`Voto no válido: ${v}`);
    }
  }

  const n = votes.length;
  if (n < settings.minVotes) {
    return { status: "no_score", votes: n, missing: settings.minVotes - n };
  }

  const sorted = [...votes].sort((a, b) => a - b);
  const k = trimCount(n, settings.trimEvery);
  const central = sorted.slice(k, n - k);
  const sum = central.reduce((acc, v) => acc + v, 0);

  return {
    status: n < settings.consolidatedVotes ? "provisional" : "published",
    votes: n,
    score: roundToTenth(sum, central.length),
  };
}

/**
 * Redondea sum/count a un decimal, con los medios hacia arriba (78,45 → 78,5).
 * Se hace con enteros para evitar errores de coma flotante.
 */
function roundToTenth(sum: number, count: number): number {
  return Math.floor((20 * sum + count) / (2 * count)) / 10;
}
