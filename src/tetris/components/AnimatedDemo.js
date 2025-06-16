import React, { useRef, useEffect, useState } from 'react';
import { BlockTypes } from '../models/BlockTypes';

/**
 * 高得点の取り方を示すアニメーションデモコンポーネント
 */
const AnimatedDemo = ({ demoType = 'compliance', cellSize = 30 }) => {
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [serviceImages, setServiceImages] = useState({});
  const [frame, setFrame] = useState(0);
  
  // デモの種類に応じたブロック配置を定義
  const demoConfigs = {
    compliance: {
      title: 'コンプライアンス対応 (1500ポイント)',
      blocks: [
        { type: 'KMS', x: 0, y: 0 },
        { type: 'CLOUDTRAIL', x: 1, y: 0 },
        { type: 'IAM', x: 2, y: 0 }
      ],
      points: 1500
    },
    serverless: {
      title: 'サーバーレスセキュリティ (1200ポイント)',
      blocks: [
        { type: 'LAMBDA', x: 0, y: 0 },
        { type: 'IAM', x: 1, y: 0 },
        { type: 'CLOUDTRAIL', x: 2, y: 0 }
      ],
      points: 1200
    },
    zeroTrust: {
      title: 'ゼロトラストセキュリティ (1000ポイント)',
      blocks: [
        { type: 'IAM', x: 0, y: 0 },
        { type: 'VPC', x: 1, y: 0 },
        { type: 'EC2', x: 2, y: 0 }
      ],
      points: 1000
    }
  };
  
  // 現在のデモ設定を取得
  const currentDemo = demoConfigs[demoType] || demoConfigs.compliance;
  
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
  
  // アニメーションフレームの更新
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prevFrame => (prevFrame + 1) % 60); // 60フレームでループ
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // デモの描画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesLoaded) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // キャンバスをクリア
    ctx.clearRect(0, 0, width, height);
    
    // グリッドの描画
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;
    
    // 縦線
    for (let x = 0; x <= width; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // 横線
    for (let y = 0; y <= height; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // アニメーションの進行度に応じてブロックを描画
    const animationPhase = Math.floor(frame / 20); // 0, 1, 2の3フェーズ
    
    currentDemo.blocks.forEach((block, index) => {
      if (index <= animationPhase) {
        const x = block.x * cellSize;
        const y = block.y * cellSize;
        const type = block.type;
        const color = BlockTypes[type].color;
        
        // ブロックの背景
        ctx.fillStyle = color;
        ctx.fillRect(x, y, cellSize, cellSize);
        
        // ブロックの枠線
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cellSize, cellSize);
        
        // AWSサービスアイコンを表示
        if (serviceImages[type]) {
          try {
            ctx.drawImage(
              serviceImages[type],
              x + cellSize * 0.15,
              y + cellSize * 0.15,
              cellSize * 0.7,
              cellSize * 0.7
            );
          } catch (error) {
            // フォールバック: AWSサービスの頭文字を表示
            ctx.fillStyle = '#fff';
            ctx.font = `${cellSize / 2}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(type.charAt(0), x + cellSize / 2, y + cellSize / 2);
          }
        }
      }
    });
    
    // 全てのブロックが配置された後にポイント表示
    if (animationPhase >= 2) {
      const pointsOpacity = (frame % 20) / 20; // 点滅効果
      ctx.fillStyle = `rgba(255, 153, 0, ${0.5 + pointsOpacity * 0.5})`;
      ctx.font = `bold ${cellSize / 1.5}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`+${currentDemo.points}`, width / 2, height / 2 + cellSize);
    }
    
  }, [frame, imagesLoaded, serviceImages, cellSize, currentDemo]);
  
  return (
    <div className="animated-demo">
      <h5>{currentDemo.title}</h5>
      <canvas
        ref={canvasRef}
        width={cellSize * 4}
        height={cellSize * 2}
        style={{ border: '1px solid #333', backgroundColor: '#222' }}
      />
    </div>
  );
};

export default AnimatedDemo;
