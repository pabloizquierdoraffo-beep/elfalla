import "server-only";

// Almacén provisional: un archivo JSON en el servidor.
// Vale para desarrollar y probar con una sola máquina. Antes de la beta se sustituirá
// por la base de datos real (Supabase u otra) sin cambiar el resto de la app:
// solo hay que reescribir readDb() y mutate().

import { promises as fs } from "node:fs";
import path from "node:path";
import type { Db } from "./schema";
import { seedDb } from "./seed";

const FILE = process.env.ELFALLA_DATA_FILE ?? path.join(process.cwd(), ".data", "elfalla.json");

/** Fecha de hoy en Cádiz, "AAAA-MM-DD". */
export function todayInCadiz(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(now);
}

export async function readDb(): Promise<Db> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Db;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    const db = seedDb(todayInCadiz(), new Date());
    await writeDb(db);
    return db;
  }
}

async function writeDb(db: Db): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db));
  await fs.rename(tmp, FILE); // el cambio de nombre es atómico: nunca queda un archivo a medias
}

// Los cambios se aplican de uno en uno, para que dos votos a la vez no se pisen.
let queue: Promise<unknown> = Promise.resolve();

export function mutate<T>(change: (db: Db) => T): Promise<T> {
  const run = queue.then(async () => {
    const db = await readDb();
    const result = change(db);
    await writeDb(db);
    return result;
  });
  queue = run.catch(() => undefined);
  return run;
}
