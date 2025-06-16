import React, { useEffect } from 'react';

/**
 * 3Dテトリスのゲームコントロールコンポーネント
 */
const GameControls3D = ({ gameEngine, onRestart }) => {
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
          gameEngine.rotateZ();
          break;
        case 'w':
        case 'W':
          gameEngine.moveForward();
          break;
        case 's':
        case 'S':
          gameEngine.moveBackward();
          break;
        case 'q':
        case 'Q':
          gameEngine.rotateX();
          break;
        case 'e':
        case 'E':
          gameEngine.rotateY();
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
    <div className="game-controls-3d">
      <div className="score-display">
        <h3>スコア: {gameEngine.getScore()}</h3>
        <h3>セキュリティレベル: {gameEngine.getSecurityLevel()}</h3>
      </div>
      
      <div className="control-buttons">
        <div className="control-group">
          <h4>移動</h4>
          <div className="button-row">
            <button onClick={() => gameEngine.moveLeft()}>←</button>
            <button onClick={() => gameEngine.moveDown()}>↓</button>
            <button onClick={() => gameEngine.moveRight()}>→</button>
          </div>
          <div className="button-row">
            <button onClick={() => gameEngine.moveForward()}>前(W)</button>
            <button onClick={() => gameEngine.moveBackward()}>後(S)</button>
          </div>
        </div>
        
        <div className="control-group">
          <h4>回転</h4>
          <div className="button-row">
            <button onClick={() => gameEngine.rotateX()}>X軸(Q)</button>
            <button onClick={() => gameEngine.rotateY()}>Y軸(E)</button>
            <button onClick={() => gameEngine.rotateZ()}>Z軸(↑)</button>
          </div>
        </div>
        
        <div className="control-group">
          <h4>アクション</h4>
          <div className="button-row">
            <button onClick={() => gameEngine.hardDrop()}>ドロップ(Space)</button>
            <button onClick={() => gameEngine.togglePause()}>
              {gameEngine.paused ? 'ゲーム再開(P)' : 'ゲーム一時停止(P)'}
            </button>
          </div>
        </div>
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
          <li>W / S : ブロックを前後に移動</li>
          <li>↑ : Z軸周りに回転</li>
          <li>Q : X軸周りに回転</li>
          <li>E : Y軸周りに回転</li>
          <li>スペース : ハードドロップ</li>
          <li>P : 一時停止/再開</li>
        </ul>
      </div>
    </div>
  );
};

export default GameControls3D;
