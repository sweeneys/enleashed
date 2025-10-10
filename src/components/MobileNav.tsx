"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "/mission",      label: "Mission Control" },
  { href: "/learn",        label: "Learn & Critique" },
  { href: "/support",      label: "Support & Grow" },
  { href: "/build",        label: "Build" },
  { href: "/communicate",  label: "Communicate" },
  { href: "/admin",        label: "Admin" }, // visible only via menu now
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // prevent background scroll when menu open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        aria-label="Open menu"
        aria-expanded={open}
        className="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open menu</span>
        <span className="inline-block w-5 h-0.5 bg-black mb-1" />
        <span className="inline-block w-5 h-0.5 bg-black mb-1" />
        <span className="inline-block w-5 h-0.5 bg-black" />
      </button>

      {/* Drawer */}
      {open && (
        <>
          <button
            aria-label="Close menu"
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <nav
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl md:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-semibold">Menu</span>
              <button
                className="rounded-md border px-2 py-1 text-sm"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                Close
              </button>
            </div>

            <div className="p-2 overflow-y-auto">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block px-3 py-3 rounded-md text-base hover:bg-zinc-50"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
