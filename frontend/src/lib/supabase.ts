// Supabase client - configure when backend is ready
// import { createClient } from '@supabase/supabase-js'
//
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
//
// export const supabase = createClient(supabaseUrl, supabaseKey)

type SupabaseClient = {
  from: (_table: string) => { select: () => Promise<{ data: null; error: null }> }
}

export const supabase = null as unknown as SupabaseClient
