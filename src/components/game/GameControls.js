import React from 'react';
import { Link } from 'react-router-dom';

const GameControls = ({ onReset, onShowHint, onSubmit, gameStatus }) => {
  return (
    <div className="game-controls" style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      margin: '1rem 0',
      padding: '1rem',
      backgroundColor: '#f8f8f8',
      borderRadius: '8px'
    }}>
      <div>
        <button 
          className="btn" 
          style={{ 
            backgroundColor: '#6c757d',
            marginRight: '10px'
          }}
          onClick={onReset}
        >
          リセット
        </button>
        
        <button 
          className="btn" 
          style={{ 
            backgroundColor: '#ffc107',
            color: '#212529',
            marginRight: '10px'
          }}
          onClick={onShowHint}
        >
          ヒント
        </button>
      </div>
      
      <div>
        {gameStatus === 'playing' ? (
          <button 
            className="btn" 
            style={{ backgroundColor: '#28a745' }}
            onClick={onSubmit}
          >
            解答を確認
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link 
              to="/levels" 
              className="btn" 
              style={{ backgroundColor: '#17a2b8' }}
            >
              レベル選択に戻る
            </Link>
            
            {gameStatus === 'success' && (
              <Link 
                to={`/leaderboard`} 
                className="btn" 
                style={{ backgroundColor: '#28a745' }}
              >
                リーダーボードを見る
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameControls;
