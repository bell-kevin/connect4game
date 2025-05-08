import axios from 'axios';
import { GameHistory } from '../types';

const API_URL = 'http://localhost:5000/api';

// For demo purposes, we'll use a mock implementation that simulates API calls
// In a real application, these would make actual HTTP requests to the backend

export const saveGameToDatabase = async (gameData: any): Promise<void> => {
  try {
    // In a real app: await axios.post(`${API_URL}/games`, gameData);
    console.log('Game saved:', gameData);
    localStorage.setItem('connect4_games', JSON.stringify([
      ...getStoredGames(),
      { ...gameData, _id: Date.now().toString() }
    ]));
  } catch (error) {
    console.error('Error saving game:', error);
    throw error;
  }
};

export const fetchGameHistory = async (): Promise<GameHistory[]> => {
  try {
    // In a real app: const response = await axios.get(`${API_URL}/games`);
    // return response.data;
    return getStoredGames();
  } catch (error) {
    console.error('Error fetching game history:', error);
    throw error;
  }
};

// Helper function to get games from localStorage
const getStoredGames = (): GameHistory[] => {
  const games = localStorage.getItem('connect4_games');
  return games ? JSON.parse(games) : [];
};