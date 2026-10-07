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
    <p className="bg-arena/60 px-4 py-1.5 text-center text-sm text-texto">
      Versión de prueba · agrupaciones y votos inventados
    </p>
  );
}
