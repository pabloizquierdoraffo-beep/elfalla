import Link from "next/link";
import { ActionForm, SubmitButton } from "@/components/admin/ActionForm";
import { Card, Field, inputClass } from "@/components/admin/ui";
import { CategoryAvatar } from "@/components/CategoryIcon";
import { findGroup, sessionPerformances } from "@/lib/db/logic";
import { readDb } from "@/lib/db/store";
import { CATEGORY_LABEL, PHASE_LABEL, type PhaseKind } from "@/lib/types";
import {
  addPerformanceAction,
  createSessionAction,
  movePerformanceAction,
  removePerformanceAction,
} from "../../actions";

export default async function SesionesPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const [{ id }, db] = await Promise.all([searchParams, readDb()]);
  const sessions = [...db.sessions].sort((a, b) => (a.date + a.startsAt).localeCompare(b.date + b.startsAt));
  const selected = sessions.find((s) => s.id === id) ?? sessions.find((s) => s.id === db.settings.currentSessionId);
  const performances = selected ? sessionPerformances(db, selected.id) : [];
  const inSession = new Set(performances.map((p) => p.groupId));
  const available = db.groups
    .filter((g) => !g.withdrawn && !inSession.has(g.id))
    .sort((a, b) => a.name.localeCompare(b.name, "es"));

  return (
    <>
      <Card title="Sesiones">
        <ul className="divide-y divide-borde">
          {sessions.map((s) => (
            <li key={s.id}>
              <Link
                href={`/admin/sesiones?id=${s.id}`}
                className={`flex min-h-12 items-center justify-between gap-2 py-2 ${s.id === selected?.id ? "font-bold text-marca" : ""}`}
              >
                <span>
                  {PHASE_LABEL[s.phase]} · Sesión {s.number}
                </span>
                <span className="cifras text-sm text-texto-2">
                  {s.date} · {s.startsAt}
                  {s.id === db.settings.currentSessionId && " · en la web"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      {selected && (
        <Card title={`${PHASE_LABEL[selected.phase]} · Sesión ${selected.number}: orden de actuación`}>
          <ol className="space-y-2">
            {performances.map((p, i) => {
              const g = findGroup(db, p.groupId);
              if (!g) return null;
              return (
                <li key={p.id} className="flex items-center gap-2 rounded-xl bg-fondo p-2">
                  <span className="cifras w-5 text-center font-semibold text-texto-2">{p.runningOrder}</span>
                  <CategoryAvatar category={g.category} photoUrl={g.photoUrl} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{g.name}</p>
                    <p className="text-sm text-texto-2">
                      {CATEGORY_LABEL[g.category]} · ~{p.expectedTime}
                    </p>
                  </div>
                  <ActionForm action={movePerformanceAction} className="flex gap-1">
                    <input type="hidden" name="performanceId" value={p.id} />
                    {i > 0 && (
                      <SubmitButton name="direction" value="up" variant="secondary" className="w-10 px-0">
                        <span aria-label="Subir">↑</span>
                      </SubmitButton>
                    )}
                    {i < performances.length - 1 && (
                      <SubmitButton name="direction" value="down" variant="secondary" className="w-10 px-0">
                        <span aria-label="Bajar">↓</span>
                      </SubmitButton>
                    )}
                  </ActionForm>
                  <ActionForm action={removePerformanceAction}>
                    <input type="hidden" name="performanceId" value={p.id} />
                    <SubmitButton variant="secondary" className="w-10 px-0" confirm={`¿Quitar ${g.name} de esta sesión?`}>
                      <span aria-label="Quitar">✕</span>
                    </SubmitButton>
                  </ActionForm>
                </li>
              );
            })}
          </ol>
          {performances.length === 0 && <p className="text-texto-2">Todavía no hay actuaciones.</p>}

          <h3 className="mb-2 mt-5 font-semibold">Añadir actuación al final</h3>
          <ActionForm action={addPerformanceAction} className="grid grid-cols-[1fr_auto] gap-2">
            <input type="hidden" name="sessionId" value={selected.id} />
            <select name="groupId" required defaultValue="" className={`${inputClass} col-span-2`}>
              <option value="" disabled>
                Elige la agrupación…
              </option>
              {available.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} ({CATEGORY_LABEL[g.category]})
                </option>
              ))}
            </select>
            <input name="expectedTime" type="time" required defaultValue={selected.startsAt} className={inputClass} aria-label="Hora prevista" />
            <SubmitButton>Añadir</SubmitButton>
          </ActionForm>
        </Card>
      )}

      <Card title="Nueva sesión">
        <ActionForm action={createSessionAction} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Field label="Fase">
              <select name="phase" required defaultValue="preliminares" className={inputClass}>
                {(Object.keys(PHASE_LABEL) as PhaseKind[]).map((p) => (
                  <option key={p} value={p}>
                    {PHASE_LABEL[p]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Número">
              <input name="number" type="number" min={1} max={99} required className={inputClass} />
            </Field>
            <Field label="Fecha">
              <input name="date" type="date" required className={inputClass} />
            </Field>
            <Field label="Hora de inicio">
              <input name="startsAt" type="time" required defaultValue="20:00" className={inputClass} />
            </Field>
          </div>
          <SubmitButton>Crear sesión</SubmitButton>
        </ActionForm>
      </Card>
    </>
  );
}
