import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ModuleCard } from '../components/ModuleCard';
import { useStore } from '../store/useStore';
import { BookOpen, Headphones, Type, Shield, Trophy, Calculator, TableProperties, MapPin } from 'lucide-react';

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
    },
    {
      id: 'prepositions',
      title: 'Prepositions',
      description: 'Learn In, On, Under, Beside!',
      icon: <MapPin className="text-white" size={40} />,
      color: 'bg-brand-yellow',
      isLocked: false,
      path: '/module/grammar/prepositions',
      stars: completedModules.includes('prepositions') ? 3 : 0,
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center bg-pattern">
      
      {/* Premium Hero Section */}
      <section className="w-full max-w-7xl px-6 pt-12 pb-16 text-center relative overflow-hidden">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10"
        >
          <div className="inline-block glass px-6 py-2 rounded-full text-brand-blue font-bold tracking-[0.2em] uppercase text-xs mb-6 shadow-lg">
             ✨ Let's Learn & Play
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-black text-brand-dark mb-6 leading-tight">
            Hi Vedhanshi!<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
              Choose Your Adventure
            </span>
          </h1>

          <p className="text-lg md:text-xl text-brand-dark/60 font-medium max-w-2xl mx-auto leading-relaxed">
            Welcome to your magical world of learning. <br className="hidden md:block" />
            Pick a game below and let the fun begin! 🎈
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-6 pb-24">
        {modules.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <ModuleCard {...mod} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
