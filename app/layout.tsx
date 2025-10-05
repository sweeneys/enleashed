import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Energy Unleashed",
  description:
    "PhD portfolio with inline highlights, comments, and AI feedback synthesis.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3 font-semibold">
              {/* Optional logo: place /public/logo.svg or /public/logo.png */}
              <img
                src="/logo.svg"
                alt="Energy Unleashed"
                className="h-7 w-auto"
                onError={(e) => {
                  // Hide the broken image icon if no logo is present yet
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-lg">Energy Unleashed</span>
            </a>

            <nav className="text-sm gap-5 hidden md:flex">
              <a href="/about" className="underline">
                About
              </a>
              <a href="/essays" className="underline">
                Essays
              </a>
              <a href="/story" className="underline">
                Story
              </a>
              <a href="/intro" className="underline">
                Intro
              </a>
              <a href="/background" className="underline">
                Background
              </a>
              <a href="/methodology" className="underline">
                Methodology
              </a>
              <a href="/results" className="underline">
                Results
              </a>
              <a href="/code" className="underline">
                Code
              </a>
              <a href="/discussion" className="underline">
                Discussion
              </a>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

        {/* Floating Admin button (bottom-right) */}
        <a
          href="/admin"
          className="fixed bottom-4 right-4 rounded-full shadow-lg bg-black text-white px-4 py-2 text-sm"
          title="Admin"
        >
          Admin
        </a>

        <footer className="border-t mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-zinc-500">
            © {new Date().getFullYear()} Your Name
          </div>
        </footer>
      </body>
    </html>
  );
}
