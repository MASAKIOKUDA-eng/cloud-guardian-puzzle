import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>クラウド・ガーディアン：セキュアパズル</h1>
        <nav>
          <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', gap: '20px', marginTop: '10px' }}>
            <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>ホーム</Link></li>
            <li><Link to="/levels" style={{ color: 'white', textDecoration: 'none' }}>レベル選択</Link></li>
            <li><Link to="/tetris" style={{ color: 'white', textDecoration: 'none' }}>テトリスモード</Link></li>
            <li><Link to="/tutorial" style={{ color: 'white', textDecoration: 'none' }}>チュートリアル</Link></li>
            <li><Link to="/leaderboard" style={{ color: 'white', textDecoration: 'none' }}>リーダーボード</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
