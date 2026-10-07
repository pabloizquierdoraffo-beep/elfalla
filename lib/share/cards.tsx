import "server-only";

// Diseños de las tarjetas. Usan solo estilos en línea y "flex", que es lo que entiende el generador.

import { formatScore } from "../format";
import type { Category } from "../types";
import type { NightCardData, VoteCardData } from "./data";
import { CardFrame, COLORS, type CardContext } from "./render";

const CATEGORY_COLOR: Record<Category, string> = {
  coro: "#8e2f45",
  comparsa: "#2e4a70",
  chirigota: "#2f5240",
  cuarteto: "#8a5a12",
};

function Eyebrow({ ctx, children }: { ctx: CardContext; children: string }) {
  return (
    <div style={{ display: "flex", fontSize: ctx.format === "historia" ? 34 : 22, fontWeight: 700, color: COLORS.oro, letterSpacing: 6 }}>
      {children.toUpperCase()}
    </div>
  );
}

export function VoteCard({ ctx, data }: { ctx: CardContext; data: VoteCardData }) {
  const story = ctx.format === "historia";
  return (
    <CardFrame ctx={ctx} cta="¿Y tú, qué nota le das?">
      <div
        style={{
          display: "flex",
          flexDirection: story ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 40,
          textAlign: story ? "center" : "left",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: story ? "center" : "flex-start", gap: 12, flexGrow: story ? 0 : 1, flexShrink: 1 }}>
          <Eyebrow ctx={ctx}>Mi puntuación</Eyebrow>
          <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: story ? 92 : 54, lineHeight: 1.05 }}>{data.groupName}</div>
          <div style={{ display: "flex", fontSize: story ? 40 : 26, opacity: 0.8 }}>{data.subtitle}</div>
          {data.palco && !story && (
            <div style={{ display: "flex", marginTop: 10, fontSize: 26, color: COLORS.oro }}>
              El Palco: {formatScore(data.palco.score)} · {data.palco.votes} votos
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: story ? 520 : 260,
              height: story ? 520 : 260,
              borderRadius: 9999,
              border: `${story ? 10 : 6}px solid ${COLORS.oro}`,
              backgroundColor: "rgba(248,243,231,0.08)",
              fontFamily: "Fraunces",
              fontSize: story ? 260 : 130,
            }}
          >
            {data.myScore}
          </div>
          <div style={{ display: "flex", marginTop: 16, fontSize: story ? 34 : 22, opacity: 0.75 }}>sobre 100</div>
        </div>
      </div>
      {data.palco && story && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 60, fontSize: 44 }}>
          El Palco: {formatScore(data.palco.score)} · {data.palco.votes} votos
        </div>
      )}
    </CardFrame>
  );
}

export function NightCard({ ctx, data }: { ctx: CardContext; data: NightCardData }) {
  const story = ctx.format === "historia";
  const rows = data.rows.slice(0, story ? 10 : 5);
  return (
    <CardFrame ctx={ctx} cta="Vota tú también en El Palco">
      <div style={{ display: "flex", flexDirection: "column", alignItems: story ? "center" : "flex-start", gap: 8 }}>
        <Eyebrow ctx={ctx}>La clasificación de la noche</Eyebrow>
        <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: story ? 76 : 44 }}>{data.title}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: story ? 18 : 6, marginTop: story ? 50 : 18 }}>
        {rows.map((row, i) => (
          <div
            key={row.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: story ? 26 : 16,
              padding: story ? "18px 28px" : "6px 14px",
              borderRadius: story ? 28 : 14,
              backgroundColor: i === 0 ? "rgba(217,183,122,0.22)" : "rgba(248,243,231,0.08)",
              fontSize: story ? 42 : 24,
            }}
          >
            <div style={{ display: "flex", width: story ? 56 : 32, fontFamily: "Fraunces", color: COLORS.oro }}>{i + 1}</div>
            <div style={{ display: "flex", width: story ? 22 : 14, height: story ? 22 : 14, borderRadius: 9999, backgroundColor: CATEGORY_COLOR[row.category], border: `2px solid ${COLORS.marfil}` }} />
            <div style={{ display: "flex", flex: 1 }}>{row.name}</div>
            <div style={{ display: "flex", fontFamily: "Fraunces" }}>{formatScore(row.score)}</div>
          </div>
        ))}
      </div>
    </CardFrame>
  );
}
