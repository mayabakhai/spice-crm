'use client';

import { useState, useMemo } from 'react';
import Tabs from '../components/Tabs';
import ContactTable from '../components/ContactTable';
import AddContactForm from '../components/AddContactForm';
import OrgTable from '../components/OrgTable';
import AddOrgForm from '../components/AddOrgForm';
import { Person, Organization } from '../utils/types';

interface MainClientPageProps {
  initialPeople: Person[];
  initialOrganizations: Organization[];
}

export default function MainClientPage({ initialPeople, initialOrganizations }: MainClientPageProps) {
  const [activeTab, setActiveTab] = useState('network');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'network', label: 'Network Directory' },
    { id: 'portfolio', label: 'Portfolio & Pipeline' },
  ];

  const filteredPeople = useMemo(() => {
    return initialPeople.filter(person =>
      person.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.primary_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.network_roles?.some((role: string) => role.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [initialPeople, searchQuery]);

  const filteredOrganizations = useMemo(() => {
    return initialOrganizations.filter(org =>
      org.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.website?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialOrganizations, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-lg font-bold text-white shadow-sm">
              S
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Spice Capital CRM</h1>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search..."
                />
            </div>
            <div className="hidden sm:block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
                Database Connected Live
            </div>
          </div>
        </header>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

        {activeTab === 'network' && (
          <div className="space-y-6">
            <AddContactForm />
            <ContactTable people={filteredPeople} />
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <AddOrgForm />
            <OrgTable organizations={filteredOrganizations} />
          </div>
        )}

      </div>
    </div>
  );
}
