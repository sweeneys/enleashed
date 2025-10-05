export const dynamic = 'force-dynamic';     // ✅ render on request

import Link from "next/link"
import { prisma } from "@/server/prisma";

export default async function Home() {
  const works = await prisma.work.findMany({ orderBy: { createdAt: "desc" } })
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">PhD portfolio</h1>
      <p className="text-zinc-600">Explore chapters, papers, and notes. Highlight sentences you love and leave targeted comments.</p>
      <ul className="space-y-3">
        {works.map(w => (
          <li key={w.id} className="border rounded-xl p-4 hover:shadow-sm">
            <Link href={`/work/${w.slug}`} className="text-xl font-semibold underline">
              {w.title}
            </Link>
            {w.summary && <p className="text-zinc-600 mt-1">{w.summary}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
