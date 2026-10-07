"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalVotes, type LocalVote } from "@/lib/local-votes";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  CATEGORY_PLURAL,
  PHASE_LABEL,
  type Performance,
  type Session,
} from "@/lib/types";
import { IndependentNotice, Isotipo } from "./Brand";
import { CATEGORY_BG, CategoryIcon } from "./CategoryIcon";
import { PerformanceRow } from "./PerformanceRow";
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
  const sessionTitle = `${PHASE_LABEL[session.phase]} · Sesión ${session.number}`;

  return (
    <div className="pb-4">
      <header className="flex items-center justify-between px-4 pt-3">
        <Isotipo className="h-9 w-auto" />
        <ThemeToggle />
      </header>

      <div className="px-4 pb-4 pt-2">
        <h1 className="font-display text-[30px] leading-tight">¡Hola!</h1>
        <p className="text-texto-2">Que empiece el espectáculo</p>
      </div>

      {onStage && (
        <OnStageHero performance={onStage} vote={votes[onStage.id]} sessionTitle={sessionTitle} time={session.startsAt} />
      )}

      <section className="mt-5 grid grid-cols-2 gap-3 px-4" aria-label="Modalidades">
        {CATEGORIES.map((c) => {
          const count = session.performances.filter((p) => p.group.category === c).length;
          return (
            <Link
              key={c}
              href={`/sesion?modalidad=${c}`}
              className={`flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl text-texto shadow-sm active:scale-[0.98] ${CATEGORY_BG[c]}`}
            >
              <CategoryIcon category={c} className="h-8 w-8" />
              <span className="font-display text-lg leading-none">{CATEGORY_PLURAL[c]}</span>
              <span className="text-xs opacity-80">{count === 1 ? "1 hoy" : `${count} hoy`}</span>
            </Link>
          );
        })}
      </section>

      {next && <NextCard performance={next} />}

      {done.length > 0 && (
        <section className="mt-6 px-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl">Ya han actuado</h2>
            <Link href="/sesion" className="text-sm font-semibold text-marca">
              Ver sesión
            </Link>
          </div>
          <ul className="mt-2">
            {done.map((p) => (
              <PerformanceRow key={p.id} performance={p} vote={votes[p.id]} />
            ))}
          </ul>
        </section>
      )}

      <IndependentNotice className="px-4 pt-6" />
    </div>
  );
}

function OnStageHero({
  performance,
  vote,
  sessionTitle,
  time,
}: {
  performance: Performance;
  vote?: LocalVote;
  sessionTitle: string;
  time: string;
}) {
  return (
    <section className="relative mx-4 overflow-hidden rounded-3xl bg-marca p-5 text-sobre-marca shadow-md sala:bg-[#4a1422] sala:text-[#f8f3e7]">
      {/* La celosía como marca de agua, solo aquí (design system, apartado 5). */}
      <Image
        src="/marca/isotipo-marfil.png"
        alt=""
        width={204}
        height={228}
        className="pointer-events-none absolute -right-6 -top-4 h-40 w-auto opacity-10"
      />
      <div className="relative flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-full bg-directo-claro px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-texto sala:text-fondo">
          <span className="latido h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
          {performance.stageStatus === "on_stage" ? "En escena" : "Probablemente en escena"}
        </span>
        <span className="cifras text-sm opacity-80">
          {sessionTitle} · {time}
        </span>
      </div>
      <p className="relative mt-4 text-sm font-semibold uppercase tracking-wide opacity-80">
        {CATEGORY_LABEL[performance.group.category]}
      </p>
      <h2 className="relative font-display text-[28px] leading-tight">{performance.group.name}</h2>
      <p className="relative opacity-80">Autor: {performance.group.authors}</p>
      <Link
        href={`/votar/${performance.id}`}
        className="relative mt-4 flex min-h-14 items-center justify-center rounded-2xl bg-fondo text-lg font-bold text-marca active:opacity-90 sala:bg-marca sala:text-sobre-marca"
      >
        {vote ? `Cambiar tu nota (${vote.score})` : "Puntuar"}
      </Link>
    </section>
  );
}

function NextCard({ performance }: { performance: Performance }) {
  const [reported, setReported] = useState(false);
  return (
    <section className="mx-4 mt-5 flex items-center gap-3 rounded-2xl border border-borde p-3">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${CATEGORY_BG[performance.group.category]}`}>
        <CategoryIcon category={performance.group.category} className="h-7 w-7" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="cifras text-xs font-bold uppercase tracking-wide text-texto-2">
          Siguiente · ~{performance.expectedTime}
        </p>
        <p className="truncate font-semibold">{performance.group.name}</p>
        {reported && <p className="text-sm text-acierto">Gracias. Esperando a que lo confirmen más personas.</p>}
      </div>
      {!reported && (
        <button
          type="button"
          onClick={() => setReported(true)}
          className="min-h-12 shrink-0 rounded-xl border-2 border-directo px-3 text-sm font-bold text-directo active:bg-superficie"
        >
          ¡Ya ha salido!
        </button>
      )}
    </section>
  );
}
