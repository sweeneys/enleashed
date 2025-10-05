import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "PhD | Feedback & Highlights",
  description: "Showcase your PhD with inline highlights, comments, and AI feedback synthesis."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900">
        <header className="border-b">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="font-semibold">PhD Portfolio</a>
            <nav className="text-sm gap-4 flex">
              <a href="/admin" className="underline">Admin</a>
              <a href="/about" className="underline">About</a>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t mt-16">
          <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-zinc-500">
            © {new Date().getFullYear()} Your Name
          </div>
        </footer>
      </body>
    </html>
  );
}
