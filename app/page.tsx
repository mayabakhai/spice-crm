import { supabase } from '../utils/supabase';
import MainClientPage from './MainClientPage';

export const revalidate = 0; 

export default async function Home() {
  
  // FETCHING EXISTING DATA
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
    <MainClientPage
      initialPeople={people || []}
      initialOrganizations={organizations || []}
    />
  );
}
