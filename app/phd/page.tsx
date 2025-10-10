export const dynamic = 'force-dynamic';

import WorkList from "@/components/WorkList";
import { Category } from "@prisma/client";

export default function PhDChaptersPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold">PhD Chapters</h1>
        <p className="text-zinc-600">Browse chapters and give targeted feedback.</p>
      </header>

      <WorkList category={Category.INTRO} title="Intro" />
      <WorkList category={Category.BACKGROUND} title="Background" />
      <WorkList category={Category.METHODOLOGY} title="Methodology" />
      <WorkList category={Category.RESULTS} title="Results" />
      <WorkList category={Category.CODE} title="Code" />
      <WorkList category={Category.DISCUSSION} title="Discussion" />
    </div>
  );
}
