import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // This imports the connection we made earlier!

export async function POST(request: Request) {
  try {
    // 1. Get the data sent from the frontend
    const body = await request.json();
    const { userId, score, datePlayed } = body;

    // 2. Validate the score range (Must be 1-45)
    if (score < 1 || score > 45) {
      return NextResponse.json(
        { error: 'Score must be in Stableford format (1-45).' }, 
        { status: 400 }
      );
    }

    // 3. Insert the new score into the database
    const { data: newScore, error: insertError } = await supabase
      .from('scores')
      .insert([{ user_id: userId, score: score, date_played: datePlayed }])
      .select();

    if (insertError) throw insertError;

    // 4. Enforce the "Latest 5 Only" Rule
    // First, fetch all scores for this user, ordered oldest to newest
    const { data: allScores, error: fetchError } = await supabase
      .from('scores')
      .select('id')
      .eq('user_id', userId)
      .order('date_played', { ascending: true });

    if (fetchError) throw fetchError;

    // 5. If they have more than 5 scores, find the oldest and delete them
    if (allScores && allScores.length > 5) {
      // Calculate how many extra scores we have (e.g., if we have 6, we delete 1)
      const scoresToDelete = allScores.slice(0, allScores.length - 5);
      const idsToDelete = scoresToDelete.map((s) => s.id);

      const { error: deleteError } = await supabase
        .from('scores')
        .delete()
        .in('id', idsToDelete);

      if (deleteError) throw deleteError;
    }

    // 6. Return a success message back to the frontend
    return NextResponse.json(
      { message: 'Score saved and oldest score replaced (if applicable)!', score: newScore }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Score submission error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}