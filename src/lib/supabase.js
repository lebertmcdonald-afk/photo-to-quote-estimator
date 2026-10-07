import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Null when env vars are missing, so callers can degrade gracefully
// instead of the whole page crashing on import.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

if (!supabase) {
  console.warn(
    "Supabase env vars missing. Estimates will show \"Inspection needed\" and submits will fail."
  );
}
