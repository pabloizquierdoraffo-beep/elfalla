/** Pestañas que todavía no están construidas (roadmap, documento 06). */
export function ComingSoon({
  title,
  items,
  when,
  icon: Icon,
  porra = false,
}: {
  title: string;
  items: string[];
  when: string;
  icon: (p: { className?: string }) => React.ReactNode;
  porra?: boolean;
}) {
  return (
    <div className="px-4 pt-6">
      <span className={`flex h-16 w-16 items-center justify-center rounded-2xl ${porra ? "bg-porra" : "bg-marca"} text-fondo`}>
        <Icon className="h-9 w-9" />
      </span>
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
