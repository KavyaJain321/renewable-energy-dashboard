import { createClient } from '@supabase/supabase-js'

/**
 * ⚠️  WARNING: SERVER-SIDE ONLY ⚠️
 * 
 * This file contains the Supabase admin client with service role key.
 * NEVER expose this to the client-side or commit the service role key to version control.
 * 
 * This client has full database access and should only be used in:
 * - Server-side API routes
 * - Server-side functions
 * - Build-time operations
 * - Admin operations
 * 
 * The service role key bypasses Row Level Security (RLS) policies.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase admin environment variables. Please check your .env file.')
}

// Admin client with service role key - SERVER-SIDE ONLY
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Helper function to verify this is running server-side
export const isServerSide = () => {
  return typeof window === 'undefined'
}

// Wrapper function to ensure admin operations only run server-side
export const adminOnly = <T extends (...args: any[]) => any>(fn: T): T => {
  return ((...args: any[]) => {
    if (!isServerSide()) {
      throw new Error('Admin operations can only be performed server-side')
    }
    return fn(...args)
  }) as T
}
