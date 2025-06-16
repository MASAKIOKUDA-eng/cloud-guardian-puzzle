import React, { useRef, useEffect } from 'react';

/**
 * 次のブロックを表示するコンポーネント
 */
const NextBlock = ({ gameEngine, cellSize = 20 }) => {
  const canvasRef = useRef(null);
  
  // 次のブロックを描画
  const drawNextBlock = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const nextBlock = gameEngine.getNextBlock();
    
    if (!nextBlock) return;
    
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
    const { shape, color, type } = nextBlock;
    const offsetX = Math.floor((canvas.width / cellSize - shape[0].length) / 2);
    const offsetY = Math.floor((canvas.height / cellSize - shape.length) / 2);
    
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const x = (offsetX + col) * cellSize;
          const y = (offsetY + row) * cellSize;
          
          // ブロックの背景
          ctx.fillStyle = color;
          ctx.fillRect(x, y, cellSize, cellSize);
          
          // ブロックの枠線
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, cellSize, cellSize);
          
          // AWSサービスの頭文字を表示
          ctx.fillStyle = '#fff';
          ctx.font = `${cellSize / 2}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(type ? type.charAt(0) : '', x + cellSize / 2, y + cellSize / 2);
        }
      }
    }
  };
  
  // アニメーションフレームで次のブロックを更新
  useEffect(() => {
    let animationFrameId;
    
    const render = () => {
      drawNextBlock();
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameEngine]);
  
  return (
    <div className="next-block">
      <h3>次のブロック</h3>
      <canvas
        ref={canvasRef}
        width={6 * cellSize}
        height={6 * cellSize}
        style={{ border: '1px solid #333' }}
      />
    </div>
  );
};

export default NextBlock;
