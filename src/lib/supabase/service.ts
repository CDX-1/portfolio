import { createClient } from "@supabase/supabase-js";
import { h1Fetch } from "./fetch";

/**
 * Server-only Supabase client using the service role key. Bypasses RLS —
 * use ONLY inside trusted server code (route handlers, server actions).
 */
export function createServiceClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
        throw new Error(
            "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
        );
    }
    return createClient(url, key, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
        global: { fetch: h1Fetch },
    });
}
