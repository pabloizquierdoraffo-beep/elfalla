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

/** Histograma vacío: posición n = cuántos votos de n puntos (0 a 100). */
export function emptyHistogram(): number[] {
  return Array.from({ length: 101 }, () => 0);
}

/**
 * La misma nota de El Palco, pero a partir del histograma de votos (cuántos hay de cada nota).
 * Es lo que guarda la base de datos para no tener que leer todos los votos uno a uno.
 * Da exactamente el mismo resultado que computePalcoScore.
 */
export function computePalcoScoreFromHistogram(
  histogram: readonly number[],
  settings: PalcoSettings = DEFAULT_PALCO_SETTINGS,
): PalcoScore {
  if (histogram.length !== 101 || histogram.some((c) => !Number.isInteger(c) || c < 0)) {
    throw new RangeError("Histograma no válido");
  }
  const n = histogram.reduce((acc, c) => acc + c, 0);
  if (n < settings.minVotes) {
    return { status: "no_score", votes: n, missing: settings.minVotes - n };
  }

  // Se quitan k votos por abajo y k por arriba recorriendo el histograma, sin desplegarlo.
  const k = trimCount(n, settings.trimEvery);
  const remaining = [...histogram];
  let low = k;
  for (let score = 0; low > 0; score++) {
    const take = Math.min(low, remaining[score]);
    remaining[score] -= take;
    low -= take;
  }
  let high = k;
  for (let score = 100; high > 0; score--) {
    const take = Math.min(high, remaining[score]);
    remaining[score] -= take;
    high -= take;
  }
  const sum = remaining.reduce((acc, c, score) => acc + c * score, 0);

  return {
    status: n < settings.consolidatedVotes ? "provisional" : "published",
    votes: n,
    score: roundToTenth(sum, n - 2 * k),
  };
}

/**
 * Redondea sum/count a un decimal, con los medios hacia arriba (78,45 → 78,5).
 * Se hace con enteros para evitar errores de coma flotante.
 */
function roundToTenth(sum: number, count: number): number {
  return Math.floor((20 * sum + count) / (2 * count)) / 10;
}
