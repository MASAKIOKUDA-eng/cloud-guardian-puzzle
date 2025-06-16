import React from 'react';
import TetrisGame3D from '../../tetris3d/components/TetrisGame3D';

/**
 * テトリスゲームページコンポーネント
 */
const TetrisGamePage = () => {
  return (
    <div className="tetris-game-page">
      <TetrisGame3D />
    </div>
  );
};

export default TetrisGamePage;
