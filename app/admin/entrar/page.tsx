import { redirect } from "next/navigation";
import { Isotipo } from "@/components/Brand";
import { isAdmin } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Panel · El Falla", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EntrarPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="mx-auto max-w-sm px-6 pt-16 text-center">
      <div className="flex justify-center">
        <Isotipo className="h-14 w-auto" />
      </div>
      <h1 className="mt-4 font-display text-[28px]">Panel de El Falla</h1>
      <p className="mt-1 text-texto-2">Acceso solo para el equipo.</p>
      <LoginForm />
    </div>
  );
}
