'use client';

import { useState } from 'react';

export default function SoldierFormModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* the clickable trigger */}
      <div onClick={() => setOpen(true)}>{children}</div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Join the Mission</h3>

            <form
              method="POST"
              action="/mission-control/enlist"
              className="space-y-3"
              onSubmit={() => setOpen(false)} // close after submit
            >
              <label className="block">
                <span className="text-sm">Name</span>
                <input
                  name="name"
                  required
                  className="mt-1 w-full border rounded-xl px-3 py-2"
                />
              </label>

              <label className="block">
                <span className="text-sm">Email (not displayed)</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full border rounded-xl px-3 py-2"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm">Town</span>
                  <input
                    name="location"
                    className="mt-1 w-full border rounded-xl px-3 py-2"
                  />
                </label>
                <label className="block">
                  <span className="text-sm">Country</span>
                  <input
                    name="country"
                    className="mt-1 w-full border rounded-xl px-3 py-2"
                    list="country-list"
                  />
                  <datalist id="country-list">
                    <option>United Kingdom</option>
                    <option>Ireland</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </datalist>
                </label>
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" name="supports" value="yes" />
                <span>Do you support the mission soldier 🫡?</span>
              </label>

              <label className="block">
                <span className="text-sm">Photo URL (optional)</span>
                <input
                  name="photoUrl"
                  type="url"
                  placeholder="https://..."
                  className="mt-1 w-full border rounded-xl px-3 py-2"
                />
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 text-sm rounded-xl border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 text-sm rounded-xl border bg-indigo-600 text-white"
                >
                  Enlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
