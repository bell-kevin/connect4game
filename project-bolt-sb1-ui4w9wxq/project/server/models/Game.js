import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  winner: {
    type: String,
    required: true
  },
  moves: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Game = mongoose.model('Game', GameSchema);

export default Game;