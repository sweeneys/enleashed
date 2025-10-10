export const dynamic = 'force-dynamic';

import WorkList from '@/components/WorkList';
import { Category } from '@prisma/client';

export default function Resources() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Resources</h1>
      <WorkList category={Category.RESOURCES} title="Resources" />
    </main>
  );
}
