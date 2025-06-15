import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} クラウド・ガーディアン：セキュアパズル</p>
        <p>AWS GovCloudのセキュリティとコンプライアンスをテーマにしたパズルゲーム</p>
      </div>
    </footer>
  );
};

export default Footer;
