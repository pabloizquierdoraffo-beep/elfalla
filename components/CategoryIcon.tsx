import { CATEGORY_LABEL, type Category } from "@/lib/types";
import { ChirigotasIcon, ComparsasIcon, CorosIcon, CuartetosIcon } from "./AppIcons";

// Iconos de modalidad (sistema de iconos, decisión del responsable del producto):
// comparsa → grupo de personas · chirigota → gorro de bufón · cuarteto → máscaras · coro → personas con nota musical.

const ICONS: Record<Category, (p: { className?: string }) => React.ReactNode> = {
  coro: CorosIcon,
  comparsa: ComparsasIcon,
  chirigota: ChirigotasIcon,
  cuarteto: CuartetosIcon,
};

export function CategoryIcon({ category, className = "h-6 w-6" }: { category: Category; className?: string }) {
  const Icon = ICONS[category];
  return <Icon className={className} />;
}

export const CATEGORY_BG: Record<Category, string> = {
  coro: "bg-coro",
  comparsa: "bg-comparsa",
  chirigota: "bg-chirigota",
  cuarteto: "bg-cuarteto",
};

/** Foto de la agrupación si la tiene; si no, cuadradito de color con el icono de su modalidad. */
export function CategoryAvatar({
  category,
  photoUrl,
  size = "md",
}: {
  category: Category;
  photoUrl?: string;
  size?: "md" | "lg";
}) {
  const dims = size === "lg" ? "h-16 w-16 rounded-2xl" : "h-12 w-12 rounded-xl";
  const icon = size === "lg" ? "h-10 w-10" : "h-7 w-7";
  if (photoUrl) {
    // Fotos subidas desde el panel: se muestran tal cual, recortadas al cuadrado.
    return <img src={photoUrl} alt="" className={`shrink-0 object-cover shadow-sm ${dims}`} />;
  }
  return (
    <span
      className={`flex shrink-0 items-center justify-center text-[#f8f3e7] shadow-sm ${dims} ${CATEGORY_BG[category]}`}
      title={CATEGORY_LABEL[category]}
    >
      <CategoryIcon category={category} className={icon} />
    </span>
  );
}
