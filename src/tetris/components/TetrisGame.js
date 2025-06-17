import React, { useState, useEffect, useRef } from 'react';
import GameEngine from '../engine/GameEngine';
import Board from './Board';
import NextBlock from './NextBlock';
import GameControls from './GameControls';
import MobileControls from './MobileControls';
import SecurityRuleDisplay from './SecurityRuleDisplay';
import AnimatedDemo from './AnimatedDemo';
import ControlsGuide from './ControlsGuide';
import { SecurityRules } from '../models/SecurityRules';
import { useLanguage } from '../../i18n/LanguageContext';
import LanguageSelector from '../../components/common/LanguageSelector';

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
  const [currentDemo, setCurrentDemo] = useState('compliance');
  const [isMobile, setIsMobile] = useState(false);
  const { translations } = useLanguage();
  
  // デバイスタイプの検出
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
      setIsMobile(isMobileDevice || hasTouchSupport || window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // デモを定期的に切り替える
  useEffect(() => {
    if (showTutorial) {
      const demoTypes = ['compliance', 'serverless', 'zeroTrust'];
      let demoIndex = 0;
      
      const interval = setInterval(() => {
        demoIndex = (demoIndex + 1) % demoTypes.length;
        setCurrentDemo(demoTypes[demoIndex]);
      }, 5000); // 5秒ごとに切り替え
      
      return () => clearInterval(interval);
    }
  }, [showTutorial]);
  
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
    <div className={`tetris-game ${isMobile ? 'mobile-view' : ''}`}>
      <h1>{translations.gameTitle}</h1>
      <div className="language-container">
        <LanguageSelector />
      </div>
      
      {!gameStarted ? (
        <div className="start-screen">
          <h2>{translations.startScreen.title}</h2>
          <p>
            {translations.startScreen.description}
          </p>
          
          {showTutorial ? (
            <div className="tutorial">
              <h3>{translations.tutorial.title}</h3>
              <div className="tutorial-content">
                <h4>{translations.tutorial.securityRulesTitle}</h4>
                <ul>
                  {SecurityRules.map((rule, index) => (
                    <li key={index}>
                      <strong>
                        {rule.name === "データ暗号化レイヤー" ? translations.securityRules.dataEncryption.name :
                         rule.name === "ゼロトラストセキュリティ" ? translations.securityRules.zeroTrust.name :
                         rule.name === "監査ログ体制" ? translations.securityRules.auditLogs.name :
                         rule.name === "サーバーレスセキュリティ" ? translations.securityRules.serverlessSecurity.name :
                         rule.name === "コンプライアンス対応" ? translations.securityRules.compliance.name :
                         rule.name} ({rule.points}
                        {translations.language === 'ja' ? 'ポイント' : ' points'})
                      </strong>: 
                      {rule.name === "データ暗号化レイヤー" ? translations.securityRules.dataEncryption.description :
                       rule.name === "ゼロトラストセキュリティ" ? translations.securityRules.zeroTrust.description :
                       rule.name === "監査ログ体制" ? translations.securityRules.auditLogs.description :
                       rule.name === "サーバーレスセキュリティ" ? translations.securityRules.serverlessSecurity.description :
                       rule.name === "コンプライアンス対応" ? translations.securityRules.compliance.description :
                       rule.description}
                    </li>
                  ))}
                </ul>
                
                <h4>{translations.tutorial.tipsTitle}</h4>
                <ul>
                  {translations.tutorial.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>

                <h4>{translations.tutorial.placementExamplesTitle}</h4>
                <div className="animated-demos">
                  <AnimatedDemo demoType={currentDemo} />
                </div>
                
                <h4>{translations.tutorial.controlsTitle}</h4>
                <ul>
                  {translations.tutorial.controls.map((control, index) => (
                    <li key={index}>{control}</li>
                  ))}
                </ul>
                
                {isMobile && (
                  <div className="mobile-instructions">
                    <h4>{translations.tutorial.mobileControlsTitle || "モバイル操作方法"}</h4>
                    <ul>
                      <li>{translations.tutorial.mobileSwipe || "スワイプ: 左右移動・下に落とす"}</li>
                      <li>{translations.tutorial.mobileDoubleTap || "ダブルタップ: 回転"}</li>
                      <li>{translations.tutorial.mobileButtons || "画面下部のボタン: 直接操作"}</li>
                    </ul>
                  </div>
                )}
              </div>
              <button onClick={toggleTutorial} onTouchStart={toggleTutorial}>{translations.startScreen.closeTutorialButton}</button>
              <button onClick={startGame} onTouchStart={startGame} className="start-button">{translations.startScreen.startButton}</button>
            </div>
          ) : (
            <div className="buttons">
              <button onClick={toggleTutorial} onTouchStart={toggleTutorial}>{translations.startScreen.tutorialButton}</button>
              <button onClick={startGame} onTouchStart={startGame} className="start-button">{translations.startScreen.startButton}</button>
            </div>
          )}
        </div>
      ) : (
        <div className="game-container">
          <div className={`game-area ${isMobile ? 'mobile-game-area' : ''}`}>
            <div className="main-board">
              <Board gameEngine={gameEngine} />
            </div>
            
            <div className="side-panel">
              <NextBlock gameEngine={gameEngine} title={translations.gameUI.nextBlock} />
              <div className="stats">
                <h3>{translations.gameUI.score}: {score}</h3>
                <h3>{translations.gameUI.securityLevel}: {securityLevel}</h3>
              </div>
              {!isMobile && (
                <ControlsGuide 
                  translations={{
                    title: translations.tutorial.controlsTitle,
                    moveLeft: translations.language === 'ja' ? "← : 左に移動" : "← : Move left",
                    moveRight: translations.language === 'ja' ? "→ : 右に移動" : "→ : Move right",
                    moveDown: translations.language === 'ja' ? "↓ : 下に移動" : "↓ : Move down",
                    rotate: translations.language === 'ja' ? "↑ : 回転" : "↑ : Rotate",
                    hardDrop: translations.language === 'ja' ? "スペース : 落下" : "Space : Hard drop",
                    pause: translations.language === 'ja' ? "P : 一時停止/再開" : "P : Pause/Resume"
                  }}
                />
              )}
              <GameControls 
                gameEngine={gameEngine} 
                onRestart={restartGame} 
                translations={{
                  pause: translations.gameUI.pause,
                  resume: translations.gameUI.resume,
                  restart: translations.gameUI.restart
                }}
              />
            </div>
          </div>
          
          <SecurityRuleDisplay 
            matchedRules={matchedRules} 
            title={translations.gameUI.matchedRules}
          />
          
          {isMobile && gameStarted && (
            <MobileControls gameEngine={gameEngine} />
          )}
        </div>
      )}
    </div>
  );
};

export default TetrisGame;
