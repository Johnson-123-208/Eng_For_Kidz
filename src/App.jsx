import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { AlphabetModule } from './pages/AlphabetModule';
import { HearAndTypeModule } from './pages/HearAndTypeModule';
import { SpellBuilderModule } from './pages/SpellBuilderModule';
import { PhonicsModule } from './pages/PhonicsModule';
import { ChallengeModule } from './pages/ChallengeModule';
import { StatsPage } from './pages/StatsPage';
import { MathTablesModule } from './pages/MathTablesModule';
import { MathQuizModule } from './pages/MathQuizModule';
import { GrammarModule } from './pages/GrammarModule';

const AppLayout = () => {
  return (
    <div className="min-h-screen font-sans flex flex-col relative overflow-hidden">
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
          <Route path="module/math-tables" element={<MathTablesModule />} />
          <Route path="module/math-quiz" element={<MathQuizModule />} />
          <Route path="module/grammar/:moduleId" element={<GrammarModule />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
