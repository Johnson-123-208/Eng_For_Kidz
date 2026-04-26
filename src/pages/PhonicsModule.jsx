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
    <div className="flex-1 flex flex-col items-center p-2 md:p-4 w-full max-w-7xl mx-auto h-full max-h-screen">
      <div className="w-full mb-2 md:mb-4">
        <ProgressBar current={currentIndex + 1} total={digraphs.length} color="bg-brand-purple" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl border-b-8 border-brand-purple w-full flex flex-col flex-1"
        >
          <div className="flex flex-col xl:flex-row items-center justify-between gap-4 xl:gap-8 w-full flex-1">
            
            {/* Left Half: The Sound target */}
            <div className="w-full xl:w-1/3 flex flex-col items-center justify-center shrink-0">
              <div className="flex flex-col items-center gap-1 md:gap-2 mb-2 md:mb-4">
                 <div className="bg-brand-purple/10 text-brand-purple px-4 py-1 rounded-full font-bold text-sm md:text-base">Magic Sounds</div>
                 <h2 className="text-xl md:text-2xl text-brand-dark text-center">
                    The letter team <span className="text-brand-purple">"{currentItem.letters}"</span>
                 </h2>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 md:w-48 md:h-48 bg-brand-purple text-white flex flex-col items-center justify-center rounded-[2rem] md:rounded-[3rem] shadow-[0_8px_0_#753AB3] border-4 border-white cursor-pointer relative"
                onClick={() => playAudio(currentItem.ttsSound || currentItem.letters)}
              >
                <span className="text-6xl md:text-[6rem] font-heading">{currentItem.letters}</span>
                <Volume2 className="absolute bottom-3 right-3 md:bottom-5 md:right-5 w-5 h-5 md:w-7 md:h-7 text-white/50" />
              </motion.div>

              <p className="text-sm md:text-lg text-brand-dark/50 mt-2 md:mt-4 font-heading">
                Makes the sound: <span className="font-bold text-brand-purple">{currentItem.phonic}</span>
              </p>
            </div>

            {/* Vertical Divider for Desktop */}
            <div className="hidden xl:block w-1.5 bg-gray-100 rounded-full self-stretch mx-2"></div>
            
            {/* Horizontal Divider for Mobile */}
            <div className="block xl:hidden h-1.5 w-full bg-gray-100 rounded-full mx-auto my-2"></div>

            {/* Right Half: Examples Grid */}
            <div className="w-full xl:w-2/3 flex flex-col items-center justify-center">
              <div className="text-lg md:text-xl text-brand-dark/40 font-heading bg-gray-100 px-6 py-1 md:py-1.5 rounded-full mb-2 md:mb-4 shadow-inner inline-block">
                Examples
              </div>
              
              {/* Tightened grid layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 w-full justify-items-stretch">
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

          </div>

          <div className="flex items-center justify-center gap-4 w-full max-w-xl mx-auto mt-4 shrink-0">
            <AnimatedButton 
              variant="warning" 
              className="!p-3 md:!p-4" 
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
            >
              <ArrowLeft size={24} className="md:w-8 md:h-8" />
            </AnimatedButton>
            
            <AnimatedButton 
              variant="purple" 
              className="flex-1 flex justify-center items-center gap-2 text-lg md:text-xl py-3 md:py-4"
              onClick={handleNext}
            >
              {currentIndex === digraphs.length - 1 ? 'Mastered!' : 'Next Sound'} 
              <ArrowRight size={24} className="md:w-7 md:h-7" />
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
