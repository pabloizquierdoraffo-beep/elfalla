import { Card, formatDateTime } from "@/components/admin/ui";
import { readDb } from "@/lib/db/store";

export default async function RegistroPage() {
  const db = await readDb();
  const entries = db.audit.slice(0, 200);
  return (
    <Card title="Registro de cambios">
      <p className="mb-3 text-sm text-texto-2">Todo lo que se hace desde el panel queda apuntado aquí (ADM-10).</p>
      <ol className="divide-y divide-borde">
        {entries.map((e) => (
          <li key={e.id} className="py-2">
            <p className="cifras text-xs text-texto-2">{formatDateTime(e.at)}</p>
            <p className="font-semibold">{e.action}</p>
            <p className="text-sm text-texto-2">{e.detail}</p>
          </li>
        ))}
      </ol>
      {entries.length === 0 && <p className="text-texto-2">Todavía no hay cambios.</p>}
    </Card>
  );
}
