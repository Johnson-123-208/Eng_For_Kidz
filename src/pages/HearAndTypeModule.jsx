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

export const HearAndTypeModule = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'success', 'error'
  const [showReward, setShowReward] = useState(false);
  const inputRef = useRef(null);
  const { addXp, addStars, markModuleComplete } = useStore();
  const navigate = useNavigate();

  const currentItem = simpleWords[currentIndex];

  useEffect(() => {
    // Play audio when mounting or changing word
    setTimeout(() => playAudio(currentItem.word), 500);
    if (inputRef.current) inputRef.current.focus();
    setInputValue('');
    setStatus('idle');
  }, [currentIndex]);

  const handleCheck = () => {
    if (inputValue.toLowerCase().trim() === currentItem.word.toLowerCase()) {
      setStatus('success');
      playAudio('Correct! Good job!');
      setTimeout(() => {
        if (currentIndex < simpleWords.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
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

  return (
    <div className="flex-1 flex flex-col items-center p-6 w-full max-w-2xl mx-auto">
      <div className="w-full mb-8">
        <ProgressBar current={currentIndex + 1} total={simpleWords.length} color="bg-brand-blue" />
      </div>

      <motion.div
        className="bg-white/90 backdrop-blur-md rounded-[3rem] p-8 pb-12 shadow-2xl border-b-[10px] border-brand-blue w-full flex flex-col items-center"
      >
        <div className="flex justify-between w-full mb-6">
          <button 
            className="text-brand-dark/40 hover:text-brand-dark"
            onClick={() => alert(`Hint: ${currentItem.hint} - Starts with ${currentItem.word[0].toUpperCase()}`)}
          >
            <HelpCircle size={32} />
          </button>
          <div className="text-4xl">{currentItem.hint}</div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => playAudio(currentItem.word)}
          className="w-32 h-32 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-[0_8px_0_#0D6F91] border-4 border-white mb-12"
        >
          <Volume2 size={64} />
        </motion.button>

        <div className="relative w-full max-w-sm mb-8">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={status === 'success'}
            placeholder="Type here..."
            className={`
              w-full text-center text-5xl font-heading py-4 px-6 rounded-2xl border-4 outline-none
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
        message="Perfect Spelling!"
        stars={3}
      />
    </div>
  );
};
