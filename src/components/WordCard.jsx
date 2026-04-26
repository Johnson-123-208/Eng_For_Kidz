import React from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { playAudio } from '../utils/audio';

export const WordCard = ({ word, image, audioText }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      onClick={() => playAudio(audioText || word)}
      className="bg-white rounded-xl md:rounded-2xl p-2 md:p-3 shadow-sm border-b-2 md:border-b-4 border-brand-yellow/50 cursor-pointer flex flex-col items-center justify-center gap-1 md:gap-2 text-center hover:border-brand-yellow transition-all min-w-[60px] md:min-w-[90px]"
    >
      <div className="text-3xl md:text-4xl drop-shadow-sm leading-none mt-1">{image}</div>
      <div className="text-sm md:text-lg font-heading text-brand-dark tracking-wide truncate w-full">{word}</div>
      <button className="bg-brand-blue/10 p-1 rounded-full text-brand-blue hidden md:block">
        <Volume2 size={14} />
      </button>
    </motion.div>
  );
};
