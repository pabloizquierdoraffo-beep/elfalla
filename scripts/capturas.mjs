// Hace capturas de las pantallas principales, como en un móvil.
// Uso: con la web arrancada (npm run build && npm start), ejecutar `npm run capturas`.
// Variables opcionales: BASE_URL (por defecto http://localhost:3000),
// CHROMIUM (ruta del navegador) y OUT (carpeta de salida, por defecto ./capturas).

import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = process.env.OUT ?? "capturas";
const executablePath = process.env.CHROMIUM ?? "/opt/pw-browsers/chromium";

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath });

async function newPage({ welcomeSeen = true, theme = "normal" } = {}) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: "es-ES",
  });
  await context.addInitScript(
    ({ welcomeSeen, theme }) => {
      if (welcomeSeen) localStorage.setItem("elfalla:bienvenida-vista", "1");
      localStorage.setItem("elfalla:tema", theme);
    },
    { welcomeSeen, theme },
  );
  return context.newPage();
}

async function shot(page, name, fullPage = false) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(600); // deja terminar las animaciones
  // En una captura de página entera, la barra fija saldría a media altura: la bajamos al final.
  const style = fullPage
    ? await page.addStyleTag({ content: "nav[aria-label=Secciones]{position:static!important}" })
    : null;
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage });
  await style?.evaluate((el) => el.remove());
  console.log(`✓ ${name}`);
}

// 1. Bienvenida
{
  const page = await newPage({ welcomeSeen: false });
  await page.goto(`${BASE}/bienvenida`);
  await shot(page, "01-bienvenida");
  await page.close();
}

// 2. Inicio
{
  const page = await newPage();
  await page.goto(BASE);
  await shot(page, "02-inicio", true);

  // 3. Votar: deslizador sin tocar
  await page.getByRole("link", { name: "Puntuar" }).first().click();
  await page.waitForURL("**/votar/**");
  await shot(page, "03-votar-sin-tocar");

  // 4. Votar: deslizador en 78
  await page.locator("#nota").fill("78");
  await shot(page, "04-votar-78");

  // 5. Voto enviado
  await page.getByRole("button", { name: "Enviar" }).click();
  await page.getByText("¡Voto enviado!").waitFor();
  await shot(page, "05-voto-enviado", true);

  // 6. Voto enviado con nota de El Palco publicada (más de 100 votos)
  await page.goto(`${BASE}/votar/p1`);
  await page.locator("#nota").fill("85");
  await page.getByRole("button", { name: "Enviar" }).click();
  await page.getByText("¡Voto enviado!").waitFor();
  await shot(page, "06-voto-enviado-con-nota");

  // 7. Inicio después de votar dos actuaciones
  await page.goto(BASE);
  await shot(page, "07-inicio-tras-votar", true);
  await page.close();
}

// 8. Cómo funciona
{
  const page = await newPage();
  await page.goto(`${BASE}/como-funciona`);
  await page.locator("summary").click();
  await shot(page, "08-como-funciona", true);
  await page.close();
}

// 9. Modo sala
{
  const page = await newPage({ theme: "sala" });
  await page.goto(BASE);
  await shot(page, "09-inicio-modo-sala");
  await page.close();
}

await browser.close();
