// app/mission-control/page.tsx (or wherever it lives)
export const runtime = 'nodejs';           // ensure Prisma runs
export const dynamic = 'force-dynamic';    // if you need fresh data

import { prisma } from '@/server/prisma';

function safe<T>(p: Promise<T>, fallback: T) {
  return p.then(v => v).catch(() => fallback);
}

export default async function MissionControlPage() {
  try {
    const [approvedChiefs, corporals, soldiersAll, soldierCount] = await Promise.all([
      safe(
        prisma.chiefApplication.findMany({ where: { approved: true }, orderBy: { createdAt: 'desc' } }),
        []
      ),
      safe(
        prisma.corporal.findMany({ where: { approved: true }, orderBy: { createdAt: 'desc' } }),
        []
      ),
      safe(
        prisma.soldier.findMany({ select: { id: true, name: true } }),
        []
      ),
      safe(
        prisma.soldier.count(),
        0
      ),
    ]);

    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Mission Control</h1>
        <div className="grid gap-6 sm:grid-cols-2">
          <section className="p-4 rounded-lg border">
            <h2 className="font-medium mb-2">Chiefs ({approvedChiefs.length})</h2>
            {approvedChiefs.length ? (
              <ul className="list-disc pl-5">
                {approvedChiefs.map(c => <li key={c.id}>{c.name ?? 'Unnamed'}</li>)}
              </ul>
            ) : <p>None yet.</p>}
          </section>

          <section className="p-4 rounded-lg border">
            <h2 className="font-medium mb-2">Corporals ({corporals.length})</h2>
            {corporals.length ? (
              <ul className="list-disc pl-5">
                {corporals.map(c => <li key={c.id}>{c.name ?? 'Unnamed'}</li>)}
              </ul>
            ) : <p>None yet.</p>}
          </section>

          <section className="p-4 rounded-lg border">
            <h2 className="font-medium mb-2">Soldiers ({soldierCount})</h2>
            {soldiersAll.length ? (
              <ul className="list-disc pl-5">
                {soldiersAll.map(s => <li key={s.id}>{s.name ?? 'Unnamed'}</li>)}
              </ul>
            ) : <p>No soldiers found.</p>}
          </section>
        </div>
      </main>
    );
  } catch (err) {
    // Render a non-fatal error UI so the route doesn’t 500
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Mission Control</h1>
        <p className="text-red-600">We hit a snag loading data. Please try again shortly.</p>
      </main>
    );
  }
}
