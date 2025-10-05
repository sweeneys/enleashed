export const dynamic = 'force-dynamic';

import WorkList from "@/components/WorkList";
import { Category } from "@prisma/client";

export default function IntroPage() {
  return <WorkList category={Category.INTRO} title="Intro" />;
}
