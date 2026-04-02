import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Initialize Supabase for a Route Handler
  const supabase = createRouteHandlerClient({ cookies });

  try {
    // 1. Authenticate the user securely on the server
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in again.' }, 
        { status: 401 }
      );
    }

    // 2. Parse the incoming data from the frontend
    const body = await request.json();
    const { score, courseName, datePlayed } = body;

    if (!score || !courseName || !datePlayed) {
      return NextResponse.json(
        { error: 'Missing required fields.' }, 
        { status: 400 }
      );
    }

    // 3. Insert the score using the secure server-side UUID
    const { error: dbError } = await supabase
      .from('scores')
      .insert([
        { 
          user_id: user.id, // Securely grabbed from the server session
          gross_score: parseInt(score), 
          course_name: courseName,
          played_at: datePlayed
        }
      ]);

    if (dbError) {
      throw dbError; // Caught by the catch block below
    }

    // 4. Return success
    return NextResponse.json(
      { success: true, message: 'Score saved successfully!' }, 
      { status: 200 }
    );

  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred.' }, 
      { status: 500 }
    );
  }
}