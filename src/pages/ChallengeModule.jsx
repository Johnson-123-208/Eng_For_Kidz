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

export const ChallengeModule = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, correct, wrong
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const { addXp, addStars, markModuleComplete } = useStore();
  const navigate = useNavigate();

  const currentQ = challengeQuiz[currentIndex];

  useEffect(() => {
    setSelectedOption(null);
    setStatus('idle');
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
    if (currentIndex < challengeQuiz.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const finalScore = score + 1; // including the last one contextually
      const starsEarned = finalScore === challengeQuiz.length ? 3 : finalScore >= challengeQuiz.length - 2 ? 2 : 1;
      addXp(200);
      addStars(starsEarned);
      markModuleComplete('challenge');
      setShowReward(true);
    }
  };

  const renderQuestionHeader = () => {
    switch(currentQ.questionType) {
      case 'hear':
        return (
          <>
            <h2 className="text-3xl text-brand-dark mb-4">Listen and choose the word!</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => playAudio(currentQ.word)}
              className="w-24 h-24 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shadow-[0_6px_0_#E6B048] border-4 border-white mb-6"
            >
              <Volume2 size={48} />
            </motion.button>
          </>
        );
      case 'phonic':
        return (
          <>
            <h2 className="text-3xl text-brand-dark mb-4">Which word has the sound:</h2>
            <div className="text-6xl text-brand-purple font-heading mb-6">{currentQ.sound}</div>
          </>
        );
      case 'missing':
        return (
          <>
            <h2 className="text-3xl text-brand-dark mb-4">Find the missing sound!</h2>
            <div className="text-7xl text-brand-dark font-heading mb-2 tracking-widest">{currentQ.word.replace('_', ' _ ')}</div>
            <div className="text-5xl mb-6">{currentQ.hint}</div>
          </>
        );
      case 'image':
        return (
          <>
            <h2 className="text-3xl text-brand-dark mb-4">Choose the correct spelling!</h2>
            <div className="text-8xl mb-6">{currentQ.hint}</div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center p-6 w-full max-w-3xl mx-auto">
      <div className="w-full flex items-center mb-8 gap-4">
        <Shield className="text-brand-yellow fill-brand-yellow" size={32} />
        <ProgressBar current={currentIndex + 1} total={challengeQuiz.length} color="bg-brand-yellow" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-[3rem] p-8 pb-12 shadow-2xl border-b-[10px] border-brand-yellow w-full flex flex-col items-center flex-1 max-h-[80vh]"
        >
          {renderQuestionHeader()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-auto">
            {currentQ.options.map((option, idx) => {
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
        message={`Challenge Complete!`}
        stars={score === challengeQuiz.length ? 3 : score >= challengeQuiz.length - 2 ? 2 : 1}
      />
    </div>
  );
};
