export const dynamic = 'force-dynamic';

import { prisma } from '@/server/prisma';
import ShareButtons from '@/components/ShareButtons';
import { ChiefRole } from '@prisma/client';
import ApplyButton from '@/components/mission/ApplyButton';
import SoldierButton from '@/components/mission/SoldierButton';

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
    prisma.soldier.findMany({ select: { id: true, name: true, photoUrl: true } }),
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

      {/* Objectives at the top */}
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
          <li>Deliver MVP set of capabilities live incl. UIs with 3rd parties using them</li>
          <li>Not get kicked out of Imperial due to going rogue</li>
          <li>Not become a bad man</li>
        </ul>
      </section>

      {/* Mission Team */}
      <section className="space-y-10">
        <h2 className="text-2xl font-semibold">Mission Team</h2>

        {/* Chiefs */}
        <TeamBlock
          title="Chief Warriors"
          intro="The warriors lead the soldiers in achieving the mission"
          role={ChiefRole.WARRIOR}
          items={groupedChiefs.WARRIOR}
          defaultIcon="/chiefTruthSpeaker.png"
          afterTitle={
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar name="Chief Truth Speaker" photoUrl="/chiefTruthSpeaker.png" />
                <div>
                  <div className="font-semibold">Chief Truth Speaker</div>
                  <a
                    href="https://buymeacoffee.com/shaunsweeney"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline"
                  >
                    Support on Buy Me a Coffee
                  </a>
                </div>
              </div>
              <ApplyButton role="WARRIOR" />
            </div>
          }
        />

        <TeamBlock
          title="Chief Builders"
          intro="The builders deliver the mission to MVP spec in close collaboration with the invigilators"
          role={ChiefRole.BUILDER}
          items={groupedChiefs.BUILDER}
          defaultIcon="/teacher.png" // temporary placeholder icon
          afterTitle={<ApplyButton role="BUILDER" />}
        />

        <TeamBlock
          title="Chief Invigilators"
          intro="The invigilators ensure the correct mission is delivered through reviewing and critiquing the doctrine"
          role={ChiefRole.INVIGILATOR}
          items={groupedChiefs.INVIGILATOR}
          defaultIcon="/invigilator.png"
          afterTitle={<ApplyButton role="INVIGILATOR" />}
        />

        <TeamBlock
          title="Chief Teachers"
          intro="The teachers pass the word of the mission on to the common people to spread the word"
          role={ChiefRole.TEACHER}
          items={groupedChiefs.TEACHER}
          defaultIcon="/teacher.png"
          afterTitle={<ApplyButton role="TEACHER" />}
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
          <ApplyButton role="CORPORAL" />
        </div>

        {corporals.length > 0 && (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {corporals.map((c) => (
              <CardPerson
                key={c.id}
                name={c.name}
                photoUrl={c.photoUrl || '/corporal.png'}
                title="Approved Corporal"
                blurb={c.responsibilities || ''}
              />
            ))}
          </ul>
        )}

        {/* If none yet, show a pleasant placeholder avatar instead of a 'no data' line */}
        {corporals.length === 0 && (
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Avatar name="Corporal" photoUrl="/corporal.png" />
            <span>First appointments coming soon.</span>
          </div>
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

        {soldiers.length === 0 && (
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Avatar name="Soldier" photoUrl="/corporal.png" />
            <span>Be the first to enlist — we’ll show names here.</span>
          </div>
        )}

        {/* Motto — bigger */}
        <div className="text-center text-2xl font-semibold">
          United we stand, divided we fall 🫡
        </div>

        {/* Enlist button (modal) */}
        <div className="text-center">
          <SoldierButton />
        </div>
      </section>

      {/* Watch the leaders work */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Watch the leaders work</h2>

        {/* Fallback card: show this until you add a channel ID or live video ID */}
        <div className="rounded-2xl border p-6 bg-gray-50">
          <p className="text-gray-700">
            Not online now. When live, the stream will appear here.
          </p>
          <div className="mt-3">
            <a
              href="https://www.youtube.com/@Enleashedtech/live"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
            >
              Open YouTube channel
            </a>
          </div>
        </div>

        {/* If you have your channel ID, replace YOUR_CHANNEL_ID below and uncomment: */}
        {/*
        <div className="rounded-2xl overflow-hidden border aspect-video bg-black/5">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID&rel=0"
            title="Watch us work — YouTube Live"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        */}
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
    </main>
  );
}

function TeamBlock({
  title,
  intro,
  role,
  items,
  defaultIcon,
  afterTitle,
}: {
  title: string;
  intro: string;
  role: ChiefRole;
  items: Array<{ id: string; name: string; photoUrl: string | null; responsibilities: string }>;
  defaultIcon: string;
  afterTitle?: React.ReactNode;
}) {
  const hasItems = items.length > 0;
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600">{intro}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* section default icon */}
          <Avatar name={title} photoUrl={defaultIcon} />
          {afterTitle}
        </div>
      </div>

      {hasItems && (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((c) => (
            <CardPerson
              key={c.id}
              name={c.name}
              photoUrl={c.photoUrl || defaultIcon}
              title="Approved Chief"
              blurb={c.responsibilities}
            />
          ))}
        </ul>
      )}

      {!hasItems && (
        <div className="text-sm text-gray-600 flex items-center gap-3">
          <span>First appointments coming soon.</span>
        </div>
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
