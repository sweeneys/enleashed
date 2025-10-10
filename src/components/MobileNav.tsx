"use client";

import { useState } from "react";

const links = [
  { href: "/about",        label: "About" },
  { href: "/essays",       label: "Essays" },
  { href: "/story",        label: "Story" },
  { href: "/intro",        label: "Intro" },
  { href: "/background",   label: "Background" },
  { href: "/methodology",  label: "Methodology" },
  { href: "/results",      label: "Results" },
  { href: "/code",         label: "Code" },
  { href: "/discussion",   label: "Discussion" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button (shown on small screens) */}
      <button
        aria-label="Open menu"
        aria-expanded={open}
        className="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm"
        onClick={() => setOpen(!open)}
      >
        {/* simple icon */}
        <span className="inline-block w-5 h-0.5 bg-black mb-1" />
        <span className="inline-block w-5 h-0.5 bg-black mb-1" />
        <span className="inline-block w-5 h-0.5 bg-black" />
      </button>

      {/* Slide-over / dropdown */}
      {open && (
        <>
          {/* backdrop */}
          <button
            aria-label="Close menu"
            className="fixed inset-0 bg-black/30 md:hidden"
            onClick={() => setOpen(false)}
          />
          <nav
            className="fixed top-0 right-0 w-72 h-full bg-white shadow-xl md:hidden p-4 flex flex-col gap-2 z-50"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Menu</span>
              <button
                className="rounded-md border px-2 py-1 text-sm"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-2 py-2 rounded hover:bg-zinc-50"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}

            <div className="mt-4 border-t pt-4">
              <a
                href="/admin"
                className="block px-2 py-2 rounded bg-black text-white text-center"
                onClick={() => setOpen(false)}
              >
                Admin
              </a>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
