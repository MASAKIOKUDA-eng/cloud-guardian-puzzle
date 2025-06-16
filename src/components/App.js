import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/Footer';
import TetrisGame from './pages/TetrisGame';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<TetrisGame />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
