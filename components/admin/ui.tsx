// Piezas sencillas del panel de administración.

export const inputClass =
  "min-h-11 w-full rounded-xl border border-borde bg-fondo px-3 text-base text-texto placeholder:text-texto-2";

export function Card({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl bg-superficie p-4 ${className}`}>
      {title && <h2 className="mb-3 font-display text-xl">{title}</h2>}
      {children}
    </section>
  );
}

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-texto-2">{hint}</span>}
    </label>
  );
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "live" | "ok" | "danger" }) {
  const tones = {
    neutral: "bg-fondo text-texto-2",
    live: "bg-directo text-fondo",
    ok: "bg-acierto text-fondo",
    danger: "bg-marca text-sobre-marca",
  };
  return <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}

const dateTime = new Intl.DateTimeFormat("es-ES", {
  timeZone: "Europe/Madrid",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDateTime(iso: string): string {
  return dateTime.format(new Date(iso));
}
