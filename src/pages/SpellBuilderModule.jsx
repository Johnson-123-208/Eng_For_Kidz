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
  const [wordPool, setWordPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letters, setLetters] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [startTime] = useState(Date.now());
  
  const { addXp, addStars, markModuleComplete, addGameResult } = useStore();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);

  useEffect(() => {
    setWordPool(shuffleArray(hardWords).slice(0, 20));
  }, []);

  const currentItem = wordPool[currentIndex];

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
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  }, [currentIndex]);

  const checkOrder = (newOrder) => {
    setLetters(newOrder);
    const currentWord = newOrder.map(l => l.char).join('');
    
    if (currentWord.toLowerCase() === currentItem.word.toLowerCase()) {
      setIsCorrect(true);
      playAudio('Excellent!');
      setTimeout(() => {
        if (currentIndex < wordPool.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
          addGameResult({
            moduleName: "Spell Builder",
            score: wordPool.length,
            total: wordPool.length,
            timeInSeconds
          });

          addXp(150);
          addStars(3);
          markModuleComplete('spell-builder');
          setShowReward(true);
        }
      }, 1500);
    }
  };

  if (!currentItem) return null;

  return (
    <div ref={containerRef} className="flex-1 flex flex-col items-center p-1 md:p-6 w-full max-w-4xl mx-auto min-h-screen lg:h-screen lg:overflow-hidden overflow-y-auto">
      <div className="w-full mb-2 md:mb-8 shrink-0 px-2">
        <ProgressBar current={currentIndex + 1} total={wordPool.length} color="bg-brand-green" />
      </div>

      <motion.div
        className="bg-white/90 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-3 md:p-8 pb-6 md:pb-12 shadow-2xl border-b-[10px] border-brand-green w-full flex flex-col items-center flex-1 overflow-y-auto lg:overflow-visible"
      >
        <div className="text-6xl md:text-8xl mb-4 md:mb-6 bg-brand-green/10 p-6 rounded-full shrink-0">
          {currentItem.hint}
        </div>
        
        <button 
          onClick={() => playAudio(currentItem.word)}
          className="bg-brand-blue/10 text-brand-blue flex items-center justify-center gap-2 py-2 px-6 rounded-full font-bold mb-8 md:mb-12 hover:bg-brand-blue hover:text-white transition-colors shrink-0"
        >
          <Volume2 size={24} /> Hear Word
        </button>

        {/* Forced Single Line container */}
        <div className="w-full overflow-x-auto pb-4 mb-8 md:mb-12 flex justify-center no-scrollbar">
          <Reorder.Group 
            axis="x" 
            values={letters} 
            onReorder={checkOrder}
            className="flex flex-nowrap gap-2 md:gap-4 min-h-[100px] px-4"
          >
            {letters.map((letter) => (
              <Reorder.Item 
                key={letter.id} 
                value={letter}
                disabled={isCorrect}
                className="shrink-0"
              >
                <div className={`
                  w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center text-3xl sm:text-4xl font-heading rounded-2xl shadow-lg border-b-8 cursor-grab active:cursor-grabbing
                  ${isCorrect ? 'bg-brand-green text-white border-[#04AC80] shadow-[0_5px_0_#04AC80] pointer-events-none' : 'bg-white border-brand-green/30 text-brand-dark'}
                `}>
                  {letter.char.toUpperCase()}
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>

        {isCorrect && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 text-brand-green text-2xl font-heading mb-4 shrink-0"
          >
            <CheckCircle2 size={32} className="fill-brand-green text-white" />
            Perfect!
          </motion.div>
        )}

        <div className="flex gap-4 w-full max-w-sm mt-auto shrink-0">
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
        message="Master Builder Vedhanshi!"
        stars={3}
      />
    </div>
  );
};
