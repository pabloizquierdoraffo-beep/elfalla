"use client";

import { useState } from "react";
import { shareLinks } from "@/lib/share/links";

type Props = {
  imageUrl: string;
  pageUrl: string;
  text: string;
  fileName: string;
  hashtags: string[];
  label?: string;
  className?: string;
};

/**
 * Compartir una tarjeta. X va primero porque es donde se opina del carnaval.
 * X, Facebook y WhatsApp abren su propia pantalla de publicar; Instagram recibe la imagen
 * por el menú de compartir del móvil (no permite publicar desde una web de otra forma).
 */
export function ShareButton({ imageUrl, pageUrl, text, fileName, hashtags, label = "Compartir", className = "" }: Props) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const absolute = () => new URL(pageUrl, window.location.origin).toString();
  const links = () => shareLinks({ url: absolute(), text, hashtags });

  function openWindow(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function imageFile(): Promise<File> {
    const blob = await (await fetch(imageUrl)).blob();
    return new File([blob], fileName, { type: blob.type || "image/png" });
  }

  function download(file: File) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  /** Menú de compartir del móvil con la imagen (Instagram, y el resto de apps). */
  async function shareImage(forInstagram: boolean) {
    setBusy(true);
    setMessage(null);
    try {
      const file = await imageFile();
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: `${text} ${absolute()}` });
      } else if (!forInstagram && navigator.share) {
        await navigator.share({ title: "El Falla", text, url: absolute() });
      } else {
        download(file);
        await navigator.clipboard?.writeText(absolute()).catch(() => undefined);
        setMessage(
          forInstagram
            ? "Imagen guardada. Ábrela desde Instagram para subirla a tu historia."
            : "Imagen descargada y enlace copiado.",
        );
      }
    } catch (error) {
      // Cerrar el menú de compartir no es un error.
      if ((error as DOMException).name !== "AbortError") setMessage("No se ha podido compartir. Inténtalo otra vez.");
    } finally {
      setBusy(false);
    }
  }

  const small =
    "flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl bg-superficie text-xs font-semibold text-texto active:opacity-80 disabled:opacity-50";

  return (
    <div className={className}>
      <p className="mb-2 text-center text-sm font-semibold text-texto-2">{label}</p>
      <button
        type="button"
        onClick={() => openWindow(links().x)}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-black text-lg font-bold text-white active:opacity-90"
      >
        <XLogo className="h-5 w-5" /> Publicar en X
      </button>
      <div className="mt-2 flex gap-2">
        <button type="button" onClick={() => shareImage(true)} disabled={busy} className={small}>
          <InstagramLogo className="h-5 w-5" /> Instagram
        </button>
        <button type="button" onClick={() => openWindow(links().whatsapp)} className={small}>
          <WhatsAppLogo className="h-5 w-5" /> WhatsApp
        </button>
        <button type="button" onClick={() => openWindow(links().facebook)} className={small}>
          <FacebookLogo className="h-5 w-5" /> Facebook
        </button>
        <button type="button" onClick={() => shareImage(false)} disabled={busy} className={small}>
          <MoreIcon className="h-5 w-5" /> Más
        </button>
      </div>
      {busy && <p className="mt-2 text-center text-sm text-texto-2">Preparando la imagen…</p>}
      {message && <p className="mt-2 text-center text-sm text-texto-2">{message}</p>}
    </div>
  );
}

// Logotipos simplificados de cada red, solo para identificar el botón.

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.32l4.37 5.78zm-1.08 16.17h1.7L7.4 4.74H5.58z" />
    </svg>
  );
}

function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" aria-hidden>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9 8.5c0 3 2.5 6.5 6.5 6.5l1-1.5-2-1-1 1c-1.2-.5-2.5-1.8-3-3l1-1-1-2z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z" />
    </svg>
  );
}

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
    </svg>
  );
}
