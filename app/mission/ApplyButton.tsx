'use client';

import { useState } from 'react';

type ChiefKey = 'WARRIOR' | 'BUILDER' | 'INVIGILATOR' | 'TEACHER' | 'CORPORAL';

export default function ApplyButton({ role }: { role: ChiefKey }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
      >
        {role === 'CORPORAL' ? 'Apply to become a Corporal' : `Apply to become a Chief ${role[0]}${role.slice(1).toLowerCase()}`}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Application</h3>
              <button onClick={() => setOpen(false)} className="text-sm rounded-xl border px-2 py-1">Close</button>
            </div>

            {role === 'CORPORAL' ? <CorporalForm /> : <ChiefForm role={role as Exclude<ChiefKey, 'CORPORAL'>} />}
          </div>
        </div>
      )}
    </>
  );
}

function ChiefForm({ role }: { role: 'WARRIOR' | 'BUILDER' | 'INVIGILATOR' | 'TEACHER' }) {
  return (
    <form method="POST" action="/mission-control/apply" className="space-y-3">
      <input type="hidden" name="role" value={role} />
      <Field label="Name"><input name="name" required className="mt-1 w-full border rounded-xl px-3 py-2" /></Field>
      <Field label="Email"><input name="email" type="email" required className="mt-1 w-full border rounded-xl px-3 py-2" /></Field>
      <Field label="Photo URL (optional)"><input name="photoUrl" type="url" className="mt-1 w-full border rounded-xl px-3 py-2" /></Field>
      <Field label="Responsibilities"><textarea name="responsibilities" required className="mt-1 w-full border rounded-xl px-3 py-2" rows={3} /></Field>
      <Field label={`What makes you a good chief ${role.toLowerCase()}?`}><textarea name="pitch" required className="mt-1 w-full border rounded-xl px-3 py-2" rows={3} /></Field>
      <div className="flex justify-end"><button className="px-3 py-2 text-sm rounded-xl border bg-gray-900 text-white">Submit</button></div>
    </form>
  );
}

function CorporalForm() {
  return (
    <form method="POST" action="/mission-control/corporal/apply" className="space-y-3">
      <Field label="Name"><input name="name" required className="mt-1 w-full border rounded-xl px-3 py-2" /></Field>
      <Field label="Email"><input name="email" type="email" required className="mt-1 w-full border rounded-xl px-3 py-2" /></Field>
      <Field label="Photo URL (optional)"><input name="photoUrl" type="url" className="mt-1 w-full border rounded-xl px-3 py-2" /></Field>
      <Field label="Responsibilities (optional)"><textarea name="responsibilities" className="mt-1 w-full border rounded-xl px-3 py-2" rows={3} /></Field>
      <div className="flex justify-end"><button className="px-3 py-2 text-sm rounded-xl border bg-gray-900 text-white">Submit</button></div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm">{label}</span>
      {children}
    </label>
  );
}
