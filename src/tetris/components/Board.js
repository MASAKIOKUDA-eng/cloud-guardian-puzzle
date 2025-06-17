import React, { useRef, useEffect, useState } from 'react';
import { BlockTypes } from '../models/BlockTypes';

/**
 * テトリスのゲームボードコンポーネント
 */
const Board = ({ gameEngine, cellSize = 40 }) => {
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [serviceImages, setServiceImages] = useState({});
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  
  // デバイスタイプの検出
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice || window.innerWidth <= 768);
      
      // モバイルデバイスの場合はセルサイズを調整
      if (isMobileDevice || window.innerWidth <= 768) {
        // 画面サイズに応じてセルサイズを動的に計算
        const boardWidth = Math.min(window.innerWidth * 0.9, 400);
        const newCellSize = Math.floor(boardWidth / gameEngine.cols);
        setCellSizeState(newCellSize);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [gameEngine.cols]);
  
  // 動的なセルサイズの状態
  const [cellSizeState, setCellSizeState] = useState(cellSize);
  
  // AWSサービスアイコンの読み込み
  useEffect(() => {
    const images = {};
    const imagePromises = [];
    
    Object.keys(BlockTypes).forEach(type => {
      const img = new Image();
      const iconPath = BlockTypes[type].icon;
      
      const promise = new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => {
          console.error(`Failed to load image: ${iconPath}`);
          resolve(); // エラーでも続行
        };
      });
      
      img.src = iconPath;
      images[type] = img;
      imagePromises.push(promise);
    });
    
    Promise.all(imagePromises).then(() => {
      setServiceImages(images);
      setImagesLoaded(true);
    });
  }, []);
  
  // キーボード操作の設定
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          gameEngine.moveLeft();
          break;
        case 'ArrowRight':
          gameEngine.moveRight();
          break;
        case 'ArrowDown':
          gameEngine.moveDown();
          break;
        case 'ArrowUp':
          gameEngine.rotate();
          break;
        case ' ':
          gameEngine.hardDrop();
          break;
        case 'p':
        case 'P':
          if (gameEngine.paused) {
            gameEngine.resume();
          } else {
            gameEngine.pause();
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameEngine]);
  
  // タッチ操作の設定
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
  };
  
  const handleTouchMove = (e) => {
    if (!touchStartX || !touchStartY) return;
    
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartX;
    const diffY = touch.clientY - touchStartY;
    const threshold = 30; // スワイプを検出する閾値
    
    // 横方向のスワイプが縦方向より大きい場合
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        gameEngine.moveRight();
      } else {
        gameEngine.moveLeft();
      }
      setTouchStartX(touch.clientX);
      setTouchStartY(touch.clientY);
    } 
    // 縦方向のスワイプが横方向より大きい場合
    else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
      if (diffY > 0) {
        gameEngine.moveDown();
      }
      setTouchStartX(touch.clientX);
      setTouchStartY(touch.clientY);
    }
  };
  
  const handleTouchEnd = () => {
    setTouchStartX(null);
    setTouchStartY(null);
  };
  
  // ダブルタップで回転
  const handleDoubleTap = () => {
    gameEngine.rotate();
  };
  
  // タップ処理
  const handleTap = (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 300 && tapLength > 0) {
      // ダブルタップ検出
      handleDoubleTap();
      e.preventDefault();
    }
    
    setLastTap(currentTime);
  };
  
  // ゲームボードの描画
  const drawBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const board = gameEngine.getBoard();
    
    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // グリッドの描画
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;
    
    // 縦線
    for (let x = 0; x <= canvas.width; x += cellSizeState) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // 横線
    for (let y = 0; y <= canvas.height; y += cellSizeState) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // ブロックの描画
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const cell = board[row][col];
        if (cell) {
          const x = col * cellSizeState;
          const y = row * cellSizeState;
          
          // ブロックの背景
          ctx.fillStyle = cell.color;
          ctx.fillRect(x, y, cellSizeState, cellSizeState);
          
          // ブロックの枠線
          ctx.strokeStyle = cell.current ? '#fff' : '#ddd';
          ctx.lineWidth = cell.current ? 2 : 1;
          ctx.strokeRect(x, y, cellSizeState, cellSizeState);
          
          // AWSサービスアイコンを表示（画像が読み込まれている場合）
          if (imagesLoaded && cell.type && serviceImages[cell.type]) {
            try {
              ctx.drawImage(
                serviceImages[cell.type],
                x + cellSizeState * 0.15,
                y + cellSizeState * 0.15,
                cellSizeState * 0.7,
                cellSizeState * 0.7
              );
            } catch (error) {
              console.error(`Error drawing image for ${cell.type}:`, error);
              // フォールバック: AWSサービスの頭文字を表示
              ctx.fillStyle = '#fff';
              ctx.font = `${cellSizeState / 2}px Arial`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(cell.type.charAt(0), x + cellSizeState / 2, y + cellSizeState / 2);
            }
          } else if (cell.type) {
            // 画像が読み込まれていない場合は頭文字を表示
            ctx.fillStyle = '#fff';
            ctx.font = `${cellSizeState / 2}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(cell.type.charAt(0), x + cellSizeState / 2, y + cellSizeState / 2);
          }
        }
      }
    }
  };
  
  // アニメーションフレームでゲームボードを更新
  useEffect(() => {
    let animationFrameId;
    let lastTime = 0;
    
    const render = (time) => {
      // ゲームの状態を更新
      gameEngine.update(time);
      
      // ボードを描画
      drawBoard();
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameEngine, imagesLoaded, serviceImages, cellSizeState]);
  
  // 画面サイズ変更時にキャンバスサイズを調整
  useEffect(() => {
    const handleResize = () => {
      if (isMobile) {
        const boardWidth = Math.min(window.innerWidth * 0.9, 400);
        const newCellSize = Math.floor(boardWidth / gameEngine.cols);
        setCellSizeState(newCellSize);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gameEngine.cols, isMobile]);
  
  return (
    <div className="tetris-board">
      <canvas
        ref={canvasRef}
        width={gameEngine.cols * cellSizeState}
        height={gameEngine.rows * cellSizeState}
        style={{ border: '1px solid #333', maxWidth: '100%' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleTap}
      />
      {isMobile && (
        <div className="mobile-controls">
          <div className="touch-instructions">
            <p>スワイプ: 左右移動・下に落とす</p>
            <p>ダブルタップ: 回転</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
