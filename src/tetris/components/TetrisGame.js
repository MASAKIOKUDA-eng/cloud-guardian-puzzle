import React, { useState, useEffect, useRef } from 'react';
import GameEngine from '../engine/GameEngine';
import Board from './Board';
import NextBlock from './NextBlock';
import GameControls from './GameControls';
import SecurityRuleDisplay from './SecurityRuleDisplay';
import { SecurityRules } from '../models/SecurityRules';

/**
 * テトリスゲームのメインコンポーネント
 */
const TetrisGame = () => {
  const [gameEngine] = useState(() => new GameEngine());
  const [score, setScore] = useState(0);
  const [securityLevel, setSecurityLevel] = useState(0);
  const [matchedRules, setMatchedRules] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
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
    setShowTutorial(false);
  };
  
  // ゲームの再スタート
  const restartGame = () => {
    startGame();
  };

  // チュートリアルの表示
  const toggleTutorial = () => {
    setShowTutorial(!showTutorial);
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
          
          {showTutorial ? (
            <div className="tutorial">
              <h3>チュートリアル：高得点の獲得方法</h3>
              <div className="tutorial-content">
                <h4>セキュリティルール一覧</h4>
                <ul>
                  {SecurityRules.map((rule, index) => (
                    <li key={index}>
                      <strong>{rule.name} ({rule.points}ポイント)</strong>: {rule.description}
                    </li>
                  ))}
                </ul>
                
                <h4>高得点を獲得するコツ</h4>
                <ul>
                  <li>同じ行に特定のAWSサービスを配置することでセキュリティルールを達成できます</li>
                  <li>「コンプライアンス対応」ルールが最も高得点（1500ポイント）です</li>
                  <li>例：KMS、CloudTrail、IAMブロックを同じ行に配置すると1500ポイント獲得！</li>
                  <li>複数行を同時に消すと、基本点数に加えてボーナスポイントが加算されます</li>
                  <li>セキュリティレベルが上がると、ゲームの難易度も上がります</li>
                </ul>

                <h4>高得点配置例</h4>
                <div className="placement-examples">
                  <div className="example">
                    <h5>コンプライアンス対応 (1500ポイント)</h5>
                    <div className="example-grid">
                      <div className="example-block kms">KMS</div>
                      <div className="example-block cloudtrail">CloudTrail</div>
                      <div className="example-block iam">IAM</div>
                      <div className="example-block empty"></div>
                    </div>
                    <p>同じ行にKMS、CloudTrail、IAMを配置</p>
                  </div>

                  <div className="example">
                    <h5>サーバーレスセキュリティ (1200ポイント)</h5>
                    <div className="example-grid">
                      <div className="example-block lambda">Lambda</div>
                      <div className="example-block iam">IAM</div>
                      <div className="example-block cloudtrail">CloudTrail</div>
                      <div className="example-block empty"></div>
                    </div>
                    <p>同じ行にLambda、IAM、CloudTrailを配置</p>
                  </div>

                  <div className="example">
                    <h5>ゼロトラストセキュリティ (1000ポイント)</h5>
                    <div className="example-grid">
                      <div className="example-block iam">IAM</div>
                      <div className="example-block vpc">VPC</div>
                      <div className="example-block ec2">EC2</div>
                      <div className="example-block empty"></div>
                    </div>
                    <p>同じ行にIAM、VPC、EC2を配置</p>
                  </div>
                </div>
                
                <h4>操作方法</h4>
                <ul>
                  <li><strong>← →</strong>: ブロックを左右に移動</li>
                  <li><strong>↓</strong>: ブロックを下に移動</li>
                  <li><strong>↑</strong>: ブロックを回転</li>
                  <li><strong>スペース</strong>: ハードドロップ（一番下まで落とす）</li>
                  <li><strong>P</strong>: 一時停止/再開</li>
                </ul>
              </div>
              <button onClick={toggleTutorial}>チュートリアルを閉じる</button>
              <button onClick={startGame} className="start-button">ゲームスタート</button>
            </div>
          ) : (
            <div className="buttons">
              <button onClick={toggleTutorial}>チュートリアルを見る</button>
              <button onClick={startGame} className="start-button">ゲームスタート</button>
            </div>
          )}
        </div>
      ) : (
        <div className="game-container">
          <div className="game-area">
            <div className="main-board">
              <Board gameEngine={gameEngine} />
            </div>
            
            <div className="side-panel">
              <NextBlock gameEngine={gameEngine} />
              <div className="stats">
                <h3>スコア: {score}</h3>
                <h3>セキュリティレベル: {securityLevel}</h3>
              </div>
              <GameControls gameEngine={gameEngine} onRestart={restartGame} />
            </div>
          </div>
          
          <SecurityRuleDisplay matchedRules={matchedRules} />
        </div>
      )}
    </div>
  );
};

export default TetrisGame;
