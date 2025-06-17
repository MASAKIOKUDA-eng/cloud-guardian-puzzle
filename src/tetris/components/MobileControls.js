import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * モバイル向けのゲームコントロールコンポーネント
 */
const MobileControls = ({ gameEngine }) => {
  const { translations } = useLanguage();
  
  // タッチイベントのデフォルト動作を防止する関数
  const preventDefaultAndExecute = (callback) => (e) => {
    e.preventDefault();
    callback();
  };
  
  const handleLeftClick = preventDefaultAndExecute(() => {
    gameEngine.moveLeft();
  });
  
  const handleRightClick = preventDefaultAndExecute(() => {
    gameEngine.moveRight();
  });
  
  const handleDownClick = preventDefaultAndExecute(() => {
    gameEngine.moveDown();
  });
  
  const handleRotateClick = preventDefaultAndExecute(() => {
    gameEngine.rotate();
  });
  
  const handleDropClick = preventDefaultAndExecute(() => {
    gameEngine.hardDrop();
  });
  
  return (
    <div className="mobile-controls-buttons">
      <div className="mobile-controls-row">
        <button 
          className="mobile-control-button rotate-button" 
          onClick={handleRotateClick}
          onTouchStart={handleRotateClick}
          aria-label={translations.mobileControls?.rotate || "Rotate"}
        >
          <span className="control-icon">↻</span>
        </button>
      </div>
      <div className="mobile-controls-row">
        <button 
          className="mobile-control-button left-button" 
          onClick={handleLeftClick}
          onTouchStart={handleLeftClick}
          aria-label={translations.mobileControls?.left || "Left"}
        >
          <span className="control-icon">←</span>
        </button>
        <button 
          className="mobile-control-button down-button" 
          onClick={handleDownClick}
          onTouchStart={handleDownClick}
          aria-label={translations.mobileControls?.down || "Down"}
        >
          <span className="control-icon">↓</span>
        </button>
        <button 
          className="mobile-control-button right-button" 
          onClick={handleRightClick}
          onTouchStart={handleRightClick}
          aria-label={translations.mobileControls?.right || "Right"}
        >
          <span className="control-icon">→</span>
        </button>
      </div>
      <div className="mobile-controls-row">
        <button 
          className="mobile-control-button drop-button" 
          onClick={handleDropClick}
          onTouchStart={handleDropClick}
          aria-label={translations.mobileControls?.drop || "Drop"}
        >
          <span className="control-icon">⤓</span>
        </button>
      </div>
    </div>
  );
};

export default MobileControls;
