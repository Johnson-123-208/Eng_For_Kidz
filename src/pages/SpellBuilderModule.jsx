import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { hardWords } from '../data/dummyData';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { RewardPopup } from '../components/RewardPopup';
import { playAudio } from '../utils/audio';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { RefreshCcw, Volume2, CheckCircle2 } from 'lucide-react';

// Utility to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const SpellBuilderModule = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letters, setLetters] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showReward, setShowReward] = useState(false);
  
  const { addXp, addStars, markModuleComplete } = useStore();
  const navigate = useNavigate();

  const currentItem = hardWords[currentIndex];

  const initializeLetters = () => {
    const wordLetters = currentItem.word.split('').map((char, index) => ({
      id: `${char}-${index}`,
      char
    }));
    setLetters(shuffleArray(wordLetters));
    setIsCorrect(false);
    playAudio(currentItem.word);
  };

  useEffect(() => {
    initializeLetters();
  }, [currentIndex]);

  const checkOrder = (newOrder) => {
    setLetters(newOrder);
    const currentWord = newOrder.map(l => l.char).join('');
    
    if (currentWord.toLowerCase() === currentItem.word.toLowerCase()) {
      setIsCorrect(true);
      playAudio('Excellent!');
      setTimeout(() => {
        if (currentIndex < hardWords.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          addXp(150);
          addStars(3);
          markModuleComplete('spell-builder');
          setShowReward(true);
        }
      }, 1500);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center p-6 w-full max-w-3xl mx-auto">
      <div className="w-full mb-8">
        <ProgressBar current={currentIndex + 1} total={hardWords.length} color="bg-brand-green" />
      </div>

      <motion.div
        className="bg-white/90 backdrop-blur-md rounded-[3rem] p-8 pb-12 shadow-2xl border-b-[10px] border-brand-green w-full flex flex-col items-center"
      >
        <div className="text-6xl mb-6 bg-brand-green/10 p-6 rounded-full">
          {currentItem.hint}
        </div>
        
        <button 
          onClick={() => playAudio(currentItem.word)}
          className="bg-brand-blue/10 text-brand-blue flex items-center justify-center gap-2 py-2 px-6 rounded-full font-bold mb-12 hover:bg-brand-blue hover:text-white transition-colors"
        >
          <Volume2 size={24} /> Hear Word
        </button>

        <Reorder.Group 
          axis="x" 
          values={letters} 
          onReorder={checkOrder}
          className="flex flex-wrap justify-center gap-4 mb-12 min-h-[100px]"
        >
          {letters.map((letter) => (
            <Reorder.Item 
              key={letter.id} 
              value={letter}
              disabled={isCorrect}
            >
              <div className={`
                w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-4xl font-heading rounded-2xl shadow-lg border-b-8 cursor-grab active:cursor-grabbing
                ${isCorrect ? 'bg-brand-green text-white border-[#04AC80] shadow-[0_5px_0_#04AC80] pointer-events-none' : 'bg-white border-brand-green/30 text-brand-dark'}
              `}>
                {letter.char.toUpperCase()}
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {isCorrect && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 text-brand-green text-2xl font-heading mb-4"
          >
            <CheckCircle2 size={32} className="fill-brand-green text-white" />
            Perfect!
          </motion.div>
        )}

        <div className="flex gap-4 w-full max-w-sm mt-auto">
          <AnimatedButton 
            variant="warning"
            className="flex-1 flex justify-center py-4"
            onClick={initializeLetters}
            disabled={isCorrect}
          >
            <RefreshCcw size={28} />
          </AnimatedButton>
        </div>
      </motion.div>

      <RewardPopup 
        isOpen={showReward} 
        onClose={() => navigate('/')} 
        message="Master Builder!"
        stars={3}
      />
    </div>
  );
};
