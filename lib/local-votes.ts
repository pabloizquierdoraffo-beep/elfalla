"use client";

// Votos guardados en el propio móvil mientras no hay base de datos.
// Si el almacenamiento del navegador no está disponible, la app sigue funcionando.

import { useCallback, useSyncExternalStore } from "react";

export type LocalVote = { score: number; kind: "quick" | "full"; at: string };
type VoteMap = Record<string, LocalVote>;

const KEY = "elfalla:votos";
const EVENT = "elfalla:votos-cambiados";
const EMPTY: VoteMap = {};

let cache: { raw: string | null; map: VoteMap } = { raw: null, map: EMPTY };

function read(): VoteMap {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw !== cache.raw) cache = { raw, map: raw ? (JSON.parse(raw) as VoteMap) : EMPTY };
    return cache.map;
  } catch {
    return cache.map;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useLocalVotes() {
  const votes = useSyncExternalStore(subscribe, read, () => EMPTY);

  const saveVote = useCallback((performanceId: string, score: number, kind: LocalVote["kind"] = "quick") => {
    const next = { ...read(), [performanceId]: { score, kind, at: new Date().toISOString() } };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      cache = { raw: cache.raw, map: next };
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { votes, saveVote };
}
