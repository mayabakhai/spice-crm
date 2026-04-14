export const mockPeople = [
  {
    id: '1',
    full_name: 'Marc Andreessen',
    primary_email: 'marc@a16z.com',
    city: 'Menlo Park',
    network_roles: ['Tier-1', 'VC'],
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    full_name: 'Elad Gil',
    primary_email: 'elad@example.com',
    city: 'Palo Alto',
    network_roles: ['Super Angel', 'Founder'],
    created_at: new Date().toISOString(),
  },
];

export const mockOrganizations = [
  {
    id: '1',
    name: 'A16Z',
    type: 'VC',
    short_description: 'Andreessen Horowitz',
    website: 'a16z.com',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'OpenAI',
    type: 'AI',
    short_description: 'Artificial Intelligence research lab',
    website: 'openai.com',
    created_at: new Date().toISOString(),
  },
];
