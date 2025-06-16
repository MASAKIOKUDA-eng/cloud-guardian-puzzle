import React, { useState, useEffect, useRef } from 'react';
import GameEngine from '../engine/GameEngine';
import Board from './Board';
import NextBlock from './NextBlock';
import GameControls from './GameControls';
import SecurityRuleDisplay from './SecurityRuleDisplay';

/**
 * テトリスゲームのメインコンポーネント
 */
const TetrisGame = () => {
  const [gameEngine] = useState(() => new GameEngine());
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
    <div className="tetris-game">
      <h1>クラウド・ガーディアン：テトリスエディション</h1>
      
      {!gameStarted ? (
        <div className="start-screen">
          <h2>AWS GovCloudセキュリティテトリス</h2>
          <p>
            AWSサービスブロックを適切に配置して、セキュアなクラウドアーキテクチャを構築しましょう。
            セキュリティルールを満たすと高得点を獲得できます！
          </p>
          <button onClick={startGame}>ゲームスタート</button>
        </div>
      ) : (
        <div className="game-container">
          <div className="game-area">
            <div className="main-board">
              <Board gameEngine={gameEngine} />
            </div>
            
            <div className="side-panel">
              <NextBlock gameEngine={gameEngine} />
              <GameControls gameEngine={gameEngine} onRestart={restartGame} />
              <div className="stats">
                <h3>スコア: {score}</h3>
                <h3>セキュリティレベル: {securityLevel}</h3>
              </div>
            </div>
          </div>
          
          <SecurityRuleDisplay matchedRules={matchedRules} />
        </div>
      )}
    </div>
  );
};

export default TetrisGame;
