import { NoSession } from "@/components/NoSession";
import { SessionList } from "@/components/SessionList";
import { loadCurrentSession } from "@/lib/public-data";
import { CATEGORIES } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function SesionPage({ searchParams }: { searchParams: Promise<{ modalidad?: string }> }) {
  const [{ modalidad }, data] = await Promise.all([searchParams, loadCurrentSession()]);
  if (!data) return <NoSession />;
  const category = CATEGORIES.find((c) => c === modalidad);
  return <SessionList
      session={data.session}
      category={category}
      myVotes={data.myVotes}
      palco={data.palco}
      canShareNight={data.canShareNight}
      hashtags={data.hashtags}
    />;
}
