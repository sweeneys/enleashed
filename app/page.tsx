export const dynamic = 'force-dynamic'; // ✅ render on request

import Link from "next/link";
import { prisma } from "@/server/prisma";

export default async function Home() {
  const works = await prisma.work.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-12">
      {/* Hero banner */}
      <div className="overflow-hidden rounded-2xl border bg-gradient-to-b from-white to-zinc-50">
        <div className="relative">
          <img
            src="/hero.jpg"
            alt="Energy Unleashed — atomic power unchained"
            className="w-full h-64 md:h-80 object-cover"
          />
          {/* overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white drop-shadow">
            <h1 className="text-2xl md:text-3xl font-semibold">
              Energy Unleashed
            </h1>
            <p className="text-sm md:text-base opacity-95">
              Research, chapters, and experiments — with granular feedback
            </p>
          </div>
        </div>
      </div>

      {/* Works list */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Latest Works</h2>
        <p className="text-zinc-600">
          Explore essays, chapters, and results. Highlight sentences you love
          and leave targeted comments.
        </p>
        <ul className="space-y-3">
          {works.map((w) => (
            <li
              key={w.id}
              className="border rounded-xl p-4 hover:shadow-sm transition"
            >
              <Link
                href={`/work/${w.slug}`}
                className="text-xl font-semibold underline"
              >
                {w.title}
              </Link>
              {w.summary && (
                <p className="text-zinc-600 mt-1">{w.summary}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className="border-t pt-6 text-sm text-zinc-600">
        <p>
          Contact:{" "}
          <a
            href="mailto:shaun@sweetech.co.uk"
            className="underline hover:text-zinc-900"
          >
            shaun@sweetech.co.uk
          </a>
        </p>
      </div>
    </div>
  );
}
