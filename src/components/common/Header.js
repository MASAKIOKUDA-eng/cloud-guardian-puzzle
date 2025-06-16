import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>クラウド・ガーディアン：3Dテトリス</h1>
        <nav>
          <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', gap: '20px', marginTop: '10px' }}>
            <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>ゲーム</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
