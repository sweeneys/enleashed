export const dynamic = 'force-dynamic';

import ShareButtons from "@/components/ShareButtons";
import SoldierButton from "@/components/mission/SoldierButton";

export default function SupportSpeakPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Support &amp; Speak</h1>
      <p className="text-zinc-700 max-w-3xl">
        Every mission needs its voices — those who build, critique, fund, share, and speak for it.
        Join us in shaping the fair electricity future and help make science, policy, and innovation inclusive for all.
      </p>

      {/* Join the mission as a soldier */}
      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Join the mission as a soldier!</h2>
          <p className="text-zinc-700">
            <strong>What’s a soldier?</strong> Someone who follows and trusts the judgment of the leaders.
          </p>
          <div className="space-y-2">
            <p className="text-zinc-700 font-medium">Your responsibilities as a soldier shall include:</p>
            <ul className="list-disc pl-5 text-zinc-700 space-y-1">
              <li>Keeping the leaders honest</li>
              <li>
                Making sure you contribute your views to maximise the likelihood that the mission succeeds — there is
                strength in diversity (if you have any, if not, your service and grace are in no way diminished)
              </li>
              <li>
                Ensuring you are aligned with the mission and will follow the leaders into battle for energy justice
              </li>
            </ul>
          </div>
        </div>

        <div className="border rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 space-y-4 shadow-sm">
          <h3 className="text-xl font-semibold">Join the mission if you accept the call 🫡</h3>
          <p className="text-gray-700">
            Enlist to show support, get updates, and be part of the mobilisation.
          </p>
          <SoldierButton />
        </div>
      </section>

      {/* 1. Support our mission */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Support our mission</h2>
        <ul className="list-disc pl-6 text-zinc-700 space-y-1">
          <li>Sign up for updates</li>
          <li>Share in your network</li>
          <li>Buy us a coffee ☕ (group link later)</li>
        </ul>
        <ShareButtons />
      </section>

      {/* 2. Critique & Challenge */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Critique &amp; Challenge</h2>
        <p className="text-zinc-700 max-w-2xl">
          Use highlights, comments, and open discussion to ensure the solution remains inclusive,
          transparent, and representative of the people it serves.
        </p>
      </section>

      {/* 3. Help Build & Deliver */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Help build the solution</h2>
        <p className="text-zinc-700 max-w-2xl">
          Are you a builder, designer, or data scientist who wants to help shape the platform?
          Get in touch by email:{" "}
          <a className="underline" href="mailto:fight@enleashed.tech">
            fight@enleashed.tech
          </a>
        </p>
      </section>

      {/* 4. Enable delivery */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Enable delivery</h2>
        <p className="text-zinc-700 max-w-2xl">
          We’re seeking collaboration with partners, funders, civic institutions, and innovators.
          Together we can build the frameworks that let this mission thrive.
        </p>
      </section>

      {/* 5. Work in your community */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Work in your community</h2>
        <p className="text-zinc-700 max-w-2xl">
          Be the change you wish to see in the world — launch sustainability initiatives,
          share learning materials, and bring people together around practical energy solutions.
        </p>
      </section>

      {/* 6. Spread the word */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Spread the word</h2>
        <p className="text-zinc-700 max-w-2xl">
          Share this project widely. The more people know, the stronger the movement becomes.
        </p>
        <ShareButtons />
      </section>

      {/* 7. Speak & Communicate */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Speak &amp; Communicate</h2>
        <p className="text-zinc-700 max-w-2xl">
          For media, talks, and outreach opportunities, please reach out directly at{" "}
          <a className="underline" href="mailto:fight@enleashed.tech">
            fight@enleashed.tech
          </a>.
        </p>
      </section>
    </div>
  );
}
