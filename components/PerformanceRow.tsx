import Link from "next/link";
import { formatScore } from "@/lib/format";
import type { PalcoScore } from "@/lib/palco";
import { CATEGORY_LABEL, type Performance } from "@/lib/types";
import { CategoryAvatar } from "./CategoryIcon";

export type MyVote = { score: number };

/** Fila de una actuación: número de orden, foto o bloque de color, nombre y estado a la derecha. */
export function PerformanceRow({
  performance,
  vote,
  palco,
}: {
  performance: Performance;
  vote?: MyVote;
  /** Solo llega si la persona puede verla (ya votó o la votación está cerrada). */
  palco?: PalcoScore;
}) {
  const content = (
    <>
      <span className="cifras w-5 shrink-0 text-center font-semibold text-texto-2">{performance.runningOrder}</span>
      <CategoryAvatar category={performance.group.category} photoUrl={performance.group.photoUrl} />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold">{performance.group.name}</span>
        <span className="block text-sm text-texto-2">{CATEGORY_LABEL[performance.group.category]}</span>
      </span>
      <RowStatus performance={performance} vote={vote} palco={palco} />
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

function RowStatus({ performance, vote, palco }: { performance: Performance; vote?: MyVote; palco?: PalcoScore }) {
  if (palco) {
    return (
      <span className="cifras shrink-0 text-right">
        <span className="block font-display text-xl leading-none text-marca">
          {palco.status === "no_score" ? "–" : formatScore(palco.score)}
        </span>
        <span className="block text-xs text-texto-2">{vote ? `tu nota ${vote.score}` : "El Palco"}</span>
      </span>
    );
  }
  if (performance.stageStatus === "on_stage" || performance.stageStatus === "probably_on_stage") {
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
  if (performance.stageStatus === "not_performing") {
    return <span className="shrink-0 text-sm text-texto-2">No actúa</span>;
  }
  return <span className="cifras shrink-0 text-sm text-texto-2">~{performance.expectedTime}</span>;
}
