import { createClient } from "@supabase/supabase-js";

// Second Supabase project: Prospect Hunter. It holds the businesses the
// preview pages are built from. Quotes still go to the client in supabase.js.
const url = import.meta.env.VITE_PREVIEW_SUPABASE_URL;
const anonKey = import.meta.env.VITE_PREVIEW_SUPABASE_ANON_KEY;

// Null when env vars are missing, so the preview page can show its
// "not available" message instead of crashing on import.
export const previewSupabase = url && anonKey ? createClient(url, anonKey) : null;

if (!previewSupabase) {
  console.warn("Preview Supabase env vars missing. Preview pages will not load.");
}
