import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import HistoryPage from './pages/HistoryPage';
import Navbar from './components/Navbar';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <Router>
      <GameProvider>
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </main>
          <footer className="py-4 text-center text-slate-400 text-sm">
            <p>© 2025 Connect 4 Game. All rights reserved.</p>
          </footer>
        </div>
      </GameProvider>
    </Router>
  );
}

export default App;