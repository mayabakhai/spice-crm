import { supabase } from '../utils/supabase';
import { revalidatePath } from 'next/cache';

export const revalidate = 0; 

export default async function Home() {
  
  // ==========================================
  // ADD CONTACT ACTION (UPDATED FOR NEW SCHEMA)
  // ==========================================
  async function addContact(formData: FormData) {
    'use server'; 
    
    // Grab the data using our strict database column names
    const full_name = formData.get('full_name') as string;
    const primary_email = formData.get('primary_email') as string;
    const city = formData.get('city') as string;
    const rolesInput = formData.get('network_roles') as string;
    
    // Convert the comma-separated text into a strict Postgres Array
    const network_roles = rolesInput ? rolesInput.split(',').map(role => role.trim()) : [];

    // Insert safely into the database
    const { error } = await supabase.from('people').insert([
      { full_name, primary_email, city, network_roles }
    ]);

    if (error) console.error("Error adding contact:", error);

    revalidatePath('/');
  }

  // ==========================================
  // FETCHING EXISTING DATA
  // ==========================================
  const { data: organizations, error: orgError } = await supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: people, error: peopleError } = await supabase
    .from('people')
    .select('*')
    .order('created_at', { ascending: false });

  if (orgError || peopleError) {
    return <div className="p-8 text-red-500">Error fetching database data!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex items-center justify-between">
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

        {/* ========================================== */}
        {/* ADD CONTACT FORM (UPDATED FOR NEW SCHEMA)  */}
        {/* ========================================== */}
        <details className="group">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
            + Add New Contact
          </summary>
          
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">New Contact Details</h3>
            
            <form action={addContact} className="space-y-4">
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

              <button type="submit" className="mt-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
                Save to Database
              </button>
            </form>
          </div>
        </details>


        {/* SECTION 1: NETWORK / LPS */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-100 p-4">
            <h2 className="text-lg font-semibold text-gray-800">Network Directory (LPs & Contacts)</h2>
          </div>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Roles</th>
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
                </tr>
              ))}
              {people?.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-sm text-gray-500">
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* SECTION 2: ORGANIZATIONS / STARTUPS */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-100 p-4">
            <h2 className="text-lg font-semibold text-gray-800">Portfolio & Pipeline (Startups)</h2>
          </div>
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
                    No organizations found.
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
