import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ModuleCard } from '../components/ModuleCard';
import { useStore } from '../store/useStore';
import { BookOpen, Headphones, Type, Shield, Trophy } from 'lucide-react';

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
      isLocked: xp < 100 && !completedModules.includes('alphabets'), // unlock condition example
      path: '/module/hear-type',
      stars: completedModules.includes('hear-type') ? 3 : 0,
    },
    {
      id: 'spell-builder',
      title: 'Spell Builder',
      description: 'Drag and drop letters to win!',
      icon: <Type className="text-white" size={40} />,
      color: 'bg-brand-green',
      isLocked: xp < 200,
      path: '/module/spell-builder',
      stars: completedModules.includes('spell-builder') ? 3 : 0,
    },
    {
      id: 'challenge',
      title: 'Master Challenge',
      description: 'Test your skills in a timed quiz.',
      icon: <Shield className="text-white" size={40} />,
      color: 'bg-brand-yellow',
      isLocked: xp < 300,
      path: '/module/challenge',
      stars: completedModules.includes('challenge') ? 3 : 0,
    }
  ];

  return (
    <div className="flex-1 flex flex-col p-6 items-center">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center my-8"
      >
        <h1 className="text-5xl md:text-6xl text-brand-purple drop-shadow-md mb-4 flex items-center justify-center gap-4">
          <span className="inline-block animate-bounce">👋</span> 
          Welcome to Phonics Fun!
        </h1>
        <p className="text-xl md:text-2xl text-brand-dark/70 font-medium">
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
