import { CATEGORY_LABEL, type Category } from "@/lib/types";

// Iconos de modalidad, sin máscaras ni gorros de bufón (dossier, sección 3):
// coro → abanico · comparsa → guitarra · chirigota → bombo · cuarteto → palillos.

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PATHS: Record<Category, React.ReactNode> = {
  coro: (
    <g {...stroke}>
      <path d="M12 20 3.5 10.5a11 11 0 0 1 17 0z" />
      <path d="M12 20 7 7.2M12 20V6.2M12 20l5-12.8" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </g>
  ),
  comparsa: (
    <g {...stroke} transform="rotate(35 12 12)">
      <path d="M12 8c2.3 0 3.4 1.4 3 3.1-.2.9-.8 1.3-.3 1.9 1.7.6 2.4 2 2.2 3.6-.3 2.4-2.3 4-4.9 4s-4.6-1.6-4.9-4c-.2-1.6.5-3 2.2-3.6.5-.6-.1-1-.3-1.9C8.6 9.4 9.7 8 12 8z" />
      <path d="M12 8V2.2M10.7 2.2h2.6M10.6 18.2h2.8" />
      <circle cx="12" cy="14.8" r="1.5" />
    </g>
  ),
  chirigota: (
    <g {...stroke}>
      <ellipse cx="11" cy="10" rx="7" ry="2.6" />
      <path d="M4 10v6.5c0 1.5 3.1 2.6 7 2.6s7-1.1 7-2.6V10" />
      <path d="m4.5 12 3.3 6M17.5 12l-3.3 6M11 12.6v6.5" opacity="0.6" />
      <path d="m15.5 7.5 5-5M21 2.5h0" />
    </g>
  ),
  cuarteto: (
    <g {...stroke}>
      <path d="m5 19 9-12M10 19 19 7" strokeWidth={2.4} />
      <path d="M17 3.5v3M15.5 5h3M6 4.5v2M5 5.5h2" opacity="0.7" />
    </g>
  ),
};

export function CategoryIcon({ category, className = "h-6 w-6" }: { category: Category; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {PATHS[category]}
    </svg>
  );
}

export const CATEGORY_BG: Record<Category, string> = {
  coro: "bg-coro",
  comparsa: "bg-comparsa",
  chirigota: "bg-chirigota",
  cuarteto: "bg-cuarteto",
};

/** Cuadradito de color con el icono: sustituye a las fotos de las agrupaciones. */
export function CategoryAvatar({ category, size = "md" }: { category: Category; size?: "md" | "lg" }) {
  const dims = size === "lg" ? "h-16 w-16 rounded-2xl" : "h-12 w-12 rounded-xl";
  const icon = size === "lg" ? "h-9 w-9" : "h-7 w-7";
  return (
    <span
      className={`flex shrink-0 items-center justify-center text-texto ${dims} ${CATEGORY_BG[category]}`}
      title={CATEGORY_LABEL[category]}
    >
      <CategoryIcon category={category} className={icon} />
    </span>
  );
}
