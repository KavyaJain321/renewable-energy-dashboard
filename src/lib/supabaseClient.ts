import { createClient } from '@supabase/supabase-js'

// Type declaration for window object
declare global {
  interface Window {
    mockSupabaseWarningShown?: boolean
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if we have real Supabase credentials
const hasRealCredentials = supabaseUrl && supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') && 
  !supabaseUrl.includes('fake-url-for-testing') &&
  !supabaseAnonKey.includes('placeholder') &&
  !supabaseAnonKey.includes('fake-key-for-testing') &&
  supabaseUrl.includes('.supabase.co') &&
  supabaseAnonKey.startsWith('eyJ')

if (!hasRealCredentials) {
  // Only show warning once to reduce console noise
  if (!window.mockSupabaseWarningShown) {
    console.warn('⚠️ Using mock Supabase client. Authentication will not work until you set up real Supabase credentials.')
    window.mockSupabaseWarningShown = true
  }
}

// For development/testing, use a mock client if env vars are missing or placeholder
let supabase: any

if (hasRealCredentials) {
  // Use real Supabase client
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
} else {
  // Create a mock client that doesn't make network requests
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ 
        data: null, 
        error: { message: 'Authentication not available. Please set up Supabase credentials.' } 
      }),
      signUp: async () => ({ 
        data: null, 
        error: { message: 'Authentication not available. Please set up Supabase credentials.' } 
      }),
      signOut: async () => ({ error: null }),
      signInWithOAuth: async () => {
        // Prevent any redirects or network requests
        return { 
          data: null, 
          error: { message: 'OAuth not available. Please set up Supabase credentials.' } 
        }
      },
      signInWithOtp: async () => ({ 
        data: null, 
        error: { message: 'OTP not available. Please set up Supabase credentials.' } 
      })
    }
  }
}

export { supabase }

// Export types for TypeScript support
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          location: string | null
          area_size: number | null
          energy_type: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          location?: string | null
          area_size?: number | null
          energy_type?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          location?: string | null
          area_size?: number | null
          energy_type?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
