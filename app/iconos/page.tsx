import { ALL_ICONS } from "@/components/AppIcons";

export const metadata = { title: "Iconos · El Falla", robots: { index: false } };

// Catálogo interno del sistema de iconos (no enlazado desde la web).
const TONES = ["text-marca", "text-directo", "text-oro", "text-porra", "text-acierto"];

export default function IconosPage() {
  return (
    <div className="px-4 pt-6">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-oro">Sistema de iconos</p>
      <h1 className="font-display text-[28px]">Iconos de El Falla</h1>
      <ul className="mt-5 grid grid-cols-3 gap-3">
        {Object.entries(ALL_ICONS).map(([name, Icon], i) => (
          <li key={name} className="flex flex-col items-center gap-1.5 rounded-2xl bg-superficie p-3 text-center">
            <Icon className={`h-16 w-16 ${TONES[i % TONES.length]}`} />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-texto-2">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
