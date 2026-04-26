import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mathQuizPool } from '../data/dummyData';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { RewardPopup } from '../components/RewardPopup';
import { playAudio } from '../utils/audio';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Calculator, Volume2, ArrowLeft } from 'lucide-react';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const MathQuizModule = () => {
  const [quizPool, setQuizPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, correct, wrong
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [startTime] = useState(Date.now());
  const [shuffledOptions, setShuffledOptions] = useState([]);
  
  const { addXp, addStars, markModuleComplete, addGameResult } = useStore();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);

  useEffect(() => {
    setQuizPool(shuffleArray(mathQuizPool).slice(0, 15));
  }, []);

  const currentQ = quizPool[currentIndex];

  useEffect(() => {
    if (!currentQ) return;
    setSelectedOption(null);
    setStatus('idle');
    setShuffledOptions(shuffleArray(currentQ.options));
    
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  }, [currentIndex, currentQ]);

  const handleOptionClick = (option) => {
    if (status !== 'idle') return;
    setSelectedOption(option);
    
    if (option === currentQ.a) {
      setStatus('correct');
      setScore(s => s + 1);
      playAudio('Correct! You are so smart.');
      setTimeout(() => nextQuestion(), 1500);
    } else {
      setStatus('wrong');
      playAudio('Oops! Try again.');
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < quizPool.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const finalScore = score + 1;
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      
      addGameResult({
        moduleName: "Math Quiz",
        score: finalScore,
        total: quizPool.length,
        timeInSeconds
      });
      
      addXp(200);
      addStars(3);
      markModuleComplete('math-quiz');
      setShowReward(true);
    }
  };

  if (!currentQ) return null;

  return (
    <div ref={containerRef} className="flex-1 flex flex-col items-center p-1 md:p-6 w-full max-w-3xl mx-auto min-h-screen lg:h-screen lg:overflow-hidden overflow-y-auto">
      <div className="w-full flex items-center mb-2 md:mb-8 gap-4 px-2 shrink-0">
        <Calculator className="text-brand-purple fill-brand-purple/20" size={32} />
        <ProgressBar current={currentIndex + 1} total={quizPool.length} color="bg-brand-purple" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/90 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 pb-12 md:pb-20 shadow-2xl border-b-[10px] border-brand-purple w-full flex flex-col items-center flex-1 overflow-y-auto lg:overflow-visible"
        >
          <div className="bg-brand-purple/5 px-6 py-2 rounded-full text-brand-purple font-bold tracking-widest uppercase text-sm mb-6 shrink-0">
             Math Challenge
          </div>

          <div className="text-7xl md:text-[8rem] font-heading text-brand-dark mb-12 drop-shadow-sm shrink-0">
            {currentQ.q}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mt-auto">
            {shuffledOptions.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQ.a;
              
              let buttonVariant = "secondary";
              if (isSelected) {
                buttonVariant = status === 'correct' && isCorrect ? "success" : "primary";
              }

              return (
                <AnimatedButton 
                  key={idx}
                  variant={buttonVariant}
                  className={`
                    py-8 md:py-10 text-4xl md:text-5xl font-heading
                    ${status === 'wrong' && isSelected ? 'animate-shake' : ''}
                  `}
                  onClick={() => handleOptionClick(option)}
                  disabled={status === 'correct' || (status === 'wrong' && isSelected)}
                  fullWidth
                >
                  {option}
                </AnimatedButton>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <RewardPopup 
        isOpen={showReward} 
        onClose={() => navigate('/')} 
        message="Vedhanshi is a Math Star!"
        stars={3}
      />
    </div>
  );
};
