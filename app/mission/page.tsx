export const dynamic = 'force-dynamic';

import YouTubeLive from "@/components/YouTubeLive";
import ShareButtons from "@/components/ShareButtons";

export default function MissionPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">Mission Control</h1>
        <p className="text-zinc-600">
          Energy Unleashed: building fair, flexible, and future-proof energy systems.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Watch us build</h2>
        {/* Supply a live video ID via env or leave blank to show "offline" */}
        <YouTubeLive channelName="Enleashedtech" />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">How you can help to support the mission</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">1) Support our mission</h3>
            <ul className="list-disc pl-6 text-zinc-700">
              <li>Sign up for updates</li>
              <li>Share in your network</li>
              <li>Buy me a coffee</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">2) Critique our work</h3>
            <p className="text-zinc-700">
              Use the inline highlights and comments to critique the work so the solution is inclusive.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">3) Help to build the solution</h3>
            <p className="text-zinc-700">
              Get in touch by email: <a className="underline" href="mailto:fight@enleashed.tech">fight@enleashed.tech</a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold">4) Help to enable delivery</h3>
            <p className="text-zinc-700">
              Partners, funders, and civic groups welcome—let’s align resources with impact.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">5) Work in your community</h3>
            <p className="text-zinc-700">
              Be the change: launch a sustainability initiative in your community.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">6) Spread the word</h3>
            <p className="text-zinc-700">Please share widely.</p>
            <ShareButtons />
          </div>
        </div>
      </section>
    </div>
  );
}
