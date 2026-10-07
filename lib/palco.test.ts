import { describe, expect, it } from "vitest";
import { computePalcoScore, trimCount } from "./palco";

// Ejemplo del documento 02, apartado 3.
const EJEMPLO_30 = [
  5, 52, 54, 56, 56, 60, 61, 62, 67, 68, 68, 69, 69, 69, 70, 71, 71, 72, 73, 73, 74, 75, 79, 81,
  81, 84, 86, 87, 95, 100,
];

describe("nota de El Palco", () => {
  it("reproduce el ejemplo del documento 02 (30 votos → 70,7 provisional)", () => {
    expect(computePalcoScore(EJEMPLO_30)).toEqual({ status: "provisional", votes: 30, score: 70.7 });
  });

  it("no da nota con menos de 30 votos y dice cuántos faltan", () => {
    expect(computePalcoScore(EJEMPLO_30.slice(0, 18))).toEqual({
      status: "no_score",
      votes: 18,
      missing: 12,
    });
    expect(computePalcoScore([])).toEqual({ status: "no_score", votes: 0, missing: 30 });
  });

  it("es provisional de 30 a 99 votos y normal desde 100", () => {
    expect(computePalcoScore(Array(99).fill(80)).status).toBe("provisional");
    expect(computePalcoScore(Array(100).fill(80))).toEqual({
      status: "published",
      votes: 100,
      score: 80,
    });
  });

  it("quita uno por arriba y uno por abajo de cada 5 votos", () => {
    expect(trimCount(30)).toBe(6);
    expect(trimCount(34)).toBe(6);
    expect(trimCount(35)).toBe(7);
    expect(trimCount(100)).toBe(20);
  });

  it("los extremos no mueven la nota", () => {
    const votos = [...Array(28).fill(70), 0, 100];
    expect(computePalcoScore(votos)).toMatchObject({ score: 70 });
  });

  it("quita posiciones, no valores repetidos", () => {
    // 30 votos: 6 por abajo y 6 por arriba. Hay 10 votos de 90: se quitan 6 y quedan 4.
    const votos = [...Array(20).fill(60), ...Array(10).fill(90)];
    // Quedan 14 × 60 (tras quitar 6) y 4 × 90 → (840 + 360) / 18 = 66,67 → 66,7
    expect(computePalcoScore(votos)).toMatchObject({ score: 66.7 });
  });

  it("redondea los medios hacia arriba sin errores de coma flotante", () => {
    // 30 votos, centrales (18): diecisiete 70 y un 71 → 1261/18 = 70,055… → 70,1
    const votos = [...Array(6).fill(0), ...Array(17).fill(70), 71, ...Array(6).fill(100)];
    expect(computePalcoScore(votos)).toMatchObject({ score: 70.1 });
    // 1269/18 = 70,5 exacto → 70,5
    const exacto = [...Array(6).fill(0), ...Array(9).fill(70), ...Array(9).fill(71), ...Array(6).fill(100)];
    expect(computePalcoScore(exacto)).toMatchObject({ score: 70.5 });
  });

  it("rechaza votos fuera de 0-100 o con decimales", () => {
    expect(() => computePalcoScore([101])).toThrow(RangeError);
    expect(() => computePalcoScore([-1])).toThrow(RangeError);
    expect(() => computePalcoScore([70.5])).toThrow(RangeError);
  });
});
