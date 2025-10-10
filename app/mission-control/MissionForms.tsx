'use client';
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
<button type="submit" className="px-3 py-2 text-sm rounded-xl border bg-gray-900 text-white">Submit</button>
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
<!-- Add more as needed -->
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
<button type="submit" className="px-3 py-2 text-sm rounded-xl border bg-gray-900 text-white">Enlist</button>
</div>
</form>
);
}