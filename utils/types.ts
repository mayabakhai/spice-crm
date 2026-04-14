export interface Person {
  id: string;
  full_name: string;
  primary_email: string | null;
  city: string | null;
  network_roles: string[] | null;
  created_at: string;
}

export interface Organization {
  id: string;
  name: string;
  type: string | null;
  short_description: string | null;
  website: string | null;
  created_at: string;
}
