export const dynamic = 'force-dynamic';

export default function LearnPage() {
  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-6">
      {/* Left nav */}
      <aside className="md:sticky md:top-6 self-start border rounded-lg p-3">
        <nav className="space-y-1 text-sm">
          <a href="/essays" className="block px-2 py-1 rounded hover:bg-zinc-50">Essays</a>
          <a href="/story" className="block px-2 py-1 rounded hover:bg-zinc-50">Stories</a>
          <a href="/phd" className="block px-2 py-1 rounded hover:bg-zinc-50">PhD Chapters</a>
          <a href="/course" className="block px-2 py-1 rounded hover:bg-zinc-50">Course</a>
        </nav>
      </aside>

      {/* Intro copy */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">Learn &amp; Critique</h1>
        <p className="text-zinc-600">
          Explore essays, stories, and PhD chapters. Use highlights and comments to give precise feedback.
        </p>
        <ul className="list-disc pl-6 text-zinc-700">
          <li><a className="underline" href="/essays">Essays</a> — reflections, literature, arguments.</li>
          <li><a className="underline" href="/story">Stories</a> — background, journey, motivations.</li>
          <li><a className="underline" href="/phd">PhD Chapters</a> — Intro, Background, Methodology, Results, Code, Discussion.</li>
          <li><a className="underline" href="/course">Course</a> — learning materials (coming soon).</li>
        </ul>
      </section>
    </div>
  );
}
