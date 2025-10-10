export const dynamic = 'force-dynamic';

const partners = [
  // add strings for now; later upgrade to a model
  // "Example Partner A",
  // "Example Partner B",
];

export default function PartnersPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-4">
      <h1 className="text-3xl font-bold">Partners</h1>
      <p className="text-zinc-700">Delivery partners collaborating on research, product, policy, and community programmes.</p>

      {partners.length === 0 ? (
        <p className="text-zinc-600">Partner listings coming soon.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-1">
          {partners.map((p) => (<li key={p}>{p}</li>))}
        </ul>
      )}
    </main>
  );
}
