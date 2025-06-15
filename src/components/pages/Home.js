import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero" style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h2>政府機関のクラウドセキュリティを守れ！</h2>
        <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
          AWS GovCloudの仮想環境内でセキュリティパズルを解きながら、
          国家の重要インフラを守るミッションに挑戦しましょう。
        </p>
        <Link to="/levels" className="btn" style={{ marginTop: '1rem' }}>
          ゲームを始める
        </Link>
      </section>

      <section className="features" style={{ margin: '2rem 0', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div className="feature-card" style={{ flex: '1 1 300px', margin: '1rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3>リソース配置パズル</h3>
          <p>AWS GovCloudのリソースを適切に配置して、セキュアなアーキテクチャを構築しましょう。</p>
        </div>
        <div className="feature-card" style={{ flex: '1 1 300px', margin: '1rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3>セキュリティチャレンジ</h3>
          <p>仮想的なサイバー攻撃に対して防御策を講じるパズルに挑戦しましょう。</p>
        </div>
        <div className="feature-card" style={{ flex: '1 1 300px', margin: '1rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3>コンプライアンスクエスト</h3>
          <p>政府規制に準拠したアーキテクチャを構築するミッションをクリアしましょう。</p>
        </div>
      </section>

      <section className="cta" style={{ textAlign: 'center', margin: '3rem 0' }}>
        <h2>あなたはクラウドを守れるか？</h2>
        <p>デジタル防衛局の新人クラウドアーキテクトとして、国家の重要インフラを守りましょう。</p>
        <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/tutorial" className="btn" style={{ backgroundColor: '#232f3e' }}>
            チュートリアルを見る
          </Link>
          <Link to="/levels" className="btn">
            レベル選択へ
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
