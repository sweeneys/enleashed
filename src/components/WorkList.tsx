import Link from "next/link";
import { prisma } from "@/server/prisma";
import type { Work } from "@prisma/client";  // pull in Prisma types

export default async function WorkList({
  category,
  title,
}: {
  category: Work["category"]; // ✅ ensures it matches your enum
  title: string;
}) {
  const works = await prisma.work.findMany({
    where: { category },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      {works.length === 0 ? (
        <p className="text-zinc-600">No {String(category).toLowerCase()}s yet.</p>
      ) : (
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
              {w.summary && <p className="text-zinc-600 mt-1">{w.summary}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
