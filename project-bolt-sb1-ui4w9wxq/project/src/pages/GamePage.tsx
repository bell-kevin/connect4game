import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import GameBoard from '../components/GameBoard';
import GameControls from '../components/GameControls';
import { useGameContext } from '../context/GameContext';
import WinnerModal from '../components/WinnerModal';

const GamePage: React.FC = () => {
  const { gameState, resetGame } = useGameContext();
  
  useEffect(() => {
    // Reset game when component mounts
    resetGame();
  }, [resetGame]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Connect Four</h1>
      
      <div className="w-full max-w-3xl">
        <GameControls />
        <GameBoard />
      </div>
      
      {gameState.winner && <WinnerModal />}
    </motion.div>
  );
};

export default GamePage;