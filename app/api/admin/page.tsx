'use client'
import { useEffect, useState } from "react"

type Cat = "STORY"|"ESSAY"|"CODE"|"INTRO"|"BACKGROUND"|"METHODOLOGY"|"RESULTS"|"DISCUSSION"

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [slug, setSlug] = useState("new-work")
  const [title, setTitle] = useState("New Work Title")
  const [summary, setSummary] = useState("")
  const [bodyMdx, setBodyMdx] = useState("# Heading\n\nWrite MDX here.")
  const [category, setCategory] = useState<Cat>("ESSAY")

  useEffect(() => {
    prompt("Enter admin secret"); // UI gate only
    setAuth(true)
  }, [])

  async function loadBySlug() {
    const adminSecret = prompt("Confirm admin secret")
    if (!adminSecret) return
    const res = await fetch(`/api/admin/get-work?slug=${encodeURIComponent(slug)}`, {
      headers: { "x-admin-secret": adminSecret }
    })
    if (!res.ok) { alert("Not found / unauthorized"); return }
    const w = await res.json()
    setTitle(w.title || "")
    setSummary(w.summary || "")
    setBodyMdx(w.bodyMdx || "")
    setCategory(w.category || "ESSAY")
  }

  async function save() {
    const adminSecret = prompt("Confirm admin secret to save")
    const res = await fetch("/api/admin/upsert-work", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": adminSecret ?? "" },
      body: JSON.stringify({ slug, title, summary, bodyMdx, category })
    })
    alert(res.ok ? "Saved" : "Failed")
  }

  if (!auth) return null

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="flex gap-2">
        <input className="border p-2 rounded w-full" value={slug} onChange={e=>setSlug(e.target.value)} placeholder="slug (e.g., my-origin-story)" />
        <button onClick={loadBySlug} className="px-3 py-2 rounded border">Load</button>
      </div>
      <input className="border p-2 w-full rounded" value={title} onChange={e=>setTitle(e.target.value)} placeholder="title" />
      <textarea className="border p-2 w-full rounded" value={summary} onChange={e=>setSummary(e.target.value)} placeholder="summary" />
      <textarea className="border p-2 w-full rounded h-80 font-mono" value={bodyMdx} onChange={e=>setBodyMdx(e.target.value)} placeholder="MDX body" />
      <select className="border p-2 w-full rounded" value={category} onChange={e=>setCategory(e.target.value as Cat)}>
        <option value="ESSAY">Essay</option>
        <option value="STORY">Story</option>
        <option value="INTRO">Intro</option>
        <option value="BACKGROUND">Background</option>
        <option value="METHODOLOGY">Methodology</option>
        <option value="RESULTS">Results</option>
        <option value="CODE">Code</option>
        <option value="DISCUSSION">Discussion</option>
      </select>
      <button onClick={save} className="px-4 py-2 rounded bg-black text-white">Save</button>
    </div>
  )
}
