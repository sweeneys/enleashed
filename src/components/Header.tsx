'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Mission Control', href: '/mission-control' },
  { label: 'Learn & Immerse', href: '/learn' },
  { label: 'Critique & Challenge', href: '/challenge' },
  { label: 'Build & Train', href: '/build' },
  { label: 'Support & Speak', href: '/support-speak' }, // merged Support & Grow + Communicate
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/favicon.png" alt="" className="w-8 h-8 rounded-full" />
            <span className="font-semibold text-lg">Energy Unleashed</span>
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
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-1 py-2 transition ${
                  pathname === item.href ? 'font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden pb-3">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`px-2 py-2 rounded-lg hover:bg-gray-100 ${
                    pathname === item.href ? 'font-semibold' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
