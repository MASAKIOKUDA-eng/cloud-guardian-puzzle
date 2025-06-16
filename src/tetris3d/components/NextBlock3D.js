import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * 次のブロックを3Dで表示するコンポーネント
 */
const NextBlock3D = ({ gameEngine }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const blocksRef = useRef([]);
  
  // 3Dシーンの初期化
  const initScene = () => {
    // シーン作成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;
    
    // カメラ設定
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // 正方形のビューポート
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    
    // レンダラー設定
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(200, 200); // 小さいプレビュー
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // 光源設定
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);
    
    // ウィンドウリサイズ対応
    const handleResize = () => {
      renderer.setSize(200, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  };
  
  // 次のブロックを描画
  const drawNextBlock = () => {
    if (!sceneRef.current) return;
    
    // 既存のブロックをクリア
    blocksRef.current.forEach(block => {
      sceneRef.current.remove(block);
    });
    blocksRef.current = [];
    
    const nextBlock = gameEngine.getNextBlock();
    if (!nextBlock) return;
    
    // 最初のレイヤーのみ表示（簡略化）
    const shape = nextBlock.shape[0];
    const rows = shape.length;
    const cols = shape[0].length;
    
    // ブロックの中心を原点に
    const offsetX = -cols / 2;
    const offsetY = -rows / 2;
    
    // ブロックの描画
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (shape[y][x] !== 0) {
          // ブロックのジオメトリとマテリアル
          const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
          
          // マテリアル（AWSアイコンをテクスチャとして使用）
          let material;
          
          try {
            // テクスチャの代わりにタイプに基づいた色を使用
            const materials = [
              new THREE.MeshPhongMaterial({ color: nextBlock.color, shininess: 30 }),
              new THREE.MeshPhongMaterial({ color: nextBlock.color, shininess: 30 }),
              new THREE.MeshPhongMaterial({ color: nextBlock.color, shininess: 30 }),
              new THREE.MeshPhongMaterial({ color: nextBlock.color, shininess: 30 }),
              new THREE.MeshPhongMaterial({ color: nextBlock.color, shininess: 30 }),
              new THREE.MeshPhongMaterial({ color: nextBlock.color, shininess: 30 })
            ];
            
            // 前面にAWSサービスの頭文字を表示
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const context = canvas.getContext('2d');
            context.fillStyle = nextBlock.color;
            context.fillRect(0, 0, 128, 128);
            context.font = 'bold 80px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = 'white';
            context.fillText(nextBlock.type.charAt(0), 64, 64);
            
            const texture = new THREE.CanvasTexture(canvas);
            materials[4] = new THREE.MeshPhongMaterial({ 
              map: texture,
              shininess: 30
            });
            
            material = materials;
          } catch (error) {
            console.error('テクスチャ読み込みエラー:', error);
            material = new THREE.MeshPhongMaterial({ 
              color: nextBlock.color,
              shininess: 30
            });
          }
          
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(
            offsetX + x + 0.5,
            offsetY + (rows - y - 0.5),
            0
          );
          
          blocksRef.current.push(cube);
          sceneRef.current.add(cube);
        }
      }
    }
    
    // カメラ位置調整
    if (cameraRef.current) {
      cameraRef.current.position.set(
        Math.max(cols, 3) * 1.5,
        Math.max(rows, 3) * 1.5,
        Math.max(cols, rows, 3) * 1.5
      );
      cameraRef.current.lookAt(0, 0, 0);
    }
  };
  
  // アニメーションループ
  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    requestAnimationFrame(animate);
    
    // ブロックを回転
    blocksRef.current.forEach(block => {
      block.rotation.y += 0.01;
    });
    
    // レンダリング
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };
  
  // 初期化
  useEffect(() => {
    const cleanup = initScene();
    animate();
    
    return cleanup;
  }, []);
  
  // 次のブロックが変わったら再描画
  useEffect(() => {
    drawNextBlock();
  }, [gameEngine.getNextBlock()]);
  
  return (
    <div className="next-block-3d">
      <h3>次のブロック</h3>
      <div ref={mountRef} style={{ width: '200px', height: '200px', margin: '0 auto' }}></div>
    </div>
  );
};

export default NextBlock3D;
