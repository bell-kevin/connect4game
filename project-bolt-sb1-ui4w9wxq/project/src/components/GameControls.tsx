import React from 'react';
import { Disc, RotateCcw } from 'lucide-react';
import { useGameContext } from '../context/GameContext';
import { motion } from 'framer-motion';

const GameControls: React.FC = () => {
  const { gameState, resetGame, saveGame } = useGameContext();
  const { currentPlayer, moves, gameOver } = gameState;
  
  const handleSaveGame = async () => {
    try {
      await saveGame();
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  };
  
  return (
    <div className="mb-6 bg-slate-800 p-4 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <CurrentPlayerIndicator player={currentPlayer} />
          <div className="ml-4">
            <h3 className="text-lg font-medium">
              {!gameOver ? (
                <>Player {currentPlayer}'s Turn</>
              ) : (
                <>Game Over</>
              )}
            </h3>
            <p className="text-sm text-slate-400">Moves: {moves}</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={resetGame}
            className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </button>
          
          {gameOver && (
            <button
              onClick={handleSaveGame}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Save Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface CurrentPlayerIndicatorProps {
  player: number;
}

const CurrentPlayerIndicator: React.FC<CurrentPlayerIndicatorProps> = ({ player }) => {
  return (
    <motion.div 
      key={player}
      initial={{ rotate: -180, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className={`w-12 h-12 rounded-full flex items-center justify-center ${
        player === 1 ? 'bg-red-500' : 'bg-yellow-400'
      }`}
    >
      <Disc className="w-6 h-6 text-white" />
    </motion.div>
  );
};

export default GameControls;