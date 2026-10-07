import type { StageStatus } from "@/lib/types";

export function StageChip({ status }: { status: StageStatus }) {
  if (status === "on_stage" || status === "probably_on_stage") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-directo px-2.5 py-0.5 text-sm font-semibold text-directo">
        <span className="latido h-2 w-2 rounded-full bg-directo-claro" aria-hidden />
        {status === "on_stage" ? "En escena" : "Probablemente en escena"}
      </span>
    );
  }
  if (status === "not_performing") {
    return <span className="rounded-full bg-superficie px-2.5 py-0.5 text-sm text-texto-2">No actúa</span>;
  }
  return null;
}
