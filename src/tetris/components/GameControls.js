import React, { useState } from 'react';

/**
 * ゲームコントロールコンポーネント
 */
const GameControls = ({ gameEngine, onRestart, translations = {
  pause: "一時停止",
  resume: "再開",
  restart: "再スタート"
} }) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // 一時停止/再開
  const togglePause = () => {
    if (isPaused) {
      gameEngine.resume();
    } else {
      gameEngine.pause();
    }
    setIsPaused(!isPaused);
  };
  
  // 再スタート
  const restart = () => {
    setIsPaused(false);
    onRestart();
  };
  
  return (
    <div className="game-controls">
      <h3>Controls</h3>
      <button onClick={togglePause}>
        {isPaused ? translations.resume : translations.pause}
      </button>
      <button onClick={restart}>
        {translations.restart}
      </button>
    </div>
  );
};

export default GameControls;
