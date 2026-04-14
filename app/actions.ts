'use server';

import { supabase } from '../utils/supabase';
import { revalidatePath } from 'next/cache';

export async function addPerson(formData: FormData) {
  const full_name = formData.get('full_name') as string;
  const primary_email = formData.get('primary_email') as string;
  const city = formData.get('city') as string;
  const rolesInput = formData.get('network_roles') as string;

  const network_roles = rolesInput ? rolesInput.split(',').map(role => role.trim()) : [];

  const { error } = await supabase.from('people').insert([
    { full_name, primary_email, city, network_roles }
  ]);

  if (error) console.error("Error adding contact:", error);

  revalidatePath('/');
}

export async function addOrganization(formData: FormData) {
  const name = formData.get('name') as string;
  const type = formData.get('type') as string;
  const website = formData.get('website') as string;
  const short_description = formData.get('short_description') as string;

  const { error } = await supabase.from('organizations').insert([
    { name, type, website, short_description }
  ]);

  if (error) console.error("Error adding organization:", error);

  revalidatePath('/');
}

export async function deletePerson(id: string) {
    const { error } = await supabase.from('people').delete().eq('id', id);
    if (error) console.error("Error deleting person:", error);
    revalidatePath('/');
}

export async function deleteOrganization(id: string) {
    const { error } = await supabase.from('organizations').delete().eq('id', id);
    if (error) console.error("Error deleting organization:", error);
    revalidatePath('/');
}
