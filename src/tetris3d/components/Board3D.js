import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * 3Dテトリスのゲームボードコンポーネント
 */
const Board3D = ({ gameEngine }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const blocksRef = useRef({});
  
  // テクスチャローダー
  const textureLoader = new THREE.TextureLoader();
  
  // 3Dシーンの初期化
  const initScene = () => {
    // シーン作成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f2f5);
    sceneRef.current = scene;
    
    // カメラ設定
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    
    // レンダラー設定
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // コントロール設定
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controlsRef.current = controls;
    
    // 光源設定
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);
    
    // グリッド作成
    createGrid();
    
    // ウィンドウリサイズ対応
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  };
  
  // グリッドの作成
  const createGrid = () => {
    const { layers, rows, cols } = gameEngine;
    
    // グリッドのサイズ
    const gridWidth = cols;
    const gridHeight = rows;
    const gridDepth = layers;
    
    // グリッドの中心を原点に
    const offsetX = -gridWidth / 2;
    const offsetY = -gridHeight / 2;
    const offsetZ = -gridDepth / 2;
    
    // グリッドの枠線
    const gridHelper = new THREE.GridHelper(Math.max(gridWidth, gridDepth), Math.max(cols, layers));
    gridHelper.position.y = offsetY;
    sceneRef.current.add(gridHelper);
    
    // 背景の壁（底面）
    const floorGeometry = new THREE.PlaneGeometry(gridWidth, gridDepth);
    const floorMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xcccccc, 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.position.set(offsetX + gridWidth / 2, offsetY, offsetZ + gridDepth / 2);
    sceneRef.current.add(floor);
    
    // 背景の壁（背面）
    const backWallGeometry = new THREE.PlaneGeometry(gridWidth, gridHeight);
    const backWallMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xcccccc, 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(offsetX + gridWidth / 2, offsetY + gridHeight / 2, offsetZ);
    sceneRef.current.add(backWall);
    
    // 背景の壁（左面）
    const leftWallGeometry = new THREE.PlaneGeometry(gridDepth, gridHeight);
    const leftWallMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xcccccc, 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(offsetX, offsetY + gridHeight / 2, offsetZ + gridDepth / 2);
    sceneRef.current.add(leftWall);
  };
  
  // ブロックの描画
  const drawBlocks = () => {
    if (!sceneRef.current) return;
    
    // 既存のブロックをクリア
    Object.values(blocksRef.current).forEach(block => {
      sceneRef.current.remove(block);
    });
    blocksRef.current = {};
    
    const board = gameEngine.getBoard();
    const { layers, rows, cols } = gameEngine;
    
    // グリッドの中心を原点に
    const offsetX = -cols / 2;
    const offsetY = -rows / 2;
    const offsetZ = -layers / 2;
    
    // ブロックの描画
    for (let z = 0; z < layers; z++) {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cell = board[z][y][x];
          
          if (cell) {
            // ブロックのジオメトリとマテリアル
            const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.95);
            
            // マテリアル（AWSアイコンをテクスチャとして使用）
            let material;
            
            if (cell.type) {
              try {
                // テクスチャの代わりにタイプに基づいた色を使用
                const materials = [
                  new THREE.MeshPhongMaterial({ color: cell.color, shininess: 30 }),
                  new THREE.MeshPhongMaterial({ color: cell.color, shininess: 30 }),
                  new THREE.MeshPhongMaterial({ color: cell.color, shininess: 30 }),
                  new THREE.MeshPhongMaterial({ color: cell.color, shininess: 30 }),
                  new THREE.MeshPhongMaterial({ color: cell.color, shininess: 30 }),
                  new THREE.MeshPhongMaterial({ color: cell.color, shininess: 30 })
                ];
                
                // 前面にAWSサービスの頭文字を表示
                const canvas = document.createElement('canvas');
                canvas.width = 128;
                canvas.height = 128;
                const context = canvas.getContext('2d');
                context.fillStyle = cell.color;
                context.fillRect(0, 0, 128, 128);
                context.font = 'bold 80px Arial';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillStyle = 'white';
                context.fillText(cell.type.charAt(0), 64, 64);
                
                const texture = new THREE.CanvasTexture(canvas);
                materials[4] = new THREE.MeshPhongMaterial({ 
                  map: texture,
                  shininess: 30
                });
                
                material = materials;
              } catch (error) {
                console.error('テクスチャ読み込みエラー:', error);
                material = new THREE.MeshPhongMaterial({ 
                  color: cell.color,
                  shininess: 30
                });
              }
            } else {
              material = new THREE.MeshPhongMaterial({ 
                color: cell.color,
                shininess: 30
              });
            }
            
            // 現在のブロックは少し透明に
            if (cell.current) {
              if (Array.isArray(material)) {
                material.forEach(mat => {
                  mat.transparent = true;
                  mat.opacity = 0.7;
                });
              } else {
                material.transparent = true;
                material.opacity = 0.7;
              }
            }
            
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(
              offsetX + x + 0.5,
              offsetY + (rows - y - 0.5),
              offsetZ + z + 0.5
            );
            
            // ブロックを保存して後で削除できるようにする
            const blockId = `${z}-${y}-${x}`;
            blocksRef.current[blockId] = cube;
            
            sceneRef.current.add(cube);
          }
        }
      }
    }
  };
  
  // アニメーションループ
  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    requestAnimationFrame(animate);
    
    // コントロールの更新
    if (controlsRef.current) {
      controlsRef.current.update();
    }
    
    // レンダリング
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };
  
  // 初期化
  useEffect(() => {
    const cleanup = initScene();
    animate();
    
    return cleanup;
  }, []);
  
  // ゲーム状態が変わったらブロックを再描画
  useEffect(() => {
    drawBlocks();
  }, [gameEngine]);
  
  return (
    <div className="board-3d" ref={mountRef} style={{ width: '100%', height: '600px' }}></div>
  );
};

export default Board3D;
