import React from 'react';
import { motion } from 'framer-motion';
import { useGameContext } from '../context/GameContext';

const GameBoard: React.FC = () => {
  const { gameState, dropDisc, isWinningCell } = useGameContext();
  const { board, currentPlayer, gameOver } = gameState;
  
  const handleColumnClick = (col: number) => {
    if (gameOver) return;
    dropDisc(col);
  };
  
  // Show column highlight on hover
  const handleColumnHover = (e: React.MouseEvent, col: number) => {
    const columns = document.querySelectorAll('.board-column');
    
    // Reset all columns
    columns.forEach((column) => {
      column.classList.remove('bg-slate-700');
    });
    
    // Highlight current column if game not over
    if (!gameOver) {
      const currentColumn = columns[col];
      currentColumn.classList.add('bg-slate-700');
    }
  };
  
  const handleMouseLeave = () => {
    const columns = document.querySelectorAll('.board-column');
    columns.forEach((column) => {
      column.classList.remove('bg-slate-700');
    });
  };

  return (
    <div 
      className="bg-slate-800 p-4 rounded-xl shadow-xl overflow-hidden"
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-7 gap-2 relative">
        {Array.from({ length: 7 }).map((_, col) => (
          <div 
            key={`col-${col}`}
            className="board-column transition-colors duration-200"
            onClick={() => handleColumnClick(col)}
            onMouseEnter={(e) => handleColumnHover(e, col)}
          >
            {Array.from({ length: 6 }).map((_, row) => (
              <Cell 
                key={`${row}-${col}`} 
                value={board[row][col]} 
                isWinning={isWinningCell(row, col)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

interface CellProps {
  value: number;
  isWinning: boolean;
}

const Cell: React.FC<CellProps> = ({ value, isWinning }) => {
  let discColor = 'bg-slate-700';
  let hoverClass = '';
  
  if (value === 1) {
    discColor = isWinning ? 'bg-red-500 ring-4 ring-yellow-400' : 'bg-red-500';
  } else if (value === 2) {
    discColor = isWinning ? 'bg-yellow-400 ring-4 ring-yellow-200' : 'bg-yellow-400';
  }
  
  return (
    <div className="w-full pb-[100%] relative my-1">
      <div className="absolute inset-0 bg-slate-900 rounded-full flex items-center justify-center overflow-hidden p-1">
        {value !== 0 && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={`w-full h-full rounded-full ${discColor} ${hoverClass} shadow-inner`}
          />
        )}
      </div>
    </div>
  );
};

export default GameBoard;