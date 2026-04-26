import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ModuleCard = ({ 
  id,
  title, 
  description, 
  icon, 
  color = 'bg-brand-blue', 
  isLocked = false,
  stars = 0,
  maxStars = 3,
  path
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.03, y: -5 } : {}}
      className={`
        relative rounded-3xl p-6 shadow-xl border-b-[8px] flex flex-col items-center text-center
        ${isLocked ? 'bg-gray-200 border-gray-300 opacity-80' : `${color} border-black/10 text-white`}
      `}
    >
      <div className={`text-5xl mb-4 p-4 rounded-full ${isLocked ? 'bg-gray-300' : 'bg-white/20'}`}>
        {icon}
      </div>
      
      <h3 className={`text-2xl font-heading mb-2 ${isLocked ? 'text-gray-500' : 'text-white'}`}>
        {title}
      </h3>
      
      <p className={`text-sm mb-6 ${isLocked ? 'text-gray-400' : 'text-white/80'}`}>
        {description}
      </p>

      {!isLocked && (
        <div className="flex gap-1 mb-4">
          {[...Array(maxStars)].map((_, i) => (
            <Star 
              key={i} 
              size={20} 
              className={i < stars ? 'fill-brand-yellow text-brand-yellow' : 'text-white/30'} 
            />
          ))}
        </div>
      )}

      {isLocked ? (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl flex items-center justify-center">
          <Lock size={48} className="text-gray-500 bg-white p-3 rounded-full shadow-lg" />
        </div>
      ) : (
        <button 
          onClick={() => navigate(path)}
          className="mt-auto bg-white text-brand-dark px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-brand-yellow transition-colors shadow-md"
        >
          <Play size={18} /> Play Now
        </button>
      )}
    </motion.div>
  );
};
