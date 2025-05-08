import express from 'express';
import Game from '../models/Game.js';

const router = express.Router();

// Get all games
router.get('/games', async (req, res) => {
  try {
    const games = await Game.find().sort({ date: -1 });
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new game
router.post('/games', async (req, res) => {
  try {
    const { winner, moves } = req.body;
    
    const newGame = new Game({
      winner,
      moves
    });
    
    const game = await newGame.save();
    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;