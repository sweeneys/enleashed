// app/mission-control/page.tsx
export const runtime = 'nodejs';            // allow Prisma in prod lambdas
export const dynamic = 'force-dynamic';     // if you need fresh data each request

import { prisma } from '@/server/prisma';
import NextDynamic from 'next/dynamic';     // alias to avoid clash with export above

// If ShareButtons (or any child) touches `window` at import time, make it client-only:
const ShareButtons = NextDynamic(() => import('@/components/ShareButtons'), { ssr: false });
// Keep your other imports exactly as before:
import ApplyButton from '@/components/mission/ApplyButton';
import { ChiefRole } from '@prisma/client';

// keep your shuffle util if you use it elsewhere
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Small helper so one failing query doesn't 500 the whole page
function safe<T>(p: Promise<T>, fallback: T) {
  return p.then(v => v).catch(() => fallback);
}

export default async function MissionControlPage() {
  // ---- Fetch all your data but safely ----
  const [
    approvedChiefs,
    corporals,
    soldiersAll,
    soldierCount,
  ] = await Promise.all([
    safe(
      prisma.chiefApplication.findMany({
        where: { approved: true },
        orderBy: { createdAt: 'desc' },
      }),
      [] as Awaited<ReturnType<typeof prisma.chiefApplication.findMany>>
    ),
    safe(
      prisma.corporal.findMany({
        where: { approved: true },
        orderBy: { createdAt: 'desc' },
      }),
      [] as Awaited<ReturnType<typeof prisma.corporal.findMany>>
    ),
    safe(
      prisma.soldier.findMany({
        select: { id: true, name: true /* add other fields you render */ },
      }),
      [] as Awaited<ReturnType<typeof prisma.soldier.findMany>>
    ),
    safe(prisma.soldier.count(), 0),
  ]);

  // ---- Your original JSX / layout goes here unchanged ----
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Mission Control</h1>

      {/* keep any hero/intro, stats, share, apply, etc. */}
      <div className="mb-6 flex items-center gap-3">
        {/* use INVIGILATOR since CHIEF_INVIGILATOR isn't in the enum */}
        <ApplyButton role={ChiefRole.INVIGILATOR} />
        <ShareButtons />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="p-4 rounded-lg border">
          <h2 className="font-medium mb-2">Chiefs ({approvedChiefs.length})</h2>
          {approvedChiefs.length ? (
            <ul className="list-disc pl-5">
              {approvedChiefs.map((c) => (
                <li key={c.id}>{c.name ?? 'Unnamed'}</li>
              ))}
            </ul>
          ) : (
            <p>None yet.</p>
          )}
        </section>

        <section className="p-4 rounded-lg border">
          <h2 className="font-medium mb-2">Corporals ({corporals.length})</h2>
          {corporals.length ? (
            <ul className="list-disc pl-5">
              {corporals.map((c) => (
                <li key={c.id}>{c.name ?? 'Unnamed'}</li>
              ))}
            </ul>
          ) : (
            <p>None yet.</p>
          )}
        </section>

        <section className="p-4 rounded-lg border md:col-span-2">
          <h2 className="font-medium mb-2">Soldiers ({soldierCount})</h2>
          {soldiersAll.length ? (
            <ul className="list-disc pl-5">
              {soldiersAll.map((s) => (
                <li key={s.id}>{s.name ?? 'Unnamed'}</li>
              ))}
            </ul>
          ) : (
            <p>No soldiers found.</p>
          )}
        </section>
      </div>
    </main>
  );
}
