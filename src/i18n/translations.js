/**
 * 多言語対応のための翻訳ファイル
 */
export const translations = {
  ja: {
    // ゲーム全般
    gameTitle: "クラウド・ガーディアン：テトリスエディション",
    startScreen: {
      title: "AWS GovCloudセキュリティテトリス",
      description: "AWSサービスブロックを適切に配置して、セキュアなクラウドアーキテクチャを構築しましょう。セキュリティルールを満たすと高得点を獲得できます！",
      startButton: "ゲームスタート",
      tutorialButton: "チュートリアルを見る",
      closeTutorialButton: "チュートリアルを閉じる"
    },
    tutorial: {
      title: "チュートリアル：高得点の獲得方法",
      securityRulesTitle: "セキュリティルール一覧",
      tipsTitle: "高得点を獲得するコツ",
      tips: [
        "同じ行に特定のAWSサービスを配置することでセキュリティルールを達成できます",
        "「コンプライアンス対応」ルールが最も高得点（1500ポイント）です",
        "例：KMS、CloudTrail、IAMブロックを同じ行に配置すると1500ポイント獲得！",
        "複数行を同時に消すと、基本点数に加えてボーナスポイントが加算されます",
        "セキュリティレベルが上がると、ゲームの難易度も上がります"
      ],
      placementExamplesTitle: "高得点配置例",
      complianceExample: {
        title: "コンプライアンス対応 (1500ポイント)",
        description: "同じ行にKMS、CloudTrail、IAMを配置"
      },
      serverlessExample: {
        title: "サーバーレスセキュリティ (1200ポイント)",
        description: "同じ行にLambda、IAM、CloudTrailを配置"
      },
      zeroTrustExample: {
        title: "ゼロトラストセキュリティ (1000ポイント)",
        description: "同じ行にIAM、VPC、EC2を配置"
      },
      controlsTitle: "操作方法",
      controls: [
        "← →: ブロックを左右に移動",
        "↓: ブロックを下に移動",
        "↑: ブロックを回転",
        "スペース: ハードドロップ（一番下まで落とす）",
        "P: 一時停止/再開"
      ]
    },
    gameUI: {
      nextBlock: "次のブロック",
      score: "スコア",
      securityLevel: "セキュリティレベル",
      pause: "一時停止",
      resume: "再開",
      restart: "再スタート",
      matchedRules: "達成したセキュリティルール",
      controls: "操作方法"
    },
    securityRules: {
      dataEncryption: {
        name: "データ暗号化レイヤー",
        description: "KMSとS3ブロックを連続して配置"
      },
      zeroTrust: {
        name: "ゼロトラストセキュリティ",
        description: "IAM、VPC、EC2ブロックを適切に配置"
      },
      auditLogs: {
        name: "監査ログ体制",
        description: "CloudTrailとS3ブロックを連続して配置"
      },
      serverlessSecurity: {
        name: "サーバーレスセキュリティ",
        description: "Lambda、IAM、CloudTrailブロックを適切に配置"
      },
      compliance: {
        name: "コンプライアンス対応",
        description: "KMS、CloudTrail、IAMブロックを適切に配置"
      }
    },
    language: "言語",
    languageOptions: {
      ja: "日本語",
      en: "English"
    }
  },
  en: {
    // Game general
    gameTitle: "Cloud Guardian: Tetris Edition",
    startScreen: {
      title: "AWS GovCloud Security Tetris",
      description: "Place AWS service blocks appropriately to build a secure cloud architecture. Meet security rules to earn high scores!",
      startButton: "Start Game",
      tutorialButton: "View Tutorial",
      closeTutorialButton: "Close Tutorial"
    },
    tutorial: {
      title: "Tutorial: How to Get High Scores",
      securityRulesTitle: "Security Rules List",
      tipsTitle: "Tips for High Scores",
      tips: [
        "Achieve security rules by placing specific AWS services in the same row",
        "The 'Compliance' rule gives the highest score (1500 points)",
        "Example: Place KMS, CloudTrail, and IAM blocks in the same row to earn 1500 points!",
        "Clearing multiple rows simultaneously adds bonus points to the base score",
        "As your security level increases, the game difficulty also increases"
      ],
      placementExamplesTitle: "High Score Placement Examples",
      complianceExample: {
        title: "Compliance (1500 points)",
        description: "Place KMS, CloudTrail, and IAM in the same row"
      },
      serverlessExample: {
        title: "Serverless Security (1200 points)",
        description: "Place Lambda, IAM, and CloudTrail in the same row"
      },
      zeroTrustExample: {
        title: "Zero Trust Security (1000 points)",
        description: "Place IAM, VPC, and EC2 in the same row"
      },
      controlsTitle: "Controls",
      controls: [
        "← →: Move block left/right",
        "↓: Move block down",
        "↑: Rotate block",
        "Space: Hard drop (drop to bottom)",
        "P: Pause/Resume"
      ]
    },
    gameUI: {
      nextBlock: "Next Block",
      score: "Score",
      securityLevel: "Security Level",
      pause: "Pause",
      resume: "Resume",
      restart: "Restart",
      matchedRules: "Achieved Security Rules",
      controls: "Controls"
    },
    securityRules: {
      dataEncryption: {
        name: "Data Encryption Layer",
        description: "Place KMS and S3 blocks consecutively"
      },
      zeroTrust: {
        name: "Zero Trust Security",
        description: "Place IAM, VPC, and EC2 blocks appropriately"
      },
      auditLogs: {
        name: "Audit Log System",
        description: "Place CloudTrail and S3 blocks consecutively"
      },
      serverlessSecurity: {
        name: "Serverless Security",
        description: "Place Lambda, IAM, and CloudTrail blocks appropriately"
      },
      compliance: {
        name: "Compliance",
        description: "Place KMS, CloudTrail, and IAM blocks appropriately"
      }
    },
    language: "Language",
    languageOptions: {
      ja: "日本語",
      en: "English"
    }
  }
};
