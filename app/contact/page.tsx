
export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-zinc-600">
        Media, talks, and outreach. For enquiries email{" "}
        <a className="underline" href="mailto:fight@enleashed.tech">
          fight@enleashed.tech
        </a>.
      </p>
    </div>
  );
}
