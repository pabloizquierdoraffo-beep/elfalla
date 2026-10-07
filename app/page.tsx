import { SessionView } from "@/components/SessionView";
import { demoSession } from "@/lib/demo-data";

export default function InicioPage() {
  return <SessionView session={demoSession} />;
}
