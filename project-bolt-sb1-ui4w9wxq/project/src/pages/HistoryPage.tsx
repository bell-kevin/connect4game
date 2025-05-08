import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Award } from 'lucide-react';
import { fetchGameHistory } from '../services/api';
import { GameHistory } from '../types';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<GameHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        const data = await fetchGameHistory();
        setHistory(data);
        setError(null);
      } catch (err) {
        setError('Failed to load game history. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">Game History</h1>

      {history.length === 0 ? (
        <div className="bg-slate-800 rounded-lg p-8 text-center">
          <p className="text-xl text-slate-300">No games played yet. Start a new game to see your history!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((game) => (
            <HistoryCard key={game._id} game={game} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

interface HistoryCardProps {
  game: GameHistory;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ game }) => {
  const date = new Date(game.date);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-semibold flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            {game.winner ? `Winner: ${game.winner}` : 'Draw'}
          </h3>
          <p className="text-slate-400">Moves: {game.moves}</p>
        </div>

        <div className="flex flex-col text-slate-400">
          <div className="flex items-center mb-1">
            <Clock className="w-4 h-4 mr-2" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>Player 1 vs Player 2</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryPage;