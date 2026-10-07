import { SessionList } from "@/components/SessionList";
import { demoSession } from "@/lib/demo-data";
import { CATEGORIES, type Category } from "@/lib/types";

export default async function SesionPage({ searchParams }: { searchParams: Promise<{ modalidad?: string }> }) {
  const { modalidad } = await searchParams;
  const category = CATEGORIES.find((c) => c === modalidad) as Category | undefined;
  return <SessionList session={demoSession} category={category} />;
}
