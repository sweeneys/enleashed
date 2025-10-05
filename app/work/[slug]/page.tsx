export const dynamic = 'force-dynamic';     // ✅ render on request

import { notFound } from "next/navigation"
import { prisma } from "@/server/prisma";
import ClientWork from "./work-client"

export default async function WorkPage({ params }: { params: { slug: string } }) {
  const work = await prisma.work.findUnique({ where: { slug: params.slug } })
  if (!work) return notFound()

  const comments = await prisma.comment.findMany({ where: { workId: work.id } })
  const highlights = await prisma.highlight.findMany({ where: { workId: work.id } })
  return <ClientWork work={work} comments={comments} highlights={highlights} />
}
