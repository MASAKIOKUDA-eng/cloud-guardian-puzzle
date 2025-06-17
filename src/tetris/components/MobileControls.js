import React, { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * モバイル向けのゲームコントロールコンポーネント
 */
const MobileControls = ({ gameEngine }) => {
  const { translations } = useLanguage();
  
  // コンポーネントがマウントされたときにスクロールを制御
  useEffect(() => {
    const handleScroll = (e) => {
      // コントロールエリア内でのスクロールを防止
      const controlsArea = document.querySelector('.mobile-controls-buttons');
      if (controlsArea && controlsArea.contains(e.target)) {
        e.preventDefault();
      }
    };
    
    // スクロールイベントリスナーを追加
    document.addEventListener('touchmove', handleScroll, { passive: false });
    
    return () => {
      // クリーンアップ
      document.removeEventListener('touchmove', handleScroll);
    };
  }, []);
  
  // タッチイベントのデフォルト動作を防止する関数
  const preventDefaultAndExecute = (callback) => (e) => {
    e.preventDefault();
    e.stopPropagation();
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
