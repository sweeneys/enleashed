export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../src/server/prisma";

export async function GET(req: NextRequest) {
  const admin = req.headers.get("x-admin-secret");
  if (!admin || admin !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;

  const works = await prisma.work.findMany({
    where: category ? { category: { equals: category as any } } : undefined,
    select: { slug: true, title: true, category: true, updatedAt: true },
    orderBy: [{ updatedAt: "desc" }],
  });

  return NextResponse.json(works);
}
