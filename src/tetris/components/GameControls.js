import React, { useEffect } from 'react';

/**
 * ゲームコントロールコンポーネント
 */
const GameControls = ({ gameEngine, onRestart }) => {
  // キーボード入力の処理
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          gameEngine.moveLeft();
          break;
        case 'ArrowRight':
          gameEngine.moveRight();
          break;
        case 'ArrowDown':
          gameEngine.moveDown();
          break;
        case 'ArrowUp':
          gameEngine.rotate();
          break;
        case ' ':
          gameEngine.hardDrop();
          break;
        case 'p':
        case 'P':
          gameEngine.togglePause();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameEngine]);
  
  return (
    <div className="game-controls">
      <div className="score-display">
        <h3>スコア: {gameEngine.getScore()}</h3>
        <h3>セキュリティレベル: {gameEngine.getSecurityLevel()}</h3>
      </div>
      
      <div className="control-buttons">
        <button onClick={() => gameEngine.moveLeft()}>←</button>
        <button onClick={() => gameEngine.moveDown()}>↓</button>
        <button onClick={() => gameEngine.moveRight()}>→</button>
        <button onClick={() => gameEngine.rotate()}>回転</button>
        <button onClick={() => gameEngine.hardDrop()}>ドロップ</button>
        <button onClick={() => gameEngine.togglePause()}>
          {gameEngine.paused ? 'ゲーム再開' : 'ゲーム一時停止'}
        </button>
      </div>
      
      {gameEngine.isGameOver() && (
        <div className="game-over">
          <h2>ゲームオーバー</h2>
          <p>最終スコア: {gameEngine.getScore()}</p>
          <p>セキュリティレベル: {gameEngine.getSecurityLevel()}</p>
          <button onClick={onRestart}>再スタート</button>
        </div>
      )}
      
      <div className="instructions">
        <h3>操作方法</h3>
        <ul>
          <li>← → : ブロックを左右に移動</li>
          <li>↓ : ブロックを下に移動</li>
          <li>↑ : ブロックを回転</li>
          <li>スペース : ハードドロップ</li>
          <li>P : 一時停止/再開</li>
        </ul>
      </div>
    </div>
  );
};

export default GameControls;
