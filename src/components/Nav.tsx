'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'


const navItems = [
{ label: 'Home', href: '/' },
{ label: 'Learn & Immerse', href: '/learn', children: [
{ label: 'Resources', href: '/learn/resources' },
{ label: 'Friends', href: '/learn/friends' },
]
},
{ label: 'Critique & Challenge', href: '/challenge' },
{ label: 'Contact', href: '/contact' },
]


export default function Nav(){
const pathname = usePathname()
const [open, setOpen] = useState(false)


return (
<header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
<div className="mx-auto max-w-6xl px-4">
<div className="flex items-center justify-between h-16">
<Link href="/" className="font-semibold text-lg">enleashed.tech</Link>


{/* Mobile */}
<button
onClick={() => setOpen(!open)}
className="md:hidden inline-flex items-center gap-2 border rounded-xl px-3 py-2"
aria-label="Toggle menu"
>
<span>Menu</span>
</button>


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
}