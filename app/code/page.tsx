export const dynamic = 'force-dynamic';

import WorkList from "@/components/WorkList";
import { Category } from "@prisma/client";

export default function CodePage() {
  return <WorkList category={Category.CODE} title="Code" />;
}
