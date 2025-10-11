'use client';

export default function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm">{label}</span>
      {children}
    </label>
  );
}
