// src/components/WorkList.tsx
import Link from "next/link";
import { prisma } from "@/server/prisma";

export default async function WorkList({
  category,
  title,
}: {
  category: string;
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
        <p className="text-zinc-600">No {category.toLowerCase()}s yet.</p>
      ) : (
        <ul className="space-y-3">
          {works.map((w) => (
            <li key={w.id} className="border rounded-xl p-4 hover:shadow-sm transition">
              <Link href={`/work/${w.slug}`} className="text-xl font-semibold underline">
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
