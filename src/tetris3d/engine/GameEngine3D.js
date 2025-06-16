import { getRandomBlockType } from '../models/BlockTypes';
import { checkSecurityRules } from '../models/SecurityRules';

/**
 * 3Dテトリスゲームエンジン
 * ゲームの状態管理とロジックを担当
 */
class GameEngine3D {
  constructor(layers = 3, rows = 20, cols = 10) {
    // 3Dゲームボード（3次元配列）
    this.board = Array(layers).fill().map(() => 
      Array(rows).fill().map(() => Array(cols).fill(null))
    );
    
    // ゲーム状態
    this.currentBlock = null;
    this.currentPosition = { x: 0, y: 0, z: 0 };
    this.currentRotation = { x: 0, y: 0, z: 0 };
    this.nextBlock = null;
    this.score = 0;
    this.securityLevel = 0;
    this.gameOver = false;
    this.paused = false;
    
    // ゲーム設定
    this.layers = layers;
    this.rows = rows;
    this.cols = cols;
    this.dropSpeed = 1000; // ミリ秒
    this.lastDropTime = 0;
    
    // イベントコールバック
    this.onScoreChange = null;
    this.onGameOver = null;
    this.onSecurityLevelChange = null;
    this.onRuleMatch = null;
  }
  
  /**
   * ゲームを初期化
   */
  init() {
    this.board = Array(this.layers).fill().map(() => 
      Array(this.rows).fill().map(() => Array(this.cols).fill(null))
    );
    this.score = 0;
    this.securityLevel = 0;
    this.gameOver = false;
    this.paused = false;
    
    this.generateNewBlock();
    this.generateNextBlock();
  }
  
  /**
   * 新しいブロックを生成
   */
  generateNewBlock() {
    this.currentBlock = this.nextBlock || getRandomBlockType();
    this.nextBlock = getRandomBlockType();
    
    // ブロックの初期位置を設定
    this.currentPosition = {
      x: Math.floor(this.cols / 2) - Math.floor(this.currentBlock.shape[0][0].length / 2),
      y: 0,
      z: Math.floor(this.layers / 2)
    };
    
    // 回転をリセット
    this.currentRotation = { x: 0, y: 0, z: 0 };
    
    // 新しいブロックが配置できない場合はゲームオーバー
    if (this.checkCollision()) {
      this.gameOver = true;
      if (this.onGameOver) {
        this.onGameOver(this.score, this.securityLevel);
      }
    }
  }
  
  /**
   * 次のブロックを生成
   */
  generateNextBlock() {
    this.nextBlock = getRandomBlockType();
  }
  
  /**
   * ブロックを左に移動
   */
  moveLeft() {
    if (this.gameOver || this.paused) return;
    
    this.currentPosition.x -= 1;
    if (this.checkCollision()) {
      this.currentPosition.x += 1;
    }
  }
  
  /**
   * ブロックを右に移動
   */
  moveRight() {
    if (this.gameOver || this.paused) return;
    
    this.currentPosition.x += 1;
    if (this.checkCollision()) {
      this.currentPosition.x -= 1;
    }
  }
  
  /**
   * ブロックを下に移動
   */
  moveDown() {
    if (this.gameOver || this.paused) return;
    
    this.currentPosition.y += 1;
    if (this.checkCollision()) {
      this.currentPosition.y -= 1;
      this.lockBlock();
      this.clearLines();
      this.generateNewBlock();
    }
  }
  
  /**
   * ブロックを前に移動（Z軸方向）
   */
  moveForward() {
    if (this.gameOver || this.paused) return;
    
    this.currentPosition.z -= 1;
    if (this.checkCollision() || this.currentPosition.z < 0) {
      this.currentPosition.z += 1;
    }
  }
  
  /**
   * ブロックを後ろに移動（Z軸方向）
   */
  moveBackward() {
    if (this.gameOver || this.paused) return;
    
    this.currentPosition.z += 1;
    if (this.checkCollision() || this.currentPosition.z >= this.layers) {
      this.currentPosition.z -= 1;
    }
  }
  
  /**
   * ブロックをX軸周りに回転
   */
  rotateX() {
    if (this.gameOver || this.paused) return;
    
    // 回転前の形状を保存
    const originalBlock = JSON.parse(JSON.stringify(this.currentBlock));
    
    // X軸周りの回転を適用
    this.currentRotation.x = (this.currentRotation.x + 90) % 360;
    this.applyRotation();
    
    // 衝突する場合は元に戻す
    if (this.checkCollision()) {
      this.currentRotation.x = (this.currentRotation.x + 270) % 360;
      this.currentBlock = originalBlock;
    }
  }
  
  /**
   * ブロックをY軸周りに回転
   */
  rotateY() {
    if (this.gameOver || this.paused) return;
    
    // 回転前の形状を保存
    const originalBlock = JSON.parse(JSON.stringify(this.currentBlock));
    
    // Y軸周りの回転を適用
    this.currentRotation.y = (this.currentRotation.y + 90) % 360;
    this.applyRotation();
    
    // 衝突する場合は元に戻す
    if (this.checkCollision()) {
      this.currentRotation.y = (this.currentRotation.y + 270) % 360;
      this.currentBlock = originalBlock;
    }
  }
  
  /**
   * ブロックをZ軸周りに回転
   */
  rotateZ() {
    if (this.gameOver || this.paused) return;
    
    // 回転前の形状を保存
    const originalBlock = JSON.parse(JSON.stringify(this.currentBlock));
    
    // Z軸周りの回転を適用
    this.currentRotation.z = (this.currentRotation.z + 90) % 360;
    this.applyRotation();
    
    // 衝突する場合は元に戻す
    if (this.checkCollision()) {
      this.currentRotation.z = (this.currentRotation.z + 270) % 360;
      this.currentBlock = originalBlock;
    }
  }
  
  /**
   * 現在の回転角度に基づいてブロックの形状を変更
   */
  applyRotation() {
    // 3D回転の実装
    // 実際の実装では、Three.jsなどのライブラリを使用して3D回転を適用する
    // ここでは簡略化のため、Z軸回転のみ実装
    
    if (this.currentRotation.z === 90) {
      this.rotateShapeZ();
    } else if (this.currentRotation.z === 180) {
      this.rotateShapeZ();
      this.rotateShapeZ();
    } else if (this.currentRotation.z === 270) {
      this.rotateShapeZ();
      this.rotateShapeZ();
      this.rotateShapeZ();
    }
  }
  
  /**
   * Z軸周りの回転を適用
   */
  rotateShapeZ() {
    const shape = this.currentBlock.shape[0];
    const rows = shape.length;
    const cols = shape[0].length;
    
    // 新しい回転した形状を作成
    const rotatedShape = Array(cols).fill().map(() => Array(rows).fill(0));
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        rotatedShape[x][rows - 1 - y] = shape[y][x];
      }
    }
    
    this.currentBlock.shape[0] = rotatedShape;
  }
  
  /**
   * ブロックを一番下まで落とす（ハードドロップ）
   */
  hardDrop() {
    if (this.gameOver || this.paused) return;
    
    while (!this.checkCollision()) {
      this.currentPosition.y += 1;
    }
    
    this.currentPosition.y -= 1;
    this.lockBlock();
    this.clearLines();
    this.generateNewBlock();
  }
  
  /**
   * 衝突チェック
   */
  checkCollision() {
    const { shape } = this.currentBlock;
    const { x, y, z } = this.currentPosition;
    
    // 現在のレイヤーのみチェック（簡略化）
    const layerShape = shape[0];
    
    for (let row = 0; row < layerShape.length; row++) {
      for (let col = 0; col < layerShape[row].length; col++) {
        if (layerShape[row][col] !== 0) {
          const boardX = x + col;
          const boardY = y + row;
          const boardZ = z;
          
          // ボードの範囲外チェック
          if (
            boardX < 0 ||
            boardX >= this.cols ||
            boardY >= this.rows ||
            boardZ < 0 ||
            boardZ >= this.layers
          ) {
            return true;
          }
          
          // 他のブロックとの衝突チェック
          if (boardY >= 0 && this.board[boardZ][boardY][boardX] !== null) {
            return true;
          }
        }
      }
    }
    
    return false;
  }
  
  /**
   * ブロックを固定
   */
  lockBlock() {
    const { shape, type, color } = this.currentBlock;
    const { x, y, z } = this.currentPosition;
    
    // 現在のレイヤーのみ処理（簡略化）
    const layerShape = shape[0];
    
    for (let row = 0; row < layerShape.length; row++) {
      for (let col = 0; col < layerShape[row].length; col++) {
        if (layerShape[row][col] !== 0) {
          const boardY = y + row;
          const boardX = x + col;
          const boardZ = z;
          
          if (
            boardY >= 0 && boardY < this.rows && 
            boardX >= 0 && boardX < this.cols &&
            boardZ >= 0 && boardZ < this.layers
          ) {
            this.board[boardZ][boardY][boardX] = {
              type,
              color
            };
          }
        }
      }
    }
  }
  
  /**
   * 行のクリアチェック
   */
  clearLines() {
    let linesCleared = 0;
    let securityPoints = 0;
    let matchedRules = [];
    
    // 各レイヤーの各行をチェック
    for (let z = 0; z < this.layers; z++) {
      for (let y = this.rows - 1; y >= 0; y--) {
        // 行が埋まっているかチェック
        const isRowFull = this.board[z][y].every(cell => cell !== null);
        
        if (isRowFull) {
          // セキュリティルールのチェック
          const rules = checkSecurityRules(this.board, z, y);
          if (rules.length > 0) {
            matchedRules = [...matchedRules, ...rules];
            rules.forEach(rule => {
              securityPoints += rule.points;
            });
          }
          
          // 行を削除して上から新しい行を追加
          this.board[z].splice(y, 1);
          this.board[z].unshift(Array(this.cols).fill(null));
          
          linesCleared++;
          y++; // 同じ行を再チェック
        }
      }
    }
    
    // スコア計算
    if (linesCleared > 0) {
      const linePoints = [0, 100, 300, 500, 800][linesCleared] || 1000;
      const totalPoints = linePoints + securityPoints;
      
      this.score += totalPoints;
      this.securityLevel += Math.floor(securityPoints / 500);
      
      if (this.onScoreChange) {
        this.onScoreChange(this.score);
      }
      
      if (this.onSecurityLevelChange) {
        this.onSecurityLevelChange(this.securityLevel);
      }
      
      if (this.onRuleMatch && matchedRules.length > 0) {
        this.onRuleMatch(matchedRules);
      }
    }
  }
  
  /**
   * ゲームの状態を更新
   */
  update(time) {
    if (this.gameOver || this.paused) return;
    
    if (time - this.lastDropTime > this.dropSpeed) {
      this.moveDown();
      this.lastDropTime = time;
    }
  }
  
  /**
   * ゲームの一時停止/再開
   */
  togglePause() {
    this.paused = !this.paused;
  }
  
  /**
   * ゲームボードの状態を取得
   */
  getBoard() {
    // 現在のボードのコピーを作成
    const boardCopy = this.board.map(layer => 
      layer.map(row => [...row])
    );
    
    // 現在のブロックをボードに追加
    if (this.currentBlock) {
      const { shape } = this.currentBlock;
      const { x, y, z } = this.currentPosition;
      
      // 現在のレイヤーのみ処理（簡略化）
      const layerShape = shape[0];
      
      for (let row = 0; row < layerShape.length; row++) {
        for (let col = 0; col < layerShape[row].length; col++) {
          if (layerShape[row][col] !== 0) {
            const boardY = y + row;
            const boardX = x + col;
            const boardZ = z;
            
            if (
              boardY >= 0 && boardY < this.rows && 
              boardX >= 0 && boardX < this.cols &&
              boardZ >= 0 && boardZ < this.layers
            ) {
              boardCopy[boardZ][boardY][boardX] = {
                type: this.currentBlock.type,
                color: this.currentBlock.color,
                current: true
              };
            }
          }
        }
      }
    }
    
    return boardCopy;
  }
  
  /**
   * 次のブロック情報を取得
   */
  getNextBlock() {
    return this.nextBlock;
  }
  
  /**
   * スコアを取得
   */
  getScore() {
    return this.score;
  }
  
  /**
   * セキュリティレベルを取得
   */
  getSecurityLevel() {
    return this.securityLevel;
  }
  
  /**
   * ゲームオーバー状態を取得
   */
  isGameOver() {
    return this.gameOver;
  }
}

export default GameEngine3D;
