'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Item = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const items: Item[] = [
  { label: 'Mission Control', href: '/mission-control' },
  {
    label: 'Learn & Immerse',
    href: '/learn',
    children: [
      { label: 'Resources', href: '/learn/resources' },
      { label: 'Friends', href: '/learn/friends' },
    ],
  },
  { label: 'Critique & Challenge', href: '/challenge' },
  { label: 'Build & Train', href: '/build' },
  { label: 'Support & Speak', href: '/support-speak' }, // merged Support + Communicate
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => {
    setOpen(false);
    setExpanded({});
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [open]);

  return (
    <div className="md:hidden">
      {/* Toggle button */}
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 border rounded-xl px-3 py-2"
      >
        <span>Menu</span>
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30">
          <div
            ref={panelRef}
            className="ml-auto h-full w-[85%] max-w-sm bg-white shadow-xl p-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">Navigation</div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border px-2 py-1 text-sm"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto">
              <ul className="flex flex-col">
                {items.map((item) => {
                  const isActive = pathname === item.href;
                  const hasChildren = !!item.children?.length;
                  const isExpanded = expanded[item.href];

                  return (
                    <li key={item.href} className="border-b">
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          className={`flex-1 px-2 py-3 ${isActive ? 'font-semibold' : ''}`}
                        >
                          {item.label}
                        </Link>

                        {hasChildren && (
                          <button
                            type="button"
                            aria-expanded={isExpanded || false}
                            onClick={() =>
                              setExpanded((s) => ({ ...s, [item.href]: !s[item.href] }))
                            }
                            className="px-2 py-3 text-xs"
                          >
                            {isExpanded ? '−' : '+'}
                          </button>
                        )}
                      </div>

                      {hasChildren && isExpanded && (
                        <ul className="bg-gray-50">
                          {item.children!.map((ch) => {
                            const isChildActive = pathname === ch.href;
                            return (
                              <li key={ch.href}>
                                <Link
                                  href={ch.href}
                                  className={`block pl-5 pr-2 py-2 text-sm ${
                                    isChildActive ? 'font-semibold' : ''
                                  }`}
                                >
                                  {ch.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer actions (optional) */}
            <div className="pt-2 text-xs text-zinc-600">
              <div>© {new Date().getFullYear()} Energy Unleashed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
