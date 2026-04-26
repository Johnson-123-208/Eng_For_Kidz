import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { digraphs } from '../data/dummyData';
import { WordCard } from '../components/WordCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { RewardPopup } from '../components/RewardPopup';
import { useStore } from '../store/useStore';
import { playAudio } from '../utils/audio';
import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PhonicsModule = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const { addXp, addStars, markModuleComplete } = useStore();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex < digraphs.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      addXp(100);
      addStars(3);
      markModuleComplete('phonics');
      setShowReward(true);
    }
  };

  const currentItem = digraphs[currentIndex];

  const handlePlaySound = () => {
    playAudio(currentItem.letters);
  };

  return (
    <div className="flex-1 flex flex-col items-center p-6 w-full max-w-4xl mx-auto">
      <div className="w-full mb-8">
        <ProgressBar current={currentIndex + 1} total={digraphs.length} color="bg-brand-purple" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-[3rem] p-8 pb-12 shadow-2xl border-b-8 border-brand-purple w-full flex flex-col items-center"
        >
          <div className="bg-brand-purple/10 text-brand-purple px-6 py-2 rounded-full font-bold mb-6 text-xl">
            Magic Sounds
          </div>
          
          <h2 className="text-4xl text-brand-dark mb-2 text-center">
            The letter team <span className="text-brand-purple">"{currentItem.letters}"</span>
          </h2>
          <p className="text-xl text-brand-dark/50 mb-8 font-heading">
            Makes the sound: <span className="font-bold text-brand-purple">{currentItem.phonic}</span>
          </p>
          
          <div className="flex flex-col items-center justify-center gap-8 w-full mb-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-48 h-48 bg-brand-purple text-white flex flex-col items-center justify-center rounded-[3rem] shadow-[0_10px_0_#753AB3] border-4 border-white cursor-pointer relative"
              onClick={() => playAudio(currentItem.ttsSound || currentItem.letters)}
            >
              <span className="text-7xl font-heading">{currentItem.letters}</span>
              <Volume2 className="absolute bottom-4 right-4 text-white/50" />
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
              variant="purple" 
              className="flex-1 flex justify-center items-center gap-2"
              onClick={handleNext}
            >
              {currentIndex === digraphs.length - 1 ? 'Mastered!' : 'Next Sound'} 
              <ArrowRight size={28} />
            </AnimatedButton>
          </div>
        </motion.div>
      </AnimatePresence>

      <RewardPopup 
        isOpen={showReward} 
        onClose={() => navigate('/')} 
        message="Phonics Master!"
        stars={3}
      />
    </div>
  );
};
