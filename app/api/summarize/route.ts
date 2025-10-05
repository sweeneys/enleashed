import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/server/prisma";
import OpenAI from "openai"

export async function POST(req: NextRequest) {
  const { workSlug, period } = await req.json()
  const work = await prisma.work.findUnique({ where: { slug: workSlug } })
  if (!work) return NextResponse.json({ error: "Work not found" }, { status: 404 })
  const since = new Date(Date.now() - 7*24*60*60*1000) // 7d rolling default
  const comments = await prisma.comment.findMany({ where: { workId: work.id, createdAt: { gte: since } }, orderBy: { createdAt: "desc" } })
  const highlights = await prisma.highlight.findMany({ where: { workId: work.id, createdAt: { gte: since } }, orderBy: { createdAt: "desc" } })

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const prompt = `You are analyzing granular feedback on an academic work. Identify emergent themes, most-valued passages, common confusions, and actionable edits. Be concise and constructive.\n\nCOMMENTS JSON:\n${JSON.stringify(comments).slice(0, 12000)}\n\nHIGHLIGHTS JSON:\n${JSON.stringify(highlights).slice(0, 12000)}`
  let content = "AI key not set; cannot synthesize."
  try {
    if (process.env.OPENAI_API_KEY) {
      const res = await client.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [{ role: "system", content: "You are a meticulous academic editor." }, { role: "user", content: prompt }]
      })
      content = res.choices[0].message.content || "No content"
    }
  } catch (e:any) {
    content = "AI error: " + (e.message || "unknown")
  }

  const saved = await prisma.feedbackSummary.create({
    data: { workId: work.id, period: period || "rolling-7d", content }
  })
  return NextResponse.json(saved)
}
