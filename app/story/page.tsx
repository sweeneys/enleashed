export const dynamic = 'force-dynamic';

import WorkList from "../../components/WorkList"; // adjust if moved under src/

export default function StoryPage() {
  return (
    <WorkList
      category="STORY"
      title="My Story"
    />
  );
}
