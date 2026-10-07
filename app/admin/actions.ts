"use server";

// Acciones del panel de administración. Cada una comprueba primero que quien la
// pide es administrador y deja constancia en el registro de auditoría (ADM-10).

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logout, requireAdmin, tryLogin } from "@/lib/admin-auth";
import {
  addPerformance,
  audit,
  closeSessionVoting,
  findGroup,
  findPerformance,
  findUser,
  movePerformance,
  removePerformance,
  SETTING_LIMITS,
  setGroupWithdrawn,
  setStageStatus,
  setUserBlocked,
  setVotingOpen,
  upsertGroup,
} from "@/lib/db/logic";
import type { Db } from "@/lib/db/schema";
import { mutate } from "@/lib/db/store";
import { parseHashtags } from "@/lib/share/links";
import { CATEGORIES, PHASE_LABEL, type Category, type PhaseKind, type StageStatus } from "@/lib/types";

export type FormState = { ok?: string; error?: string } | null;

const ACTOR = "admin";
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

function text(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

/** Aplica un cambio, lo registra y refresca el panel y la web pública. */
async function adminChange(change: (db: Db, now: Date) => FormState): Promise<FormState> {
  await requireAdmin();
  const now = new Date();
  const result = await mutate((db) => change(db, now));
  revalidatePath("/", "layout");
  return result;
}

// ─── Acceso ──────────────────────────────────────────────────────────────────

export async function loginAction(_: FormState, fd: FormData): Promise<FormState> {
  const result = await tryLogin(text(fd, "password"));
  if (result === "ok") redirect("/admin");
  return {
    error: {
      wrong: "Contraseña incorrecta.",
      locked: "Demasiados intentos. Espera 15 minutos.",
      not_configured: "El panel no tiene contraseña configurada (ADMIN_PASSWORD).",
    }[result],
  };
}

export async function logoutAction(): Promise<void> {
  await logout();
  redirect("/");
}

// ─── Directo ─────────────────────────────────────────────────────────────────

export async function setCurrentSessionAction(_: FormState, fd: FormData): Promise<FormState> {
  const sessionId = text(fd, "sessionId");
  return adminChange((db, now) => {
    const s = db.sessions.find((x) => x.id === sessionId);
    if (!s) return { error: "Esa sesión no existe." };
    db.settings.currentSessionId = s.id;
    audit(db, ACTOR, "Sesión en Inicio", `${PHASE_LABEL[s.phase]} · Sesión ${s.number}`, now);
    return { ok: "Sesión cambiada." };
  });
}

const STAGE_ACTIONS: Partial<Record<StageStatus, string>> = {
  on_stage: "En escena",
  finished: "Terminada",
  not_performing: "No actúa",
  scheduled: "Vuelve a programada",
};

export async function stageAction(_: FormState, fd: FormData): Promise<FormState> {
  const performanceId = text(fd, "performanceId");
  const status = text(fd, "status") as StageStatus;
  if (!STAGE_ACTIONS[status]) return { error: "Estado no válido." };
  return adminChange((db, now) => {
    const p = findPerformance(db, performanceId);
    if (!p) return { error: "Esa actuación no existe." };
    setStageStatus(db, p.id, status, now);
    audit(db, ACTOR, STAGE_ACTIONS[status]!, findGroup(db, p.groupId)?.name ?? p.id, now);
    return { ok: `${findGroup(db, p.groupId)?.name}: ${STAGE_ACTIONS[status]}.` };
  });
}

export async function votingAction(_: FormState, fd: FormData): Promise<FormState> {
  const performanceId = text(fd, "performanceId");
  const open = text(fd, "open") === "1";
  return adminChange((db, now) => {
    const p = findPerformance(db, performanceId);
    if (!p) return { error: "Esa actuación no existe." };
    setVotingOpen(db, p.id, open, now);
    const name = findGroup(db, p.groupId)?.name ?? p.id;
    audit(db, ACTOR, open ? "Votación abierta" : "Votación cerrada", name, now);
    return { ok: `${name}: votación ${open ? "abierta" : "cerrada"}.` };
  });
}

export async function closeSessionVotingAction(_: FormState, fd: FormData): Promise<FormState> {
  const sessionId = text(fd, "sessionId");
  return adminChange((db, now) => {
    const closed = closeSessionVoting(db, sessionId, now);
    audit(db, ACTOR, "Votaciones de la sesión cerradas", `${closed} votaciones`, now);
    return { ok: closed ? `Cerradas ${closed} votaciones.` : "No había votaciones abiertas." };
  });
}

// ─── Agrupaciones ────────────────────────────────────────────────────────────

export async function saveGroupAction(_: FormState, fd: FormData): Promise<FormState> {
  const id = text(fd, "id") || undefined;
  const name = text(fd, "name");
  const category = text(fd, "category") as Category;
  const authors = text(fd, "authors");
  const photoUrl = text(fd, "photoUrl");
  if (!name || name.length > 80) return { error: "El nombre es obligatorio (máximo 80 caracteres)." };
  if (!CATEGORIES.includes(category)) return { error: "Elige una modalidad." };
  if (authors.length > 120) return { error: "Los autores no pueden pasar de 120 caracteres." };
  if (photoUrl && !/^(https:\/\/|\/)/.test(photoUrl)) return { error: "La foto debe ser una dirección que empiece por https://" };
  return adminChange((db, now) => {
    const group = upsertGroup(db, { id, name, category, authors, photoUrl });
    audit(db, ACTOR, id ? "Agrupación editada" : "Agrupación creada", group.name, now);
    return { ok: id ? "Cambios guardados." : `«${group.name}» creada.` };
  });
}

export async function groupWithdrawnAction(_: FormState, fd: FormData): Promise<FormState> {
  const groupId = text(fd, "groupId");
  const withdrawn = text(fd, "withdrawn") === "1";
  return adminChange((db, now) => {
    const g = findGroup(db, groupId);
    if (!g) return { error: "Esa agrupación no existe." };
    setGroupWithdrawn(db, g.id, withdrawn);
    audit(db, ACTOR, withdrawn ? "Agrupación retirada" : "Agrupación activada", g.name, now);
    return { ok: `${g.name}: ${withdrawn ? "retirada" : "activa"}.` };
  });
}

// ─── Sesiones ────────────────────────────────────────────────────────────────

export async function createSessionAction(_: FormState, fd: FormData): Promise<FormState> {
  const phase = text(fd, "phase") as PhaseKind;
  const number = Number(text(fd, "number"));
  const date = text(fd, "date");
  const startsAt = text(fd, "startsAt") || "20:00";
  if (!(phase in PHASE_LABEL)) return { error: "Elige una fase." };
  if (!Number.isInteger(number) || number < 1 || number > 99) return { error: "El número de sesión no es válido." };
  if (!DATE.test(date)) return { error: "La fecha no es válida." };
  if (!TIME.test(startsAt)) return { error: "La hora no es válida (por ejemplo, 20:00)." };
  return adminChange((db, now) => {
    if (db.sessions.some((s) => s.phase === phase && s.number === number)) {
      return { error: `Ya existe la sesión ${number} de ${PHASE_LABEL[phase]}.` };
    }
    db.sessions.push({ id: crypto.randomUUID(), phase, number, date, startsAt });
    audit(db, ACTOR, "Sesión creada", `${PHASE_LABEL[phase]} · Sesión ${number} · ${date}`, now);
    return { ok: "Sesión creada." };
  });
}

export async function addPerformanceAction(_: FormState, fd: FormData): Promise<FormState> {
  const sessionId = text(fd, "sessionId");
  const groupId = text(fd, "groupId");
  const expectedTime = text(fd, "expectedTime");
  if (!TIME.test(expectedTime)) return { error: "La hora prevista no es válida (por ejemplo, 21:35)." };
  return adminChange((db, now) => {
    if (!db.sessions.some((s) => s.id === sessionId)) return { error: "Esa sesión no existe." };
    const g = findGroup(db, groupId);
    if (!g) return { error: "Elige una agrupación." };
    if (db.performances.some((p) => p.sessionId === sessionId && p.groupId === groupId)) {
      return { error: `${g.name} ya está en esta sesión.` };
    }
    addPerformance(db, sessionId, groupId, expectedTime);
    audit(db, ACTOR, "Actuación añadida", g.name, now);
    return { ok: `${g.name} añadida a la sesión.` };
  });
}

export async function movePerformanceAction(_: FormState, fd: FormData): Promise<FormState> {
  const performanceId = text(fd, "performanceId");
  const direction = text(fd, "direction") === "up" ? "up" : "down";
  return adminChange((db) => {
    movePerformance(db, performanceId, direction);
    return null;
  });
}

export async function removePerformanceAction(_: FormState, fd: FormData): Promise<FormState> {
  const performanceId = text(fd, "performanceId");
  return adminChange((db, now) => {
    const p = findPerformance(db, performanceId);
    const name = p ? findGroup(db, p.groupId)?.name : undefined;
    if (!removePerformance(db, performanceId)) {
      return { error: "No se puede quitar: ya tiene votos. Márcala como «No actúa»." };
    }
    audit(db, ACTOR, "Actuación quitada", name ?? performanceId, now);
    return { ok: "Actuación quitada." };
  });
}

// ─── Usuarios ────────────────────────────────────────────────────────────────

export async function blockUserAction(_: FormState, fd: FormData): Promise<FormState> {
  const userId = text(fd, "userId");
  const blocked = text(fd, "blocked") === "1";
  const reason = text(fd, "reason").slice(0, 200);
  if (blocked && !reason) return { error: "Escribe el motivo del bloqueo." };
  return adminChange((db, now) => {
    const u = findUser(db, userId);
    if (!u) return { error: "Ese usuario no existe." };
    setUserBlocked(db, u.id, blocked, reason);
    audit(db, ACTOR, blocked ? "Usuario bloqueado" : "Usuario desbloqueado", `${u.alias ?? u.id.slice(0, 8)}${reason ? ` · ${reason}` : ""}`, now);
    return { ok: blocked ? "Bloqueado: sus votos ya no cuentan." : "Desbloqueado: sus votos vuelven a contar." };
  });
}

// ─── Ajustes ─────────────────────────────────────────────────────────────────

export async function saveShareSettingsAction(_: FormState, fd: FormData): Promise<FormState> {
  const sponsor = text(fd, "sponsor");
  const hashtags = parseHashtags(text(fd, "hashtags"));
  if (sponsor.length > 60) return { error: "El nombre del patrocinador no puede pasar de 60 caracteres." };
  return adminChange((db, now) => {
    db.settings.shareSponsor = sponsor;
    db.settings.shareHashtags = hashtags;
    audit(db, ACTOR, "Ajustes de compartir", `Patrocinador: ${sponsor || "(ninguno)"} · Hashtags: ${hashtags.map((h) => `#${h}`).join(" ") || "(ninguno)"}`, now);
    return { ok: sponsor ? `Guardado. Las tarjetas dirán «Presentado por ${sponsor}».` : "Guardado. Las tarjetas no muestran patrocinador." };
  });
}

export async function saveSettingsAction(_: FormState, fd: FormData): Promise<FormState> {
  const values: Partial<Record<keyof typeof SETTING_LIMITS, number>> = {};
  for (const [key, limits] of Object.entries(SETTING_LIMITS) as [keyof typeof SETTING_LIMITS, (typeof SETTING_LIMITS)[keyof typeof SETTING_LIMITS]][]) {
    const n = Number(text(fd, key));
    if (!Number.isInteger(n) || n < limits.min || n > limits.max) {
      return { error: `«${limits.label}» debe estar entre ${limits.min} y ${limits.max}.` };
    }
    values[key] = n;
  }
  return adminChange((db, now) => {
    const changes = Object.entries(values)
      .filter(([k, v]) => db.settings[k as keyof typeof values] !== v)
      .map(([k, v]) => `${SETTING_LIMITS[k as keyof typeof values].label}: ${db.settings[k as keyof typeof values]} → ${v}`);
    Object.assign(db.settings, values);
    if (changes.length) audit(db, ACTOR, "Ajustes cambiados", changes.join(" · "), now);
    return { ok: changes.length ? "Ajustes guardados." : "No había cambios." };
  });
}
