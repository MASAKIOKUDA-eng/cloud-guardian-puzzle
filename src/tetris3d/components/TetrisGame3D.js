import React, { useState, useEffect } from 'react';
import GameEngine3D from '../engine/GameEngine3D';
import Board3D from './Board3D';
import NextBlock3D from './NextBlock3D';
import GameControls3D from './GameControls3D';
import SecurityRuleDisplay3D from './SecurityRuleDisplay3D';

/**
 * 3Dテトリスゲームのメインコンポーネント
 */
const TetrisGame3D = () => {
  const [gameEngine] = useState(() => new GameEngine3D());
  const [score, setScore] = useState(0);
  const [securityLevel, setSecurityLevel] = useState(0);
  const [matchedRules, setMatchedRules] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  
  // ゲームエンジンのイベントハンドラを設定
  useEffect(() => {
    gameEngine.onScoreChange = (newScore) => {
      setScore(newScore);
    };
    
    gameEngine.onSecurityLevelChange = (newLevel) => {
      setSecurityLevel(newLevel);
    };
    
    gameEngine.onRuleMatch = (rules) => {
      setMatchedRules(rules);
    };
    
    gameEngine.onGameOver = (finalScore, finalLevel) => {
      console.log(`Game Over! Score: ${finalScore}, Security Level: ${finalLevel}`);
    };
    
    return () => {
      // クリーンアップ
      gameEngine.onScoreChange = null;
      gameEngine.onSecurityLevelChange = null;
      gameEngine.onRuleMatch = null;
      gameEngine.onGameOver = null;
    };
  }, [gameEngine]);
  
  // ゲームの開始
  const startGame = () => {
    gameEngine.init();
    setScore(0);
    setSecurityLevel(0);
    setMatchedRules([]);
    setGameStarted(true);
  };
  
  // ゲームの再スタート
  const restartGame = () => {
    startGame();
  };
  
  return (
    <div className="tetris-game-3d">
      <h1>クラウド・ガーディアン：3Dテトリス</h1>
      
      {!gameStarted ? (
        <div className="start-screen">
          <h2>AWS GovCloud 3Dセキュリティテトリス</h2>
          <p>
            AWSサービスブロックを適切に配置して、セキュアなクラウドアーキテクチャを構築しましょう。
            セキュリティルールを満たすと高得点を獲得できます！
          </p>
          <p>
            3D空間でブロックを操作し、より複雑なアーキテクチャを構築できます。
            マウスでビューを回転させて、様々な角度から確認できます。
          </p>
          <button onClick={startGame}>ゲームスタート</button>
        </div>
      ) : (
        <div className="game-container-3d">
          <div className="game-area-3d">
            <div className="main-board-3d">
              <Board3D gameEngine={gameEngine} />
            </div>
            
            <div className="side-panel-3d">
              <NextBlock3D gameEngine={gameEngine} />
              <GameControls3D gameEngine={gameEngine} onRestart={restartGame} />
              <div className="stats-3d">
                <h3>スコア: {score}</h3>
                <h3>セキュリティレベル: {securityLevel}</h3>
              </div>
            </div>
          </div>
          
          <SecurityRuleDisplay3D matchedRules={matchedRules} />
        </div>
      )}
    </div>
  );
};

export default TetrisGame3D;
