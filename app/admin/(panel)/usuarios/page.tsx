import Link from "next/link";
import { ActionForm, SubmitButton } from "@/components/admin/ActionForm";
import { Badge, Card, formatDateTime, inputClass } from "@/components/admin/ui";
import { readDb } from "@/lib/db/store";
import { blockUserAction } from "../../actions";

const FILTERS = {
  reales: "Personas",
  bloqueados: "Bloqueados",
  prueba: "De prueba",
} as const;
type Filter = keyof typeof FILTERS;

const LIMIT = 100;

export default async function UsuariosPage({ searchParams }: { searchParams: Promise<{ ver?: string }> }) {
  const [{ ver }, db] = await Promise.all([searchParams, readDb()]);
  const filter: Filter = ver && ver in FILTERS ? (ver as Filter) : "reales";

  const stats = new Map<string, { votes: number; last: string | null }>();
  for (const v of db.votes) {
    const s = stats.get(v.userId) ?? { votes: 0, last: null };
    s.votes++;
    if (!s.last || v.at > s.last) s.last = v.at;
    stats.set(v.userId, s);
  }

  const users = db.users
    .filter((u) => (filter === "bloqueados" ? u.status === "blocked" : filter === "prueba" ? u.demo : !u.demo))
    .sort((a, b) => (stats.get(b.id)?.last ?? b.createdAt).localeCompare(stats.get(a.id)?.last ?? a.createdAt));

  const real = db.users.filter((u) => !u.demo);
  const blocked = db.users.filter((u) => u.status === "blocked");

  return (
    <>
      <Card>
        <dl className="grid grid-cols-3 gap-2 text-center">
          <div>
            <dt className="text-xs text-texto-2">Personas</dt>
            <dd className="cifras font-display text-2xl">{real.length}</dd>
          </div>
          <div>
            <dt className="text-xs text-texto-2">Bloqueadas</dt>
            <dd className="cifras font-display text-2xl text-directo">{blocked.length}</dd>
          </div>
          <div>
            <dt className="text-xs text-texto-2">Votos</dt>
            <dd className="cifras font-display text-2xl">{db.votes.length}</dd>
          </div>
        </dl>
        <p className="mt-3 text-sm text-texto-2">
          Mientras no haya cuentas, cada «persona» es un móvil identificado de forma anónima. Al bloquear a alguien, sus votos
          dejan de contar para El Palco y no puede volver a votar.
        </p>
      </Card>

      <nav className="flex gap-2" aria-label="Filtro">
        {(Object.keys(FILTERS) as Filter[]).map((f) => (
          <Link
            key={f}
            href={`/admin/usuarios?ver=${f}`}
            aria-current={f === filter ? "page" : undefined}
            className={`flex min-h-10 items-center rounded-full px-4 text-sm font-semibold ${
              f === filter ? "bg-marca text-sobre-marca" : "bg-superficie"
            }`}
          >
            {FILTERS[f]}
          </Link>
        ))}
      </nav>

      <ul className="space-y-2">
        {users.slice(0, LIMIT).map((u) => {
          const s = stats.get(u.id);
          return (
            <li key={u.id} className="rounded-2xl bg-superficie p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{u.alias ?? `Anónimo ${u.id.slice(0, 8)}`}</p>
                  <p className="cifras text-sm text-texto-2">
                    {s?.votes === 1 ? "1 voto" : `${s?.votes ?? 0} votos`}{s?.last ? ` · último ${formatDateTime(s.last)}` : ""}
                  </p>
                </div>
                {u.status === "blocked" ? <Badge tone="danger">Bloqueado</Badge> : <Badge tone="ok">Activo</Badge>}
              </div>
              {/* Un solo formulario para bloquear y desbloquear: así el mensaje de resultado no desaparece. */}
              <ActionForm action={blockUserAction} className="mt-1">
                <input type="hidden" name="userId" value={u.id} />
                {u.status === "blocked" ? (
                  <>
                    <p className="text-sm text-texto-2">Motivo: {u.blockedReason ?? "—"}</p>
                    <SubmitButton name="blocked" value="0" variant="secondary" className="mt-2">
                      Desbloquear
                    </SubmitButton>
                  </>
                ) : (
                  <details>
                    <summary className="min-h-10 cursor-pointer py-2 text-sm font-semibold text-directo">Bloquear…</summary>
                    <div className="flex flex-wrap gap-2">
                      <input name="reason" required maxLength={200} placeholder="Motivo (por ejemplo: varias cuentas)" className={`${inputClass} flex-1`} />
                      <SubmitButton name="blocked" value="1" variant="danger" confirm="¿Bloquear a esta persona? Sus votos dejarán de contar.">
                        Bloquear
                      </SubmitButton>
                    </div>
                  </details>
                )}
              </ActionForm>
            </li>
          );
        })}
      </ul>
      {users.length === 0 && <p className="text-texto-2">No hay nadie en esta lista.</p>}
      {users.length > LIMIT && <p className="text-sm text-texto-2">Se muestran los {LIMIT} más recientes de {users.length}.</p>}
    </>
  );
}
