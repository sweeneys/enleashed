'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// ✅ Define your nav model here
const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Learn & Immerse',
    href: '/learn',
    children: [
      { label: 'Resources', href: '/learn/resources' },
      { label: 'Friends', href: '/learn/friends' },
    ],
  },
  { label: 'Critique & Challenge', href: '/challenge' },
  { label: 'Mission Control', href: '/mission-control' }, // optional quick link
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-semibold text-lg">
            enleashed.tech
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center gap-2 border rounded-xl px-3 py-2"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span>Menu</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-xl hover:bg-gray-100 transition ${
                    pathname === item.href ? 'bg-gray-100' : ''
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="absolute left-0 mt-2 hidden group-hover:block bg-white border rounded-xl shadow-lg py-2 min-w-[220px]">
                    {item.children.map((ch) => (
                      <Link
                        key={ch.href}
                        href={ch.href}
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
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
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded-xl hover:bg-gray-100 ${
                      pathname === item.href ? 'bg-gray-100' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-2 mt-1 flex flex-col">
                      {item.children.map((ch) => (
                        <Link
                          key={ch.href}
                          href={ch.href}
                          onClick={() => setOpen(false)}
                          className="px-3 py-1 rounded-lg hover:bg-gray-50"
                        >
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
  );
}
