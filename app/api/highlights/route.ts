export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../src/server/prisma"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { workId, blockId, start, end, reaction } = body || {}
  if (!workId || !blockId || typeof start !== "number" || typeof end !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
  const saved = await prisma.highlight.create({ data: { workId, blockId, start, end, reaction: reaction || "love" } })
  return NextResponse.json(saved)
}
