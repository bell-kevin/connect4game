import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { saveGameToDatabase } from '../services/api';

// Types
type Cell = 0 | 1 | 2;  // 0: empty, 1: player 1, 2: player 2
type Board = Cell[][];
type Winner = 0 | 1 | 2;  // 0: no winner/draw, 1: player 1, 2: player 2

interface GameState {
  board: Board;
  currentPlayer: 1 | 2;
  winner: Winner;
  winningCells: [number, number][];
  gameOver: boolean;
  moves: number;
}

type GameAction = 
  | { type: 'DROP_DISC'; column: number }
  | { type: 'RESET_GAME' };

interface GameContextType {
  gameState: GameState;
  dropDisc: (column: number) => void;
  resetGame: () => void;
  isWinningCell: (row: number, col: number) => boolean;
  saveGame: () => Promise<void>;
}

// Create initial game state
const createInitialBoard = (): Board => {
  return Array(6).fill(null).map(() => Array(7).fill(0));
};

const initialState: GameState = {
  board: createInitialBoard(),
  currentPlayer: 1,
  winner: 0,
  winningCells: [],
  gameOver: false,
  moves: 0,
};

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Check for win conditions
const checkForWin = (board: Board, row: number, col: number, player: Cell): [boolean, [number, number][]] => {
  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal down-right
    [1, -1],  // diagonal down-left
  ];
  
  for (const [dr, dc] of directions) {
    const winningCells: [number, number][] = [[row, col]];
    
    // Check in both directions
    for (const multiplier of [1, -1]) {
      let r = row + dr * multiplier;
      let c = col + dc * multiplier;
      let count = 0;
      
      while (
        r >= 0 && r < board.length && 
        c >= 0 && c < board[0].length && 
        board[r][c] === player && 
        count < 3
      ) {
        winningCells.push([r, c]);
        r += dr * multiplier;
        c += dc * multiplier;
        count++;
      }
    }
    
    if (winningCells.length >= 4) {
      return [true, winningCells];
    }
  }
  
  return [false, []];
};

// Check if board is full (draw)
const isBoardFull = (board: Board): boolean => {
  return board[0].every(cell => cell !== 0);
};

// Game reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'DROP_DISC': {
      if (state.gameOver) {
        return state;
      }
      
      const { column } = action;
      const board = [...state.board.map(row => [...row])];
      
      // Find the lowest empty row in the column
      let row = -1;
      for (let r = board.length - 1; r >= 0; r--) {
        if (board[r][column] === 0) {
          row = r;
          break;
        }
      }
      
      // Column is full
      if (row === -1) {
        return state;
      }
      
      // Place the disc
      board[row][column] = state.currentPlayer;
      
      // Check for win
      const [hasWon, winningCells] = checkForWin(board, row, column, state.currentPlayer);
      
      // Check for draw
      const isDraw = !hasWon && isBoardFull(board);
      
      return {
        ...state,
        board,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        winner: hasWon ? state.currentPlayer : 0,
        winningCells: hasWon ? winningCells : [],
        gameOver: hasWon || isDraw,
        moves: state.moves + 1,
      };
    }
    
    case 'RESET_GAME':
      return {
        ...initialState,
        board: createInitialBoard(),
      };
      
    default:
      return state;
  }
};

// Game Provider component
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  
  const dropDisc = useCallback((column: number) => {
    dispatch({ type: 'DROP_DISC', column });
  }, []);
  
  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);
  
  const isWinningCell = useCallback((row: number, col: number): boolean => {
    return gameState.winningCells.some(([r, c]) => r === row && c === col);
  }, [gameState.winningCells]);
  
  const saveGame = useCallback(async () => {
    if (!gameState.gameOver) return;
    
    const gameData = {
      winner: gameState.winner === 0 ? 'Draw' : `Player ${gameState.winner}`,
      moves: gameState.moves,
      date: new Date().toISOString(),
    };
    
    await saveGameToDatabase(gameData);
  }, [gameState]);
  
  const value = {
    gameState,
    dropDisc,
    resetGame,
    isWinningCell,
    saveGame,
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};