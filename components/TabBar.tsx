"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { InicioIcon, PalcoIcon, PerfilIcon, PorraIcon, VotarIcon } from "./AppIcons";

const TABS = [
  { href: "/", label: "Inicio", Icon: InicioIcon, match: (p: string) => p === "/" },
  { href: "/puntuar", label: "Puntuar", Icon: VotarIcon, match: (p: string) => p.startsWith("/votar") },
  { href: "/porra", label: "Porra", Icon: PorraIcon, match: (p: string) => p.startsWith("/porra"), porra: true },
  { href: "/el-palco", label: "El Palco", Icon: PalcoIcon, match: (p: string) => p.startsWith("/el-palco") },
  { href: "/perfil", label: "Perfil", Icon: PerfilIcon, match: (p: string) => p.startsWith("/perfil") },
];

export function TabBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/bienvenida") || pathname.startsWith("/admin")) return null;

  return (
    <nav
      aria-label="Secciones"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-borde bg-fondo/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul className="mx-auto grid max-w-[480px] grid-cols-5">
        {TABS.map(({ href, label, Icon, match, porra }) => {
          const active = match(pathname);
          const activeColor = porra ? "text-porra" : "text-marca";
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs ${
                  active ? `${activeColor} font-semibold` : "text-texto-2"
                }`}
              >
                <Icon className="h-6 w-6" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
