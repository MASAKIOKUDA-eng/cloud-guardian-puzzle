import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>クラウド・ガーディアン：セキュアパズル</h1>
        <p>AWS GovCloudのセキュリティとコンプライアンスをテーマにしたパズルゲーム</p>
        
        <div className="game-modes">
          <div className="game-mode">
            <h2>クラシックモード</h2>
            <p>AWS GovCloudのリソースを適切に配置して、セキュアなアーキテクチャを構築するパズルに挑戦しましょう。</p>
            <Link to="/levels" className="btn">レベル選択</Link>
          </div>
          
          <div className="game-mode">
            <h2>テトリスモード</h2>
            <p>AWSサービスブロックを適切に配置して、セキュリティルールを満たすテトリス形式のゲームに挑戦しましょう。</p>
            <Link to="/tetris" className="btn">テトリスモードで遊ぶ</Link>
          </div>
        </div>
        
        <div className="features">
          <h2>ゲームの特徴</h2>
          <ul>
            <li>リソース配置パズル: AWS GovCloudのリソースを適切に配置して、セキュアなアーキテクチャを構築</li>
            <li>セキュリティチャレンジ: 仮想的なサイバー攻撃に対して防御策を講じるパズル</li>
            <li>コンプライアンスクエスト: FedRAMP、FISMA、HIPAA等の政府規制に準拠したアーキテクチャを構築するミッション</li>
            <li>インシデントレスポンス: タイムプレッシャーの中でセキュリティインシデントを解決するタイムアタックパズル</li>
          </ul>
        </div>
        
        <div className="difficulty-levels">
          <h2>難易度レベル</h2>
          <ul>
            <li>初級: 基本的なAWSサービスとセキュリティ概念</li>
            <li>中級: 複雑なマルチリージョン構成とディザスタリカバリ</li>
            <li>上級: ゼロトラストアーキテクチャと高度な暗号化戦略</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
