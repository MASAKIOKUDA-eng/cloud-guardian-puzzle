/**
 * セキュリティルールの定義
 * 各ルールは名前、説明、チェック関数、獲得ポイントを持つ
 */
export const SecurityRules = [
  {
    name: "データ暗号化レイヤー",
    description: "KMSとS3ブロックを連続して配置",
    check: (board, layer, row) => {
      // KMSとS3ブロックが隣接しているかチェック
      for (let col = 0; col < board[layer][row].length - 1; col++) {
        if (
          (board[layer][row][col]?.type === 'KMS' && board[layer][row][col + 1]?.type === 'S3') ||
          (board[layer][row][col]?.type === 'S3' && board[layer][row][col + 1]?.type === 'KMS')
        ) {
          return true;
        }
      }
      return false;
    },
    points: 500
  },
  {
    name: "ゼロトラストセキュリティ",
    description: "IAM、VPC、EC2ブロックを適切に配置",
    check: (board, layer, row) => {
      // IAM、VPC、EC2ブロックが同じ行に存在するかチェック
      let hasIAM = false;
      let hasVPC = false;
      let hasEC2 = false;
      
      for (let col = 0; col < board[layer][row].length; col++) {
        if (board[layer][row][col]?.type === 'IAM') hasIAM = true;
        if (board[layer][row][col]?.type === 'VPC') hasVPC = true;
        if (board[layer][row][col]?.type === 'EC2') hasEC2 = true;
      }
      
      return hasIAM && hasVPC && hasEC2;
    },
    points: 1000
  },
  {
    name: "監査ログ体制",
    description: "CloudTrailとS3ブロックを連続して配置",
    check: (board, layer, row) => {
      // CloudTrailとS3ブロックが隣接しているかチェック
      for (let col = 0; col < board[layer][row].length - 1; col++) {
        if (
          (board[layer][row][col]?.type === 'CLOUDTRAIL' && board[layer][row][col + 1]?.type === 'S3') ||
          (board[layer][row][col]?.type === 'S3' && board[layer][row][col + 1]?.type === 'CLOUDTRAIL')
        ) {
          return true;
        }
      }
      return false;
    },
    points: 750
  },
  {
    name: "サーバーレスセキュリティ",
    description: "Lambda、IAM、CloudTrailブロックを適切に配置",
    check: (board, layer, row) => {
      // Lambda、IAM、CloudTrailブロックが同じ行に存在するかチェック
      let hasLambda = false;
      let hasIAM = false;
      let hasCloudTrail = false;
      
      for (let col = 0; col < board[layer][row].length; col++) {
        if (board[layer][row][col]?.type === 'LAMBDA') hasLambda = true;
        if (board[layer][row][col]?.type === 'IAM') hasIAM = true;
        if (board[layer][row][col]?.type === 'CLOUDTRAIL') hasCloudTrail = true;
      }
      
      return hasLambda && hasIAM && hasCloudTrail;
    },
    points: 1200
  },
  {
    name: "コンプライアンス対応",
    description: "KMS、CloudTrail、IAMブロックを適切に配置",
    check: (board, layer, row) => {
      // KMS、CloudTrail、IAMブロックが同じ行に存在するかチェック
      let hasKMS = false;
      let hasCloudTrail = false;
      let hasIAM = false;
      
      for (let col = 0; col < board[layer][row].length; col++) {
        if (board[layer][row][col]?.type === 'KMS') hasKMS = true;
        if (board[layer][row][col]?.type === 'CLOUDTRAIL') hasCloudTrail = true;
        if (board[layer][row][col]?.type === 'IAM') hasIAM = true;
      }
      
      return hasKMS && hasCloudTrail && hasIAM;
    },
    points: 1500
  },
  // 3Dテトリス用の追加ルール
  {
    name: "マルチレイヤーセキュリティ",
    description: "複数のレイヤーにまたがるセキュリティ構成",
    check: (board, layer, row) => {
      // 現在のレイヤーにVPCがあり、別のレイヤーの同じ位置にEC2がある場合
      if (layer > 0) {
        for (let col = 0; col < board[layer][row].length; col++) {
          if (board[layer][row][col]?.type === 'VPC' && board[layer-1][row][col]?.type === 'EC2') {
            return true;
          }
        }
      }
      return false;
    },
    points: 2000
  },
  {
    name: "コンテンツ配信セキュリティ",
    description: "CloudFrontとS3の組み合わせ",
    check: (board, layer, row) => {
      // CloudFrontとS3ブロックが同じ行に存在するかチェック
      let hasCloudFront = false;
      let hasS3 = false;
      
      for (let col = 0; col < board[layer][row].length; col++) {
        if (board[layer][row][col]?.type === 'CLOUDFRONT') hasCloudFront = true;
        if (board[layer][row][col]?.type === 'S3') hasS3 = true;
      }
      
      return hasCloudFront && hasS3;
    },
    points: 1000
  }
];

// 行がセキュリティルールを満たしているかチェック
export const checkSecurityRules = (board, layer, row) => {
  const matchedRules = [];
  
  for (const rule of SecurityRules) {
    if (rule.check(board, layer, row)) {
      matchedRules.push({
        name: rule.name,
        points: rule.points
      });
    }
  }
  
  return matchedRules;
};
