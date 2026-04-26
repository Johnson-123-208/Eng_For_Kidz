import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      stars: 0,
      streak: 0,
      lastLoginDate: null,
      completedModules: [],
      gameHistory: [], // Stores { moduleName, score, total, timeInSeconds, timestamp }
      
      addGameResult: (result) => set((state) => ({
        gameHistory: [
          { ...result, timestamp: new Date().toISOString() },
          ...state.gameHistory.slice(0, 49) // Keep last 50 results
        ]
      })),
      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        const newLevel = Math.floor(newXp / 100) + 1;
        return { xp: newXp, level: newLevel };
      }),
      
      addStars: (amount) => set((state) => ({ stars: state.stars + amount })),
      
      markModuleComplete: (moduleId) => set((state) => {
        if (!state.completedModules.includes(moduleId)) {
          return { completedModules: [...state.completedModules, moduleId] };
        }
        return state;
      }),
      
      updateLoginStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        if (state.lastLoginDate === today) return state;
        
        let newStreak = state.streak;
        if (state.lastLoginDate) {
          const lastDate = new Date(state.lastLoginDate);
          const currentDate = new Date(today);
          const diffTime = Math.abs(currentDate - lastDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }
        
        return { streak: newStreak, lastLoginDate: today };
      }),
    }),
    {
      name: 'phonics-fun-storage',
    }
  )
);
