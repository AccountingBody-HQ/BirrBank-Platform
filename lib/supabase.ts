// ============================================
// GLOBALPAYROLLEXPERT — SUPABASE CLIENT
// Browser client and Server client (App Router)
// ============================================

import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// --- ENVIRONMENT VARIABLES ---
// These are set in Vercel project settings — never hardcoded
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// --- BROWSER CLIENT ---
// Use this in Client Components (files with 'use client' at the top)
export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// --- SERVER CLIENT ---
// Use this in Server Components, Server Actions, and Route Handlers
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch {
          // Server Component — cookie setting is handled by middleware
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch {
          // Server Component — cookie removal is handled by middleware
        }
      },
    },
  })
}

// --- ADMIN CLIENT ---
// Use this only in secure server-side contexts (e.g. webhooks)
// Never expose the service role key to the browser
export function createSupabaseAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}