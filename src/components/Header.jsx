import React from 'react';
import { useStore } from '../store/useStore';
import { Star, Zap, Flame, BarChart3 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Header = () => {
  const { xp, level, stars, streak } = useStore();
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <header className="sticky top-0 z-50 w-full px-4 md:px-8 py-3 md:py-4 transition-all glass border-b-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo / Title */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-brand-blue p-2 rounded-xl text-white shadow-lg shadow-brand-blue/20">
             <Star size={24} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-heading font-extrabold text-brand-dark tracking-tight leading-none">
              Phonics Fun!
            </span>
            {/* Show name tag on desktop only */}
            <span className="hidden md:block text-xs font-bold text-brand-blue tracking-[0.2em] uppercase opacity-70">
              For Vedhanshi
            </span>
          </div>
        </motion.div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/stats')}
            className="flex items-center gap-2 bg-brand-purple/10 hover:bg-brand-purple/20 px-3 md:px-4 py-2 rounded-2xl cursor-pointer transition-all border border-brand-purple/20"
          >
            <BarChart3 size={20} className="text-brand-purple" />
            <span className="text-brand-purple font-bold text-sm md:text-base">{stars} ⭐️</span>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-brand-green/10 px-3 md:px-4 py-2 rounded-2xl border border-brand-green/20"
          >
            <Zap size={20} className="text-brand-green fill-brand-green/20" />
            <span className="text-brand-green font-bold text-sm md:text-base">{xp} XP</span>
          </motion.div>

        </div>
      </div>
    </header>
  );
};
