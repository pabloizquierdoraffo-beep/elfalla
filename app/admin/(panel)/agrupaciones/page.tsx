import { ActionForm, SubmitButton } from "@/components/admin/ActionForm";
import { Badge, Card, Field, inputClass } from "@/components/admin/ui";
import { CategoryAvatar } from "@/components/CategoryIcon";
import type { DbGroup } from "@/lib/db/schema";
import { read } from "@/lib/db/firestore-store";
import { CATEGORIES, CATEGORY_LABEL, CATEGORY_PLURAL } from "@/lib/types";
import { groupWithdrawnAction, saveGroupAction } from "../../actions";

export default async function AgrupacionesPage() {
  const db = await read({ allGroups: true });
  const groups = [...db.groups].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name, "es"));

  return (
    <>
      <Card title="Nueva agrupación">
        <GroupForm />
      </Card>

      {CATEGORIES.map((category) => {
        const list = groups.filter((g) => g.category === category);
        if (list.length === 0) return null;
        return (
          <section key={category}>
            <h2 className="mb-2 font-display text-xl">
              {CATEGORY_PLURAL[category]} <span className="text-base text-texto-2">({list.length})</span>
            </h2>
            <ul className="space-y-2">
              {list.map((g) => (
                <li key={g.id} className="rounded-2xl bg-superficie p-3">
                  <div className="flex items-center gap-3">
                    <CategoryAvatar category={g.category} photoUrl={g.photoUrl} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{g.name}</p>
                      <p className="truncate text-sm text-texto-2">{g.authors || "Sin autores"}</p>
                    </div>
                    {g.withdrawn ? <Badge tone="danger">Retirada</Badge> : <Badge tone="ok">Activa</Badge>}
                  </div>
                  <details className="mt-2">
                    <summary className="min-h-10 cursor-pointer py-2 text-sm font-semibold text-marca">Editar</summary>
                    <GroupForm group={g} />
                    <ActionForm action={groupWithdrawnAction} className="mt-3">
                      <input type="hidden" name="groupId" value={g.id} />
                      {g.withdrawn ? (
                        <SubmitButton name="withdrawn" value="0" variant="secondary">
                          Volver a activar
                        </SubmitButton>
                      ) : (
                        <SubmitButton
                          name="withdrawn"
                          value="1"
                          variant="danger"
                          confirm={`¿Retirar ${g.name}? Dejará de verse en las sesiones y no se podrá votar.`}
                        >
                          Retirar del concurso
                        </SubmitButton>
                      )}
                    </ActionForm>
                  </details>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}

function GroupForm({ group }: { group?: DbGroup }) {
  return (
    <ActionForm action={saveGroupAction} className="space-y-3">
      {group && <input type="hidden" name="id" value={group.id} />}
      <Field label="Nombre">
        <input name="name" required maxLength={80} defaultValue={group?.name} className={inputClass} />
      </Field>
      <Field label="Modalidad">
        <select name="category" required defaultValue={group?.category ?? ""} className={inputClass}>
          <option value="" disabled>
            Elige…
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABEL[c]}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Autor o autores">
        <input name="authors" maxLength={120} defaultValue={group?.authors} className={inputClass} />
      </Field>
      <Field label="Foto (opcional)" hint="Dirección de la imagen, empezando por https://. Si no hay, se ve el bloque de color.">
        <input name="photoUrl" type="url" defaultValue={group?.photoUrl} placeholder="https://…" className={inputClass} />
      </Field>
      <SubmitButton>{group ? "Guardar cambios" : "Crear agrupación"}</SubmitButton>
    </ActionForm>
  );
}
