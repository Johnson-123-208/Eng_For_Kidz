import React, { useState, useEffect } from 'react';
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
  const [startTime] = useState(Date.now());
  const { addXp, addStars, markModuleComplete, addGameResult } = useStore();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < alphabets.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      addGameResult({
        moduleName: "Alphabet Sounds",
        score: alphabets.length,
        total: alphabets.length,
        timeInSeconds
      });
      
      addXp(50);
      addStars(3);
      markModuleComplete('alphabets');
      setShowReward(true);
    }
  };

  const currentItem = alphabets[currentIndex];

  return (
    <div ref={containerRef} className="flex-1 flex flex-col items-center p-2 md:p-4 w-full max-w-7xl mx-auto min-h-screen lg:h-screen lg:overflow-hidden overflow-y-auto">
      <div className="w-full mb-2 md:mb-4 shrink-0">
        <ProgressBar current={currentIndex + 1} total={alphabets.length} color="bg-brand-red" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl border-b-8 border-brand-red w-full flex flex-col lg:flex-1 overflow-y-auto lg:overflow-visible"
        >
          <div className="flex flex-col xl:flex-row items-center justify-between gap-4 xl:gap-8 w-full lg:flex-1">
            
            {/* Left Half: The Letter target */}
            <div className="w-full xl:w-1/3 flex flex-col items-center justify-center shrink-0">
              <h2 className="text-xl md:text-2xl text-brand-red mb-2 md:mb-4 text-center">Tap to hear the sound!</h2>
              
              <motion.div 
                whileHover={{ scale: 1.1, rotate: [-5, 5, -5] }}
                className="flex flex-col items-center justify-center cursor-pointer relative"
                onClick={() => {
                  import('../utils/audio').then(m => m.playAudio(currentItem.ttsSound || currentItem.letter));
                }}
              >
                <div className="w-32 h-32 md:w-48 md:h-48 bg-brand-red text-white flex items-center justify-center rounded-[2rem] md:rounded-[3rem] shadow-[0_8px_0_#C0395B] border-4 border-white">
                  <span className="text-6xl md:text-[6rem] font-heading">{currentItem.letter}</span>
                </div>
                <div className="mt-2 md:mt-4 bg-white/50 px-4 py-1 md:py-1.5 rounded-full text-brand-red font-bold text-lg md:text-xl border border-brand-red/20 shadow-sm">
                  {currentItem.phonic} 
                </div>
              </motion.div>
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
              variant="primary" 
              className="flex-1 flex justify-center items-center gap-2 text-lg md:text-xl py-3 md:py-4"
              onClick={handleNext}
            >
              {currentIndex === alphabets.length - 1 ? 'Finish!' : 'Next Letter'} 
              <ArrowRight size={24} className="md:w-7 md:h-7" />
            </AnimatedButton>
          </div>
        </motion.div>
      </AnimatePresence>

      <RewardPopup 
        isOpen={showReward} 
        onClose={() => navigate('/')} 
        message="Awesome Vedhanshi!"
        stars={3}
      />
    </div>
  );
};
