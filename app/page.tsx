import { supabase } from '../utils/supabase';

// This tells Next.js to always fetch fresh data from your database
export const revalidate = 0; 

export default async function Home() {
  // 1. Fetch the data directly from Supabase!
  const { data: organizations, error } = await supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Error fetching database: {error.message}</div>;
  }

  // 2. Render the User Interface
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-lg font-bold text-white shadow-sm">
              S
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Spice Capital CRM</h1>
          </div>
          <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
            Database Connected Live
          </div>
        </header>

        {/* Organizations Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Organization Name</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold">Website</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              
              {/* Loop through your database records and render them */}
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
                </tr>
              ))}

              {organizations?.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-sm text-gray-500">
                    No organizations found. Your database is connected, but empty!
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}