export const dynamic = 'force-dynamic';

import { prisma } from '@/server/prisma';
import MissionForms from './MissionForms';
import { ChiefRole } from '@prisma/client';

// Simple server-side shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default async function MissionControlPage() {
  const [approvedChiefs, soldiersAll, soldierCount, corporals] = await Promise.all([
    prisma.chiefApplication.findMany({ where: { approved: true }, orderBy: { createdAt: 'desc' } }),
    prisma.soldier.findMany({ select: { id: true, name: true, photoUrl: true } }),
    prisma.soldier.count(),
    prisma.corporal.findMany({ where: { approved: true }, orderBy: { createdAt: 'desc' } }),
  ]);

  // Show up to 100 random soldiers
  const soldiers = shuffle(soldiersAll).slice(0, 100);

  const groupedChiefs = {
    WARRIOR: approvedChiefs.filter((c) => c.role === 'WARRIOR'),
    BUILDER: approvedChiefs.filter((c) => c.role === 'BUILDER'),
    INVIGILATOR: approvedChiefs.filter((c) => c.role === 'INVIGILATOR'),
    TEACHER: approvedChiefs.filter((c) => c.role === 'TEACHER'),
  } as const;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      <h1 className="text-3xl font-bold">Mission Control</h1>

      {/* Mission Team */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Mission Team</h2>

        <TeamBlock
          title="Chief Warriors"
          intro="The warriors lead the soldiers in achieving the mission"
          role={ChiefRole.WARRIOR}
          items={groupedChiefs.WARRIOR}
        />

        <TeamBlock
          title="Chief Builders"
          intro="The builders deliver the mission initially to MVP spec in close collaboration with the invigilators"
          role={ChiefRole.BUILDER}
          items={groupedChiefs.BUILDER}
        />

        <TeamBlock
          title="Chief Invigilators"
          intro="The invigilators ensure the correct mission is being delivered through reviewing and critiquing the proposed doctrine"
          role={ChiefRole.INVIGILATOR}
          items={groupedChiefs.INVIGILATOR}
        />

        <TeamBlock
          title="Chief Teachers"
          intro="The teachers pass the word of the mission on to the common people to spread the word"
          role={ChiefRole.TEACHER}
          items={groupedChiefs.TEACHER}
        />
      </section>

            {/* Corporals */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Corporals</h2>
            <p className="text-gray-600">
              Corporals coordinate and rally soldiers, bridging leadership and the ranks.
            </p>
          </div>
          <a
            href="#apply-corporal"
            className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Apply to become a Corporal
          </a>
        </div>

        {corporals.length === 0 ? (
          <p className="text-gray-600">No approved corporals yet.</p>
        ) : (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {corporals.map((c) => (
              <li key={c.id} className="border rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {c.photoUrl ? (
                      <img src={c.photoUrl} alt={c.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-xs text-gray-500">👤</div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-gray-500">Approved Corporal</div>
                  </div>
                </div>
                {c.responsibilities && <p className="text-sm text-gray-700 mt-3">{c.responsibilities}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>


      {/* Foot Soldiers */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Foot Soldiers</h2>
            <p className="text-gray-600">
              The soldiers support the leaders of the mission, we need as many soldiers as we can get to deliver the mission
            </p>
          </div>
          <div className="text-sm text-gray-700">
            Total soldiers: <span className="font-semibold">{soldierCount}</span>
          </div>
        </div>

        {soldiers.length === 0 ? (
          <p className="text-gray-600">No soldiers yet. Be the first to enlist! 🫡</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {soldiers.map((s) => (
              <li key={s.id} className="border rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {s.photoUrl ? (
                    <img src={s.photoUrl} alt={s.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-xs text-gray-500">👤</div>
                  )}
                </div>
                <div className="text-sm font-medium truncate">{s.name}</div>
              </li>
            ))}
          </ul>
        )}
        <div className="text-center text-sm text-gray-700">United we stand, divided we fall 🫡</div>
      </section>

      {/* Forms */}
      <MissionForms />
    </main>
  );
}

function TeamBlock({
  title,
  intro,
  role,
  items,
}: {
  title: string;
  intro: string;
  role: ChiefRole;
  items: Array<{
    id: string;
    name: string;
    photoUrl: string | null;
    responsibilities: string;
  }>;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600">{intro}</p>
        </div>
        <a
          href={`#apply-${String(role).toLowerCase()}`}
          className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Apply to become a {title.replace('Chief ', 'Chief ')}
        </a>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-600">No approved chiefs yet.</p>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((c) => (
            <li key={c.id} className="border rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {c.photoUrl ? (
                    <img src={c.photoUrl} alt={c.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-xs text-gray-500">👤</div>
                  )}
                </div>
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-gray-500">Approved Chief</div>
                </div>
              </div>
              {c.responsibilities && <p className="text-sm text-gray-700 mt-3">{c.responsibilities}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
