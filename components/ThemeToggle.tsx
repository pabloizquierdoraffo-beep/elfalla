"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./Icons";

/** Botón del modo sala (GEN-15). */
export function ThemeToggle() {
  const [sala, setSala] = useState(false);

  useEffect(() => {
    setSala(document.documentElement.dataset.theme === "sala");
  }, []);

  function toggle() {
    const next = !sala;
    setSala(next);
    if (next) document.documentElement.dataset.theme = "sala";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("elfalla:tema", next ? "sala" : "normal");
    } catch {
      // Sin almacenamiento: el modo dura hasta cerrar la página.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={sala}
      aria-label={sala ? "Quitar modo sala" : "Activar modo sala"}
      className="flex h-12 w-12 items-center justify-center rounded-full text-texto-2 active:bg-superficie"
    >
      {sala ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
    </button>
  );
}
