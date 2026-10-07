// Enlaces para publicar directamente en cada red. Funciones puras, sin dependencias.
// X y Facebook leen la vista previa (imagen grande) del propio enlace que compartimos.

export const DEFAULT_HASHTAGS = ["COAC2027", "CarnavalDeCadiz"];

/** "#COAC2027, CarnavalDeCadiz" → ["COAC2027", "CarnavalDeCadiz"] (sin #, sin espacios, sin repetir). */
export function parseHashtags(input: string): string[] {
  const tags = input
    .split(/[\s,]+/)
    .map((t) => t.replace(/^#+/, "").replace(/[^\p{L}\p{N}_]/gu, ""))
    .filter(Boolean);
  return [...new Set(tags)].slice(0, 4);
}

export function shareLinks({ url, text, hashtags }: { url: string; text: string; hashtags: string[] }) {
  const x = new URL("https://twitter.com/intent/tweet");
  x.searchParams.set("text", text);
  x.searchParams.set("url", url);
  if (hashtags.length) x.searchParams.set("hashtags", hashtags.join(","));

  const facebook = new URL("https://www.facebook.com/sharer/sharer.php");
  facebook.searchParams.set("u", url);

  const whatsappText = [text, hashtags.map((h) => `#${h}`).join(" "), url].filter(Boolean).join(" ");
  const whatsapp = new URL("https://wa.me/");
  whatsapp.searchParams.set("text", whatsappText);

  return { x: x.toString(), facebook: facebook.toString(), whatsapp: whatsapp.toString() };
}
