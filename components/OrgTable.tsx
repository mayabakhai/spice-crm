'use client';

import { deleteOrganization } from '../app/actions';
import { Organization } from '../utils/types';

interface OrgTableProps {
  organizations: Organization[];
}

export default function OrgTable({ organizations }: OrgTableProps) {
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      await deleteOrganization(id);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50/50 p-4">
        <h2 className="text-lg font-semibold text-gray-800">Portfolio & Pipeline (Startups)</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <th className="p-4 font-semibold">Organization Name</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Description</th>
              <th className="p-4 font-semibold">Website</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {organizations?.map((org) => (
              <tr key={org.id} className="transition-colors hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{org.name}</td>
                <td className="p-4">
                  <span className="rounded-md bg-gray-100 border border-gray-200 px-2 py-1 text-xs font-medium text-gray-700">
                    {org.type || 'N/A'}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">{org.short_description || '—'}</td>
                <td className="p-4 text-sm text-blue-500 hover:underline">
                  <a href={`https://${org.website}`} target="_blank" rel="noreferrer">
                    {org.website}
                  </a>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(org.id, org.name)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {organizations?.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-sm text-gray-500">
                  No organizations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
