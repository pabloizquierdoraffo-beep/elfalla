import "server-only";

// Generador de tarjetas para compartir (PRD 3.4). Dibuja una imagen PNG con la marca.
// Formatos: "historia" (vertical, para estados de WhatsApp e historias de Instagram)
// y "enlace" (horizontal, la vista previa que sale al pegar un enlace).

import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export type CardFormat = "historia" | "enlace";

export const CARD_SIZE: Record<CardFormat, { width: number; height: number }> = {
  historia: { width: 1080, height: 1920 },
  enlace: { width: 1200, height: 630 },
};

export function parseFormat(value: string | null): CardFormat {
  return value === "enlace" ? "enlace" : "historia";
}

const ROOT = process.cwd();
type Font = { name: string; data: Buffer; weight: 400 | 700; style: "normal" };
let assets: Promise<{ fonts: Font[]; logo: string; telon: string }> | null = null;

async function dataUrl(file: string, type: string): Promise<string> {
  return `data:${type};base64,${(await readFile(path.join(ROOT, file))).toString("base64")}`;
}

/** Letras e imágenes se cargan una sola vez y se reutilizan. */
function loadAssets() {
  assets ??= (async (): Promise<{ fonts: Font[]; logo: string; telon: string }> => {
    const font = (file: string) => readFile(path.join(ROOT, "assets/fuentes", file));
    const [fraunces, dmSans, dmSansBold, logo, telon] = await Promise.all([
      font("Fraunces-700.woff"),
      font("DMSans-400.woff"),
      font("DMSans-700.woff"),
      dataUrl("public/marca/logo-marfil.png", "image/png"),
      dataUrl("public/fotos/telon.jpg", "image/jpeg"),
    ]);
    return {
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 700, style: "normal" },
        { name: "DM Sans", data: dmSans, weight: 400, style: "normal" },
        { name: "DM Sans", data: dmSansBold, weight: 700, style: "normal" },
      ],
      logo,
      telon,
    };
  })();
  return assets;
}

export const COLORS = {
  marfil: "#f8f3e7",
  burdeos: "#6b0d26",
  oro: "#d9b77a",
  coral: "#c96b63",
};

export type CardContext = { format: CardFormat; logo: string; sponsor: string };

/** Envoltorio común: telón de fondo, velo burdeos, logo arriba y pie con la llamada a la acción. */
export function CardFrame({ ctx, cta, children }: { ctx: CardContext; cta: string; children: React.ReactNode }) {
  const story = ctx.format === "historia";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: story ? "110px 90px 90px" : "48px 64px",
        color: COLORS.marfil,
        fontFamily: "DM Sans",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: story ? "center" : "flex-start" }}>
        <img src={ctx.logo} alt="" width={story ? 330 : 150} height={story ? 220 : 100} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>{children}</div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: story ? "center" : "flex-start", gap: story ? 14 : 6 }}>
        <div style={{ display: "flex", fontSize: story ? 46 : 28, fontWeight: 700 }}>{cta}</div>
        <div style={{ display: "flex", fontSize: story ? 40 : 24, color: COLORS.oro, letterSpacing: 2 }}>elfalla.es</div>
        {ctx.sponsor && (
          <div style={{ display: "flex", fontSize: story ? 30 : 20, opacity: 0.85 }}>Presentado por {ctx.sponsor}</div>
        )}
        <div style={{ display: "flex", fontSize: story ? 24 : 16, opacity: 0.6 }}>
          Iniciativa independiente · sin relación oficial con el COAC
        </div>
      </div>
    </div>
  );
}

export async function renderCard(
  format: CardFormat,
  sponsor: string,
  draw: (ctx: CardContext) => React.ReactElement,
): Promise<ImageResponse> {
  const { fonts, logo, telon } = await loadAssets();
  const { width, height } = CARD_SIZE[format];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundColor: COLORS.burdeos }}>
        <img src={telon} alt="" width={width} height={height} style={{ position: "absolute", top: 0, left: 0, width, height, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height,
            display: "flex",
            backgroundImage: "linear-gradient(180deg, rgba(107,13,38,0.80) 0%, rgba(74,10,27,0.88) 50%, rgba(42,7,16,0.97) 100%)",
          }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, width, height, display: "flex" }}>{draw({ format, logo, sponsor })}</div>
      </div>
    ),
    {
      width,
      height,
      fonts,
      headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
    },
  );
}
