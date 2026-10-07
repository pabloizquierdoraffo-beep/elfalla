"use client";

import Link from "next/link";
import { useLocalVotes } from "@/lib/local-votes";
import { CATEGORIES, CATEGORY_PLURAL, PHASE_LABEL, type Category, type Session } from "@/lib/types";
import { BackIcon } from "./Icons";
import { PerformanceRow } from "./PerformanceRow";

/** Listado de una sesión, filtrable por modalidad (SES-06). */
export function SessionList({ session, category }: { session: Session; category?: Category }) {
  const { votes } = useLocalVotes();
  const performances = category
    ? session.performances.filter((p) => p.group.category === category)
    : session.performances;

  const pills: { href: string; label: string; active: boolean }[] = [
    { href: "/sesion", label: "Todas", active: !category },
    ...CATEGORIES.map((c) => ({ href: `/sesion?modalidad=${c}`, label: CATEGORY_PLURAL[c], active: category === c })),
  ];

  return (
    <div className="pt-3">
      <div className="px-4">
        <Link href="/" className="-ml-2 flex h-12 w-fit items-center gap-1 pr-3 text-texto-2">
          <BackIcon className="h-5 w-5" /> Inicio
        </Link>
        <h1 className="text-center font-display text-[28px] leading-tight">
          {PHASE_LABEL[session.phase]} · Sesión {session.number}
        </h1>
        <p className="cifras text-center text-texto-2">
          {session.dateLabel} · {session.startsAt}
        </p>
      </div>

      <nav aria-label="Modalidad" className="mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {pills.map((pill) => (
          <Link
            key={pill.href}
            href={pill.href}
            replace
            aria-current={pill.active ? "page" : undefined}
            className={`flex min-h-10 shrink-0 items-center rounded-full px-4 text-sm font-semibold ${
              pill.active ? "bg-marca text-sobre-marca" : "bg-superficie text-texto"
            }`}
          >
            {pill.label}
          </Link>
        ))}
      </nav>

      <ul className="mt-3 px-2">
        {performances.map((p) => (
          <PerformanceRow key={p.id} performance={p} vote={votes[p.id]} />
        ))}
      </ul>
      {performances.length === 0 && (
        <p className="px-4 py-8 text-center text-texto-2">Hoy no actúa ninguna agrupación de esta modalidad.</p>
      )}
    </div>
  );
}
