"use client";

import Link from "next/link";
import { useLocalVotes } from "@/lib/local-votes";
import { CATEGORIES, CATEGORY_PLURAL, PHASE_LABEL, type Category, type Session } from "@/lib/types";
import { BackIcon } from "./Icons";
import { PerformanceRow } from "./PerformanceRow";
import { PhotoBackdrop } from "./PhotoBackdrop";

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
    <div>
      <header className="relative overflow-hidden px-4 pb-10 pt-3 text-[#f8f3e7]">
        <PhotoBackdrop src="/fotos/palco.jpg" />
        <Link href="/" className="relative -ml-2 flex h-12 w-fit items-center gap-1 pr-3 text-[#f8f3e7]/85">
          <BackIcon className="h-5 w-5" /> Inicio
        </Link>
        <p className="relative mt-2 text-center text-xs font-bold uppercase tracking-[0.14em] text-oro-claro">
          {session.dateLabel} · {session.startsAt}
        </p>
        <h1 className="relative text-center font-display text-[30px] leading-tight">
          {PHASE_LABEL[session.phase]} · Sesión {session.number}
        </h1>
      </header>

      <div className="relative -mt-6 rounded-t-[28px] bg-fondo pt-5">
        <nav aria-label="Modalidad" className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
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
    </div>
  );
}
