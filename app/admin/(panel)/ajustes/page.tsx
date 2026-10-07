import { ActionForm, SubmitButton } from "@/components/admin/ActionForm";
import { Card, Field, inputClass } from "@/components/admin/ui";
import { SETTING_LIMITS } from "@/lib/db/logic";
import { readDb } from "@/lib/db/store";
import { saveSettingsAction, saveSponsorAction } from "../../actions";

export default async function AjustesPage() {
  const db = await readDb();
  return (
    <>
      <Card title="Tarjetas para compartir">
        <p className="mb-3 text-sm text-texto-2">
          Si hay patrocinador, todas las tarjetas que comparta la gente dirán «Presentado por…». El patrocinador aparece en la
          tarjeta, nunca cambia las notas ni los cálculos (dossier, regla de independencia).
        </p>
        <ActionForm action={saveSponsorAction} className="space-y-3">
          <Field label="Patrocinador" hint="Déjalo vacío para que no salga ninguno.">
            <input name="sponsor" maxLength={60} defaultValue={db.settings.shareSponsor ?? ""} placeholder="Nombre de la marca" className={inputClass} />
          </Field>
          <SubmitButton>Guardar patrocinador</SubmitButton>
        </ActionForm>
      </Card>
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
    </>
  );
}
