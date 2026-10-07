import { IndependentNotice, Logo } from "./Brand";

export function NoSession() {
  return (
    <div className="flex flex-col items-center px-6 pt-16 text-center">
      <Logo className="h-28 w-auto" />
      <h1 className="mt-8 font-display text-2xl">Hoy no hay sesión</h1>
      <p className="mt-2 text-texto-2">Vuelve cuando empiece la próxima. ¡Que no falte el carnaval!</p>
      <IndependentNotice className="mt-10" />
    </div>
  );
}
