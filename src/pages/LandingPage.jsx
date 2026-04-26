import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ModuleCard } from '../components/ModuleCard';
import { useStore } from '../store/useStore';
import { BookOpen, Headphones, Type, Shield, Trophy, Calculator, TableProperties } from 'lucide-react';

export const LandingPage = () => {
  const { xp, completedModules, updateLoginStreak } = useStore();

  useEffect(() => {
    updateLoginStreak();
  }, [updateLoginStreak]);

  const modules = [
    {
      id: 'alphabets',
      title: 'Alphabet Sounds',
      description: 'Learn A to Z with fun sounds!',
      icon: <BookOpen className="text-white" size={40} />,
      color: 'bg-brand-red',
      isLocked: false,
      path: '/module/alphabets',
      stars: completedModules.includes('alphabets') ? 3 : 0,
    },
    {
      id: 'phonics',
      title: 'Magic Phonics',
      description: 'Learn sh, ch, th and more!',
      icon: <Trophy className="text-white" size={40} />,
      color: 'bg-brand-purple',
      isLocked: false, // unlocked for demo
      path: '/module/phonics',
      stars: completedModules.includes('phonics') ? 3 : 0,
    },
    {
      id: 'hear-type',
      title: 'Hear & Type',
      description: 'Listen carefully and spell it out.',
      icon: <Headphones className="text-white" size={40} />,
      color: 'bg-brand-blue',
      isLocked: false,
      path: '/module/hear-type',
      stars: completedModules.includes('hear-type') ? 3 : 0,
    },
    {
      id: 'spell-builder',
      title: 'Spell Builder',
      description: 'Drag and drop letters to win!',
      icon: <Type className="text-white" size={40} />,
      color: 'bg-brand-green',
      isLocked: false,
      path: '/module/spell-builder',
      stars: completedModules.includes('spell-builder') ? 3 : 0,
    },
    {
      id: 'challenge',
      title: 'Master Challenge',
      description: 'Test your skills in a timed quiz.',
      icon: <Shield className="text-white" size={40} />,
      color: 'bg-brand-yellow',
      isLocked: false,
      path: '/module/challenge',
      stars: completedModules.includes('challenge') ? 3 : 0,
    },
    {
      id: 'math-tables',
      title: 'Tables Master',
      description: 'Learn tables from 2 to 20!',
      icon: <TableProperties className="text-white" size={40} />,
      color: 'bg-brand-blue',
      isLocked: false,
      path: '/module/math-tables',
      stars: completedModules.includes('math-tables') ? 3 : 0,
    },
    {
      id: 'math-quiz',
      title: 'Math Quiz',
      description: 'Solve fun addition and subtraction quizes!',
      icon: <Calculator className="text-white" size={40} />,
      color: 'bg-brand-purple',
      isLocked: false,
      path: '/module/math-quiz',
      stars: completedModules.includes('math-quiz') ? 3 : 0,
    },
    // Grammar Section
    {
      id: 'parts-of-speech',
      title: 'Parts of Speech',
      description: 'Master Nouns, Verbs, and Adjectives!',
      icon: <BookOpen className="text-white" size={40} />,
      color: 'bg-brand-blue',
      isLocked: false,
      path: '/module/grammar/parts-of-speech',
      stars: completedModules.includes('parts-of-speech') ? 3 : 0,
    },
    {
      id: 'articles',
      title: 'Article Master',
      description: 'Master the usage of A, An, and The.',
      icon: <Type className="text-white" size={40} />,
      color: 'bg-brand-green',
      isLocked: false,
      path: '/module/grammar/articles',
      stars: completedModules.includes('articles') ? 3 : 0,
    },
    {
      id: 'punctuations',
      title: 'Punctuation Lab',
      description: 'Learn commas, periods, and more!',
      icon: <Shield className="text-white" size={40} />,
      color: 'bg-brand-red',
      isLocked: false,
      path: '/module/grammar/punctuations',
      stars: completedModules.includes('punctuations') ? 3 : 0,
    }
  ];

  return (
    <div className="flex-1 flex flex-col p-6 items-center">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center my-8"
      >
        <h1 className="text-5xl md:text-6xl text-brand-purple drop-shadow-md mb-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <div className="flex items-center gap-4">
            <span className="inline-block animate-bounce">👋</span> 
            Hi Vedhanshi!
          </div>
        </h1>
        <p className="text-xl md:text-2xl text-brand-dark/70 font-medium max-w-2xl mx-auto leading-relaxed">
          Welcome to your magic phonics fun! <br className="hidden md:block" />
          Choose a game below to start playing and learning!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl pb-16">
        {modules.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <ModuleCard {...mod} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
