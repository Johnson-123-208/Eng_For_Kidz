import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Trophy, Clock, Target, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedButton } from '../components/AnimatedButton';

export const StatsPage = () => {
  const { gameHistory, stars, xp, level } = useStore();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex-1 flex flex-col p-6 items-center w-full max-w-4xl mx-auto min-h-screen">
      <div className="w-full flex items-center justify-between mb-8">
        <AnimatedButton variant="secondary" onClick={() => navigate('/')} className="!p-3">
          <ArrowLeft size={24} />
        </AnimatedButton>
        <h1 className="text-4xl text-brand-dark font-heading">Vedhanshi's Stats</h1>
        <div className="w-12"></div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mb-8">
        <div className="bg-white p-4 rounded-3xl shadow-sm border-b-4 border-brand-yellow flex flex-col items-center">
          <Trophy className="text-brand-yellow mb-1" size={32} />
          <span className="text-2xl font-bold">{stars}</span>
          <span className="text-sm text-gray-500 uppercase tracking-wider">Stars</span>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border-b-4 border-brand-purple flex flex-col items-center">
          <Target className="text-brand-purple mb-1" size={32} />
          <span className="text-2xl font-bold">{xp}</span>
          <span className="text-sm text-gray-500 uppercase tracking-wider">XP</span>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border-b-4 border-brand-blue flex flex-col items-center col-span-2 md:col-span-1">
          <Clock className="text-brand-blue mb-1" size={32} />
          <span className="text-2xl font-bold">Lvl {level}</span>
          <span className="text-sm text-gray-500 uppercase tracking-wider">Level</span>
        </div>
      </div>

      <h2 className="text-2xl text-brand-dark font-heading self-start mb-4">Recent Games</h2>
      
      <div className="w-full space-y-4 pb-12">
        {gameHistory.length === 0 ? (
          <div className="bg-white/50 p-12 rounded-[2rem] text-center border-2 border-dashed border-gray-300">
            <p className="text-xl text-gray-500">No games played yet. Start learning!</p>
          </div>
        ) : (
          gameHistory.map((game, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-6 rounded-[2rem] shadow-md flex items-center justify-between border-l-8 border-brand-purple"
            >
              <div className="flex flex-col">
                <span className="text-xl font-heading text-brand-dark">{game.moduleName}</span>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Calendar size={14} /> {formatDate(game.timestamp)}
                </span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-brand-green">{game.score}/{game.total}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest">Score</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-brand-blue">{game.timeInSeconds}s</span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest">Time</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
