import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAllData() {
  const [malware, email, users_mfa, general, countries, user_fail_login] =
    await Promise.all([
      supabase.from("malware").select("*"),
      supabase.from("email").select("*"),
      supabase.from("users_mfa").select("*"),
      supabase.from("general").select("*"),
      supabase.from("attacks_by_country").select("*"),
      supabase.from("user_fail_login").select("*"),
    ]);

  return {
    malware: malware.data ?? [],
    email: email.data ?? [],
    users_mfa: users_mfa.data ?? [],
    general: general.data ?? [],
    attacks_by_country: countries.data ?? [],
    user_fail_login: user_fail_login.data ?? [],
  };
}
