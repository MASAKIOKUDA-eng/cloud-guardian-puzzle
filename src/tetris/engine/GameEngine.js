import { getRandomBlockType } from '../models/BlockTypes';
import { checkSecurityRules } from '../models/SecurityRules';

/**
 * テトリスゲームエンジン
 * ゲームの状態管理とロジックを担当
 */
class GameEngine {
  constructor(rows = 20, cols = 10) {
    // ゲームボード（2次元配列）
    this.board = Array(rows).fill().map(() => Array(cols).fill(null));
    
    // ゲーム状態
    this.currentBlock = null;
    this.currentPosition = { x: 0, y: 0 };
    this.nextBlock = null;
    this.score = 0;
    this.securityLevel = 0;
    this.gameOver = false;
    this.paused = false;
    
    // ゲーム設定
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
    this.board = Array(this.rows).fill().map(() => Array(this.cols).fill(null));
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
      x: Math.floor(this.cols / 2) - Math.floor(this.currentBlock.shape[0].length / 2),
      y: 0
    };
    
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
   * ブロックを回転
   */
  rotate() {
    if (this.gameOver || this.paused) return;
    
    const originalShape = this.currentBlock.shape;
    const rows = originalShape.length;
    const cols = originalShape[0].length;
    
    // 新しい回転した形状を作成
    const rotatedShape = Array(cols).fill().map(() => Array(rows).fill(0));
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        rotatedShape[x][rows - 1 - y] = originalShape[y][x];
      }
    }
    
    // 回転前の形状を保存
    const originalBlockShape = this.currentBlock.shape;
    
    // 回転後の形状を設定
    this.currentBlock.shape = rotatedShape;
    
    // 衝突する場合は元に戻す
    if (this.checkCollision()) {
      this.currentBlock.shape = originalBlockShape;
    }
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
    const { x, y } = this.currentPosition;
    
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const boardX = x + col;
          const boardY = y + row;
          
          // ボードの範囲外チェック
          if (
            boardX < 0 ||
            boardX >= this.cols ||
            boardY >= this.rows
          ) {
            return true;
          }
          
          // 他のブロックとの衝突チェック
          if (boardY >= 0 && this.board[boardY][boardX] !== null) {
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
    const { x, y } = this.currentPosition;
    
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const boardY = y + row;
          const boardX = x + col;
          
          if (boardY >= 0 && boardY < this.rows && boardX >= 0 && boardX < this.cols) {
            this.board[boardY][boardX] = {
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
    
    for (let row = this.rows - 1; row >= 0; row--) {
      // 行が埋まっているかチェック
      const isRowFull = this.board[row].every(cell => cell !== null);
      
      if (isRowFull) {
        // セキュリティルールのチェック
        const rules = checkSecurityRules(this.board, row);
        if (rules.length > 0) {
          matchedRules = [...matchedRules, ...rules];
          rules.forEach(rule => {
            securityPoints += rule.points;
          });
        }
        
        // 行を削除して上から新しい行を追加
        this.board.splice(row, 1);
        this.board.unshift(Array(this.cols).fill(null));
        
        linesCleared++;
        row++; // 同じ行を再チェック
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
    const boardCopy = this.board.map(row => [...row]);
    
    // 現在のブロックをボードに追加
    if (this.currentBlock) {
      const { shape, type, color } = this.currentBlock;
      const { x, y } = this.currentPosition;
      
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col] !== 0) {
            const boardY = y + row;
            const boardX = x + col;
            
            if (
              boardY >= 0 &&
              boardY < this.rows &&
              boardX >= 0 &&
              boardX < this.cols
            ) {
              boardCopy[boardY][boardX] = {
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

export default GameEngine;
