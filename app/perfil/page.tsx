import Link from "next/link";
import { ComingSoon } from "@/components/ComingSoon";
import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function PerfilPage() {
  const admin = await isAdmin();
  return (
    <>
      <ComingSoon
        title="Tu perfil"
        when="semana 9"
        items={["Tu historial de notas", "Tus Palcos", "Rachas e insignias", "Tu carácter como jurado"]}
      />
      <div className="px-4 pt-6">
        {admin ? (
          <Link
            href="/admin"
            className="flex min-h-14 items-center justify-between rounded-2xl bg-marca px-4 font-bold text-sobre-marca"
          >
            Panel de administración <span aria-hidden>›</span>
          </Link>
        ) : (
          <Link href="/admin/entrar" className="inline-block min-h-10 py-2 text-sm text-texto-2 underline underline-offset-2">
            Acceso del equipo
          </Link>
        )}
      </div>
    </>
  );
}
