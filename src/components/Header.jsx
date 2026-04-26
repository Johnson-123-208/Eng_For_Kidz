import React from 'react';
import { useStore } from '../store/useStore';
import { Star, Zap, Flame } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Header = () => {
  const { xp, level, stars, streak } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header className="px-6 py-4 flex items-center justify-between bg-white/50 backdrop-blur-md border-b border-white/40 sticky top-0 z-40">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => !isHome && navigate('/')}
      >
        <div className="bg-brand-red text-white p-2 rounded-xl rotate-3">
          <span className="text-2xl font-heading">A</span>
        </div>
        <div className="bg-brand-blue text-white p-2 rounded-xl -rotate-3">
          <span className="text-2xl font-heading">B</span>
        </div>
        <div className="bg-brand-yellow text-brand-dark p-2 rounded-xl rotate-6">
          <span className="text-2xl font-heading">C</span>
        </div>
        <div className="ml-3 flex flex-col">
          <span className="text-xs font-bold text-brand-purple tracking-widest uppercase opacity-70">Vedhanshi's</span>
          <span className="font-heading text-xl md:text-2xl text-brand-dark leading-tight">Phonics Fun</span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm border border-brand-yellow/30">
          <Star className="text-brand-yellow fill-brand-yellow" size={20} />
          <span className="font-bold text-brand-dark">{stars}</span>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm border border-brand-red/30">
          <Flame className="text-brand-red fill-brand-red" size={20} />
          <span className="font-bold text-brand-dark">{streak}</span>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-1 bg-brand-purple text-white px-3 py-1.5 rounded-full shadow-sm">
          <Zap className="fill-white" size={16} />
          <span className="font-bold">Lvl {level}</span>
        </motion.div>
      </div>
    </header>
  );
};
