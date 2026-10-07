import "server-only";

// Acceso provisional al panel: una contraseña en la variable de entorno ADMIN_PASSWORD.
// Cuando haya cuentas de verdad se sustituirá por usuarios con rol de administrador
// y doble verificación (PRD, GEN-20).

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "elfalla_admin";
const SESSION_HOURS = 12;

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function secret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "";
}

function sign(issuedAt: string): string {
  return createHmac("sha256", secret()).update(`admin:${issuedAt}`).digest("hex");
}

function sameText(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

// Freno a quien prueba contraseñas: 5 fallos en 15 minutos bloquean esa conexión un rato.
const failures = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;

async function clientKey(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
}

export async function tryLogin(password: string): Promise<"ok" | "wrong" | "locked" | "not_configured"> {
  if (!adminConfigured()) return "not_configured";
  const key = await clientKey();
  const now = Date.now();
  const recent = (failures.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= 5) return "locked";

  if (!sameText(password, process.env.ADMIN_PASSWORD!)) {
    failures.set(key, [...recent, now]);
    return "wrong";
  }
  failures.delete(key);
  const issuedAt = String(now);
  (await cookies()).set(COOKIE, `${issuedAt}.${sign(issuedAt)}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_HOURS * 3600,
    path: "/",
  });
  return "ok";
}

export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [issuedAt, signature] = value.split(".");
  if (!issuedAt || !signature) return false;
  if (Date.now() - Number(issuedAt) > SESSION_HOURS * 3600 * 1000) return false;
  return sameText(signature, sign(issuedAt));
}

/** Llamar al principio de cada página y cada acción del panel. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/entrar");
}

export async function logout(): Promise<void> {
  (await cookies()).delete(COOKIE);
}
