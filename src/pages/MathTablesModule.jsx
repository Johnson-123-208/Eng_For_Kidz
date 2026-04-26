import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mathTables } from '../data/dummyData';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { RewardPopup } from '../components/RewardPopup';
import { playAudio } from '../utils/audio';
import { useStore } from '../store/useStore';
import { ArrowLeft, ArrowRight, Table as TableIcon, Play, Square } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MathTablesModule = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [startTime] = useState(Date.now());
  const { addXp, addStars, markModuleComplete, addGameResult } = useStore();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);
  const audioIntervalRef = React.useRef(null);

  // Stop playing when switching tables
  useEffect(() => {
    stopReading();
  }, [currentIndex]);

  const stopReading = () => {
    setIsPlayingAll(false);
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
    }
  };

  const currentItem = mathTables[currentIndex];

  const handleReadAll = () => {
    if (isPlayingAll) {
      stopReading();
      return;
    }

    setIsPlayingAll(true);
    let step = 0;
    
    // Read the first one immediately
    const readStep = () => {
      if (step >= currentItem.values.length) {
        stopReading();
        return;
      }
      const v = currentItem.values[step];
      playAudio(`${currentItem.number} times ${v.multiplier} is ${v.result}`);
      step++;
    };

    readStep();
    audioIntervalRef.current = setInterval(readStep, 2500); // 2.5s between rows
  };

  const handleNext = () => {
    if (currentIndex < mathTables.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      addGameResult({
        moduleName: "Math Tables",
        score: mathTables.length,
        total: mathTables.length,
        timeInSeconds
      });
      
      addXp(150);
      addStars(3);
      markModuleComplete('math-tables');
      setShowReward(true);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  }, [currentIndex]);

  if (!currentItem) return null;

  return (
    <div ref={containerRef} className="flex-1 flex flex-col items-center p-1 md:p-6 w-full max-w-4xl mx-auto min-h-screen lg:h-screen lg:overflow-hidden overflow-y-auto">
      <div className="w-full mb-2 md:mb-8 gap-4 px-2 shrink-0">
        <ProgressBar current={currentIndex + 1} total={mathTables.length} color="bg-brand-blue" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 pb-8 md:pb-12 shadow-2xl border-b-[10px] border-brand-blue w-full flex flex-col items-center flex-1 overflow-y-auto lg:overflow-visible"
        >
          <div className="flex flex-col items-center gap-4 mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-brand-blue text-white p-3 rounded-2xl shadow-lg rotate-3 uppercase font-bold tracking-widest text-sm">
                Table of
              </div>
              <div className="text-6xl md:text-8xl font-heading text-brand-blue transform -rotate-3 drop-shadow-md">
                {currentItem.number}
              </div>
            </div>

            <AnimatedButton 
              variant={isPlayingAll ? "primary" : "secondary"}
              className="px-8 py-3 flex items-center gap-2 text-lg shadow-md"
              onClick={handleReadAll}
            >
              {isPlayingAll ? <Square size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              {isPlayingAll ? "Stop Reading" : "Read Entire Table"}
            </AnimatedButton>
          </div>

          <div className="grid grid-cols-1 gap-2 w-full max-w-sm mb-8">
            {currentItem.values.map((v, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between bg-brand-blue/5 p-3 rounded-2xl border-b-2 border-brand-blue/20 hover:bg-brand-blue/10 transition-colors"
                onClick={() => playAudio(`${currentItem.number} times ${v.multiplier} is ${v.result}`)}
              >
                <div className="flex items-center gap-4 text-2xl md:text-3xl font-heading text-brand-dark">
                  <span className="text-brand-blue w-8">{currentItem.number}</span>
                  <span className="text-gray-400 text-xl">×</span>
                  <span className="w-8">{v.multiplier}</span>
                </div>
                <div className="flex items-center gap-4 text-2xl md:text-3xl font-heading">
                  <span className="text-gray-400 text-xl">=</span>
                  <span className="text-brand-green font-bold w-12 text-right">{v.result}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 w-full max-w-xl mx-auto mt-auto shrink-0">
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
              {currentIndex === mathTables.length - 1 ? 'Finish!' : 'Next Table'} 
              <ArrowRight size={24} className="md:w-7 md:h-7" />
            </AnimatedButton>
          </div>
        </motion.div>
      </AnimatePresence>

      <RewardPopup 
        isOpen={showReward} 
        onClose={() => navigate('/')} 
        message="Vedhanshi's Math Genius!"
        stars={3}
      />
    </div>
  );
};
