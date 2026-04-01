import { createClient } from '@supabase/supabase-js';

// These pull the secret keys you saved in your  file earlier!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase Environment Variables');
}

// This creates the actual connection to your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);