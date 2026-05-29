import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createClient() {
  if (!url || url === "your-project-url" || !key) {
    throw new Error(
      "Supabase er ikke konfigurert. Legg til NEXT_PUBLIC_SUPABASE_URL og NEXT_PUBLIC_SUPABASE_ANON_KEY i .env.local.",
    );
  }
  return createBrowserClient(url, key);
}
