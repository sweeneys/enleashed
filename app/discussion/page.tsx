export const dynamic = 'force-dynamic';

import WorkList from "@/components/WorkList";
import { Category } from "@prisma/client";

export default function DiscussionPage() {
  return <WorkList category={Category.DISCUSSION} title="Discussion" />;
}
