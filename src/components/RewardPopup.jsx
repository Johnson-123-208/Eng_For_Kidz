import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RewardPopup = ({ isOpen, onClose, stars = 3, message = "Awesome Job!" }) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#9D4EDD']
      });
      
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio tracking disabled'));
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            className="bg-white rounded-[3rem] p-8 max-w-sm w-full shadow-2xl border-b-[12px] border-brand-yellow/50 text-center"
          >
            <h2 className="text-4xl text-brand-purple mb-4">{message}</h2>
            
            <div className="flex justify-center gap-2 mb-8">
              {[...Array(stars)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.2 + 0.5, type: 'spring' }}
                >
                  <Star size={64} className="fill-brand-yellow text-brand-yellow drop-shadow-md" />
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-brand-green text-white font-heading text-2xl w-full py-4 rounded-3xl shadow-[0_6px_0_#04AC80] hover:translate-y-[2px] hover:shadow-[0_4px_0_#04AC80] transition-all"
            >
              Continue Playing
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
