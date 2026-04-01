import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper function to generate 5 random unique numbers between 1 and 45
function generateWinningNumbers() {
  const numbers = new Set<number>();
  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(numbers);
}

export async function POST(request: Request) {
  try {
    // 1. Security Check: In a real app, you'd check a secret password here 
    // so only the Admin (or a monthly automated timer) can run this script.

    // 2. Generate the 5 winning numbers for this month
    const winningNumbers = generateWinningNumbers();
    
    // Calculate a mock prize pool for this example (e.g., $5,000)
    // In production, you'd calculate this based on active Stripe subscriptions
    const totalPrizePool = 5000.00; 

    // 3. Save the new Draw to the database
    const { data: drawData, error: drawError } = await supabase
      .from('draws')
      .insert([{ 
        draw_month: new Date().toISOString().split('T')[0], // Today's date
        winning_numbers: winningNumbers,
        total_prize_pool: totalPrizePool
      }])
      .select()
      .single();

    if (drawError || !drawData) throw drawError;

    // 4. Fetch all user scores to check for winners
    const { data: allScores, error: scoreError } = await supabase
      .from('scores')
      .select('user_id, score');

    if (scoreError) throw scoreError;

    // Group scores by user so we can check their latest 5
    const userScores: Record<string, number[]> = {};
    allScores.forEach((s) => {
      if (!userScores[s.user_id]) userScores[s.user_id] = [];
      userScores[s.user_id].push(s.score);
    });

    // 5. Find the Winners!
    const winnersToInsert = [];

    for (const [userId, scores] of Object.entries(userScores)) {
      // Count how many of the user's scores match the winning numbers
      const matches = scores.filter(score => winningNumbers.includes(score)).length;

      // According to the PRD, you only win if you match 3, 4, or 5 numbers
      if (matches >= 3) {
        // Calculate their split of the prize pool (Simplified for training)
        let prizeAmount = 0;
        if (matches === 5) prizeAmount = totalPrizePool * 0.40; // 40% for 5 matches
        if (matches === 4) prizeAmount = totalPrizePool * 0.35; // 35% for 4 matches
        if (matches === 3) prizeAmount = totalPrizePool * 0.25; // 25% for 3 matches

        winnersToInsert.push({
          draw_id: drawData.id,
          user_id: userId,
          match_tier: matches,
          prize_amount: prizeAmount,
          payment_status: 'pending' // They must upload proof before getting paid!
        });
      }
    }

    // 6. Save the winners to the database
    if (winnersToInsert.length > 0) {
      const { error: winnerError } = await supabase
        .from('winners')
        .insert(winnersToInsert);
      
      if (winnerError) throw winnerError;
    }

    // 7. Return the results!
    return NextResponse.json({
      message: 'Monthly draw completed successfully!',
      winningNumbers,
      totalWinners: winnersToInsert.length,
    });

  } catch (error: any) {
    console.error("Draw Engine Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}