import React from 'react';
import { Link } from 'react-router-dom';
import { levels } from '../../models/levels';

const LevelSelect = () => {
  return (
    <div className="level-select-page">
      <h2 style={{ textAlign: 'center', margin: '2rem 0' }}>レベル選択</h2>
      
      <div className="level-categories">
        <h3>初級レベル：基本的なAWSサービスとセキュリティ概念</h3>
        <div className="level-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', margin: '1rem 0 2rem' }}>
          {levels.filter(level => level.difficulty === 'beginner').map(level => (
            <div key={level.id} className="level-card">
              <h4>{level.title}</h4>
              <p>{level.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span>難易度: {level.difficulty}</span>
                <Link to={`/game/${level.id}`} className="btn">
                  プレイ
                </Link>
              </div>
            </div>
          ))}
        </div>

        <h3>中級レベル：複雑なマルチリージョン構成とディザスタリカバリ</h3>
        <div className="level-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', margin: '1rem 0 2rem' }}>
          {levels.filter(level => level.difficulty === 'intermediate').map(level => (
            <div key={level.id} className="level-card">
              <h4>{level.title}</h4>
              <p>{level.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span>難易度: {level.difficulty}</span>
                <Link to={`/game/${level.id}`} className="btn">
                  プレイ
                </Link>
              </div>
            </div>
          ))}
        </div>

        <h3>上級レベル：ゼロトラストアーキテクチャと高度な暗号化戦略</h3>
        <div className="level-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', margin: '1rem 0' }}>
          {levels.filter(level => level.difficulty === 'advanced').map(level => (
            <div key={level.id} className="level-card">
              <h4>{level.title}</h4>
              <p>{level.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span>難易度: {level.difficulty}</span>
                <Link to={`/game/${level.id}`} className="btn">
                  プレイ
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
