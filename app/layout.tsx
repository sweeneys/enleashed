export const dynamic = 'force-dynamic';

import "@/styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Energy Unleashed",
  description:
    "PhD portfolio with inline highlights, comments, and AI feedback synthesis.",
  icons: { icon: "/logo-mark.png" }, // ✅ uses your circle logo
  openGraph: {
    title: "Energy Unleashed",
    description:
      "PhD portfolio with inline highlights, comments, and AI feedback synthesis.",
    images: [{ url: "/hero.jpg", width: 1200, height: 630 }], // ✅ put hero.jpg in /public
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
              <img
                src="/logo-mark.png"
                alt="Energy Unleashed"
                className="h-8 w-8 rounded-full object-cover ring-1 ring-black/10 shadow-sm"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-lg tracking-tight">Energy Unleashed</span>
            </a>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-5 text-sm">
              <a href="/about" className="hover:underline">About</a>
              <a href="/essays" className="hover:underline">Essays</a>
              <a href="/story" className="hover:underline">Story</a>
              <a href="/intro" className="hover:underline">Intro</a>
              <a href="/background" className="hover:underline">Background</a>
              <a href="/methodology" className="hover:underline">Methodology</a>
              <a href="/results" className="hover:underline">Results</a>
              <a href="/code" className="hover:underline">Code</a>
              <a href="/discussion" className="hover:underline">Discussion</a>
            </nav>

            {/* UK flag pill */}
            <a
              href="/about"
              className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs shadow-sm hover:bg-zinc-50"
              title="UK context"
            >
              <img
                src="/flag.png"
                alt="United Kingdom"
                className="h-3.5 w-5 rounded-[2px] object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span>UK</span>
            </a>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

        {/* Floating Admin button */}
        <a
          href="/admin"
          className="fixed bottom-4 right-4 rounded-full shadow-lg bg-black text-white px-4 py-2 text-sm"
          title="Admin"
        >
          Admin
        </a>

        {/* Footer */}
        <footer className="border-t mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-zinc-500 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              © {new Date().getFullYear()} Your Name · UK-based research
            </div>
            <div>
              Contact:{" "}
              <a
                href="mailto:shaun@sweetech.co.uk"
                className="underline hover:text-zinc-700"
              >
                shaun@sweetech.co.uk
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
