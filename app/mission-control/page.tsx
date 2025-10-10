export const dynamic = 'force-dynamic';
</div>


{soldiers.length === 0 ? (
<p className="text-gray-600">No soldiers yet. Be the first to enlist! 🫡</p>
) : (
<ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
{soldiers.map((s) => (
<li key={s.id} className="border rounded-xl p-3 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
{s.photoUrl ? (
// eslint-disable-next-line @next/next/no-img-element
<img src={s.photoUrl} alt={s.name} className="w-full h-full object-cover" />
) : (
<div className="w-full h-full grid place-items-center text-xs text-gray-500">👤</div>
)}
</div>
<div className="text-sm font-medium truncate">{s.name}</div>
</li>
))}
</ul>
)}
<div className="text-center text-sm text-gray-700">Faith — united we stand, divided we fall 🫡</div>
</section>


{/* Forms (server actions live inside MissionForms) */}
<MissionForms />
</main>
);
}


function TeamBlock({ title, intro, role, items }: { title: string; intro: string; role: ChiefRole; items: any[] }) {
return (
<div className="space-y-3">
<div className="flex items-center justify-between">
<div>
<h3 className="text-xl font-semibold">{title}</h3>
<p className="text-gray-600">{intro}</p>
</div>
{/* Apply button opens form section below via hash */}
<a href={`#apply-${role.toLowerCase()}`} className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">
Apply to become a {title.replace('Chief ', 'Chief ')}
</a>
</div>
{items.length === 0 ? (
<p className="text-gray-600">No approved chiefs yet.</p>
) : (
<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
{items.map((c) => (
<li key={c.id} className="border rounded-2xl p-4">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
{c.photoUrl ? (
// eslint-disable-next-line @next/next/no-img-element
<img src={c.photoUrl} alt={c.name} className="w-full h-full object-cover" />
) : (
<div className="w-full h-full grid place-items-center text-xs text-gray-500">👤</div>
)}
</div>
<div>
<div className="font-semibold">{c.name}</div>
<div className="text-xs text-gray-500">Approved Chief</div>
</div>
</div>
{c.responsibilities && <p className="text-sm text-gray-700 mt-3">{c.responsibilities}</p>}
</li>
))}
</ul>
)}
</div>
);
}