import Image from "next/image";

/**
 * Foto del teatro de fondo, ligeramente difuminada y bajo un velo burdeos,
 * para que el texto marfil se lea siempre bien encima.
 */
export function PhotoBackdrop({ src, position = "center", priority = false }: { src: string; position?: string; priority?: boolean }) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 480px) 100vw, 480px"
        className="scale-105 object-cover blur-[1px]"
        style={{ objectPosition: position }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(107 13 38 / 0.55) 0%, rgb(74 10 27 / 0.72) 50%, rgb(42 7 16 / 0.94) 100%)",
        }}
      />
    </>
  );
}
