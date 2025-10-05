export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../src/server/prisma"

export async function POST(req: NextRequest) {
  const admin = req.headers.get("x-admin-secret")
  if (!admin || admin !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { slug, title, summary, bodyMdx } = await req.json()
  if (!slug || !title || !bodyMdx) return NextResponse.json({ error: "Invalid" }, { status: 400 })
  const saved = await prisma.work.upsert({
    where: { slug },
    create: { slug, title, summary, bodyMdx },
    update: { title, summary, bodyMdx }
  })
  return NextResponse.json(saved)
}
