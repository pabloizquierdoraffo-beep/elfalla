import Link from "next/link";
import { IndependentNotice } from "@/components/Brand";
import { BackIcon } from "@/components/Icons";
import { DEFAULT_PALCO_SETTINGS as S } from "@/lib/palco";

export const metadata = { title: "Cómo funciona El Palco · El Falla" };

const STEPS = [
  "Cada persona da una nota del 0 al 100. Un voto por persona y actuación; puedes cambiarlo mientras la votación esté abierta.",
  `Igual que en el jurado se quita la nota más alta y la más baja, aquí, de cada ${S.trimEvery} votos, quitamos uno por arriba y uno por abajo.`,
  "Con el resto hacemos la media, con un decimal.",
  `Con menos de ${S.minVotes} votos no hay nota. Hasta ${S.consolidatedVotes}, es “provisional”.`,
];

export default function ComoFuncionaPage() {
  return (
    <div className="px-4 pt-3">
      <Link href="/" className="-ml-2 flex h-12 w-fit items-center gap-1 pr-3 text-texto-2">
        <BackIcon className="h-5 w-5" /> Volver
      </Link>
      <h1 className="font-display text-[28px] leading-tight">Cómo funciona El Palco</h1>
      <p className="mt-2 text-lg">El Palco es la nota de toda la afición.</p>

      <ol className="mt-6 space-y-4">
        {STEPS.map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="cifras flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-marca font-semibold text-sobre-marca">
              {i + 1}
            </span>
            <p>{text}</p>
          </li>
        ))}
      </ol>

      <details className="mt-8 rounded-xl bg-superficie p-4">
        <summary className="min-h-8 cursor-pointer font-semibold">Ejemplo con 30 votos</summary>
        <div className="cifras mt-3 space-y-2 text-sm">
          <p>Con 30 votos se quitan 6 por abajo y 6 por arriba.</p>
          <p>
            <span className="text-texto-2">Se quitan:</span> 5 · 52 · 54 · 56 · 56 · 60 y 81 · 84 · 86 · 87 · 95 ·
            100
          </p>
          <p>
            <span className="text-texto-2">Quedan 18 votos</span> que suman 1.272.
          </p>
          <p>
            1.272 ÷ 18 = 70,67 → <strong>El Palco: 70,7</strong> (provisional)
          </p>
        </div>
      </details>

      <p className="mt-6 text-texto-2">
        No es una nota oficial: es lo que opina la afición que vota en El Falla.
      </p>
      <IndependentNotice className="mt-4" />
    </div>
  );
}
