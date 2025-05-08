import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Disc, Trophy, Users, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-8 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <Disc className="h-20 w-20 text-blue-500" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Connect Four
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl">
          The classic two-player connection game where players take turns dropping colored discs into a vertical grid.
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <button
          onClick={() => navigate('/game')}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
        >
          Start New Game
        </button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl"
      >
        <FeatureCard
          icon={<Users className="h-10 w-10 text-blue-500" />}
          title="Two Players"
          description="Take turns with a friend to drop colored discs into the grid."
        />
        <FeatureCard
          icon={<Trophy className="h-10 w-10 text-yellow-500" />}
          title="First to Connect 4"
          description="Connect four of your discs horizontally, vertically, or diagonally to win."
        />
        <FeatureCard
          icon={<Timer className="h-10 w-10 text-green-500" />}
          title="Track History"
          description="View your game history and statistics."
        />
      </motion.div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
};

export default HomePage;