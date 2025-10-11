'use client';

import { useState } from 'react';
import Field from '@/components/ui/Field';

type Props = {
  variant?: 'solid' | 'outline';
  label?: string;
  className?: string;
};

export default function SoldierButton({
  variant = 'solid',
  label = variant === 'solid' ? 'Join the mission if you accept the call 🫡' : 'Enlist as a soldier',
  className = '',
}: Props) {
  const [open, setOpen] = useState(false);

  const solid =
    'px-5 py-3 bg-indigo-600 text-white rounded-xl text-base font-semibold hover:bg-indigo-700 transition';
  const outline =
    'inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-50';

  return (
    <>
      <button onClick={() => setOpen(true)} className={`${variant === 'solid' ? solid : outline} ${className}`}>
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Become a Foot Soldier</h3>
              <button onClick={() => setOpen(false)} className="text-sm rounded-xl border px-2 py-1">Close</button>
            </div>

            <form method="POST" action="/mission-control/enlist" className="space-y-3" onSubmit={() => setOpen(false)}>
              <Field label="Name">
                <input name="name" required className="mt-1 w-full border rounded-xl px-3 py-2" />
              </Field>
              <Field label="Email (not displayed)">
                <input name="email" type="email" required className="mt-1 w-full border rounded-xl px-3 py-2" />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Town">
                  <input name="location" className="mt-1 w-full border rounded-xl px-3 py-2" />
                </Field>
                <Field label="Country">
                  <input name="country" className="mt-1 w-full border rounded-xl px-3 py-2" list="country-list" />
                  <datalist id="country-list">
                    <option>United Kingdom</option>
                    <option>Ireland</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </datalist>
                </Field>
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" name="supports" value="yes" />
                <span>Do you support the mission soldier 🫡?</span>
              </label>

              <Field label="Photo URL (optional)">
                <input name="photoUrl" type="url" placeholder="https://..." className="mt-1 w-full border rounded-xl px-3 py-2" />
              </Field>

              <div className="flex justify-end">
                <button className="px-3 py-2 text-sm rounded-xl border bg-gray-900 text-white">Enlist</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
