import Image from "next/image";

/** Logo completo (isotipo + "EL FALLA"). Cambia de color en modo sala. */
export function Logo({ className = "h-28 w-auto" }: { className?: string }) {
  return (
    <>
      <Image src="/marca/logo.png" alt="El Falla" width={555} height={370} priority className={`${className} sala:hidden`} />
      <Image src="/marca/logo-sala.png" alt="El Falla" width={555} height={370} priority className={`${className} hidden sala:block`} />
    </>
  );
}

/** Solo la celosía. */
export function Isotipo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <>
      <Image src="/marca/isotipo.png" alt="" width={204} height={228} className={`${className} sala:hidden`} />
      <Image src="/marca/isotipo-sala.png" alt="" width={204} height={228} className={`${className} hidden sala:block`} />
    </>
  );
}

/** Aviso obligatorio de independencia (GEN-26). */
export function IndependentNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-texto-2 ${className}`}>
      El Falla es una iniciativa independiente, sin relación oficial con el Ayuntamiento de Cádiz ni con
      el COAC.
    </p>
  );
}

/** Mientras no haya base de datos, todo es de prueba. */
export function DemoBanner() {
  return (
    <p className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-[#f8f3e7]/90 backdrop-blur">
      Versión de prueba · datos inventados
    </p>
  );
}

/** Etiqueta pequeña dorada encima de los títulos de sección. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-xs font-bold uppercase tracking-[0.14em] text-oro ${className}`}>{children}</p>;
}
