'use client'
import { useEffect, useState } from "react"

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [slug, setSlug] = useState("new-work")
  const [title, setTitle] = useState("New Work Title")
  const [summary, setSummary] = useState("")
  const [bodyMdx, setBodyMdx] = useState("# Heading\n\nWrite MDX here.")

  useEffect(() => {
    const token = prompt("Enter admin secret")
    if (token === process.env.NEXT_PUBLIC_ADMIN_PLACEHOLDER) {
      // This placeholder prevents exposing real secret. Real check is on server.
    }
    // naive client-gate; server also checks header
    setAuth(true)
  }, [])

  async function save() {
    const adminSecret = prompt("Confirm admin secret to save")
    const res = await fetch("/api/admin/upsert-work", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": adminSecret ?? "" },
      body: JSON.stringify({ slug, title, summary, bodyMdx })
    })
    alert(res.ok ? "Saved" : "Failed")
  }

  if (!auth) return null

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <input className="border p-2 w-full rounded" value={slug} onChange={e=>setSlug(e.target.value)} placeholder="slug" />
      <input className="border p-2 w-full rounded" value={title} onChange={e=>setTitle(e.target.value)} placeholder="title" />
      <textarea className="border p-2 w-full rounded" value={summary} onChange={e=>setSummary(e.target.value)} placeholder="summary" />
      <textarea className="border p-2 w-full rounded h-80 font-mono" value={bodyMdx} onChange={e=>setBodyMdx(e.target.value)} placeholder="MDX body" />
      <button onClick={save} className="px-4 py-2 rounded bg-black text-white">Save</button>
    </div>
  )
}
