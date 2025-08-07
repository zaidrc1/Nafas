
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL as string;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!url || !serviceKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

export const sb = createClient(url, serviceKey, {
  auth: { persistSession: false },
  global: { headers: { "X-Client-Info": "nafas-server" } }
});
