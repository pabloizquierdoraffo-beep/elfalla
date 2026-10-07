import Link from "next/link";
import { formatCount, formatScore } from "@/lib/format";
import type { PalcoScore } from "@/lib/palco";

/**
 * La caja "EL PALCO" con sus estados (PAL-01 a PAL-04).
 * `hidden`: la votación está abierta y la persona aún no ha votado.
 */
export function PalcoScoreBox({ score, hidden = false }: { score: PalcoScore; hidden?: boolean }) {
  return (
    <div className="rounded-xl bg-superficie p-4">
      <p className="text-sm font-semibold tracking-wide text-marca">EL PALCO</p>
      {hidden ? (
        <p className="mt-1 text-texto-2">Vota y descubre qué opina El Palco</p>
      ) : score.status === "no_score" ? (
        <p className="mt-1 text-texto">
          Faltan <strong className="cifras">{score.missing}</strong> votos para la nota
        </p>
      ) : (
        <>
          <p className="cifras font-display text-5xl text-marca">{formatScore(score.score)}</p>
          <p className="cifras text-sm text-texto-2">
            {formatCount(score.votes)} votos
            {score.status === "provisional" && (
              <span className="ml-2 rounded-full border border-texto-2 px-2 py-0.5 text-xs">Provisional</span>
            )}
          </p>
        </>
      )}
      <Link href="/como-funciona" className="mt-2 inline-block text-sm text-texto-2 underline underline-offset-2">
        ¿Cómo se calcula?
      </Link>
    </div>
  );
}
