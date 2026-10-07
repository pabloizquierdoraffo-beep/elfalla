import { Isotipo } from "./Brand";

/** Pestañas que todavía no están construidas (roadmap, documento 06). */
export function ComingSoon({
  title,
  items,
  when,
  porra = false,
}: {
  title: string;
  items: string[];
  when: string;
  porra?: boolean;
}) {
  return (
    <div className="px-4 pt-6">
      <Isotipo className="h-10 w-auto" />
      <h1 className={`mt-3 font-display text-[28px] ${porra ? "text-porra" : "text-marca"}`}>{title}</h1>
      <p className="mt-1 text-texto-2">Próximamente · {when}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="rounded-xl bg-superficie px-4 py-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
