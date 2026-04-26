import React from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { playAudio } from '../utils/audio';

export const WordCard = ({ word, image, audioText }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
      onClick={() => playAudio(audioText || word)}
      className="bg-white rounded-3xl p-6 shadow-lg border-b-8 border-brand-yellow/50 cursor-pointer flex flex-col items-center justify-center gap-4 text-center hover:border-brand-yellow transition-colors"
    >
      <div className="text-6xl mb-2 drop-shadow-md">{image}</div>
      <div className="text-4xl font-heading text-brand-dark tracking-wide">{word}</div>
      <button className="bg-brand-blue/10 p-3 rounded-full text-brand-blue mt-2">
        <Volume2 size={28} />
      </button>
    </motion.div>
  );
};
