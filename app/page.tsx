import { supabase } from '../utils/supabase';
import { revalidatePath } from 'next/cache';

export const revalidate = 0; 

export default async function Home() {
  
  // ==========================================
  // THE NEW "ADD CONTACT" SERVER ACTION
  // This securely catches your form data and sends it to Supabase
  // ==========================================
  async function addContact(formData: FormData) {
    'use server'; // This tells Next.js to run this securely on the backend
    
    // 1. Grab the typed data out of the form
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const email = formData.get('email') as string;
    const location = formData.get('location') as string;
    const tagsInput = formData.get('tags') as string;
    
    // 2. Turn the comma-separated tags into a real array for the database
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];

    // 3. Insert it into the 'people' table in Supabase
    const { error } = await supabase.from('people').insert([
      { first_name, last_name, email, location, tags }
    ]);

    if (error) console.error("Error adding contact:", error);

    // 4. Instantly refresh the page to show the new person!
    revalidatePath('/');
  }

  // ==========================================
  // FETCHING YOUR EXISTING DATA (Unchanged)
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

  // ==========================================
  // YOUR DASHBOARD UI (Unchanged, just added the form)
  // ==========================================
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
        {/* THE NEW ADD CONTACT FORM                   */}
        {/* ========================================== */}
        <details className="group">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
            + Add New Contact
          </summary>
          
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">New Contact Details</h3>
            
            <form action={addContact} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" name="first_name" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. Marc" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" name="last_name" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. Andreessen" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="marc@a16z.com" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                  <input type="text" name="location" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. San Francisco" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                <input type="text" name="tags" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. Tier-1, MUBI-Passed, Founder" />
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
                <th className="p-4 font-semibold">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {people?.map((person) => (
                <tr key={person.id} className="transition-colors hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">
                    {person.first_name} {person.last_name}
                  </td>
                  <td className="p-4 text-sm text-gray-500">{person.email || '—'}</td>
                  <td className="p-4 text-sm text-gray-500">{person.location || '—'}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {person.tags && person.tags.length > 0 ? (
                        person.tags.map((tag: string, index: number) => (
                          <span 
                            key={index} 
                            className="rounded-md bg-blue-50 border border-blue-200 px-2 py-1 text-xs font-medium text-blue-700"
                          >
                            {tag}
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
                    No contacts found. Your people table is empty!
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
