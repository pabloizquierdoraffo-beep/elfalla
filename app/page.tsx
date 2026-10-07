import { DemoBanner } from "@/components/Brand";
import { SessionView } from "@/components/SessionView";
import { demoSession } from "@/lib/demo-data";

export default function InicioPage() {
  return (
    <>
      <DemoBanner />
      <SessionView session={demoSession} />
    </>
  );
}
