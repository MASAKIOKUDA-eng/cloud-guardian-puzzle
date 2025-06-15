import React, { useState } from 'react';

// 仮のリーダーボードデータ
const mockLeaderboardData = {
  beginner: [
    { rank: 1, name: 'CloudMaster', level: 'セキュアVPC構築', score: 950, time: '2:45' },
    { rank: 2, name: 'SecureArchitect', level: 'セキュアVPC構築', score: 920, time: '3:10' },
    { rank: 3, name: 'GovCloudPro', level: 'セキュアVPC構築', score: 890, time: '2:55' },
    { rank: 4, name: 'CyberDefender', level: 'IAMポリシーパズル', score: 880, time: '3:30' },
    { rank: 5, name: 'CloudGuardian', level: 'データ暗号化チャレンジ', score: 870, time: '4:15' },
  ],
  intermediate: [
    { rank: 1, name: 'SecurityWizard', level: 'マルチリージョンディザスタリカバリ', score: 920, time: '4:20' },
    { rank: 2, name: 'ComplianceExpert', level: 'コンプライアンスフレームワーク構築', score: 900, time: '4:45' },
    { rank: 3, name: 'CloudArchitect', level: 'マルチリージョンディザスタリカバリ', score: 880, time: '5:10' },
    { rank: 4, name: 'GovSecOps', level: 'コンプライアンスフレームワーク構築', score: 860, time: '4:30' },
    { rank: 5, name: 'FedRAMPMaster', level: 'コンプライアンスフレームワーク構築', score: 840, time: '5:25' },
  ],
  advanced: [
    { rank: 1, name: 'ZeroTrustGuru', level: 'ゼロトラストアーキテクチャ', score: 950, time: '6:15' },
    { rank: 2, name: 'CryptoMaster', level: '高度な暗号化戦略', score: 930, time: '6:30' },
    { rank: 3, name: 'SecureCloud', level: 'ゼロトラストアーキテクチャ', score: 910, time: '6:45' },
    { rank: 4, name: 'HSMWizard', level: '高度な暗号化戦略', score: 890, time: '7:10' },
    { rank: 5, name: 'CloudDefender', level: 'ゼロトラストアーキテクチャ', score: 870, time: '6:55' },
  ]
};

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('beginner');
  
  const renderLeaderboardTable = (data) => {
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#232f3e', color: 'white' }}>
            <th style={{ padding: '10px', textAlign: 'center' }}>順位</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>プレイヤー名</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>クリアレベル</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>スコア</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>クリア時間</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr 
              key={index}
              style={{ 
                backgroundColor: index % 2 === 0 ? '#f8f8f8' : 'white',
                borderBottom: '1px solid #e0e0e0'
              }}
            >
              <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
              </td>
              <td style={{ padding: '10px' }}>{entry.name}</td>
              <td style={{ padding: '10px' }}>{entry.level}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{entry.score}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{entry.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  return (
    <div className="leaderboard-page">
      <h2 style={{ textAlign: 'center', margin: '2rem 0' }}>リーダーボード</h2>
      
      <div className="leaderboard-tabs" style={{ 
        display: 'flex', 
        justifyContent: 'center',
        margin: '2rem 0'
      }}>
        <button 
          className={`tab-button ${activeTab === 'beginner' ? 'active' : ''}`}
          style={{ 
            padding: '10px 20px',
            border: 'none',
            backgroundColor: activeTab === 'beginner' ? '#ff9900' : '#e0e0e0',
            color: activeTab === 'beginner' ? 'white' : '#333',
            borderRadius: '4px 0 0 4px',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('beginner')}
        >
          初級レベル
        </button>
        <button 
          className={`tab-button ${activeTab === 'intermediate' ? 'active' : ''}`}
          style={{ 
            padding: '10px 20px',
            border: 'none',
            backgroundColor: activeTab === 'intermediate' ? '#ff9900' : '#e0e0e0',
            color: activeTab === 'intermediate' ? 'white' : '#333',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('intermediate')}
        >
          中級レベル
        </button>
        <button 
          className={`tab-button ${activeTab === 'advanced' ? 'active' : ''}`}
          style={{ 
            padding: '10px 20px',
            border: 'none',
            backgroundColor: activeTab === 'advanced' ? '#ff9900' : '#e0e0e0',
            color: activeTab === 'advanced' ? 'white' : '#333',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('advanced')}
        >
          上級レベル
        </button>
      </div>
      
      <div className="leaderboard-container" style={{ 
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '2rem',
        overflowX: 'auto'
      }}>
        <h3>{activeTab === 'beginner' ? '初級レベル' : activeTab === 'intermediate' ? '中級レベル' : '上級レベル'} トップスコア</h3>
        {renderLeaderboardTable(mockLeaderboardData[activeTab])}
        
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p>あなたもチャレンジして、リーダーボードに名前を残そう！</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
