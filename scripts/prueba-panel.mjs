// Prueba de punta a punta del panel de administración, con dos "personas" a la vez:
// una aficionada que vota y el administrador que gestiona.
//
// Uso: con el simulador de Firebase vacío (npm run emuladores), arrancar la web contra él:
//   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 FIREBASE_PROJECT_ID=demo-elfalla ADMIN_PASSWORD=prueba-1234 npm start
// y en otra terminal:  ADMIN_PASSWORD=prueba-1234 npm run prueba:panel

import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = process.env.OUT ?? "capturas";
const PASSWORD = process.env.ADMIN_PASSWORD;
const executablePath = process.env.CHROMIUM ?? "/opt/pw-browsers/chromium";
if (!PASSWORD) throw new Error("Falta ADMIN_PASSWORD");

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath });
const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "es-ES" };

let failures = 0;
function check(condition, message) {
  console.log(`${condition ? "✓" : "✗"} ${message}`);
  if (!condition) failures++;
}
async function shot(page, name) {
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
}

// La aficionada
const fan = await (await browser.newContext(phone)).newPage();
await fan.context().addInitScript(() => localStorage.setItem("elfalla:bienvenida-vista", "1"));
await fan.goto(`${BASE}/votar/p3`);
await fan.locator("#nota").fill("78");
await fan.getByRole("button", { name: "Enviar voto" }).click();
await fan.getByText("¡Voto enviado!").waitFor();
check(true, "La aficionada vota a la comparsa en escena");

// Compartir en X: se intercepta la ventana que se abriría
await fan.evaluate(() => {
  window.__abierto = [];
  window.open = (url) => window.__abierto.push(String(url));
});
await fan.getByRole("button", { name: "Publicar en X" }).click();
const xUrl = new URL((await fan.evaluate(() => window.__abierto))[0] ?? "https://vacio");
check(
  xUrl.pathname === "/intent/tweet" &&
    xUrl.searchParams.get("text")?.startsWith("Le he dado un 78 a Los del Muelle Viejo") &&
    xUrl.searchParams.get("url")?.endsWith("/c/nota/p3?n=78") &&
    xUrl.searchParams.get("hashtags") === "COAC2027,CarnavalDeCadiz",
  "«Publicar en X» abre X con el texto, el enlace y los hashtags",
);
await fan.getByRole("button", { name: "Facebook" }).click();
await fan.getByRole("button", { name: "WhatsApp" }).click();
const [, fb, wa] = await fan.evaluate(() => window.__abierto);
check(fb?.startsWith("https://www.facebook.com/sharer/sharer.php") && wa?.startsWith("https://wa.me/"), "Facebook y WhatsApp abren su pantalla de compartir");
await shot(fan, "compartir-botones");

// El administrador
const admin = await (await browser.newContext(phone)).newPage();
admin.on("dialog", (d) => d.accept());
await admin.goto(`${BASE}/admin`);
check(admin.url().includes("/admin/entrar"), "Sin contraseña, el panel manda a la pantalla de entrada");
await shot(admin, "panel-01-entrar");
await admin.getByLabel("Contraseña").fill("mala");
await admin.getByRole("button", { name: "Entrar" }).click();
await admin.getByText("Contraseña incorrecta.").waitFor();
check(true, "Una contraseña incorrecta no deja entrar");
await admin.getByLabel("Contraseña").fill(PASSWORD);
await admin.getByRole("button", { name: "Entrar" }).click();
await admin.waitForURL(`${BASE}/admin`);
check(true, "Con la contraseña buena se entra al panel");
await shot(admin, "panel-02-directo");

// Bloquear a la aficionada
await admin.goto(`${BASE}/admin/usuarios`);
const row = admin.locator("li", { hasText: "Anónimo" }).first();
check((await row.count()) === 1, "La aficionada aparece en Usuarios");
await row.getByText("Bloquear…").click();
await row.getByPlaceholder(/Motivo/).fill("Prueba de bloqueo");
await row.getByRole("button", { name: "Bloquear" }).click();
await admin.getByText("Bloqueado: sus votos ya no cuentan.").waitFor();
await shot(admin, "panel-03-usuarios");

await fan.goto(`${BASE}/votar/p1`);
check(await fan.getByText("Tu acceso está bloqueado").isVisible(), "Bloqueada, ya no puede votar");

// Poner en escena la siguiente
await admin.goto(`${BASE}/admin`);
const next = admin.locator("li", { hasText: "Las de la Marea Baja" });
await next.getByRole("button", { name: "En escena" }).click();
await next.getByText("Las de la Marea Baja: En escena.").waitFor();
await fan.goto(BASE);
check(await fan.getByRole("heading", { name: "Las de la Marea Baja" }).isVisible(), "La web pública muestra la nueva agrupación en escena");

// Cerrar todas las votaciones de la sesión
await admin.goto(`${BASE}/admin`);
await admin.getByRole("button", { name: "Cerrar todas" }).click();
await admin.getByText(/Cerradas \d+ votaciones/).waitFor();
await fan.goto(`${BASE}/votar/p4`);
check(await fan.getByText("La votación de esta actuación ya está cerrada.").isVisible(), "Con las votaciones cerradas no se puede votar");

// Crear una agrupación y añadirla a la sesión
await admin.goto(`${BASE}/admin/agrupaciones`);
const form = admin.locator("form", { has: admin.getByRole("button", { name: "Crear agrupación" }) });
await form.getByLabel("Nombre").fill("Los Nuevos del Barrio");
await form.getByLabel("Modalidad").selectOption("chirigota");
await form.getByLabel("Autor o autores").fill("Agrupación de prueba");
await form.getByRole("button", { name: "Crear agrupación" }).click();
await admin.getByText("«Los Nuevos del Barrio» creada.").waitFor();
await shot(admin, "panel-04-agrupaciones");

await admin.goto(`${BASE}/admin/sesiones`);
await admin.locator('select[name="groupId"]').selectOption({ label: "Los Nuevos del Barrio (Chirigota)" });
await admin.locator('input[name="expectedTime"]').fill("01:25");
await admin.getByRole("button", { name: "Añadir" }).click();
await admin.getByText("Los Nuevos del Barrio añadida a la sesión.").waitFor();
check(true, "Se crea una agrupación y se añade al final de la sesión");
await shot(admin, "panel-05-sesiones");

// Patrocinador de las tarjetas
await admin.goto(`${BASE}/admin/ajustes`);
await admin.getByLabel("Patrocinador").fill("Marca de Prueba");
await admin.getByRole("button", { name: "Guardar", exact: true }).click();
await admin.getByText("Guardado. Las tarjetas dirán «Presentado por Marca de Prueba».").waitFor();
await shot(admin, "panel-06-ajustes");

// Tarjetas para compartir
for (const [name, path] of [
  ["tarjeta-nota-historia", "/tarjeta/nota/p3?n=78"],
  ["tarjeta-nota-enlace", "/tarjeta/nota/p1?n=85&formato=enlace"],
  ["tarjeta-noche-historia", "/tarjeta/noche/s3"],
  ["tarjeta-noche-enlace", "/tarjeta/noche/s3?formato=enlace"],
]) {
  const res = await fan.request.get(`${BASE}${path}`);
  const ok = res.ok() && res.headers()["content-type"] === "image/png";
  check(ok, `La tarjeta ${name} se genera como imagen`);
  if (ok) {
    const { writeFile } = await import("node:fs/promises");
    await writeFile(`${OUT}/${name}.png`, await res.body());
  }
}
check((await fan.request.get(`${BASE}/tarjeta/nota/p3?n=999`)).status() === 400, "Una nota inventada fuera de 0-100 no genera tarjeta");
await fan.goto(`${BASE}/c/nota/p3?n=78`);
const ogImage = await fan.locator('meta[property="og:image"]').getAttribute("content");
check(Boolean(ogImage?.includes("/tarjeta/nota/p3?n=78&formato=enlace")), "El enlace compartido lleva su vista previa para WhatsApp y Facebook");
const twitterCard = await fan.locator('meta[name="twitter:card"]').getAttribute("content");
const twitterImage = await fan.locator('meta[name="twitter:image"]').getAttribute("content");
check(twitterCard === "summary_large_image" && Boolean(twitterImage?.includes("/tarjeta/nota/")), "En X se ve la tarjeta en grande");
await shot(fan, "compartido-nota");
await admin.goto(`${BASE}/admin/registro`);
check((await admin.locator("ol li").count()) >= 5, "Todo queda apuntado en el registro");
await shot(admin, "panel-07-registro");

await browser.close();
console.log(failures ? `\n${failures} comprobaciones fallidas` : "\nTodo correcto");
process.exit(failures ? 1 : 0);
