"use client";

import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { submitVote } from "@/app/actions";
import { formatScore } from "@/lib/format";
import type { PalcoScore } from "@/lib/palco";
import { CATEGORY_LABEL, PHASE_LABEL, type Performance, type PhaseKind } from "@/lib/types";
import { CATEGORY_BG, CategoryIcon } from "./CategoryIcon";
import { BackIcon, CheckIcon } from "./Icons";
import { PalcoScoreBox } from "./PalcoScoreBox";
import { PhotoBackdrop } from "./PhotoBackdrop";
import { ShareButton } from "./ShareButton";

type Props = {
  performance: Performance;
  phase: PhaseKind;
  nextPhase: PhaseKind;
  previousScore: number | null;
  blocked: boolean;
};

const ERRORS = {
  closed: "La votación de esta actuación ya está cerrada.",
  blocked: "Tu acceso está bloqueado y no puedes votar.",
  invalid: "Esa nota no es válida.",
  not_found: "Esta actuación ya no está disponible.",
  no_visitor: "No hemos podido identificarte. Recarga la página.",
} as const;

export function VoteScreen({ performance, phase, nextPhase, previousScore, blocked }: Props) {
  const [value, setValue] = useState<number | null>(null);
  const [result, setResult] = useState<{ score: number; palco: PalcoScore } | null>(null);
  const [error, setError] = useState<string | null>(blocked ? ERRORS.blocked : null);
  const [pending, startTransition] = useTransition();
  const lastTen = useRef<number | null>(null);

  const shown = value ?? previousScore;

  function onSlide(v: number) {
    // Vibración suave cada 10 puntos, si el móvil lo permite.
    const ten = Math.floor(v / 10);
    if (lastTen.current !== null && ten !== lastTen.current) navigator.vibrate?.(8);
    lastTen.current = ten;
    setValue(v);
  }

  function send() {
    if (shown === null) return;
    const score = shown;
    startTransition(async () => {
      const response = await submitVote(performance.id, score);
      if (response.ok) setResult({ score, palco: response.palco });
      else setError(ERRORS[response.error]);
    });
  }

  if (result) {
    return <Confirmation performance={performance} myScore={result.score} palco={result.palco} nextPhase={nextPhase} />;
  }

  const category = performance.group.category;

  return (
    <div className="flex min-h-[calc(100dvh-5rem)] flex-col">
      {/* Cabecera: la foto de la agrupación si la hay; si no, el telón del Falla. */}
      <div className="relative flex h-56 shrink-0 items-center justify-center overflow-hidden text-[#f8f3e7]">
        <PhotoBackdrop src={performance.group.photoUrl ?? "/fotos/telon.jpg"} position="center 40%" priority />
        <Link
          href="/"
          aria-label="Volver"
          className="absolute left-3 top-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur"
        >
          <BackIcon className="h-6 w-6" />
        </Link>
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-directo-claro px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#2a1a1f]">
          <span className="latido h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
          {performance.stageStatus === "on_stage" ? "En escena" : "Votación abierta"}
        </span>
        <span className={`relative flex h-20 w-20 items-center justify-center rounded-3xl shadow-xl ${CATEGORY_BG[category]}`}>
          <CategoryIcon category={category} className="h-11 w-11" />
        </span>
      </div>

      <div className="relative -mt-6 flex flex-1 flex-col rounded-t-3xl bg-fondo px-5 pt-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-oro">
          {CATEGORY_LABEL[category]} · {PHASE_LABEL[phase]}
        </p>
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
          {previousScore !== null && value === null && (
            <p className="mt-4 text-center text-sm text-texto-2">
              Tu nota: {previousScore}. Puedes cambiarla mientras la votación siga abierta.
            </p>
          )}
          <p className="mt-5 text-center text-sm text-texto-2">Ficha de jurado completa: próximamente</p>
        </div>

        {error && (
          <p role="alert" className="mb-3 rounded-xl bg-superficie px-4 py-3 text-center text-directo">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={send}
          disabled={shown === null || pending || blocked}
          className="mb-4 min-h-14 rounded-2xl bg-marca text-lg font-bold text-sobre-marca shadow-md disabled:opacity-40 disabled:shadow-none"
        >
          {pending ? "Enviando…" : previousScore !== null && value === null ? "Mantener mi nota" : "Enviar voto"}
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
  palco,
  nextPhase,
}: {
  performance: Performance;
  myScore: number;
  palco: PalcoScore;
  nextPhase: PhaseKind;
}) {
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
              className="min-h-12 rounded-xl bg-chirigota font-bold text-[#f8f3e7]"
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => setAnswer("no")}
              className="min-h-12 rounded-xl bg-coro font-bold text-[#f8f3e7]"
            >
              No
            </button>
          </div>
        )}
      </div>

      <ShareButton
        className="mt-6"
        label="Compartir mi nota"
        imageUrl={`/tarjeta/nota/${performance.id}?n=${myScore}`}
        pageUrl={`/c/nota/${performance.id}?n=${myScore}`}
        text={`Le he dado un ${myScore} a ${performance.group.name} en El Falla. ¿Y tú?`}
        fileName={`el-falla-mi-nota-${myScore}.png`}
      />

      <Link
        href="/"
        className="mt-3 flex min-h-14 items-center justify-center rounded-2xl bg-marca text-lg font-bold text-sobre-marca"
      >
        Volver al directo
      </Link>
    </div>
  );
}
