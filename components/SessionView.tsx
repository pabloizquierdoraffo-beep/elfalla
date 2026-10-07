"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { simulatedVotes } from "@/lib/demo-data";
import { formatScore } from "@/lib/format";
import { useLocalVotes, type LocalVote } from "@/lib/local-votes";
import { computePalcoScore } from "@/lib/palco";
import { CATEGORY_LABEL, PHASE_LABEL, type Performance, type Session } from "@/lib/types";
import { IndependentNotice, Isotipo } from "./Brand";
import { StageChip } from "./StageChip";
import { ThemeToggle } from "./ThemeToggle";

export const WELCOME_KEY = "elfalla:bienvenida-vista";

export function SessionView({ session }: { session: Session }) {
  const router = useRouter();
  const { votes } = useLocalVotes();

  // La primera vez se enseña la bienvenida (CUE-06).
  useEffect(() => {
    try {
      if (!localStorage.getItem(WELCOME_KEY)) router.replace("/bienvenida");
    } catch {
      // Sin almacenamiento: se entra directamente.
    }
  }, [router]);

  const onStage = session.performances.find(
    (p) => p.stageStatus === "on_stage" || p.stageStatus === "probably_on_stage",
  );
  const next = session.performances.find((p) => p.stageStatus === "next");
  const done = session.performances.filter((p) => p.stageStatus === "finished");
  const later = session.performances.filter((p) => p.stageStatus === "scheduled");

  return (
    <div>
      <header className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2">
          <Isotipo />
          <span className="font-display text-xl tracking-wide text-marca">EL FALLA</span>
        </div>
        <ThemeToggle />
      </header>

      <div className="px-4 pb-3">
        <h1 className="font-display text-[28px] leading-tight">
          {PHASE_LABEL[session.phase]} · Sesión {session.number}
        </h1>
        <p className="text-texto-2">
          {session.dateLabel}, {session.startsAt}
        </p>
      </div>

      {onStage && <OnStageCard performance={onStage} vote={votes[onStage.id]} />}
      {next && <NextCard performance={next} />}

      {done.length > 0 && (
        <Section title="Ya han actuado">
          {done.map((p) => (
            <DoneRow key={p.id} performance={p} vote={votes[p.id]} />
          ))}
        </Section>
      )}

      {later.length > 0 && (
        <Section title="Más tarde">
          {later.map((p) => (
            <li key={p.id} className="flex items-baseline justify-between gap-3 py-3">
              <span>
                <span className="text-texto-2">{p.runningOrder}. </span>
                {CATEGORY_LABEL[p.group.category]} · {p.group.name}
              </span>
              <span className="cifras shrink-0 text-sm text-texto-2">~{p.expectedTime}</span>
            </li>
          ))}
        </Section>
      )}

      <IndependentNotice className="px-4 pt-6" />
    </div>
  );
}

function OnStageCard({ performance, vote }: { performance: Performance; vote?: LocalVote }) {
  return (
    <section className="mx-4 rounded-xl border-l-4 border-directo-claro bg-superficie p-4">
      <StageChip status={performance.stageStatus} />
      <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-texto-2">
        {CATEGORY_LABEL[performance.group.category]}
      </p>
      <h2 className="font-display text-2xl leading-tight">{performance.group.name}</h2>
      <p className="text-texto-2">Autor: {performance.group.authors}</p>
      <Link
        href={`/votar/${performance.id}`}
        className="mt-4 flex min-h-14 items-center justify-center rounded-xl bg-marca text-lg font-semibold text-sobre-marca active:opacity-90"
      >
        {vote ? `Cambiar tu nota (${vote.score})` : "Puntuar"}
      </Link>
    </section>
  );
}

function NextCard({ performance }: { performance: Performance }) {
  const [reported, setReported] = useState(false);
  return (
    <section className="mx-4 mt-3 rounded-xl border border-borde p-4">
      <p className="cifras text-sm font-semibold uppercase tracking-wide text-texto-2">
        Siguiente · hacia las {performance.expectedTime}
      </p>
      <p className="mt-1">
        {CATEGORY_LABEL[performance.group.category]} · {performance.group.name}
      </p>
      {reported ? (
        <p className="mt-3 text-sm text-acierto">Gracias. Esperando a que lo confirmen más personas.</p>
      ) : (
        <button
          type="button"
          onClick={() => setReported(true)}
          className="mt-3 min-h-12 rounded-xl border border-directo px-4 font-semibold text-directo active:bg-superficie"
        >
          ¡Ya ha salido!
        </button>
      )}
    </section>
  );
}

function DoneRow({ performance, vote }: { performance: Performance; vote?: LocalVote }) {
  const others = simulatedVotes(performance.id);
  const score = computePalcoScore(vote ? [...others, vote.score] : others);

  return (
    <li className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p>
          <span className="text-texto-2">{performance.runningOrder}. </span>
          {CATEGORY_LABEL[performance.group.category]} · {performance.group.name}
        </p>
        <p className="cifras text-sm text-texto-2">
          {vote ? (
            <>
              Tu nota: {vote.score} ·{" "}
              {score.status === "no_score"
                ? `El Palco: faltan ${score.missing} votos`
                : `El Palco ${formatScore(score.score)}`}
            </>
          ) : (
            "Votación abierta"
          )}
        </p>
      </div>
      {!vote && (
        <Link
          href={`/votar/${performance.id}`}
          className="flex min-h-12 shrink-0 items-center rounded-xl border border-marca px-4 font-semibold text-marca"
        >
          Votar
        </Link>
      )}
    </li>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mx-4 mt-6">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-texto-2">{title}</h2>
      <ul className="divide-y divide-borde">{children}</ul>
    </section>
  );
}
