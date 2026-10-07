import { ActionForm, SubmitButton } from "@/components/admin/ActionForm";
import { Card, Field, inputClass } from "@/components/admin/ui";
import { SETTING_LIMITS } from "@/lib/db/logic";
import { readDb } from "@/lib/db/store";
import { saveSettingsAction } from "../../actions";

export default async function AjustesPage() {
  const db = await readDb();
  return (
    <Card title="Ajustes">
      <p className="mb-4 text-sm text-texto-2">
        Cifras que se pueden cambiar sin tocar la web. Los cambios se aplican al momento y quedan en el registro.
      </p>
      <ActionForm action={saveSettingsAction} className="space-y-3">
        {(Object.keys(SETTING_LIMITS) as (keyof typeof SETTING_LIMITS)[]).map((key) => {
          const limits = SETTING_LIMITS[key];
          return (
            <Field key={key} label={limits.label} hint={`Entre ${limits.min} y ${limits.max}.`}>
              <input
                name={key}
                type="number"
                inputMode="numeric"
                min={limits.min}
                max={limits.max}
                required
                defaultValue={db.settings[key]}
                className={inputClass}
              />
            </Field>
          );
        })}
        <SubmitButton>Guardar ajustes</SubmitButton>
      </ActionForm>
    </Card>
  );
}
