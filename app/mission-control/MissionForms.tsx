'use client';

import { useState } from 'react';

export default function MissionForms() {
  const [open, setOpen] = useState<
    'WARRIOR' | 'BUILDER' | 'INVIGILATOR' | 'TEACHER' | 'SOLDIER' | null
  >(null);

  return (
    <section className="space-y-10">
      <h2 className="text-2xl font-semibold">Apply / Enlist</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {(['WARRIOR', 'BUILDER', 'INVIGILATOR', 'TEACHER'] as const).map((role) => (
          <div key={role} id={`apply-${role.toLowerCase()}`} className="border rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="font-semibold">
                Apply to become a Chief {role.charAt(0) + role.slice(1).toLowerCase()}
              </div>
              <button
                onClick={() => setOpen(open === role ? null : role)}
                className="text-sm rounded-xl border px-3 py-2 hover:bg-gray-50"
              >
                {open === role ? 'Close' : 'Open form'}
              </button>
            </div>
            {open === role && <ChiefForm role={role} />}
          </div>
        ))}
      </div>

      <div className="border rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Become a Foot Soldier</div>
          <button
            onClick={() => setOpen(open === 'SOLDIER' ? null : 'SOLDIER')}
            className="text-sm rounded-xl border px-3 py-2 hover:bg-gray-50"
          >
            {open === 'SOLDIER' ? 'Close' : 'Open form'}
          </button>
        </div>
        {open === 'SOLDIER' && <SoldierForm />}
      </div>
    </section>
  );
}

function ChiefForm({ role }: { role: 'WARRIOR' | 'BUILDER' | 'INVIGILATOR' | 'TEACHER' }) {
  return (
    <form method="POST" action="/mission-control/apply" className="mt-4 space-y-3">
      <input type="hidden" name="role" value={role} />

      <label className="block">
        <span className="text-sm">Name</span>
        <input name="name" required className="mt-1 w-full border rounded-xl px-3 py-2" />
      </label>

      <label className="block">
        <span className="text-sm">Email</span>
        <input name="email" type="email" required className="mt-1 w-full border rounded-xl px-3 py-2" />
      </label>

      <label className="block">
        <span className="text-sm">Photo URL (optional)</span>
        <input name="photoUrl" type="url" placeholder="https://..." className="mt-1 w-full border rounded-xl px-3 py-2" />
      </label>

      <label className="block">
        <span className="text-sm">Responsibilities</span>
        <textarea name="responsibilities" required className="mt-1 w-full border rounded-xl px-3 py-2" rows={3} />
      </label>

      <label className="block">
        <span className="text-sm">What makes you a good chief {role.toLowerCase()}?</span>
        <textarea name="pitch" required className="mt-1 w-full border rounded-xl px-3 py-2" rows={3} />
      </label>

      <div className="flex items-center justify-end gap-2">
        <button type="submit" className="px-3 py-2 text-sm rounded-xl border bg-gray-900 text-white">
          Submit
        </button>
      </div>
    </form>
  );
}

function SoldierForm() {
  return (
    <form method="POST" action="/mission-control/enlist" className="mt-4 space-y-3">
      <label className="block">
        <span className="text-sm">Name</span>
        <input name="name" required className="mt-1 w-full border rounded-xl px-3 py-2" />
      </label>

      <label className="block">
        <span className="text-sm">Email (not displayed)</span>
        <input name="email" type="email" required className="mt-1 w-full border rounded-xl px-3 py-2" />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm">Town</span>
          <input name="location" className="mt-1 w-full border rounded-xl px-3 py-2" />
        </label>

        <label className="block">
          <span className="text-sm">Country</span>
          <input name="country" className="mt-1 w-full border rounded-xl px-3 py-2" list="country-list" />
          <datalist id="country-list">
            <option>United Kingdom</option>
            <option>Ireland</option>
            <option>United States</option>
            <option>Canada</option>
            <option>Australia</option>
            {/* Add more as needed */}
          </datalist>
        </label>
      </div>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="supports" value="yes" />
        <span>Do you support the mission soldier🫡?</span>
      </label>

      <label className="block">
        <span className="text-sm">Photo URL (optional)</span>
        <input name="photoUrl" type="url" placeholder="https://..." className="mt-1 w-full border rounded-xl px-3 py-2" />
      </label>

      <div className="flex items-center justify-end gap-2">
        <button type="submit" className="px-3 py-2 text-sm rounded-xl border bg-gray-900 text-white">
          Enlist
        </button>
      </div>
    </form>
  );
}
