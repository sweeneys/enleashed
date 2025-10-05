export const dynamic = 'force-dynamic';

import WorkList from "@/components/WorkList";
import { Category } from "@prisma/client";

export default function BackgroundPage() {
  return <WorkList category={Category.BACKGROUND} title="Background" />;
}
