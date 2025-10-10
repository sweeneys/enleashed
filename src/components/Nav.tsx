'use client'


{/* Desktop nav */}
<nav className="hidden md:flex items-center gap-2">
{navItems.map(item => (
<div key={item.label} className="relative group">
<Link
href={item.href}
className={`px-3 py-2 rounded-xl hover:bg-gray-100 transition ${pathname===item.href ? 'bg-gray-100' : ''}`}
>{item.label}</Link>
{item.children && (
<div className="absolute left-0 mt-2 hidden group-hover:block bg-white border rounded-xl shadow-lg py-2 min-w-[220px]">
{item.children.map(ch => (
<Link key={ch.href} href={ch.href} className="block px-4 py-2 hover:bg-gray-50">
{ch.label}
</Link>
))}
</div>
)}
</div>
))}
</nav>
</div>


{/* Mobile drawer */}
{open && (
<div className="md:hidden pb-4">
<div className="flex flex-col gap-1">
{navItems.map(item => (
<div key={item.label}>
<Link
href={item.href}
onClick={() => setOpen(false)}
className={`block px-3 py-2 rounded-xl hover:bg-gray-100 ${pathname===item.href ? 'bg-gray-100' : ''}`}
>{item.label}</Link>
{item.children && (
<div className="ml-2 mt-1 flex flex-col">
{item.children.map(ch => (
<Link key={ch.href} href={ch.href} onClick={() => setOpen(false)} className="px-3 py-1 rounded-lg hover:bg-gray-50">
{ch.label}
</Link>
))}
</div>
)}
</div>
))}
</div>
</div>
)}
</div>
</header>
)
}