"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Directo" },
  { href: "/admin/agrupaciones", label: "Agrupaciones" },
  { href: "/admin/sesiones", label: "Sesiones" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/ajustes", label: "Ajustes" },
  { href: "/admin/registro", label: "Registro" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Secciones del panel" className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
      {LINKS.map(({ href, label }) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-10 shrink-0 items-center rounded-full px-4 text-sm font-semibold ${
              active ? "bg-marca text-sobre-marca" : "bg-superficie text-texto"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
