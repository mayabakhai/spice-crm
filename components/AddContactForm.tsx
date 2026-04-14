'use client';

import { addPerson } from '../app/actions';

export default function AddContactForm() {
  return (
    <details className="group">
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
        + Add New Contact
      </summary>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">New Contact Details</h3>

        <form action={addPerson} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="full_name" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. Marc Andreessen" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Primary Email</label>
              <input type="email" name="primary_email" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="marc@a16z.com" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
              <input type="text" name="city" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. San Francisco" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Network Roles (comma separated)</label>
            <input type="text" name="network_roles" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. Tier-1, MUBI-Passed, Founder" />
          </div>

          <button type="submit" className="mt-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">
            Save to Database
          </button>
        </form>
      </div>
    </details>
  );
}
