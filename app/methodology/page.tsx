export const dynamic = 'force-dynamic';

import WorkList from "@/components/WorkList";
import { Category } from "@prisma/client";

export default function MethodologyPage() {
  return <WorkList category={Category.METHODOLOGY} title="Methodology" />;
}
