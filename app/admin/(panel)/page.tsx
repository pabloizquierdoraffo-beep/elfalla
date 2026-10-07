import { ActionForm, SubmitButton } from "@/components/admin/ActionForm";
import { Badge, Card, inputClass } from "@/components/admin/ui";
import { CategoryAvatar } from "@/components/CategoryIcon";
import { findGroup, palcoScore, sessionPerformances, validScores } from "@/lib/db/logic";
import type { ConfirmedBy } from "@/lib/db/schema";
import { readDb } from "@/lib/db/store";
import { formatScore } from "@/lib/format";
import { CATEGORY_LABEL, PHASE_LABEL, type StageStatus } from "@/lib/types";
import { closeSessionVotingAction, setCurrentSessionAction, stageAction, votingAction } from "../actions";

const STAGE_LABEL: Record<StageStatus, string> = {
  scheduled: "Programada",
  next: "Siguiente",
  probably_on_stage: "Probablemente en escena",
  on_stage: "En escena",
  finished: "Terminada",
  not_performing: "No actúa",
};

const CONFIRMED_LABEL: Record<ConfirmedBy, string> = {
  crowd: "confirmado por la afición",
  staff: "confirmado por el equipo",
  schedule: "por horario",
};

export default async function DirectoPage() {
  const db = await readDb();
  const sessions = [...db.sessions].sort((a, b) => (a.date + a.startsAt).localeCompare(b.date + b.startsAt));
  const current = db.sessions.find((s) => s.id === db.settings.currentSessionId);
  const performances = current ? sessionPerformances(db, current.id) : [];
  const openCount = performances.filter((p) => p.votingOpen).length;

  return (
    <>
      <Card title="Sesión que se ve en la web">
        <ActionForm action={setCurrentSessionAction} className="flex flex-wrap gap-2">
          <select name="sessionId" defaultValue={current?.id} className={`${inputClass} flex-1`}>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                {PHASE_LABEL[s.phase]} · Sesión {s.number} · {s.date}
              </option>
            ))}
          </select>
          <SubmitButton>Cambiar</SubmitButton>
        </ActionForm>
      </Card>

      {current ? (
        <>
          <Card>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-xl">
                  {PHASE_LABEL[current.phase]} · Sesión {current.number}
                </h2>
                <p className="text-sm text-texto-2">
                  {performances.length} actuaciones · {openCount} votaciones abiertas
                </p>
              </div>
              <ActionForm action={closeSessionVotingAction}>
                <input type="hidden" name="sessionId" value={current.id} />
                <SubmitButton variant="danger" confirm="¿Cerrar TODAS las votaciones abiertas de esta sesión? Hazlo antes de que salga el fallo.">
                  Cerrar todas
                </SubmitButton>
              </ActionForm>
            </div>
          </Card>

          <ol className="space-y-3">
            {performances.map((p) => {
              const group = findGroup(db, p.groupId);
              if (!group) return null;
              const score = palcoScore(db, p.id);
              const votes = validScores(db, p.id).length;
              const live = p.stageStatus === "on_stage" || p.stageStatus === "probably_on_stage";
              return (
                <li key={p.id} className={`rounded-2xl bg-superficie p-3 ${live ? "ring-2 ring-directo" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="cifras w-5 text-center font-semibold text-texto-2">{p.runningOrder}</span>
                    <CategoryAvatar category={group.category} photoUrl={group.photoUrl} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">
                        {group.name}
                        {group.withdrawn && <span className="ml-2 text-sm text-directo">(retirada)</span>}
                      </p>
                      <p className="text-sm text-texto-2">
                        {CATEGORY_LABEL[group.category]} · ~{p.expectedTime}
                      </p>
                    </div>
                    <div className="cifras text-right">
                      <p className="font-display text-lg leading-none text-marca">
                        {score.status === "no_score" ? "–" : formatScore(score.score)}
                      </p>
                      <p className="text-xs text-texto-2">{votes === 1 ? "1 voto" : `${votes} votos`}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-1.5 pl-8">
                    <Badge tone={live ? "live" : "neutral"}>{STAGE_LABEL[p.stageStatus]}</Badge>
                    {live && p.confirmedBy && <span className="text-xs text-texto-2">{CONFIRMED_LABEL[p.confirmedBy]}</span>}
                    <Badge tone={p.votingOpen ? "ok" : "neutral"}>{p.votingOpen ? "Votación abierta" : "Votación cerrada"}</Badge>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 pl-8">
                    <ActionForm action={stageAction}>
                      <input type="hidden" name="performanceId" value={p.id} />
                      {!live && p.stageStatus !== "finished" && (
                        <SubmitButton name="status" value="on_stage" variant="live">
                          En escena
                        </SubmitButton>
                      )}
                    </ActionForm>
                    <ActionForm action={votingAction}>
                      <input type="hidden" name="performanceId" value={p.id} />
                      {p.votingOpen ? (
                        <SubmitButton name="open" value="0" variant="secondary" confirm={`¿Cerrar la votación de ${group.name}?`}>
                          Cerrar votación
                        </SubmitButton>
                      ) : (
                        <SubmitButton name="open" value="1" variant="secondary">
                          Abrir votación
                        </SubmitButton>
                      )}
                    </ActionForm>
                    <details className="relative">
                      <summary className="flex min-h-10 cursor-pointer list-none items-center rounded-xl px-3 text-sm text-texto-2">
                        Más…
                      </summary>
                      <ActionForm action={stageAction} className="mt-2 flex flex-wrap gap-2">
                        <input type="hidden" name="performanceId" value={p.id} />
                        {p.stageStatus !== "finished" && (
                          <SubmitButton name="status" value="finished" variant="secondary">
                            Terminada
                          </SubmitButton>
                        )}
                        {p.stageStatus !== "not_performing" && (
                          <SubmitButton name="status" value="not_performing" variant="secondary" confirm={`¿Marcar que ${group.name} no actúa? Se cerrará su votación.`}>
                            No actúa
                          </SubmitButton>
                        )}
                        {p.stageStatus !== "scheduled" && p.stageStatus !== "next" && (
                          <SubmitButton name="status" value="scheduled" variant="secondary">
                            Volver a programada
                          </SubmitButton>
                        )}
                      </ActionForm>
                    </details>
                  </div>
                </li>
              );
            })}
          </ol>
          {performances.length === 0 && (
            <p className="text-texto-2">Esta sesión aún no tiene actuaciones. Añádelas en «Sesiones».</p>
          )}
        </>
      ) : (
        <p className="text-texto-2">No hay ninguna sesión elegida. Crea una en «Sesiones».</p>
      )}
    </>
  );
}
