import React from 'react';

/**
 * ゲーム中の操作方法ガイドコンポーネント
 */
const ControlsGuide = ({ translations = {
  title: "操作方法",
  moveLeft: "← : 左に移動",
  moveRight: "→ : 右に移動",
  moveDown: "↓ : 下に移動",
  rotate: "↑ : 回転",
  hardDrop: "スペース : 落下",
  pause: "P : 一時停止/再開"
} }) => {
  return (
    <div className="controls-guide">
      <h3>{translations.title}</h3>
      <ul>
        <li><span className="key">←</span> {translations.moveLeft}</li>
        <li><span className="key">→</span> {translations.moveRight}</li>
        <li><span className="key">↓</span> {translations.moveDown}</li>
        <li><span className="key">↑</span> {translations.rotate}</li>
        <li><span className="key">Space</span> {translations.hardDrop}</li>
        <li><span className="key">P</span> {translations.pause}</li>
      </ul>
    </div>
  );
};

export default ControlsGuide;
