'use client';

import { useEffect, useMemo, useState } from 'react';
import SoldierFormModal from './SoldierFormModal';

/* ------------------------------------------------------------
   COUNTDOWN COMPONENT — restored (launch: 23:59, 20 Dec 2025)
------------------------------------------------------------ */
function Countdown({
  targetISO,
  label = 'Launch countdown',
}: {
  targetISO: string;
  label?: string;
}) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, target - now);
  const secs = Math.floor(remaining / 1000) % 60;
  const mins = Math.floor(remaining / (1000 * 60)) % 60;
  const hours = Math.floor(remaining / (1000 * 60 * 60)) % 24;
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const done = remaining === 0;

  return (
    <div className="rounded-2xl border p-6 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <h3 className="text-xl font-semibold">
            {new Date(targetISO).toLocaleString()}
          </h3>
        </div>

        <div
          className="grid grid-cols-4 gap-2 text-center"
          aria-live="polite"
          aria-label={`Time remaining to ${label}`}
        >
          <div className="min-w-16 rounded-xl border px-3 py-2">
            <div className="text-2xl font-bold tabular-nums">{days}</div>
            <div className="text-xs text-gray-600">Days</div>
          </div>
          <div className="min-w-16 rounded-xl border px-3 py-2">
            <div className="text-2xl font-bold tabular-nums">{hours}</div>
            <div className="text-xs text-gray-600">Hours</div>
          </div>
          <div className="min-w-16 rounded-xl border px-3 py-2">
            <div className="text-2xl font-bold tabular-nums">{mins}</div>
            <div className="text-xs text-gray-600">Minutes</div>
          </div>
          <div className="min-w-16 rounded-xl border px-3 py-2">
            <div className="text-2xl font-bold tabular-nums">{secs}</div>
            <div className="text-xs text-gray-600">Seconds</div>
          </div>
        </div>
      </div>

      {done && (
        <p className="mt-3 text-center font-medium text-amber-800">
          It’s time. 🔔
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------
   MAIN SECTION
------------------------------------------------------------ */
export default function MissionSection() {
  // Default: 23:59 on 20 December 2025
  const targetISO =
    process.env.NEXT_PUBLIC_LAUNCH_UTC ?? '2025-12-20T23:59:00Z';

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-12">
      {/* Countdown */}
      <Countdown targetISO={targetISO} label="Launch countdown" />

      {/* Top: Mission (left) + Soldier CTA (right) */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Mission details */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">The Mission</h2>
          <p className="text-gray-700">
            We will add some details here on the problem.
          </p>
        </div>

        {/* Soldier CTA */}
        <div className="border rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 space-y-4 shadow-sm">
          <h3 className="text-xl font-semibold">Join the mission as a soldier!</h3>
          <p className="text-gray-700">
            What's a soldier? Someone who follows and trusts the judgment of the leaders.
          </p>

          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-medium">Your responsibilities as a soldier shall include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Keeping the leaders honest</li>
              <li>
                Making sure you contribute your views to maximise the likelihood that the mission
                succeeds — there is strength in diversity (if you have any, if not, your service
                and grace are in no way diminished)
              </li>
              <li>
                Ensuring you are aligned with the mission and will follow the leaders into battle
                for energy justice
              </li>
            </ul>
          </div>

          <div className="pt-3">
            <SoldierFormModal>
              <button className="px-5 py-3 bg-indigo-600 text-white rounded-xl text-base font-semibold hover:bg-indigo-700 transition">
                Join the mission if you accept the call 🫡
              </button>
            </SoldierFormModal>
          </div>
        </div>
      </div>

      {/* Theme song — full width, autoplay OFF */}
      <div className="space-y-2">
        <div className="aspect-video w-full rounded-2xl overflow-hidden border">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/tbNlMtqrYS0?rel=0&controls=1"
            title="Mission Theme Song"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="italic text-center mt-1">
          "I would walk 500 miles, and I would walk 500 more"
        </p>
      </div>

      {/* Mission march playlist */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Mission march playlist</h3>
        <div className="rounded-2xl overflow-hidden border">
          <iframe
            src="https://open.spotify.com/embed/playlist/0PGgAWLhU8q15qPRj1kXRF?utm_source=generator"
            width="100%"
            height="400"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
