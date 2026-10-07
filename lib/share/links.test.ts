import { describe, expect, it } from "vitest";
import { parseHashtags, shareLinks } from "./links";

describe("enlaces para compartir", () => {
  const url = "https://elfalla.es/c/nota/p3?n=78";
  const text = "Le he dado un 78 a Los del Muelle Viejo en El Falla. ¿Y tú?";

  it("X recibe el texto, el enlace y los hashtags", () => {
    const x = new URL(shareLinks({ url, text, hashtags: ["COAC2027", "CarnavalDeCadiz"] }).x);
    expect(x.hostname).toBe("twitter.com");
    expect(x.pathname).toBe("/intent/tweet");
    expect(x.searchParams.get("text")).toBe(text);
    expect(x.searchParams.get("url")).toBe(url);
    expect(x.searchParams.get("hashtags")).toBe("COAC2027,CarnavalDeCadiz");
  });

  it("el texto de X cabe en un post (280 caracteres; el enlace cuenta 23)", () => {
    const tags = " #COAC2027 #CarnavalDeCadiz";
    expect(text.length + 1 + 23 + tags.length).toBeLessThanOrEqual(280);
  });

  it("Facebook solo necesita el enlace y WhatsApp lleva todo en el texto", () => {
    const links = shareLinks({ url, text, hashtags: ["COAC2027"] });
    expect(new URL(links.facebook).searchParams.get("u")).toBe(url);
    expect(new URL(links.whatsapp).searchParams.get("text")).toBe(`${text} #COAC2027 ${url}`);
  });

  it("limpia los hashtags que se escriben en el panel", () => {
    expect(parseHashtags("#COAC2027, #CarnavalDeCádiz  carnaval-cadiz #COAC2027")).toEqual([
      "COAC2027",
      "CarnavalDeCádiz",
      "carnavalcadiz",
    ]);
    expect(parseHashtags("")).toEqual([]);
  });
});
