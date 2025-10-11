'use client';

import Countdown from '@/components/Countdown'; // ✅ use the existing component
import SoldierFormModal from './SoldierFormModal';

export default function MissionSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-12">
      {/* Countdown — from existing component */}
      <Countdown />

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
