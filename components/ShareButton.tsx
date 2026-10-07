"use client";

import { useState } from "react";

/**
 * Comparte una tarjeta. En el móvil abre el menú de compartir del sistema con la imagen
 * (WhatsApp, Instagram, X…). Si el navegador no lo permite, descarga la imagen y copia el enlace.
 */
export function ShareButton({
  imageUrl,
  pageUrl,
  text,
  fileName,
  label = "Compartir",
  className = "",
}: {
  imageUrl: string;
  pageUrl: string;
  text: string;
  fileName: string;
  label?: string;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function share() {
    setBusy(true);
    setMessage(null);
    const url = new URL(pageUrl, window.location.origin).toString();
    try {
      const blob = await (await fetch(imageUrl)).blob();
      const file = new File([blob], fileName, { type: blob.type || "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: `${text} ${url}` });
      } else if (navigator.share) {
        await navigator.share({ title: "El Falla", text, url });
      } else {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
        await navigator.clipboard?.writeText(url).catch(() => undefined);
        setMessage("Imagen descargada y enlace copiado.");
      }
    } catch (error) {
      // Cancelar el menú de compartir no es un error.
      if ((error as DOMException).name !== "AbortError") setMessage("No se ha podido compartir. Inténtalo otra vez.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={share}
        disabled={busy}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-marca text-lg font-bold text-marca active:bg-superficie disabled:opacity-60"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
        </svg>
        {busy ? "Preparando…" : label}
      </button>
      {message && <p className="mt-2 text-center text-sm text-texto-2">{message}</p>}
    </div>
  );
}
