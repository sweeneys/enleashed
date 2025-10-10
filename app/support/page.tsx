export const dynamic = 'force-dynamic';

import ShareButtons from "@/components/ShareButtons";

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Support &amp; Grow</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Support our mission</h2>
        <ul className="list-disc pl-6 text-zinc-700">
          <li>Sign up for updates</li>
          <li>Share in your network</li>
          <li>Buy me a coffee</li>
        </ul>
        <ShareButtons />
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Critique our work</h2>
        <p className="text-zinc-700">Use highlights and comments to ensure the solution is inclusive.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Help build the solution</h2>
        <p className="text-zinc-700">
          Get in touch: <a className="underline" href="mailto:fight@enleashed.tech">fight@enleashed.tech</a>
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Enable delivery</h2>
        <p className="text-zinc-700">Partners, funders, public sector and civic orgs welcome.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Work in your community</h2>
        <p className="text-zinc-700">Be the change—launch a sustainability initiative locally.</p>
      </section>
    </div>
  );
}
