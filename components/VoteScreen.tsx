"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { simulatedVotes } from "@/lib/demo-data";
import { formatScore } from "@/lib/format";
import { useLocalVotes } from "@/lib/local-votes";
import { computePalcoScore } from "@/lib/palco";
import { CATEGORY_LABEL, PHASE_LABEL, type Performance, type PhaseKind } from "@/lib/types";
import { CATEGORY_BG, CategoryIcon } from "./CategoryIcon";
import { BackIcon, CheckIcon } from "./Icons";
import { PalcoScoreBox } from "./PalcoScoreBox";
import { StageChip } from "./StageChip";

type Props = { performance: Performance; phase: PhaseKind; nextPhase: PhaseKind };

export function VoteScreen({ performance, phase, nextPhase }: Props) {
  const { votes, saveVote } = useLocalVotes();
  const previous = votes[performance.id];
  const [value, setValue] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const lastTen = useRef<number | null>(null);

  const shown = value ?? previous?.score ?? null;

  function onSlide(v: number) {
    // Vibración suave cada 10 puntos, si el móvil lo permite.
    const ten = Math.floor(v / 10);
    if (lastTen.current !== null && ten !== lastTen.current) navigator.vibrate?.(8);
    lastTen.current = ten;
    setValue(v);
  }

  function send() {
    if (shown === null) return;
    saveVote(performance.id, shown);
    setSent(true);
  }

  if (sent && shown !== null) {
    return <Confirmation performance={performance} myScore={shown} nextPhase={nextPhase} />;
  }

  const category = performance.group.category;

  return (
    <div className="flex min-h-[calc(100dvh-5rem)] flex-col">
      {/* Bloque de color de la modalidad: sustituye a la foto (sin imágenes con derechos). */}
      <div className={`relative flex h-48 shrink-0 items-center justify-center ${CATEGORY_BG[category]}`}>
        <Link
          href="/"
          aria-label="Volver"
          className="absolute left-3 top-3 flex h-12 w-12 items-center justify-center rounded-full bg-fondo/70 text-texto"
        >
          <BackIcon className="h-6 w-6" />
        </Link>
        <span className="absolute right-4 top-4 rounded-full bg-fondo">
          <StageChip status={performance.stageStatus} />
        </span>
        <CategoryIcon category={category} className="h-24 w-24 text-texto opacity-80" />
      </div>

      <div className="relative -mt-6 flex flex-1 flex-col rounded-t-3xl bg-fondo px-5 pt-5">
        <span className={`w-fit rounded-full px-3 py-0.5 text-sm font-semibold text-texto ${CATEGORY_BG[category]}`}>
          {CATEGORY_LABEL[category]} · {PHASE_LABEL[phase]}
        </span>
        <h1 className="mt-2 font-display text-[30px] leading-tight">{performance.group.name}</h1>
        <p className="text-texto-2">Autor: {performance.group.authors}</p>

        <div className="flex flex-1 flex-col justify-center py-6">
          <p className="cifras text-center font-display text-[64px] leading-none text-marca" aria-live="polite">
            {shown ?? "–"}
          </p>
          <label htmlFor="nota" className="mt-1 block text-center text-texto-2">
            ¿Cuánto te ha gustado?
          </label>
          <input
            id="nota"
            type="range"
            min={0}
            max={100}
            step={1}
            value={shown ?? 50}
            data-intacto={shown === null}
            onChange={(e) => onSlide(Number(e.target.value))}
            style={{ ["--relleno" as string]: `${shown ?? 0}%` }}
            className="deslizador mt-5"
          />
          <div className="cifras flex justify-between px-1 text-xs text-texto-2" aria-hidden>
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((n) => (
              <span key={n}>{n % 50 === 0 ? n : "·"}</span>
            ))}
          </div>
          {previous && value === null && (
            <p className="mt-4 text-center text-sm text-texto-2">
              Tu nota: {previous.score}. Puedes cambiarla hasta mañana a las 19:00.
            </p>
          )}
          <p className="mt-5 text-center text-sm text-texto-2">Ficha de jurado completa: próximamente</p>
        </div>

        <button
          type="button"
          onClick={send}
          disabled={shown === null}
          className="mb-4 min-h-14 rounded-2xl bg-marca text-lg font-bold text-sobre-marca shadow-md disabled:opacity-40 disabled:shadow-none"
        >
          {previous && value === null ? "Mantener mi nota" : "Enviar voto"}
        </button>
      </div>
    </div>
  );
}

// Chispas de colores al confirmar el voto: un toque de fiesta breve, sin confeti a lo bruto.
const SPARKS = [
  { dx: -70, dy: -40, color: "bg-coro" },
  { dx: 70, dy: -45, color: "bg-cuarteto" },
  { dx: -55, dy: 45, color: "bg-comparsa" },
  { dx: 60, dy: 40, color: "bg-chirigota" },
  { dx: 0, dy: -70, color: "bg-directo-claro" },
  { dx: -85, dy: 5, color: "bg-cuarteto" },
  { dx: 88, dy: 0, color: "bg-coro" },
];

function Confirmation({
  performance,
  myScore,
  nextPhase,
}: {
  performance: Performance;
  myScore: number;
  nextPhase: PhaseKind;
}) {
  const palco = computePalcoScore([...simulatedVotes(performance.id), myScore]);
  const [answer, setAnswer] = useState<"si" | "no" | null>(null);

  let comparison: string | null = null;
  if (palco.status !== "no_score") {
    const diff = Math.round((myScore - palco.score) * 10) / 10;
    if (Math.abs(diff) < 1) comparison = "Piensas casi igual que El Palco";
    else
      comparison = `Eres ${formatScore(Math.abs(diff))} puntos más ${diff < 0 ? "exigente" : "generoso"} que El Palco`;
  }

  return (
    <div className="px-4 pt-8">
      <div className="aparecer flex flex-col items-center text-center">
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-marca text-sobre-marca">
          <CheckIcon className="h-10 w-10" />
          {SPARKS.map((s, i) => (
            <span
              key={i}
              aria-hidden
              className={`chispa absolute h-3 w-3 rounded-full ${s.color}`}
              style={{ ["--dx" as string]: `${s.dx}px`, ["--dy" as string]: `${s.dy}px`, animationDelay: `${i * 40}ms` }}
            />
          ))}
        </span>
        <h1 className="mt-3 font-display text-[28px]">¡Voto enviado!</h1>
        <p className="text-texto-2">{performance.group.name}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-superficie p-4">
          <p className="text-sm font-semibold tracking-wide text-texto-2">TU NOTA</p>
          <p className="cifras font-display text-5xl">{myScore}</p>
        </div>
        <PalcoScoreBox score={palco} />
      </div>
      {comparison && <p className="mt-3 text-center text-texto-2">{comparison}</p>}

      <div className="mt-6 rounded-2xl border border-borde p-4">
        <p className="font-semibold">¿La ves en {PHASE_LABEL[nextPhase]}?</p>
        {answer ? (
          <p className="mt-2 text-acierto">Anotado. Los resultados se verán al cerrar la votación.</p>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAnswer("si")}
              className="min-h-12 rounded-xl bg-chirigota font-bold text-texto"
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => setAnswer("no")}
              className="min-h-12 rounded-xl bg-coro font-bold text-texto"
            >
              No
            </button>
          </div>
        )}
      </div>

      <Link
        href="/"
        className="mt-6 flex min-h-14 items-center justify-center rounded-2xl bg-marca text-lg font-bold text-sobre-marca"
      >
        Volver al directo
      </Link>
    </div>
  );
}
