'use client';

import { addOrganization } from '../app/actions';

export default function AddOrgForm() {
  return (
    <details className="group">
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
        + Add New Organization
      </summary>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">New Organization Details</h3>

        <form action={addOrganization} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Organization Name</label>
              <input type="text" name="name" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. Acme Corp" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
              <input type="text" name="type" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. VC, Startup, SaaS" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Website</label>
            <input type="text" name="website" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. acme.com" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Short Description</label>
            <textarea name="short_description" rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="What do they do?" />
          </div>

          <button type="submit" className="mt-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">
            Save to Database
          </button>
        </form>
      </div>
    </details>
  );
}
