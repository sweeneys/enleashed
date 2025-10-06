"use client";

import { useEffect, useMemo, useState } from "react";
import { Category } from "@prisma/client";

type WorkLite = { slug: string; title: string; category: Category; updatedAt: string };
type WorkFull = {
  slug: string; title: string; summary?: string | null; bodyMdx: string; category: Category;
};

const ALL = "ALL";

export default function Admin() {
  const [secret, setSecret] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);

  const [list, setList] = useState<WorkLite[]>([]);
  const [filter, setFilter] = useState<Category | typeof ALL>(ALL);
  const [loadingList, setLoadingList] = useState(false);

  // form
  const [slug, setSlug] = useState("new-work");
  const [title, setTitle] = useState("New Work Title");
  const [summary, setSummary] = useState("");
  const [bodyMdx, setBodyMdx] = useState("# Heading\n\nWrite MDX here.");
  const [category, setCategory] = useState<Category>(Category.ESSAY);
  const [busy, setBusy] = useState(false);

  // ask once for admin secret
  useEffect(() => {
    const s = prompt("Enter admin secret")?.trim() || "";
    setSecret(s);
    setLoaded(true);
  }, []);

  // fetch list (optionally by category)
  async function fetchList(nextFilter: Category | typeof ALL = filter) {
    if (!secret) return;
    setLoadingList(true);
    try {
      const url = nextFilter === ALL ? "/api/admin/list-works" : `/api/admin/list-works?category=${nextFilter}`;
      const res = await fetch(url, { headers: { "x-admin-secret": secret } });
      if (!res.ok) throw new Error(`List failed (${res.status})`);
      const data = (await res.json()) as WorkLite[];
      setList(data);
    } catch (e: any) {
      alert(e.message || "Failed to fetch list");
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    if (loaded && secret) fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, secret]);

  // load one by slug
  async function loadBySlug(s: string) {
    if (!s) return;
    try {
      const res = await fetch(`/api/admin/get-work?slug=${encodeURIComponent(s)}`, {
        headers: { "x-admin-secret": secret },
      });
      if (!res.ok) throw new Error(`Load failed (${res.status})`);
      const w = (await res.json()) as WorkFull;
      setSlug(w.slug);
      setTitle(w.title);
      setSummary(w.summary ?? "");
      setBodyMdx(w.bodyMdx);
      setCategory(w.category);
    } catch (e: any) {
      alert(e.message || "Could not load item");
    }
  }

  // save (upsert)
  async function save() {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/upsert-work", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ slug, title, summary, bodyMdx, category }),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      alert("Saved");
      fetchList(filter);
    } catch (e: any) {
      alert(e.message || "Save failed");
    } finally {
      setBusy(false);
    }
  }

  // delete
  async function remove() {
    if (!slug) return;
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/upsert-work", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      alert("Deleted");
      setSlug("new-work");
      setTitle("New Work Title");
      setSummary("");
      setBodyMdx("# Heading\n\nWrite MDX here.");
      setCategory(Category.ESSAY);
      fetchList(filter);
    } catch (e: any) {
      alert(e.message || "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  const filteredList = useMemo(() => {
    if (filter === ALL) return list;
    return list.filter((w) => w.category === filter);
  }, [list, filter]);

  if (!loaded) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin</h1>

      {/* Picker */}
      <div className="grid gap-2 md:grid-cols-3">
        <div className="flex items-center gap-2">
          <label className="w-24 text-sm text-zinc-600">Filter</label>
          <select
            className="border p-2 rounded w-full"
            value={filter}
            onChange={(e) => { const v = e.target.value as Category | typeof ALL; setFilter(v); fetchList(v); }}
          >
            <option value={ALL}>All</option>
            {Object.values(Category).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 md:col-span-2">
          <label className="w-24 text-sm text-zinc-600">Existing</label>
          <select
            className="border p-2 rounded w-full"
            disabled={loadingList || filteredList.length === 0}
            onChange={(e) => loadBySlug(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              {loadingList ? "Loading..." : filteredList.length ? "Select a work…" : "No items"}
            </option>
            {filteredList.map((w) => (
              <option key={w.slug} value={w.slug}>
                {w.title} — {w.slug}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Editor */}
      <div className="space-y-3">
        <input
          className="border p-2 w-full rounded"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="slug (e.g., my-origin-story)"
        />
        <input
          className="border p-2 w-full rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <textarea
          className="border p-2 w-full rounded"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="summary"
        />
        <select
          className="border p-2 w-full rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {Object.values(Category).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <textarea
          className="border p-2 w-full rounded h-80 font-mono"
          value={bodyMdx}
          onChange={(e) => setBodyMdx(e.target.value)}
          placeholder="MDX body"
        />
        <div className="flex gap-3">
          <button onClick={save} disabled={busy} className="px-4 py-2 rounded bg-black text-white">
            {busy ? "Saving…" : "Save"}
          </button>
          <button onClick={remove} disabled={busy} className="px-4 py-2 rounded bg-red-600 text-white">
            {busy ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
