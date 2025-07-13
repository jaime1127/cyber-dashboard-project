import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getMalware() {
  const { data } = await supabase.from("malware").select("*");
  return data ?? [];
}

export async function getEmail() {
  const { data } = await supabase.from("email").select("*");
  return data ?? [];
}

export async function getUsersMfa() {
  const { data } = await supabase.from("users_mfa").select("*");
  return data ?? [];
}

export async function getGeneral() {
  const { data } = await supabase.from("general").select("*");
  return data ?? [];
}

export async function getAttacksByCountry() {
  const { data } = await supabase.from("attacks_by_country").select("*");
  return data ?? [];
}

export async function getUserFailLogin() {
  const { data } = await supabase.from("user_fail_login").select("*");
  return data ?? [];
}