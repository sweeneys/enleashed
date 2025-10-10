'use client';

import { useState } from 'react';
import Countdown from './Countdown';

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default function MissionSection() {
  const [openSuggest, setOpenSuggest] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 space-y-12">
      {/* Top row: mission + video placeholder */}
      <div className="grid items-start gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">The Mission</h2>
          <p className="text-gray-600">We will add some details here on the problem.</p>
          <div>
            <div className="text-sm text-gray-600 mb-2">Days to complete the mission</div>
            <Countdown />
          </div>

          <div>
            <h3 className="text-xl font-semibold mt-6 mb-2">Mission Objectives</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-800">
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
          </div>
        </div>

        <div className="border rounded-2xl aspect-video grid place-items-center bg-gray-50">
          <div className="text-center px-4">
            <div className="font-semibold mb-1">Introduction to the mission (video)</div>
            <div className="text-sm text-gray-600">Embed space reserved — add your video link when ready</div>
          </div>
        </div>
      </div>

      {/* Mission theme song */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Mission theme song</h3>
        <p className="italic">"I would walk 500 miles, and I would walk 500 more"</p>
        <div className="aspect-video w-full rounded-2xl overflow-hidden border">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/tbNlMtqrYS0"
            title="Mission Theme Song"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {/* Mission march playlist */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-bold">Mission march playlist</h3>
          <div className="flex items-center gap-2">
            <a
              href="https://open.spotify.com/playlist/0PGgAWLhU8q15qPRj1kXRF?si=6d5d294d1eda4424"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Open on Spotify
            </a>
            <button
              onClick={() => setOpenSuggest(true)}
              className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Suggest addition to playlist
            </button>
          </div>
        </div>

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

        <p className="text-sm text-gray-600">
          If the playlist is public, the embed above will list the songs automatically.
        </p>
      </div>

    </section>
  );
}
