import "server-only";

// Conexión del servidor con Firebase (Admin SDK).
// - En desarrollo y pruebas: el simulador local (variable FIRESTORE_EMULATOR_HOST).
// - Publicado (Vercel): la clave de servicio en FIREBASE_SERVICE_ACCOUNT (el JSON tal cual o en base64).
//   Esa clave es secreta: solo se guarda en las variables de entorno de Vercel, nunca en GitHub.

import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let firestore: Firestore | null = null;

function app(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  if (process.env.FIRESTORE_EMULATOR_HOST) {
    return initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID ?? "demo-elfalla" });
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    throw new Error("Falta la variable FIREBASE_SERVICE_ACCOUNT (o FIRESTORE_EMULATOR_HOST para el simulador).");
  }
  const json = JSON.parse(raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8"));
  return initializeApp({ credential: cert(json), projectId: json.project_id });
}

// Nota: los datos se limpian antes de guardarse (sin campos "undefined"), así que no hace falta
// configurar Firestore; además, solo puede configurarse una vez por proceso.
export function getDb(): Firestore {
  firestore ??= getFirestore(app());
  return firestore;
}

export function getAdminAuth() {
  return getAuth(app());
}

/** true si estamos usando el simulador local en lugar del proyecto real. */
export function usingEmulator(): boolean {
  return Boolean(process.env.FIRESTORE_EMULATOR_HOST);
}
