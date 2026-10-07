"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);
  return (
    <form action={action} className="mt-6 space-y-3">
      <label className="block text-left">
        <span className="mb-1 block text-sm font-semibold">Contraseña</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="min-h-12 w-full rounded-xl border border-borde bg-fondo px-3 text-base"
        />
      </label>
      {state?.error && (
        <p role="alert" className="text-sm font-semibold text-directo">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="min-h-12 w-full rounded-xl bg-marca font-bold text-sobre-marca disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
