import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize the standard Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase.from('scores').select('*');

  if (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve data from the scores table.' }, 
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}