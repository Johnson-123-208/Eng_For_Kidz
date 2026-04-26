import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { alphabets } from '../data/dummyData';
import { WordCard } from '../components/WordCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { RewardPopup } from '../components/RewardPopup';
import { useStore } from '../store/useStore';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AlphabetModule = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const { addXp, addStars, markModuleComplete } = useStore();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex < alphabets.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed module
      addXp(50);
      addStars(3);
      markModuleComplete('alphabets');
      setShowReward(true);
    }
  };

  const currentItem = alphabets[currentIndex];

  return (
    <div className="flex-1 flex flex-col items-center p-6 w-full max-w-4xl mx-auto">
      <div className="w-full mb-8">
        <ProgressBar current={currentIndex + 1} total={alphabets.length} color="bg-brand-red" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-[3rem] p-8 pb-12 shadow-2xl border-b-8 border-brand-red w-full flex flex-col items-center"
        >
          <h2 className="text-3xl text-brand-red mb-8">Tap to hear the sound!</h2>
          
          <div className="flex flex-col items-center justify-center gap-8 w-full mb-12">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: [-5, 5, -5] }}
              className="flex flex-col items-center justify-center cursor-pointer relative"
              onClick={() => {
                import('../utils/audio').then(m => m.playAudio(currentItem.ttsSound || currentItem.letter));
              }}
            >
              <div className="w-48 h-48 bg-brand-red text-white flex items-center justify-center rounded-[3rem] shadow-[0_10px_0_#C0395B] border-4 border-white">
                <span className="text-8xl font-heading">{currentItem.letter}</span>
              </div>
              <div className="mt-4 bg-white/50 px-4 py-1 rounded-full text-brand-red font-bold text-xl border border-brand-red/20 shadow-sm">
                {currentItem.phonic} 
              </div>
            </motion.div>
            
            <div className="text-2xl text-brand-dark/40 font-heading bg-gray-100 px-6 py-2 rounded-full mb-4 shadow-inner">
              Examples
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 w-full">
              {currentItem.examples.map((ex, idx) => (
                <WordCard 
                  key={idx}
                  word={ex.word} 
                  image={ex.image} 
                  audioText={ex.word}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 w-full max-w-md">
            <AnimatedButton 
              variant="warning" 
              className="!p-4" 
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
            >
              <ArrowLeft size={32} />
            </AnimatedButton>
            
            <AnimatedButton 
              variant="primary" 
              className="flex-1 flex justify-center items-center gap-2"
              onClick={handleNext}
            >
              {currentIndex === alphabets.length - 1 ? 'Finish!' : 'Next Letter'} 
              <ArrowRight size={28} />
            </AnimatedButton>
          </div>
        </motion.div>
      </AnimatePresence>

      <RewardPopup 
        isOpen={showReward} 
        onClose={() => navigate('/')} 
        message="You learned the sounds!"
        stars={3}
      />
    </div>
  );
};
