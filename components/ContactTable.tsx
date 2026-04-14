'use client';

import { deletePerson } from '../app/actions';
import { Person } from '../utils/types';

interface ContactTableProps {
  people: Person[];
}

export default function ContactTable({ people }: ContactTableProps) {
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      await deletePerson(id);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50/50 p-4">
        <h2 className="text-lg font-semibold text-gray-800">Network Directory (LPs & Contacts)</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Roles</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {people?.map((person) => (
              <tr key={person.id} className="transition-colors hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">
                  {person.full_name}
                </td>
                <td className="p-4 text-sm text-gray-500">{person.primary_email || '—'}</td>
                <td className="p-4 text-sm text-gray-500">{person.city || '—'}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {person.network_roles && person.network_roles.length > 0 ? (
                      person.network_roles.map((role: string, index: number) => (
                        <span
                          key={index}
                          className="rounded-md bg-blue-50 border border-blue-200 px-2 py-1 text-xs font-medium text-blue-700"
                        >
                          {role}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(person.id, person.full_name)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {people?.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-sm text-gray-500">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
