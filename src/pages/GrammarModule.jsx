import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { grammarModules } from '../data/grammarData';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { RewardPopup } from '../components/RewardPopup';
import { playAudio } from '../utils/audio';
import { useStore } from '../store/useStore';
import { useNavigate, useParams } from 'react-router-dom';
import { Book, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const GrammarModule = () => {
  const { moduleId } = useParams();
  const moduleData = grammarModules.find(m => m.id === moduleId);
  const [mode, setMode] = useState('intro'); // intro, learn, quiz
  const [quizPool, setQuizPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('idle');
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [startTime] = useState(Date.now());
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const { addXp, addStars, markModuleComplete, addGameResult } = useStore();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);

  useEffect(() => {
    if (moduleData) {
      // Pick 20 random questions from the pool for this session
      const pool = moduleData.lessons[0].quizPool || [];
      setQuizPool(shuffleArray(pool).slice(0, 20));
    }
  }, [moduleData]);

  const currentQ = quizPool[currentIndex];

  useEffect(() => {
    if (mode === 'quiz' && currentQ) {
      setSelectedOption(null);
      setStatus('idle');
      setShuffledOptions(shuffleArray(currentQ.options));
      if (containerRef.current) containerRef.current.scrollTo(0, 0);
    }
  }, [currentIndex, currentQ, mode]);

  const handleOptionClick = (option) => {
    if (status !== 'idle') return;
    setSelectedOption(option);
    
    if (option === currentQ.a) {
      setStatus('correct');
      setScore(s => s + 1);
      playAudio('Perfect grammar! Keep it up.');
      setTimeout(() => nextQuestion(), 1500);
    } else {
      setStatus('wrong');
      playAudio('Not quite. Let\'s try again.');
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < quizPool.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      addGameResult({
        moduleName: `Grammar: ${moduleData.title}`,
        score: score + 1,
        total: quizPool.length,
        timeInSeconds
      });
      addXp(300);
      addStars(3);
      markModuleComplete(moduleId);
      setShowReward(true);
    }
  };

  if (!moduleData) return null;

  if (mode === 'intro') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white/90 backdrop-blur-md rounded-[3rem] p-8 md:p-12 shadow-2xl border-b-[10px] border-brand-blue w-full">
          <div className="text-6xl md:text-8xl mb-6">{moduleData.icon}</div>
          <h1 className="text-4xl md:text-5xl text-brand-dark mb-4">{moduleData.title}</h1>
          <p className="text-xl text-brand-dark/70 mb-8">{moduleData.description}</p>
          <div className="flex flex-col gap-4">
            <AnimatedButton variant="primary" fullWidth onClick={() => setMode('quiz')}>
              Start Quiz 🚀
            </AnimatedButton>
            <AnimatedButton variant="secondary" fullWidth onClick={() => navigate('/')}>
              Back Home
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 flex flex-col items-center p-1 md:p-6 w-full max-w-3xl mx-auto min-h-screen lg:h-screen lg:overflow-hidden overflow-y-auto">
      <div className="w-full flex items-center mb-2 md:mb-8 gap-4 px-2 shrink-0">
        <Book className="text-brand-blue" size={32} />
        <ProgressBar current={currentIndex + 1} total={quizPool.length} color="bg-brand-blue" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 pb-10 md:pb-16 shadow-2xl border-b-[10px] border-brand-blue w-full flex flex-col items-center justify-center flex-1 overflow-y-auto lg:overflow-visible"
        >
          <div className="bg-brand-blue/10 px-6 py-2 rounded-full text-brand-blue font-bold tracking-widest uppercase text-xs mb-6 shrink-0">
             Grammar Master
          </div>

          <div className="flex-1 flex items-center justify-center w-full mb-8">
             <div className="text-3xl md:text-5xl font-heading text-brand-dark drop-shadow-sm text-center leading-relaxed">
              {currentQ.q}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full shrink-0">
            {shuffledOptions.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQ.a;
              let variant = "secondary";
              if (isSelected) variant = status === 'correct' && isCorrect ? "success" : "primary";

              return (
                <AnimatedButton 
                  key={idx}
                  variant={variant}
                  className={`py-6 text-xl md:text-2xl font-heading ${status === 'wrong' && isSelected ? 'animate-shake' : ''}`}
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
        message={`Vedhanshi is a Grammar Guru!`}
        stars={3}
      />
    </div>
  );
};
