"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { simulatedVotes } from "@/lib/demo-data";
import { formatScore } from "@/lib/format";
import { useLocalVotes } from "@/lib/local-votes";
import { computePalcoScore } from "@/lib/palco";
import { CATEGORY_LABEL, PHASE_LABEL, type Performance, type PhaseKind } from "@/lib/types";
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

  return (
    <div className="flex min-h-[calc(100dvh-6rem)] flex-col px-4 pt-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="-ml-2 flex h-12 items-center gap-1 pr-3 text-texto-2">
          <BackIcon className="h-5 w-5" /> Volver
        </Link>
        <StageChip status={performance.stageStatus} />
      </div>

      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-texto-2">
        {CATEGORY_LABEL[performance.group.category]} · {PHASE_LABEL[phase]}
      </p>
      <h1 className="font-display text-[28px] leading-tight">{performance.group.name}</h1>

      <div className="flex flex-1 flex-col justify-center py-8">
        <p className="cifras text-center font-display text-[56px] leading-none text-marca" aria-live="polite">
          {shown ?? "–"}
        </p>
        <label htmlFor="nota" className="mt-2 block text-center text-texto-2">
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
          className="deslizador mt-6"
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
        <p className="mt-6 text-center text-sm text-texto-2">Ficha de jurado completa: próximamente</p>
      </div>

      <button
        type="button"
        onClick={send}
        disabled={shown === null}
        className="mb-4 min-h-14 rounded-xl bg-marca text-lg font-semibold text-sobre-marca disabled:opacity-40"
      >
        {previous && value === null ? "Mantener mi nota" : "Enviar"}
      </button>
    </div>
  );
}

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
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-marca text-sobre-marca">
          <CheckIcon className="h-9 w-9" />
        </span>
        <h1 className="mt-3 font-display text-[28px]">¡Voto enviado!</h1>
        <p className="text-texto-2">{performance.group.name}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-superficie p-4">
          <p className="text-sm font-semibold tracking-wide text-texto-2">TU NOTA</p>
          <p className="cifras font-display text-5xl">{myScore}</p>
        </div>
        <PalcoScoreBox score={palco} />
      </div>
      {comparison && <p className="mt-3 text-center text-texto-2">{comparison}</p>}

      <div className="mt-6 rounded-xl border border-borde p-4">
        <p className="font-semibold">¿La ves en {PHASE_LABEL[nextPhase]}?</p>
        {answer ? (
          <p className="mt-2 text-acierto">Anotado. Los resultados se verán al cerrar la votación.</p>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAnswer("si")}
              className="min-h-12 rounded-xl border border-marca font-semibold text-marca"
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => setAnswer("no")}
              className="min-h-12 rounded-xl border border-marca font-semibold text-marca"
            >
              No
            </button>
          </div>
        )}
      </div>

      <Link
        href="/"
        className="mt-6 flex min-h-14 items-center justify-center rounded-xl bg-marca text-lg font-semibold text-sobre-marca"
      >
        Volver al directo
      </Link>
    </div>
  );
}
