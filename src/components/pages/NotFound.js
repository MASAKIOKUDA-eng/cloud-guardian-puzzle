import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page" style={{ 
      textAlign: 'center',
      padding: '3rem 0'
    }}>
      <div style={{ fontSize: '72px', marginBottom: '1rem' }}>
        🔍
      </div>
      <h2>404 - ページが見つかりません</h2>
      <p style={{ margin: '1rem 0' }}>
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <Link to="/" className="btn" style={{ marginTop: '1rem' }}>
        ホームに戻る
      </Link>
    </div>
  );
};

export default NotFound;
