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
      whileHover={!isLocked ? { 
        y: -10,
        transition: { type: "spring", stiffness: 300 }
      } : {}}
      className={`
        relative rounded-[2.5rem] p-8 flex flex-col items-center text-center
        transition-all duration-300 h-full
        ${isLocked ? 'bg-gray-100 opacity-60 grayscale' : 'glass hover:shadow-2xl hover:shadow-brand-blue/20 cursor-pointer'}
      `}
      onClick={() => !isLocked && navigate(path)}
    >
      {/* Decorative colored glow behind icon */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 blur-3xl opacity-20 pointer-events-none -translate-y-4 rounded-full ${color}`} />

      <div className={`
        relative text-5xl mb-6 p-6 rounded-3xl shadow-xl transition-transform duration-500 group-hover:rotate-12
        ${isLocked ? 'bg-gray-200' : `${color} text-white shadow-lg`}
      `}>
        {icon}
      </div>
      
      <h3 className={`text-2xl md:text-3xl font-heading font-bold mb-3 tracking-tight ${isLocked ? 'text-gray-400' : 'text-brand-dark'}`}>
        {title}
      </h3>
      
      <p className={`text-base font-medium leading-relaxed mb-6 ${isLocked ? 'text-gray-400' : 'text-brand-dark/60'}`}>
        {description}
      </p>

      {/* Star Progress */}
      {!isLocked && (
        <div className="flex gap-2 mb-8 bg-black/5 px-4 py-2 rounded-full">
          {[...Array(maxStars)].map((_, i) => (
            <Star 
              key={i} 
              size={18} 
              className={i < stars ? 'fill-brand-yellow text-brand-yellow' : 'text-black/10'} 
            />
          ))}
        </div>
      )}

      {isLocked ? (
        <div className="bg-gray-200 p-4 rounded-full">
          <Lock size={32} className="text-gray-400" />
        </div>
      ) : (
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            mt-auto w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 
            transition-all shadow-lg
            ${color} text-white hover:brightness-110
          `}
        >
          <Play size={20} fill="currentColor" /> Play Now
        </motion.button>
      )}
    </motion.div>
  );
};
