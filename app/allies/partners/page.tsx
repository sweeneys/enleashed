export const dynamic = 'force-dynamic';

type Partner = {
  name: string;
  url?: string;
  logoSrc?: string;
  blurb?: string;
};

const partners: Partner[] = [
  // { name: "Example Partner A", url: "https://example.com" },
];

export default function PartnersPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Allies & Partners</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map(({ name, url, blurb }) => (
          <li key={name} className="p-4 rounded-lg border">
            <div className="font-medium">{name}</div>
            {blurb && <p className="text-sm mt-1">{blurb}</p>}
            {url && (
              <a href={url} className="text-sm underline mt-2 inline-block">
                Visit
              </a>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
