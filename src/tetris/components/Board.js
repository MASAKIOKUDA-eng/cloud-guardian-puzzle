import React, { useRef, useEffect, useState } from 'react';
import { BlockTypes } from '../models/BlockTypes';

/**
 * テトリスのゲームボードコンポーネント
 */
const Board = ({ gameEngine, cellSize = 40 }) => {
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [serviceImages, setServiceImages] = useState({});
  
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
    for (let x = 0; x <= canvas.width; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // 横線
    for (let y = 0; y <= canvas.height; y += cellSize) {
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
          const x = col * cellSize;
          const y = row * cellSize;
          
          // ブロックの背景
          ctx.fillStyle = cell.color;
          ctx.fillRect(x, y, cellSize, cellSize);
          
          // ブロックの枠線
          ctx.strokeStyle = cell.current ? '#fff' : '#ddd';
          ctx.lineWidth = cell.current ? 2 : 1;
          ctx.strokeRect(x, y, cellSize, cellSize);
          
          // AWSサービスアイコンを表示（画像が読み込まれている場合）
          if (imagesLoaded && cell.type && serviceImages[cell.type]) {
            try {
              ctx.drawImage(
                serviceImages[cell.type],
                x + cellSize * 0.15,
                y + cellSize * 0.15,
                cellSize * 0.7,
                cellSize * 0.7
              );
            } catch (error) {
              console.error(`Error drawing image for ${cell.type}:`, error);
              // フォールバック: AWSサービスの頭文字を表示
              ctx.fillStyle = '#fff';
              ctx.font = `${cellSize / 2}px Arial`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(cell.type.charAt(0), x + cellSize / 2, y + cellSize / 2);
            }
          } else if (cell.type) {
            // 画像が読み込まれていない場合は頭文字を表示
            ctx.fillStyle = '#fff';
            ctx.font = `${cellSize / 2}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(cell.type.charAt(0), x + cellSize / 2, y + cellSize / 2);
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
  }, [gameEngine, imagesLoaded, serviceImages]);
  
  return (
    <div className="tetris-board">
      <canvas
        ref={canvasRef}
        width={gameEngine.cols * cellSize}
        height={gameEngine.rows * cellSize}
        style={{ border: '1px solid #333' }}
      />
    </div>
  );
};

export default Board;
