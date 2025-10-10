export const dynamic = 'force-dynamic';

import "@/styles/globals.css";
import type { ReactNode } from "react";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";

export const metadata = {
  title: "Energy Unleashed",
  description: "PhD portfolio with inline highlights, comments, and AI feedback synthesis.",
  icons: { icon: "/logo-mark.png" },
  openGraph: {
    title: "Energy Unleashed",
    description: "PhD portfolio with inline highlights, comments, and AI feedback synthesis.",
    images: [{ url: "/hero.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900">
        <header className="border-b bg-white/70 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            {/* Brand */}
            <a href="/" className="flex items-center gap-3 font-semibold">
              <Image
                src="/logo-mark.png"
                alt="Energy Unleashed"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-black/10 shadow-sm"
              />
              <span className="text-lg tracking-tight">Energy Unleashed</span>
            </a>

            {/* Desktop nav - UPDATED */}
            <nav className="hidden md:flex items-center gap-5 text-sm">
              <a href="/mission" className="hover:underline">Mission Control</a>
              <a href="/learn" className="hover:underline">Learn &amp; Critique</a>
              <a href="/support" className="hover:underline">Support &amp; Grow</a>
              <a href="/build" className="hover:underline">Build</a>
              <a href="/communicate" className="hover:underline">Communicate</a>
            </nav>

            {/* Right controls: UK pill + Mobile menu */}
            <div className="flex items-center gap-3">
              <a
                href="/mission"
                className="hidden sm:flex items-center gap-2 rounded-full border px-3 py-1 text-xs shadow-sm hover:bg-zinc-50"
                title="UK context"
              >
                <Image
                  src="/flag.png"
                  alt="United Kingdom"
                  width={20}
                  height={14}
                  className="h-3.5 w-5 rounded-[2px] object-cover"
                />
                <span>UK</span>
              </a>
              <MobileNav />
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

        <footer className="border-t mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-zinc-500 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>© {new Date().getFullYear()} Your Name · UK-based research</div>
            <div>
              Contact:{" "}
              <a href="mailto:fight@enleashed.tech" className="underline hover:text-zinc-700">
                fight@enleashed.tech
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
