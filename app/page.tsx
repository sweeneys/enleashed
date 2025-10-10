export const dynamic = 'force-dynamic'; // ✅ render on request

import MissionSection from "@/components/MissionSection"; // Mission block with countdown, theme song, playlist

export default async function Home() {
  return (
    <div className="space-y-12">
      {/* Hero banner */}
      <div className="overflow-hidden rounded-2xl border bg-gradient-to-b from-white to-zinc-50">
        <div className="relative">
          <img
            src="/hero.jpg"
            alt="Energy Unleashed — atomic power unchained"
            className="w-full h-64 md:h-80 object-cover"
          />
          {/* overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white drop-shadow">
            <h1 className="text-2xl md:text-3xl font-semibold">
              Energy Unleashed
            </h1>
            <p className="text-sm md:text-base opacity-95">
              March to fair electricity pricing to support democracy, decarbonisation and the economy
            </p>
          </div>
        </div>
      </div>

      {/* The Mission (countdown + objectives + theme song + playlist) */}
      <MissionSection />

      {/* Contact */}
      <div className="border-t pt-6 text-sm text-zinc-600">
        <p>
          Contact:{" "}
          <a
            href="mailto:fight@enleashed.tech"
            className="underline hover:text-zinc-900"
          >
            fight@enleashed.tech
          </a>
        </p>
      </div>
    </div>
  );
}
