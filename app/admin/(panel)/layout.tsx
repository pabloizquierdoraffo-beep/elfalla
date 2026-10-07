import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/admin-auth";
import { logoutAction } from "../actions";

export const metadata = { title: "Panel · El Falla", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="pb-10">
      <header className="flex items-center justify-between px-4 pb-3 pt-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-oro">Administración</p>
          <h1 className="font-display text-2xl">Panel de El Falla</h1>
        </div>
        <div className="flex items-center gap-1">
          <Link href="/" className="min-h-10 px-2 py-2 text-sm font-semibold text-marca">
            Ver web
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="min-h-10 rounded-xl px-2 text-sm text-texto-2">
              Salir
            </button>
          </form>
        </div>
      </header>
      <AdminNav />
      <div className="mt-4 space-y-4 px-4">{children}</div>
    </div>
  );
}
