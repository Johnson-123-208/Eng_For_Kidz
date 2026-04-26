import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { challengeQuiz } from '../data/dummyData';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { RewardPopup } from '../components/RewardPopup';
import { useStore } from '../store/useStore';
import { playAudio } from '../utils/audio';
import { Shield, Volume2, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const ChallengeModule = () => {
  const [quizPool, setQuizPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, correct, wrong
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [startTime] = useState(Date.now());
  const { addXp, addStars, markModuleComplete, addGameResult } = useStore();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);

  // Initialize and shuffle quiz on mount
  useEffect(() => {
    // Take a random 20 questions for each challenge session to keep it fresh
    const shuffled = shuffleArray(challengeQuiz).slice(0, 20);
    setQuizPool(shuffled);
  }, []);

  const currentQ = quizPool[currentIndex];
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    if (!currentQ) return;
    
    setSelectedOption(null);
    setStatus('idle');
    setShuffledOptions(shuffleArray(currentQ.options));

    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
    if (currentQ.questionType === 'hear' || currentQ.questionType === 'missing') {
      setTimeout(() => playAudio(currentQ.word || currentQ.sound), 500);
    }
  }, [currentIndex, currentQ]);

  const handleOptionClick = (option) => {
    if (status !== 'idle') return;
    
    setSelectedOption(option);
    
    if (option === currentQ.correct) {
      setStatus('correct');
      setScore(s => s + 1);
      playAudio('Correct!');
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
      const finalScore = score + 1; // including the last one contextually
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      
      addGameResult({
        moduleName: "Master Challenge",
        score: finalScore,
        total: quizPool.length,
        timeInSeconds
      });
      
      const starsEarned = finalScore === quizPool.length ? 3 : finalScore >= quizPool.length - 2 ? 2 : 1;
      addXp(200);
      addStars(starsEarned);
      markModuleComplete('challenge');
      setShowReward(true);
    }
  };

  if (!currentQ) return null;

  const renderQuestionHeader = () => {
    switch(currentQ.questionType) {
      case 'hear':
        return (
          <>
            <h2 className="text-xl md:text-3xl text-brand-dark mb-4">Listen and choose the word!</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => playAudio(currentQ.word)}
              className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shadow-[0_4px_0_#E6B048] md:shadow-[0_6px_0_#E6B048] border-4 border-white mb-4 md:mb-6"
            >
              <Volume2 size={36} className="md:w-12 md:h-12" />
            </motion.button>
          </>
        );
      case 'phonic':
        return (
          <>
            <h2 className="text-xl md:text-3xl text-brand-dark mb-4">Which word has the sound:</h2>
            <div className="text-4xl md:text-6xl text-brand-purple font-heading mb-4 md:mb-6">{currentQ.sound}</div>
          </>
        );
      case 'missing':
        return (
          <>
            <h2 className="text-xl md:text-3xl text-brand-dark mb-4">Find the missing sound!</h2>
            <div className="text-5xl md:text-7xl text-brand-dark font-heading mb-2 tracking-widest">{currentQ.word.replace('_', ' _ ')}</div>
            <div className="text-4xl md:text-5xl mb-4 md:mb-6">{currentQ.hint}</div>
          </>
        );
      case 'image':
        return (
          <>
            <h2 className="text-xl md:text-3xl text-brand-dark mb-4">Choose the correct spelling!</h2>
            <div className="text-6xl md:text-8xl mb-4 md:mb-6">{currentQ.hint}</div>
          </>
        );
      case 'rhyme':
        return (
          <>
            <h2 className="text-xl md:text-3xl text-brand-dark mb-4">What rhymes with...</h2>
            <div className="text-4xl md:text-6xl text-brand-blue font-heading mb-4 md:mb-6 capitalize">{currentQ.word}</div>
          </>
        );
      case 'build':
        return (
          <>
            <h2 className="text-xl md:text-3xl text-brand-dark mb-4">Combine the sounds!</h2>
            <div className="flex gap-2 md:gap-4 mb-2">
              {currentQ.sounds.map((sound, i) => (
                <div key={i} className="bg-brand-blue/10 px-3 py-2 md:px-6 md:py-4 rounded-xl text-3xl md:text-5xl font-heading text-brand-blue">{sound}</div>
              ))}
            </div>
            <div className="text-4xl md:text-6xl mb-4 md:mb-6">{currentQ.hint}</div>
          </>
        );
      case 'sight':
        return (
          <>
            <h2 className="text-xl md:text-3xl text-brand-dark mb-4">Find the sight word!</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => playAudio(currentQ.word)}
              className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-brand-green text-white flex items-center justify-center shadow-[0_4px_0_#439A5D] md:shadow-[0_6px_0_#439A5D] border-4 border-white mb-4 md:mb-6"
            >
              <Volume2 size={36} className="md:w-12 md:h-12" />
            </motion.button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="flex-1 flex flex-col items-center p-4 md:p-6 w-full max-w-3xl mx-auto min-h-screen lg:h-screen lg:overflow-hidden overflow-y-auto">
      <div className="w-full flex items-center mb-4 md:mb-8 gap-4 shrink-0">
        <Shield className="text-brand-yellow fill-brand-yellow" size={32} />
        <ProgressBar current={currentIndex + 1} total={quizPool.length} color="bg-brand-yellow" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-[3rem] p-6 md:p-8 pb-12 shadow-2xl border-b-[10px] border-brand-yellow w-full flex flex-col items-center flex-1 overflow-y-auto lg:overflow-visible"
        >
          {renderQuestionHeader()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-auto">
            {shuffledOptions.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQ.correct;
              
              let buttonVariant = "secondary";
              if (isSelected) {
                buttonVariant = status === 'correct' && isCorrect ? "success" : "primary";
              }

              return (
                <AnimatedButton 
                  key={idx}
                  variant={buttonVariant}
                  className={`
                    py-6 text-3xl font-heading tracking-wide
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
        message="Vedhanshi is the Champion!"
        stars={score === challengeQuiz.length ? 3 : score >= challengeQuiz.length - 2 ? 2 : 1}
      />
    </div>
  );
};
