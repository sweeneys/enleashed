export const dynamic = 'force-dynamic';

import WorkList from "@/components/WorkList";
import { Category } from "@prisma/client";

export default function StoryPage() {
  return <WorkList category={Category.STORY} title="My Story" />;
}
