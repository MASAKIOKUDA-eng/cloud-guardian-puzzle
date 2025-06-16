# クラウド・ガーディアン：テトリス (Cloud Guardian Tetris)

AWS GovCloudのセキュリティとコンプライアンスをテーマにしたテトリスゲーム

## 概要

「クラウド・ガーディアン：テトリス」は、プレイヤーが政府機関のクラウドセキュリティ専門家となり、AWSサービスブロックを適切に配置して、セキュアなクラウドアーキテクチャを構築するゲームです。2D空間でブロックを操作し、セキュリティルールを満たすことで高得点を獲得できます。

## 特徴

- **テトリス**: 2次元空間でAWSサービスブロックを配置
- **AWSサービスブロック**: S3、EC2、VPC、IAM、KMS、Lambda、CloudTrailなどのAWSサービスをブロックとして使用
- **セキュリティルール**: 特定のAWSサービスの組み合わせでセキュリティルールを達成し、ポイントを獲得

## 操作方法

- **← →**: ブロックを左右に移動
- **↓**: ブロックを下に移動
- **↑**: ブロックを回転
- **スペース**: ハードドロップ（一番下まで落とす）
- **P**: 一時停止/再開

## ディレクトリ構成

```
.
├── assets/                  # 静的アセット
│   ├── images/              # 画像ファイル
│   │   └── aws/            # AWSサービスアイコン
│   ├── sounds/              # 音声ファイル
│   └── styles/              # CSSスタイルシート
├── dist/                    # ビルド成果物
├── public/                  # 公開ファイル
│   ├── assets/              # 公開用アセット
│   └── index.html           # メインHTMLファイル
├── src/                     # ソースコード
│   ├── components/          # Reactコンポーネント
│   │   ├── common/          # 共通コンポーネント
│   │   ├── game/            # ゲーム関連コンポーネント
│   │   └── pages/           # ページコンポーネント
│   ├── core/                # コア機能
│   ├── i18n/                # 国際化
│   ├── levels/              # レベル定義
│   ├── models/              # データモデル
│   ├── puzzles/             # パズル定義
│   ├── tetris/              # 2Dテトリス実装
│   │   ├── components/      # テトリス用コンポーネント
│   │   ├── engine/          # ゲームエンジン
│   │   └── models/          # テトリス用モデル
│   ├── tetris3d/            # 3Dテトリス実装
│   │   ├── components/      # 3Dテトリス用コンポーネント
│   │   ├── engine/          # 3Dゲームエンジン
│   │   └── models/          # 3Dテトリス用モデル
│   └── utils/               # ユーティリティ関数
└── tests/                   # テストファイル
```

## インストール方法

```bash
# リポジトリのクローン
git clone https://github.com/MASAKIOKUDA-eng/cloud-guardian-puzzle.git

# プロジェクトディレクトリに移動
cd cloud-guardian-puzzle

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start
```

## デプロイ方法

GitHub Pagesにデプロイするには:

```bash
# ビルドとデプロイ
npm run deploy
```

## 技術スタック

- React
- Canvas API
- CSS3
- HTML5

## ライセンス

MIT

## 貢献

プルリクエストは歓迎します。大きな変更を加える場合は、まずissueを開いて議論してください。
