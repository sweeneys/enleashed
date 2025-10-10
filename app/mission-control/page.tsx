// app/mission-control/page.tsx
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import React from 'react';
import { prisma } from '@/server/prisma';
import ShareButtons from '@/components/ShareButtons';
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

// Narrow role strings locally to avoid enum friction
type ChiefRoleStr = 'WARRIOR' | 'BUILDER' | 'INVIGILATOR' | 'TEACHER';

export default async function MissionControlPage() {
  // Defensive fetch: never let a query crash the page
  let approvedChiefs: Array<{
    id: string;
    name: string;
    photoUrl: string | null;
    responsibilities: string | null;
    role: ChiefRoleStr;
  }> = [];

  let corporals: Array<{
    id: string;
    name: string;
    photoUrl: string | null;
    responsibilities: string | null;
  }> = [];

  let soldiersAll: Array<{ id: string; name: string; photoUrl: string | null }> = [];
  let soldierCount = 0;

  try {
    const [chiefs, corps, soldiers, count] = await Promise.all([
      prisma.chiefApplication.findMany({
        where: { approved: true },
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, photoUrl: true, responsibilities: true, role: true },
      }),
      prisma.corporal.findMany({
        where: { approved: true },
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, photoUrl: true, responsibilities: true },
      }),
      prisma.soldier.findMany({ select: { id: true, name: true, photoUrl: true } }),
      prisma.soldier.count(),
    ]);

    // Coerce to the string union (guards in case Prisma type narrows differently)
    approvedChiefs = chiefs.map((c) => ({
      ...c,
      role: String(c.role).toUpperCase() as ChiefRoleStr,
      responsibilities: c.responsibilities ?? null,
      photoUrl: c.photoUrl ?? null,
    }));

    corporals = corps.map((c) => ({
      ...c,
      responsibilities: c.responsibilities ?? null,
      photoUrl: c.photoUrl ?? null,
    }));

    soldiersAll = soldiers.map((s) => ({ ...s, photoUrl: s.photoUrl ?? null }));
    soldierCount = count ?? 0;
  } catch {
    // Fall back to empty UI; page should still render
    approvedChiefs = [];
    corporals = [];
    soldiersAll = [];
    soldierCount = 0;
  }

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
          items={groupedChiefs.WARRIOR}
          defaultIcon="/chiefTruthSpeaker.png"
          afterTitle={
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar name="Chief Truth Speaker" photoUrl="/chiefTruthSpeaker.png" size="xl" />
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
          items={groupedChiefs.BUILDER}
          defaultIcon="/teacher.png" // temporary placeholder icon
          afterTitle={<ApplyButton role="BUILDER" />}
        />

        <TeamBlock
          title="Chief Invigilators"
          intro="The invigilators ensure the correct mission is delivered through reviewing and critiquing the doctrine"
          items={groupedChiefs.INVIGILATOR}
          defaultIcon="/invigilator.png"
          afterTitle={<ApplyButton role="INVIGILATOR" />}
        />

        <TeamBlock
          title="Chief Teachers"
          intro="The teachers pass the word of the mission on to the common people to spread the word"
          items={groupedChiefs.TEACHER}
          defaultIcon="/teacher.png"
          afterTitle={<ApplyButton role="TEACHER" />}
        />
      </section>

      {/* Corporals */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name="Corporals" photoUrl="/corporal.png" size="xl" />
            <div>
              <h2 className="text-2xl font-semibold">Corporals</h2>
              <p className="text-gray-600">
                Corporals coordinate and rally soldiers, bridging leadership and the ranks.
              </p>
            </div>
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
      </section>

      {/* Foot Soldiers */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-3">
            <Avatar name="Foot Soldiers" photoUrl="/corporal.png" size="xl" />
            <div>
              <h2 className="text-2xl font-semibold">Foot Soldiers</h2>
              <p className="text-gray-600">
                The soldiers support the leaders of the mission — we need as many soldiers as we can get to deliver the mission.
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-700">
            Total soldiers: <span className="font-semibold">{soldierCount}</span>
          </div>
        </div>

        {soldiers.length > 0 && (
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {soldiers.map((s) => (
              <li key={s.id} className="border rounded-2xl p-3 flex items-center gap-3">
                <Avatar name={s.name} photoUrl={s.photoUrl} size="lg" />
                <div className="text-sm font-medium truncate">{s.name}</div>
              </li>
            ))}
          </ul>
        )}

        <div className="text-center text-2xl font-semibold">
          United we stand, divided we fall 🫡
        </div>

        <div className="text-center">
          <SoldierButton />
        </div>
      </section>

      {/* Watch the leaders work */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Watch the leaders work</h2>

        <div className="rounded-2xl border p-6 bg-gray-50">
          <p className="text-gray-700">Not online now. When live, the stream will appear here.</p>
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
      </section>

      {/* Support our work */}
      <section className="space-y-5">
        <h2 className="text-2xl font-semibold">Support our mission</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            <BlockHeading>Support our mission</BlockHeading>
            <ul className="list-disc pl-6 text-zinc-700 space-y-1">
              <li>Sign up for updates</li>
              <li>Share in your network</li>
              <li>
                <a
                  href="https://buymeacoffee.com/shaunsweeney"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Buy me a coffee ☕
                </a>
              </li>
            </ul>

            <div className="space-y-2">
              <div className="text-sm font-medium text-zinc-700">Quick share</div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://twitter.com/intent/tweet?text=Check%20out%20the%20Enleashed%20mission&url=https%3A%2F%2Fenleashed.tech"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
                >
                  Share on X
                </a>
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fenleashed.tech"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
                >
                  Share on LinkedIn
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && (navigator as any).share) {
                      (navigator as any)
                        .share({ title: 'Enleashed', url: 'https://enleashed.tech' })
                        .catch(() => {});
                    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText('https://enleashed.tech');
                    }
                  }}
                  className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
                >
                  Share…
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText('https://enleashed.tech');
                    }
                  }}
                  className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
                >
                  Copy link
                </button>
              </div>
              <ShareButtons />
            </div>

            <BlockHeading>Critique &amp; Challenge</BlockHeading>
            <p className="text-zinc-700">
              Use highlights, comments, and open discussion to ensure the solution remains inclusive,
              transparent, and representative of the people it serves.
            </p>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <BlockHeading>Help build the solution</BlockHeading>
            <p className="text-zinc-700">
              Are you a builder, designer, or data scientist who wants to help shape the platform?
              Get in touch by email:{' '}
              <a className="underline" href="mailto:fight@enleashed.tech">
                fight@enleashed.tech
              </a>
              .
            </p>

            <BlockHeading>Enable delivery</BlockHeading>
            <p className="text-zinc-700">
              We’re seeking collaboration with partners, funders, civic institutions, and innovators.
              Together we can build the frameworks that let this mission thrive.
            </p>

            <BlockHeading>Work in your community</BlockHeading>
            <p className="text-zinc-700">
              Be the change you wish to see in the world — launch sustainability initiatives, share
              learning materials, and bring people together around practical energy solutions.
            </p>

            <BlockHeading>Spread the word</BlockHeading>
            <p className="text-zinc-700">
              Share this project widely. The more people know, the stronger the movement becomes.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://twitter.com/intent/tweet?text=Check%20out%20the%20Enleashed%20mission&url=https%3A%2F%2Fenleashed.tech"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
              >
                Share on X
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fenleashed.tech"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
              >
                Share on LinkedIn
              </a>
              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== 'undefined' && (navigator as any).share) {
                    (navigator as any)
                      .share({ title: 'Enleashed', url: 'https://enleashed.tech' })
                      .catch(() => {});
                  } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
                    navigator.clipboard.writeText('https://enleashed.tech');
                  }
                }}
                className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
              >
                Share…
              </button>
              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.clipboard) {
                    navigator.clipboard.writeText('https://enleashed.tech');
                  }
                }}
                className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
              >
                Copy link
              </button>
            </div>

            <BlockHeading>Speak &amp; Communicate</BlockHeading>
            <p className="text-zinc-700">
              For media, talks, and outreach opportunities, please reach out directly at{' '}
              <a className="underline" href="mailto:fight@enleashed.tech">
                fight@enleashed.tech
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function TeamBlock({
  title,
  intro,
  items,
  defaultIcon,
  afterTitle,
}: {
  title: string;
  intro: string;
  items: Array<{ id: string; name: string; photoUrl: string | null; responsibilities: string | null }>;
  defaultIcon: string;
  afterTitle?: React.ReactNode;
}) {
  const hasItems = items.length > 0;
  return (
    <div className="space-y-3">
      {/* Header with consistent icon position (left), matching Corporals pattern */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={title} photoUrl={defaultIcon} size="xl" />
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600">{intro}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">{afterTitle}</div>
      </div>

      {hasItems && (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((c) => (
            <CardPerson
              key={c.id}
              name={c.name}
              photoUrl={c.photoUrl || defaultIcon}
              title="Approved Chief"
              blurb={c.responsibilities || undefined}
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
        <Avatar name={name} photoUrl={photoUrl} size="lg" />
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-xs text-gray-500">{title}</div>
        </div>
      </div>
      {blurb ? <p className="text-sm text-gray-700 mt-3">{blurb}</p> : null}
    </li>
  );
}

function Avatar({
  name,
  photoUrl,
  size = 'md',
}: {
  name: string;
  photoUrl: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');

  const sizeClass =
    size === 'xl'
      ? 'w-16 h-16'
      : size === 'lg'
      ? 'w-14 h-14'
      : size === 'sm'
      ? 'w-10 h-10'
      : 'w-12 h-12';

  return (
    <div className={`${sizeClass} rounded-full bg-gray-200 overflow-hidden grid place-items-center text-sm text-gray-600`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {photoUrl ? (
        <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials || '👤'}</span>
      )}
    </div>
  );
}

function BlockHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}
