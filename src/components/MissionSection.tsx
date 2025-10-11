'use client';

import Countdown from '@/components/Countdown';

export default function MissionSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-12">
      {/* Countdown */}
      <Countdown />

      {/* The Mission (no soldier widget here anymore) */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">The Mission</h2>
        <p className="text-gray-700">
          We will add some details here on the problem.
        </p>
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
