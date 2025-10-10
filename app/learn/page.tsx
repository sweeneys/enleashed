import Link from 'next/link'


export default function Learn(){
return (
<main className="mx-auto max-w-6xl px-4 py-10">
<h1 className="text-3xl font-bold mb-6">Learn & Immerse</h1>
<p className="text-gray-700 mb-6">Dive deep, get context, and explore related work.</p>
<div className="grid md:grid-cols-2 gap-4">
<Link href="/learn/resources" className="block border rounded-2xl p-6 hover:bg-gray-50">
<div className="text-xl font-semibold mb-1">Resources</div>
<div className="text-gray-600">Reading lists, references, tools.</div>
</Link>
<Link href="/learn/friends" className="block border rounded-2xl p-6 hover:bg-gray-50">
<div className="text-xl font-semibold mb-1">Friends</div>
<div className="text-gray-600">Allies, collaborators, and inspirations.</div>
</Link>
</div>
</main>
)
}