import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/Footer';
import Home from './pages/Home';
import LevelSelect from './pages/LevelSelect';
import GameBoard from './pages/GameBoard';
import Tutorial from './pages/Tutorial';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/levels" element={<LevelSelect />} />
          <Route path="/game/:levelId" element={<GameBoard />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
