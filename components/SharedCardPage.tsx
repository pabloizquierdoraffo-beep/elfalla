import Link from "next/link";
import { IndependentNotice } from "./Brand";

/** Lo que ve quien abre un enlace compartido: la tarjeta y una invitación a entrar. */
export function SharedCardPage({ imageUrl, alt, cta, href }: { imageUrl: string; alt: string; cta: string; href: string }) {
  return (
    <div className="px-4 pt-4">
      <img src={imageUrl} alt={alt} className="mx-auto w-full max-w-sm rounded-3xl shadow-xl" />
      <Link
        href={href}
        className="mx-auto mt-6 flex min-h-14 max-w-sm items-center justify-center rounded-2xl bg-marca text-lg font-bold text-sobre-marca"
      >
        {cta}
      </Link>
      <IndependentNotice className="mx-auto mt-6 max-w-sm text-center" />
    </div>
  );
}
