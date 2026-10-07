"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IndependentNotice, Logo } from "@/components/Brand";
import { WELCOME_KEY } from "@/components/SessionView";

const SLIDES = [
  {
    title: "El jurado de la afición",
    text: "Puntúa cada actuación y descubre qué opina El Palco: la nota de toda la afición.",
  },
  {
    title: "Crea tu Palco",
    text: "Juega la porra con tus amigos: quién pasa, quién llega a la Final y quién gana.",
  },
  {
    title: "Este año, el palco es de todos",
    text: null,
  },
];

export default function BienvenidaPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const last = step === SLIDES.length - 1;

  function finish() {
    try {
      localStorage.setItem(WELCOME_KEY, "1");
    } catch {
      // Sin almacenamiento: se volverá a ver la bienvenida, no pasa nada.
    }
    router.replace("/");
  }

  const slide = SLIDES[step];

  return (
    <div className="flex min-h-dvh flex-col px-6 pb-8 pt-4">
      <div className="flex justify-end">
        {!last && (
          <button type="button" onClick={finish} className="min-h-12 px-2 text-texto-2">
            Saltar ›
          </button>
        )}
      </div>

      <div key={step} className="aparecer flex flex-1 flex-col items-center justify-center text-center">
        <Logo className="h-36 w-auto" />
        <h1 className="mt-8 font-display text-[28px] leading-tight text-marca">{slide.title}</h1>
        {slide.text ? (
          <p className="mt-3 max-w-xs text-lg">{slide.text}</p>
        ) : (
          <IndependentNotice className="mt-3 max-w-xs text-base" />
        )}
      </div>

      <div className="mb-6 flex justify-center gap-2" aria-hidden>
        {SLIDES.map((_, i) => (
          <span key={i} className={`h-2 w-2 rounded-full ${i === step ? "bg-marca" : "bg-arena"}`} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => (last ? finish() : setStep(step + 1))}
        className="min-h-14 rounded-xl bg-marca text-lg font-semibold text-sobre-marca"
      >
        {last ? "Empezar" : "Siguiente"}
      </button>
    </div>
  );
}
