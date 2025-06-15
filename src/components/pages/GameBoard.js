import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { levels } from '../../models/levels';
import ResourceItem from '../game/ResourceItem';
import GameGrid from '../game/GameGrid';
import MissionBriefing from '../game/MissionBriefing';
import GameControls from '../game/GameControls';

const GameBoard = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [level, setLevel] = useState(null);
  const [placedResources, setPlacedResources] = useState([]);
  const [availableResources, setAvailableResources] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, success, failure
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(300); // 5分のタイマー

  // レベルデータの読み込み
  useEffect(() => {
    const currentLevel = levels.find(l => l.id === levelId);
    if (currentLevel) {
      setLevel(currentLevel);
      setAvailableResources([...currentLevel.resources]);
    } else {
      navigate('/levels');
    }
  }, [levelId, navigate]);

  // タイマーの設定
  useEffect(() => {
    if (gameStatus !== 'playing') return;
    
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setGameStatus('failure');
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameStatus]);

  // リソースの配置
  const handlePlaceResource = (resourceId, gridPosition) => {
    const resource = availableResources.find(r => r.id === resourceId);
    if (!resource) return;
    
    setAvailableResources(prev => prev.filter(r => r.id !== resourceId));
    setPlacedResources(prev => [...prev, { ...resource, position: gridPosition }]);
    
    // スコア計算とフィードバック
    calculateScore();
  };

  // リソースの削除
  const handleRemoveResource = (resourceId) => {
    const resource = placedResources.find(r => r.id === resourceId);
    if (!resource) return;
    
    setPlacedResources(prev => prev.filter(r => r.id !== resourceId));
    setAvailableResources(prev => [...prev, { ...resource, position: null }]);
    
    // スコア再計算
    calculateScore();
  };

  // スコア計算
  const calculateScore = () => {
    // 実際のゲームロジックに応じてスコア計算を実装
    // 例: 正しい位置に配置されたリソースの数に基づくスコア
    let newScore = 0;
    
    // 仮のスコア計算ロジック
    placedResources.forEach(resource => {
      // 正しい配置の場合はスコア加算
      newScore += 10;
    });
    
    setScore(newScore);
    
    // 勝利条件のチェック
    if (level && placedResources.length === level.resources.length) {
      // 全てのリソースが配置され、スコアが一定以上なら成功
      if (newScore >= level.resources.length * 8) {
        setGameStatus('success');
        setFeedback('ミッション成功！セキュアなアーキテクチャを構築できました。');
      }
    }
  };

  // ゲームのリセット
  const handleReset = () => {
    if (level) {
      setAvailableResources([...level.resources]);
      setPlacedResources([]);
      setScore(0);
      setGameStatus('playing');
      setFeedback(null);
      setTimer(300);
    }
  };

  // ヒントの表示
  const handleShowHint = () => {
    // レベルに応じたヒントを表示
    if (level) {
      setFeedback(`ヒント: ${level.objectives[0]}`);
      // ヒント使用によるペナルティ
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  if (!level) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-board">
      <h2 style={{ textAlign: 'center', margin: '1rem 0' }}>{level.title}</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
        <div>
          <strong>難易度:</strong> {level.difficulty}
        </div>
        <div>
          <strong>スコア:</strong> {score}
        </div>
        <div>
          <strong>残り時間:</strong> {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
        </div>
      </div>
      
      <MissionBriefing 
        description={level.description} 
        objectives={level.objectives}
      />
      
      <div className="game-container">
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <h3>利用可能なリソース</h3>
          <div className="resource-palette" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '1rem 0' }}>
            {availableResources.map(resource => (
              <ResourceItem 
                key={resource.id}
                resource={resource}
                onDragStart={() => {}} // ドラッグ開始ハンドラ
              />
            ))}
          </div>
          
          <h3>アーキテクチャ設計エリア</h3>
          <GameGrid 
            placedResources={placedResources}
            onPlaceResource={handlePlaceResource}
            onRemoveResource={handleRemoveResource}
          />
          
          {feedback && (
            <div className="feedback" style={{ 
              margin: '1rem 0', 
              padding: '1rem', 
              backgroundColor: gameStatus === 'success' ? '#d4edda' : gameStatus === 'failure' ? '#f8d7da' : '#fff3cd',
              borderRadius: '4px'
            }}>
              {feedback}
            </div>
          )}
          
          <GameControls 
            onReset={handleReset}
            onShowHint={handleShowHint}
            onSubmit={calculateScore}
            gameStatus={gameStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
