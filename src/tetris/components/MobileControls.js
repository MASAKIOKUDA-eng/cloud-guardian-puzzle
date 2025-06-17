import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * モバイル向けのゲームコントロールコンポーネント
 */
const MobileControls = ({ gameEngine }) => {
  const { translations } = useLanguage();
  
  const handleLeftClick = () => {
    gameEngine.moveLeft();
  };
  
  const handleRightClick = () => {
    gameEngine.moveRight();
  };
  
  const handleDownClick = () => {
    gameEngine.moveDown();
  };
  
  const handleRotateClick = () => {
    gameEngine.rotate();
  };
  
  const handleDropClick = () => {
    gameEngine.hardDrop();
  };
  
  return (
    <div className="mobile-controls-buttons">
      <div className="mobile-controls-row">
        <button 
          className="mobile-control-button rotate-button" 
          onClick={handleRotateClick}
          aria-label={translations.mobileControls?.rotate || "Rotate"}
        >
          <span className="control-icon">↻</span>
        </button>
      </div>
      <div className="mobile-controls-row">
        <button 
          className="mobile-control-button left-button" 
          onClick={handleLeftClick}
          aria-label={translations.mobileControls?.left || "Left"}
        >
          <span className="control-icon">←</span>
        </button>
        <button 
          className="mobile-control-button down-button" 
          onClick={handleDownClick}
          aria-label={translations.mobileControls?.down || "Down"}
        >
          <span className="control-icon">↓</span>
        </button>
        <button 
          className="mobile-control-button right-button" 
          onClick={handleRightClick}
          aria-label={translations.mobileControls?.right || "Right"}
        >
          <span className="control-icon">→</span>
        </button>
      </div>
      <div className="mobile-controls-row">
        <button 
          className="mobile-control-button drop-button" 
          onClick={handleDropClick}
          aria-label={translations.mobileControls?.drop || "Drop"}
        >
          <span className="control-icon">⤓</span>
        </button>
      </div>
    </div>
  );
};

export default MobileControls;
