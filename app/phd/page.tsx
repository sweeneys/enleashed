import Link from 'next/link'


// If you have separate subpages already (e.g. /phd/intro, /phd/background, ...),
// list them here so they appear in the navigable pane.
const phdPages = [
{ title: 'Overview', slug: 'overview' },
{ title: 'Intro', slug: 'intro' },
{ title: 'Background', slug: 'background' },
{ title: 'Methodology', slug: 'methodology' },
{ title: 'Results', slug: 'results' },
{ title: 'Code', slug: 'code' },
{ title: 'Discussion', slug: 'discussion' },
]


export default function PhdIndex(){
return (
<main className="mx-auto max-w-6xl px-4 py-8">
<h1 className="text-3xl font-bold mb-6">PhD</h1>
<div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
<aside className="md:sticky md:top-20 h-fit border rounded-2xl p-3 bg-white">
<h2 className="font-semibold mb-2">Navigate</h2>
<nav className="flex flex-col">
{phdPages.map(p => (
<Link key={p.slug} href={`/phd/${p.slug}`} className="px-3 py-2 rounded-xl hover:bg-gray-50">
{p.title}
</Link>
))}
</nav>
</aside>
<section className="border rounded-2xl p-6 bg-white">
<h2 className="text-xl font-semibold mb-4">All PhD Pages</h2>
<p className="text-gray-600 mb-6">Browse any chapter via the pane on the left.</p>
<ul className="grid md:grid-cols-2 gap-3">
{phdPages.map(p => (
<li key={p.slug}>
<Link href={`/phd/${p.slug}`} className="block border rounded-2xl p-4 hover:bg-gray-50">
<div className="font-medium">{p.title}</div>
<div className="text-sm text-gray-500">/phd/{p.slug}</div>
</Link>
</li>
))}
</ul>
</section>
</div>
</main>
)
}