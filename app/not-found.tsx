export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-zinc-600 mt-2">
        The page you’re looking for doesn’t exist.{" "}
        <a href="/" className="underline">Go back home</a>.
      </p>
    </main>
  );
}
