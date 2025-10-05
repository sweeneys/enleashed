export const dynamic = 'force-dynamic';

import WorkList from "@/components/WorkList";
import { Category } from "@prisma/client";

export default function EssaysPage() {
  return <WorkList category={Category.ESSAY} title="Essays" />;
}
