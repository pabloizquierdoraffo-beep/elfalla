const oneDecimal = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/** 70.7 → "70,7" */
export function formatScore(score: number): string {
  return oneDecimal.format(score);
}

const integer = new Intl.NumberFormat("es-ES");

/** 1204 → "1.204" */
export function formatCount(n: number): string {
  return integer.format(n);
}
