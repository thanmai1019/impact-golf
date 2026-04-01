'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [winnersCount, setWinnersCount] = useState<number | null>(null);

  // This function runs when the Admin clicks the big button
  const runMonthlyDraw = async () => {
    // Ask the admin to confirm so they don't click it by accident!
    const confirm = window.confirm("Are you sure you want to run the monthly draw? This cannot be undone.");
    if (!confirm) return;

    setLoading(true);
    setResultMessage('');

    try {
      // We talk to the API script we built in the previous step
      const response = await fetch('/api/run-draw', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResultMessage(`Success! Winning numbers: ${data.winningNumbers.join(', ')}`);
        setWinnersCount(data.totalWinners);
      } else {
        setResultMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to run draw:", error);
      setResultMessage("A critical error occurred while running the draw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 p-10 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2">Admin Control Panel</h1>
      <p className="text-slate-400 mb-10">Manage platform operations and draws.</p>

      {/* The Draw Control Box */}
      <div className="bg-slate-700 p-8 rounded-xl shadow-2xl w-full max-w-lg text-center border border-slate-600">
        <h2 className="text-2xl font-semibold mb-4">Monthly Prize Draw</h2>
        <p className="text-sm text-slate-300 mb-6">
          Clicking this button will lock in this month's scores, generate 5 winning numbers, and calculate the prize pool for all matches.
        </p>

        <button 
          onClick={runMonthlyDraw}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-lg transition-all"
        >
          {loading ? 'Running Engine...' : 'EXECUTE MONTHLY DRAW'}
        </button>

        {/* Display the results after the script finishes */}
        {resultMessage && (
          <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-600">
            <p className="text-green-400 font-mono mb-2">{resultMessage}</p>
            {winnersCount !== null && (
              <p className="text-yellow-400 text-lg">Total Winners Found: {winnersCount}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}