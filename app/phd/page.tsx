export const dynamic = 'force-dynamic';

import Link from 'next/link';

export default function Challenge() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Critique & Challenge</h1>
      <p className="text-gray-700 mb-6">
        Bring your sharpest arguments, stress tests, and reviews. Help us improve the ideas and the build.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/phd" className="block border rounded-2xl p-6 hover:bg-gray-50">
          <div className="text-xl font-semibold mb-1">PhD</div>
          <div className="text-gray-600">Explore and critique the PhD chapters & methods.</div>
        </Link>
      </div>
    </main>
  );
}
