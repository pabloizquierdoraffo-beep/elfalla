"use client";

import { useActionState } from "react";
import type { FormState } from "@/app/admin/actions";

type Action = (state: FormState, formData: FormData) => Promise<FormState>;

/** Formulario del panel: envía a una acción del servidor y enseña el resultado debajo. */
export function ActionForm({
  action,
  children,
  className = "",
}: {
  action: Action;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className={className} aria-busy={pending}>
      <fieldset disabled={pending} className="contents">
        {children}
      </fieldset>
      {state?.error && (
        <p role="alert" className="mt-2 basis-full text-sm font-semibold text-directo">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p role="status" className="mt-2 basis-full text-sm text-acierto">
          {state.ok}
        </p>
      )}
    </form>
  );
}

const VARIANTS = {
  primary: "bg-marca text-sobre-marca",
  secondary: "border border-borde bg-fondo text-texto",
  danger: "bg-directo text-fondo",
  live: "border border-directo text-directo bg-fondo",
};

/** Botón de envío. Con `confirm`, pide confirmación antes de hacer algo delicado. */
export function SubmitButton({
  children,
  variant = "primary",
  confirm,
  name,
  value,
  className = "",
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  confirm?: string;
  name?: string;
  value?: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      name={name}
      value={value}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
      className={`min-h-10 rounded-xl px-3 text-sm font-semibold disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
