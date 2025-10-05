export const dynamic = 'force-dynamic';

import WorkList from "@/components/WorkList";
import { Category } from "@prisma/client";

export default function ResultsPage() {
  return <WorkList category={Category.RESULTS} title="Results" />;
}
