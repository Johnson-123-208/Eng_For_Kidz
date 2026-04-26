import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { AlphabetModule } from './pages/AlphabetModule';
import { HearAndTypeModule } from './pages/HearAndTypeModule';
import { SpellBuilderModule } from './pages/SpellBuilderModule';
import { PhonicsModule } from './pages/PhonicsModule';
import { ChallengeModule } from './pages/ChallengeModule';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-brand-blue/5 font-sans flex flex-col relative overflow-hidden">
      {/* Decorative background bubbles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-brand-yellow/20 rounded-full blur-xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-brand-green/20 rounded-full blur-2xl -z-10"></div>
      
      <Header />
      <Outlet />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="module/alphabets" element={<AlphabetModule />} />
          <Route path="module/hear-type" element={<HearAndTypeModule />} />
          <Route path="module/spell-builder" element={<SpellBuilderModule />} />
          <Route path="module/phonics" element={<PhonicsModule />} />
          <Route path="module/challenge" element={<ChallengeModule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
