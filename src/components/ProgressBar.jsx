import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ current, total, color = 'bg-brand-green' }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full bg-white/50 rounded-full h-6 border-2 border-white/80 overflow-hidden relative shadow-inner">
      <motion.div
        className={`h-full ${color} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-brand-dark/50 font-heading tracking-widest">
        {current} / {total}
      </div>
    </div>
  );
};
