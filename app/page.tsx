import { NoSession } from "@/components/NoSession";
import { SessionView } from "@/components/SessionView";
import { loadCurrentSession } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function InicioPage() {
  const data = await loadCurrentSession();
  if (!data) return <NoSession />;
  return <SessionView session={data.session} myVotes={data.myVotes} palco={data.palco} canShareNight={data.canShareNight} />;
}
