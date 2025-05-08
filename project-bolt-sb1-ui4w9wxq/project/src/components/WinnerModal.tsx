import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import { useGameContext } from '../context/GameContext';

const WinnerModal: React.FC = () => {
  const { gameState, resetGame } = useGameContext();
  const { winner } = gameState;
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetGame();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resetGame]);
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-slate-800 rounded-xl p-8 max-w-md w-full mx-4 relative"
        >
          <button
            onClick={resetGame}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <motion.div
              initial={{ rotate: -10, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3,
                type: 'spring',
                damping: 10
              }}
              className="w-20 h-20 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-2">
              {winner === 0 ? "It's a Draw!" : `Player ${winner} Wins!`}
            </h2>
            
            <p className="text-slate-300 mb-6">
              {winner === 0 
                ? "The board is full with no winner." 
                : `Player ${winner} connected four in a row!`
              }
            </p>
            
            <div className="flex space-x-4 justify-center">
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WinnerModal;