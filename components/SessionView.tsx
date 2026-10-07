"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { reportOnStageAction } from "@/app/actions";
import type { PalcoScore } from "@/lib/palco";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  CATEGORY_PLURAL,
  PHASE_LABEL,
  type Performance,
  type Session,
} from "@/lib/types";
import { DemoBanner, Eyebrow, IndependentNotice } from "./Brand";
import { CATEGORY_BG, CategoryAvatar, CategoryIcon } from "./CategoryIcon";
import { PerformanceRow, type MyVote } from "./PerformanceRow";
import { PhotoBackdrop } from "./PhotoBackdrop";
import { ShareButton } from "./ShareButton";
import { ThemeToggle } from "./ThemeToggle";

export const WELCOME_KEY = "elfalla:bienvenida-vista";

type Props = {
  session: Session;
  myVotes: Record<string, MyVote>;
  palco: Record<string, PalcoScore>;
  /** Ya hay votaciones cerradas con nota: se puede compartir la clasificación de la noche. */
  canShareNight: boolean;
  hashtags: string[];
};

export function SessionView({ session, myVotes, palco, canShareNight, hashtags }: Props) {
  const router = useRouter();

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

  return (
    <div>
      {/* Cabecera con la fachada del Gran Teatro Falla bajo un velo burdeos. */}
      <section className="relative overflow-hidden pb-14 text-[#f8f3e7]">
        <PhotoBackdrop src="/fotos/fachada.jpg" position="center 35%" priority />
        <div className="relative px-4 pt-3">
          <header className="flex items-center justify-between">
            <Image src="/marca/logo-marfil.png" alt="El Falla" width={555} height={370} priority className="h-12 w-auto" />
            <ThemeToggle onPhoto />
          </header>
          <div className="mt-3">
            <DemoBanner />
          </div>

          <h1 className="mt-5 font-display text-[34px] leading-none">¡Hola!</h1>
          <p className="mt-1 text-[#f8f3e7]/80">Que empiece el espectáculo</p>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-oro-claro">
            {PHASE_LABEL[session.phase]} · Sesión {session.number} · {session.dateLabel} {session.startsAt}
          </p>
          {onStage && <OnStageCard performance={onStage} vote={myVotes[onStage.id]} />}
        </div>
      </section>

      {/* El contenido sube sobre la foto como una hoja. */}
      <div className="relative -mt-8 rounded-t-[28px] bg-fondo px-4 pt-6">
        <Eyebrow>Modalidades</Eyebrow>
        <section className="mt-3 grid grid-cols-2 gap-3" aria-label="Modalidades">
          {CATEGORIES.map((c) => {
            const count = session.performances.filter((p) => p.group.category === c).length;
            return (
              <Link
                key={c}
                href={`/sesion?modalidad=${c}`}
                className={`relative flex min-h-[88px] items-end overflow-hidden rounded-2xl p-3 text-[#f8f3e7] shadow-md active:scale-[0.98] ${CATEGORY_BG[c]}`}
              >
                <CategoryIcon category={c} className="absolute right-2 top-2 h-12 w-12 opacity-25" />
                <span>
                  <span className="block font-display text-xl leading-tight">{CATEGORY_PLURAL[c]}</span>
                  <span className="block text-xs opacity-80">{count === 1 ? "1 actúa hoy" : `${count} actúan hoy`}</span>
                </span>
              </Link>
            );
          })}
        </section>

        {next && <NextCard performance={next} />}

        {done.length > 0 && (
          <section className="mt-8">
            <div className="flex items-end justify-between">
              <div>
                <Eyebrow>Esta noche</Eyebrow>
                <h2 className="font-display text-2xl">Ya han actuado</h2>
              </div>
              <Link href="/sesion" className="min-h-10 py-2 text-sm font-semibold text-marca">
                Ver sesión ›
              </Link>
            </div>
            <ul className="-mx-2 mt-2">
              {done.map((p) => (
                <PerformanceRow key={p.id} performance={p} vote={myVotes[p.id]} palco={palco[p.id]} />
              ))}
            </ul>
          </section>
        )}

        {canShareNight && (
          <ShareButton
            className="mt-4"
            label="Comparte la clasificación de la noche"
            imageUrl={`/tarjeta/noche/${session.id}`}
            pageUrl={`/c/noche/${session.id}`}
            text="La clasificación de la noche en El Palco de El Falla:"
            fileName="el-falla-clasificacion-de-la-noche.png"
            hashtags={hashtags}
          />
        )}

        <IndependentNotice className="pt-6" />
      </div>
    </div>
  );
}

/** Tarjeta "En escena" sobre la foto, con efecto cristal. */
function OnStageCard({ performance, vote }: { performance: Performance; vote?: MyVote }) {
  return (
    <section className="mt-3 rounded-3xl border border-white/15 bg-white/10 p-4 shadow-xl backdrop-blur-md">
      <div className="flex items-center gap-3">
        <CategoryAvatar category={performance.group.category} photoUrl={performance.group.photoUrl} size="lg" />
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-directo-claro px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#2a1a1f]">
            <span className="latido h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
            {performance.stageStatus === "on_stage" ? "En escena" : "Probablemente en escena"}
          </span>
          <h2 className="mt-1 line-clamp-2 font-display text-[26px] leading-[1.1]">{performance.group.name}</h2>
          <p className="text-sm text-[#f8f3e7]/75">
            {CATEGORY_LABEL[performance.group.category]} · {performance.group.authors}
          </p>
        </div>
      </div>
      <Link
        href={`/votar/${performance.id}`}
        className="mt-4 flex min-h-14 items-center justify-center rounded-2xl bg-[#f8f3e7] text-lg font-bold text-[#6b0d26] shadow-md active:opacity-90"
      >
        {vote ? `Cambiar tu nota · ${vote.score}` : "Puntuar"}
      </Link>
    </section>
  );
}

const REPORT_MESSAGES = {
  too_soon: "La anterior acaba de salir. Espera un poco.",
  not_next: "Ya no es la siguiente: actualiza la página.",
  blocked: "Tu acceso está bloqueado.",
  not_found: "Esta actuación ya no está en la sesión.",
  no_visitor: "No hemos podido identificarte. Recarga la página.",
} as const;

function NextCard({ performance }: { performance: Performance }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const reported = message !== null;

  function report() {
    startTransition(async () => {
      const result = await reportOnStageAction(performance.id);
      if (!result.ok) return setMessage(REPORT_MESSAGES[result.error]);
      if (result.confirmed) {
        setMessage("¡Confirmado! Ya está en escena.");
        router.refresh();
      } else {
        setMessage("Gracias. Esperando a que lo confirmen más personas.");
      }
    });
  }

  return (
    <section className="mt-6 rounded-2xl bg-superficie p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <CategoryAvatar category={performance.group.category} photoUrl={performance.group.photoUrl} />
        <div className="min-w-0 flex-1">
          <p className="cifras text-xs font-bold uppercase tracking-[0.14em] text-oro">
            Siguiente · ~{performance.expectedTime}
          </p>
          <p className="truncate font-semibold">{performance.group.name}</p>
        </div>
        {!reported && (
          <button
            type="button"
            onClick={report}
            disabled={pending}
            className="min-h-11 shrink-0 rounded-xl bg-directo px-3 text-sm font-bold text-fondo active:opacity-90 disabled:opacity-60"
          >
            ¡Ya ha salido!
          </button>
        )}
      </div>
      {message && <p className="mt-2 text-sm text-acierto">{message}</p>}
    </section>
  );
}
