export const dynamic = 'force-dynamic';

export default function BuildPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Build</h1>
      <p className="text-zinc-600">Product docs, roadmaps, and GitHub repos.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <a className="block border rounded-lg p-4 hover:shadow-sm" href="https://github.com/" target="_blank" rel="noreferrer">
          <div className="font-semibold">GitHub Repositories</div>
          <div className="text-sm text-zinc-600">Codebases and experiments.</div>
        </a>
        <a className="block border rounded-lg p-4 hover:shadow-sm" href="#" rel="noreferrer">
          <div className="font-semibold">Product Documentation</div>
          <div className="text-sm text-zinc-600">Architecture, specs, and APIs.</div>
        </a>
      </div>
    </div>
  );
}
