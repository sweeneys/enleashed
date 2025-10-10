export const dynamic = 'force-dynamic';

import { prisma } from '@/server/prisma';
import MissionForms from './MissionForms';
import ShareButtons from '@/components/ShareButtons';
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
  const [approvedChiefs, corporals, soldiersAll, soldierCount] = await Promise.all([
    prisma.chiefApplication.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.corporal.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.soldier.findMany({
      select: { id: true, name: true, photoUrl: true },
    }),
    prisma.soldier.count(),
  ]);

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

      {/* Mission Objectives (top) */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Mission Objectives</h2>
        <ul className="list-disc pl-6 text-gray-800 space-y-1">
          <li>Submit PhD thesis before deadline on 20th December</li>
          <li>Build the team of builders and reviewers and teachers</li>
          <li>Get wide industry critique on the PhD ideas</li>
          <li>Get teaching course live</li>
          <li>Get external to academia and industry people involved and excited about science</li>
          <li>Get feedback from innovative suppliers and generators</li>
          <li>Have progress made on legislative changes required for delivery</li>
          <li>
            Deliver MVP set of capabilities live including UIs ideally with some third parties using
            the capabilities
          </li>
          <li>Not get kicked out of Imperial due to going rogue</li>
          <li>Not become a bad man</li>
        </ul>
      </section>

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

        {/* If none approved yet, show nothing — no empty message */}
        {corporals.length > 0 && (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {corporals.map((c) => (
              <CardPerson key={c.id} name={c.name} photoUrl={c.photoUrl} title="Approved Corporal" blurb={c.responsibilities || ''} />
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
              The soldiers support the leaders of the mission — we need as many soldiers as we can get to deliver the mission.
            </p>
          </div>
          <div className="text-sm text-gray-700">
            Total soldiers: <span className="font-semibold">{soldierCount}</span>
          </div>
        </div>

        {soldiers.length > 0 && (
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {soldiers.map((s) => (
              <li key={s.id} className="border rounded-xl p-3 flex items-center gap-3">
                <Avatar name={s.name} photoUrl={s.photoUrl} />
                <div className="text-sm font-medium truncate">{s.name}</div>
              </li>
            ))}
          </ul>
        )}

        {/* Motto — larger */}
        <div className="text-center text-xl font-semibold">United we stand, divided we fall 🫡</div>
      </section>

      {/* Watch the leaders work (YouTube Live / channel) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Watch the leaders work</h2>
        <div className="rounded-2xl overflow-hidden border aspect-video bg-black/5">
          {/* Replace with your live stream URL or channel embed */}
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/live_stream?channel=UC2rBbKaZtQ-dB-9dqD583Xg&autoplay=0&rel=0"
            title="Watch us work — YouTube Live"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="text-sm text-gray-600">
          If live is offline, we’ll show recent streams instead.
        </p>
      </section>

      {/* Support our work */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Support our work</h2>
        <ul className="list-disc pl-6 text-zinc-700 space-y-1">
          <li>Sign up for updates</li>
          <li>Share in your network</li>
          <li>Buy me a coffee ☕</li>
        </ul>
        <ShareButtons />
        <p className="text-zinc-700">
          Media, talks, collaborations — email{' '}
          <a className="underline" href="mailto:fight@enleashed.tech">fight@enleashed.tech</a>.
        </p>
      </section>

      {/* Forms (Chiefs, Corporal, Soldier) */}
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
  const hasItems = items.length > 0;
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

      {hasItems && (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((c) => (
            <CardPerson
              key={c.id}
              name={c.name}
              photoUrl={c.photoUrl}
              title="Approved Chief"
              blurb={c.responsibilities}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function CardPerson({
  name,
  photoUrl,
  title,
  blurb,
}: {
  name: string;
  photoUrl: string | null;
  title: string;
  blurb?: string;
}) {
  return (
    <li className="border rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <Avatar name={name} photoUrl={photoUrl} />
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-xs text-gray-500">{title}</div>
        </div>
      </div>
      {blurb ? <p className="text-sm text-gray-700 mt-3">{blurb}</p> : null}
    </li>
  );
}

function Avatar({ name, photoUrl }: { name: string; photoUrl: string | null }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');
  return (
    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden grid place-items-center text-sm text-gray-600">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {photoUrl ? (
        <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials || '👤'}</span>
      )}
    </div>
  );
}
