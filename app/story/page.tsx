export const dynamic = 'force-dynamic';
import Link from "next/link";
import { prisma } from "@/src/server/prisma";

export default async function Story() {
  const works = await prisma.work.findMany({
    where: { category: "STORY" },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Story</h1>
      <p className="text-zinc-600">Background, journey, motivations.</p>
      <ul className="space-y-3">
        {works.map(w => (
          <li key={w.id} className="border rounded-xl p-4 hover:shadow-sm">
            <Link href={`/work/${w.slug}`} className="text-xl font-semibold underline">{w.title}</Link>
            {w.summary && <p className="text-zinc-600 mt-1">{w.summary}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
