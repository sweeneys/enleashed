'use client'
import { useMemo, useRef, useState } from "react"
import type { Work, Comment as Cmt, Highlight } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

type Props = { work: Work, comments: Cmt[], highlights: Highlight[] }

// Split MDX into paragraph-like blocks (naive for MVP)
function splitBlocks(mdx: string) {
  const lines = mdx.split(/\n\n+/).map(s => s.trim()).filter(Boolean)
  return lines.map((text, i) => ({ id: `b-${i+1}`, text }))
}

// Apply highlights to a block of text using offset slicing
function renderWithHighlights(text: string, hs: {start:number,end:number,id:number, reaction?:string}[]) {
  if (!hs.length) return text
  // merge-sort segments
  const sorted = [...hs].sort((a,b)=>a.start-b.start)
  let out: (string|JSX.Element)[] = []
  let cursor = 0
  sorted.forEach(h => {
    const s = Math.max(0, Math.min(h.start, text.length))
    const e = Math.max(0, Math.min(h.end, text.length))
    if (s > cursor) out.push(text.slice(cursor, s))
    out.push(<mark key={h.id} className="mark annotation" data-highlight-id={h.id} title={h.reaction || "highlight"}>{text.slice(s, e)}</mark>)
    cursor = e
  })
  if (cursor < text.length) out.push(text.slice(cursor))
  return out
}

export default function ClientWork({ work, comments, highlights }: Props) {
  const blocks = useMemo(()=>splitBlocks(work.bodyMdx), [work.bodyMdx])
  const [cmts, setCmts] = useState<Cmt[]>(comments)
  const [hs, setHs] = useState<Highlight[]>(highlights)
  const sidebarRef = useRef<HTMLDivElement>(null)

  async function addComment(blockId: string, start: number, end: number) {
    const text = prompt("Your comment")
    const author = prompt("Your name (optional)") || undefined
    if (!text) return
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workId: work.id, blockId, start, end, text, author })
    })
    if (res.ok) {
      const saved = await res.json()
      setCmts(prev => [saved, ...prev])
    } else {
      alert("Failed to save comment")
    }
  }

  async function addReaction(blockId: string, start: number, end: number) {
    const reaction = prompt("Tag this highlight (e.g., love, insightful, unclear)") || "love"
    const res = await fetch("/api/highlights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workId: work.id, blockId, start, end, reaction })
    })
    if (res.ok) setHs(prev => [await res.json(), ...prev])
    else alert("Failed to save highlight")
  }

  function getSelectionWithin(el: HTMLElement) {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return null
    const range = sel.getRangeAt(0)
    if (!el.contains(range.startContainer) || !el.contains(range.endContainer)) return null
    // compute offsets within this block by mapping to textContent
    const pre = document.createRange()
    pre.selectNodeContents(el)
    pre.setEnd(range.startContainer, range.startOffset)
    const start = pre.toString().length
    const pre2 = document.createRange()
    pre2.selectNodeContents(el)
    pre2.setEnd(range.endContainer, range.endOffset)
    const end = pre2.toString().length
    if (start === end) return null
    return { start, end }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,360px] gap-8">
      <article className="prose max-w-none">
        <h1>{work.title}</h1>
        {blocks.map(b => {
          const blockHighlights = hs.filter(h=>h.blockId===b.id).map(h=>({start:h.start,end:h.end,id:h.id,reaction:h.reaction}))
          return (
            <p key={b.id} id={b.id} className="relative group">
              <span
                onMouseUp={(e)=>{
                  const el = e.currentTarget as HTMLElement
                  const sel = getSelectionWithin(el)
                  if (sel) {
                    const choice = window.prompt("Add (c)omment or (h)ighlight tag?", "c/h")
                    if (choice?.toLowerCase().startsWith("c")) addComment(b.id, sel.start, sel.end)
                    else if (choice?.toLowerCase().startsWith("h")) addReaction(b.id, sel.start, sel.end)
                  }
                }}
              >
                {renderWithHighlights(b.text, blockHighlights)}
              </span>
            </p>
          )
        })}
      </article>
      <aside ref={sidebarRef} className="md:sticky md:top-6 h-fit border rounded-xl p-4 space-y-4">
        <h2 className="font-semibold text-lg">Recent comments</h2>
        <ul className="space-y-3 max-h-[70vh] overflow-auto">
          {cmts.map(c => (
            <li key={c.id} className="border rounded p-3">
              <div className="text-xs text-zinc-500">{c.author || "Anonymous"} on <code>{c.blockId}</code> [{c.start},{c.end}]</div>
              <div className="mt-1">{c.text}</div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
