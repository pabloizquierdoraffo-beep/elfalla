"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PhotoBackdrop } from "@/components/PhotoBackdrop";
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
    text: "El Falla es una iniciativa independiente, sin relación oficial con el Ayuntamiento de Cádiz ni con el COAC.",
  },
];

// La bienvenida siempre va en burdeos con letras marfil (también en modo sala): es la "portada" de la marca.
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
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#6b0d26] px-6 pb-8 pt-4 text-[#f8f3e7]">
      {/* El patio de butacas desde el palco, bajo un velo burdeos. */}
      <PhotoBackdrop src="/fotos/palco.jpg" priority />

      <div className="relative flex justify-end">
        {!last && (
          <button type="button" onClick={finish} className="min-h-12 px-2 opacity-80">
            Saltar ›
          </button>
        )}
      </div>

      <div key={step} className="aparecer relative flex flex-1 flex-col items-center justify-center text-center">
        <Image src="/marca/logo-marfil.png" alt="El Falla" width={555} height={370} priority className="h-36 w-auto" />
        <span className="mt-6 h-px w-20 bg-[#d9b77a]" aria-hidden />
        <h1 className="mt-6 font-display text-[32px] leading-tight">{slide.title}</h1>
        <p className="mt-3 max-w-xs text-lg opacity-90">{slide.text}</p>
      </div>

      <div className="relative mb-6 flex justify-center gap-2" aria-hidden>
        {SLIDES.map((_, i) => (
          <span key={i} className={`h-2 rounded-full transition-all ${i === step ? "w-6 bg-[#f8f3e7]" : "w-2 bg-[#f8f3e7]/40"}`} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => (last ? finish() : setStep(step + 1))}
        className="relative min-h-14 rounded-2xl bg-[#f8f3e7] text-lg font-bold text-[#6b0d26] shadow-md"
      >
        {last ? "Empezar" : "Siguiente"}
      </button>
    </div>
  );
}
