import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * ⚠️ WARNING: This client bypasses Row Level Security (RLS).
 * NEVER import this file in a Client Component.
 * Use ONLY in Server Actions, API routes, or admin-specific tasks.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}