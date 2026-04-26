import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { simpleWords } from '../data/dummyData';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { RewardPopup } from '../components/RewardPopup';
import { playAudio } from '../utils/audio';
import { useStore } from '../store/useStore';
import { Volume2, HelpCircle, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const HearAndTypeModule = () => {
  const [wordPool, setWordPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'success', 'error'
  const [showReward, setShowReward] = useState(false);
  const [startTime] = useState(Date.now());
  const inputRef = useRef(null);
  const { addXp, addStars, markModuleComplete, addGameResult } = useStore();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);

  // Initialize and shuffle words on mount
  useEffect(() => {
    // Take a random 20 words for each session
    setWordPool(shuffleArray(simpleWords).slice(0, 20));
  }, []);

  const currentItem = wordPool[currentIndex];

  useEffect(() => {
    if (!currentItem) return;
    // Play audio when mounting or changing word
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
    setTimeout(() => playAudio(currentItem.word), 500);
    if (inputRef.current) inputRef.current.focus();
    setInputValue('');
    setStatus('idle');
  }, [currentIndex, currentItem]);

  const handleCheck = () => {
    if (inputValue.toLowerCase().trim() === currentItem.word.toLowerCase()) {
      setStatus('success');
      playAudio('Correct! Good job!');
      setTimeout(() => {
        if (currentIndex < wordPool.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
          addGameResult({
            moduleName: "Hear & Type",
            score: wordPool.length,
            total: wordPool.length,
            timeInSeconds
          });
          
          addXp(100);
          addStars(3);
          markModuleComplete('hear-type');
          setShowReward(true);
        }
      }, 1500);
    } else {
      setStatus('error');
      playAudio('Try again!');
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  if (!currentItem) return null;

  return (
    <div ref={containerRef} className="flex-1 flex flex-col items-center p-1 md:p-6 w-full max-w-2xl mx-auto min-h-screen lg:h-screen lg:overflow-hidden overflow-y-auto">
      <div className="w-full mb-2 md:mb-8 shrink-0 px-2">
        <ProgressBar current={currentIndex + 1} total={wordPool.length} color="bg-brand-blue" />
      </div>

      <motion.div
        className="bg-white/90 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-3 md:p-8 pb-6 md:pb-12 shadow-2xl border-b-[8px] md:border-b-[10px] border-brand-blue w-full flex flex-col items-center flex-1 overflow-y-auto lg:overflow-visible"
      >
        <div className="flex justify-between w-full mb-6 shrink-0">
          <button 
            className="text-brand-dark/40 hover:text-brand-dark"
            onClick={() => alert(`Hint: ${currentItem.hint} - Starts with ${currentItem.word[0].toUpperCase()}`)}
          >
            <HelpCircle size={28} className="md:w-8 md:h-8" />
          </button>
          <div className="text-3xl md:text-4xl">{currentItem.hint}</div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => playAudio(currentItem.word)}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-[0_6px_0_#0D6F91] md:shadow-[0_8px_0_#0D6F91] border-4 border-white mb-8 md:mb-12"
        >
          <Volume2 size={48} className="md:w-16 md:h-16" />
        </motion.button>

        <div className="relative w-full max-w-sm mb-6 md:mb-8">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={status === 'success'}
            placeholder="Type here..."
            className={`
              w-full text-center text-3xl md:text-5xl font-heading py-3 px-4 md:py-4 md:px-6 rounded-2xl border-4 outline-none
              transition-colors duration-300
              ${status === 'idle' ? 'border-brand-blue/30 focus:border-brand-blue' : ''}
              ${status === 'success' ? 'border-brand-green bg-brand-green/10 text-brand-green' : ''}
              ${status === 'error' ? 'border-brand-red bg-brand-red/10 animate-shake text-brand-red' : ''}
            `}
          />
          <AnimatePresence>
            {status === 'success' && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="absolute -right-4 -top-4 bg-brand-green text-white p-2 rounded-full shadow-lg"
              >
                <Check size={32} />
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                exit={{ scale: 0 }}
                className="absolute -right-4 -top-4 bg-brand-red text-white p-2 rounded-full shadow-lg"
              >
                <X size={32} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatedButton 
          variant="secondary" 
          className="w-full max-w-sm py-4 text-2xl"
          onClick={handleCheck}
          disabled={status === 'success' || !inputValue.trim()}
        >
          Check Answer
        </AnimatedButton>
      </motion.div>

      <RewardPopup 
        isOpen={showReward} 
        onClose={() => navigate('/')} 
        message="Well done Vedhanshi!"
        stars={3}
      />
    </div>
  );
};
