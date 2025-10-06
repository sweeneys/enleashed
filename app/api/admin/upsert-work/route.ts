export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../src/server/prisma";

export async function POST(req: NextRequest) {
  const admin = req.headers.get("x-admin-secret");
  if (!admin || admin !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, title, summary, bodyMdx, category } = await req.json();
  if (!slug || !title || !bodyMdx || !category) {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }

  const saved = await prisma.work.upsert({
    where: { slug },
    create: { slug, title, summary, bodyMdx, category },
    update: { title, summary, bodyMdx, category },
  });

  return NextResponse.json(saved);
}

export async function DELETE(req: NextRequest) {
  const admin = req.headers.get("x-admin-secret");
  if (!admin || admin !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await req.json();
  if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

  await prisma.work.delete({ where: { slug } });
  return NextResponse.json({ ok: true });
}
