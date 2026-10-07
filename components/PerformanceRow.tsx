"use client";

import Link from "next/link";
import { simulatedVotes } from "@/lib/demo-data";
import { formatScore } from "@/lib/format";
import type { LocalVote } from "@/lib/local-votes";
import { computePalcoScore } from "@/lib/palco";
import { CATEGORY_LABEL, type Performance } from "@/lib/types";
import { CategoryAvatar } from "./CategoryIcon";

/** Fila de una actuación: número de orden, bloque de color, nombre y estado a la derecha. */
export function PerformanceRow({ performance, vote }: { performance: Performance; vote?: LocalVote }) {
  const onStage = performance.stageStatus === "on_stage" || performance.stageStatus === "probably_on_stage";

  const content = (
    <>
      <span className="cifras w-5 shrink-0 text-center font-semibold text-texto-2">{performance.runningOrder}</span>
      <CategoryAvatar category={performance.group.category} photoUrl={performance.group.photoUrl} />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold">{performance.group.name}</span>
        <span className="block text-sm text-texto-2">{CATEGORY_LABEL[performance.group.category]}</span>
      </span>
      <RowStatus performance={performance} vote={vote} onStage={onStage} />
    </>
  );

  const rowClass = "flex min-h-16 items-center gap-3 rounded-2xl px-2 py-2";
  return (
    <li>
      {performance.votingOpen ? (
        <Link href={`/votar/${performance.id}`} className={`${rowClass} active:bg-superficie`}>
          {content}
        </Link>
      ) : (
        <div className={rowClass}>{content}</div>
      )}
    </li>
  );
}

function RowStatus({ performance, vote, onStage }: { performance: Performance; vote?: LocalVote; onStage: boolean }) {
  if (vote) {
    const score = computePalcoScore([...simulatedVotes(performance.id), vote.score]);
    return (
      <span className="cifras shrink-0 text-right">
        <span className="block font-display text-xl leading-none text-marca">
          {score.status === "no_score" ? "–" : formatScore(score.score)}
        </span>
        <span className="block text-xs text-texto-2">tu nota {vote.score}</span>
      </span>
    );
  }
  if (onStage) {
    return (
      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-directo px-2.5 py-1 text-xs font-bold uppercase text-fondo">
        <span className="latido h-1.5 w-1.5 rounded-full bg-fondo" aria-hidden />
        En escena
      </span>
    );
  }
  if (performance.votingOpen) {
    return <span className="shrink-0 rounded-full border border-marca px-3 py-1 text-sm font-semibold text-marca">Votar</span>;
  }
  return <span className="cifras shrink-0 text-sm text-texto-2">~{performance.expectedTime}</span>;
}
