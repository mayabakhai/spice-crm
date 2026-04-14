import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { mockPeople, mockOrganizations } from './mock-data'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Simple mock for Supabase client when env vars are missing
const createMockClient = () => {
  console.warn("Supabase env vars missing. Using mock client.")

  return {
    from: (table: string) => ({
      select: () => ({
        order: () => Promise.resolve({
          data: table === 'people' ? mockPeople : mockOrganizations,
          error: null
        }),
        insert: (data: unknown) => {
          console.log(`Mock insert into ${table}:`, data)
          return Promise.resolve({ data, error: null })
        },
        delete: () => ({
          eq: (column: string, value: unknown) => {
             console.log(`Mock delete from ${table} where ${column} = ${value}`)
             return Promise.resolve({ error: null })
          }
        })
      }),
      insert: (data: unknown) => {
        console.log(`Mock insert into ${table}:`, data)
        return Promise.resolve({ data, error: null })
      },
      delete: () => ({
        eq: (column: string, value: unknown) => {
           console.log(`Mock delete from ${table} where ${column} = ${value}`)
           return Promise.resolve({ error: null })
        }
      })
    })
  }
}

export const supabase: SupabaseClient = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (createMockClient() as unknown as SupabaseClient)
