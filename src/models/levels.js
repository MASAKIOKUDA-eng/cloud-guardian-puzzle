// レベルデータの定義
export const levels = [
  // 初級レベル
  {
    id: 'beginner-1',
    title: 'セキュアVPC構築',
    description: 'AWS GovCloudで基本的なVPCとセキュリティグループを設定し、安全なネットワーク環境を構築しましょう。',
    difficulty: 'beginner',
    type: 'resource-placement',
    objectives: [
      'プライベートサブネットとパブリックサブネットを正しく配置する',
      'セキュリティグループのルールを適切に設定する',
      'NACLを使用して追加のセキュリティレイヤーを実装する'
    ],
    resources: [
      { id: 'vpc', type: 'VPC', name: 'GovCloudVPC' },
      { id: 'public-subnet', type: 'Subnet', name: 'PublicSubnet' },
      { id: 'private-subnet', type: 'Subnet', name: 'PrivateSubnet' },
      { id: 'igw', type: 'InternetGateway', name: 'IGW' },
      { id: 'nat', type: 'NATGateway', name: 'NAT' },
      { id: 'sg-web', type: 'SecurityGroup', name: 'WebSG' },
      { id: 'sg-db', type: 'SecurityGroup', name: 'DBSG' },
      { id: 'nacl', type: 'NACL', name: 'NetworkACL' }
    ]
  },
  {
    id: 'beginner-2',
    title: 'IAMポリシーパズル',
    description: '最小権限の原則に従って、適切なIAMポリシーを作成しましょう。',
    difficulty: 'beginner',
    type: 'policy-builder',
    objectives: [
      '読み取り専用アクセス権を持つIAMポリシーを作成する',
      '特定のリソースに対する制限付きアクセス権を設定する',
      'IAMロールと信頼ポリシーを正しく構成する'
    ],
    resources: [
      { id: 'iam-user', type: 'IAMUser', name: 'Analyst' },
      { id: 'iam-role', type: 'IAMRole', name: 'AuditRole' },
      { id: 'iam-policy', type: 'IAMPolicy', name: 'ReadOnlyPolicy' },
      { id: 'iam-group', type: 'IAMGroup', name: 'SecurityTeam' }
    ]
  },
  {
    id: 'beginner-3',
    title: 'データ暗号化チャレンジ',
    description: 'AWS KMSを使用して、保存データと転送中のデータを適切に暗号化しましょう。',
    difficulty: 'beginner',
    type: 'security-challenge',
    objectives: [
      'S3バケットのサーバーサイド暗号化を設定する',
      'KMSキーを作成し、適切なキーポリシーを設定する',
      'RDSインスタンスの暗号化を有効にする'
    ],
    resources: [
      { id: 'kms-key', type: 'KMSKey', name: 'DataEncryptionKey' },
      { id: 's3-bucket', type: 'S3Bucket', name: 'SecureDataBucket' },
      { id: 'rds-instance', type: 'RDSInstance', name: 'EncryptedDB' }
    ]
  },

  // 中級レベル
  {
    id: 'intermediate-1',
    title: 'マルチリージョンディザスタリカバリ',
    description: '複数のAWSリージョンを使用して、高可用性とディザスタリカバリを実現するアーキテクチャを設計しましょう。',
    difficulty: 'intermediate',
    type: 'architecture-design',
    objectives: [
      'プライマリリージョンとセカンダリリージョンを適切に設定する',
      'データレプリケーションを構成する',
      'フェイルオーバーメカニズムを実装する'
    ],
    resources: [
      { id: 'primary-region', type: 'Region', name: 'us-gov-west-1' },
      { id: 'secondary-region', type: 'Region', name: 'us-gov-east-1' },
      { id: 'route53', type: 'Route53', name: 'DNSFailover' },
      { id: 's3-replication', type: 'S3Replication', name: 'DataReplication' },
      { id: 'dynamodb-global', type: 'DynamoDBGlobalTable', name: 'GlobalDB' }
    ]
  },
  {
    id: 'intermediate-2',
    title: 'コンプライアンスフレームワーク構築',
    description: 'FedRAMP要件に準拠したクラウドアーキテクチャを構築しましょう。',
    difficulty: 'intermediate',
    type: 'compliance-quest',
    objectives: [
      'FedRAMPの監査要件を満たすロギングを設定する',
      'コンプライアンスチェックを自動化する',
      '適切なセキュリティコントロールを実装する'
    ],
    resources: [
      { id: 'cloudtrail', type: 'CloudTrail', name: 'ComplianceTrail' },
      { id: 'config', type: 'AWSConfig', name: 'ComplianceRules' },
      { id: 'guardduty', type: 'GuardDuty', name: 'ThreatDetection' },
      { id: 'securityhub', type: 'SecurityHub', name: 'ComplianceDashboard' }
    ]
  },

  // 上級レベル
  {
    id: 'advanced-1',
    title: 'ゼロトラストアーキテクチャ',
    description: '「信頼しない、常に検証する」の原則に基づいたゼロトラストアーキテクチャを設計しましょう。',
    difficulty: 'advanced',
    type: 'architecture-design',
    objectives: [
      'マイクロセグメンテーションを実装する',
      '継続的な認証と認可を設定する',
      '最小権限アクセスコントロールを実装する'
    ],
    resources: [
      { id: 'vpc-endpoints', type: 'VPCEndpoints', name: 'PrivateAccess' },
      { id: 'iam-conditions', type: 'IAMConditions', name: 'ContextualAccess' },
      { id: 'waf', type: 'WAF', name: 'APIProtection' },
      { id: 'shield', type: 'Shield', name: 'DDoSProtection' },
      { id: 'cognito', type: 'Cognito', name: 'IdentityManagement' }
    ]
  },
  {
    id: 'advanced-2',
    title: '高度な暗号化戦略',
    description: '機密データを保護するための高度な暗号化戦略を実装しましょう。',
    difficulty: 'advanced',
    type: 'security-challenge',
    objectives: [
      'エンベロープ暗号化を実装する',
      'カスタムキーストアを設定する',
      '暗号化キーのローテーションポリシーを設定する'
    ],
    resources: [
      { id: 'cloudhsm', type: 'CloudHSM', name: 'HardwareSecurityModule' },
      { id: 'kms-custom', type: 'KMSCustomKeystore', name: 'CustomKeystore' },
      { id: 'secrets-manager', type: 'SecretsManager', name: 'RotatingSecrets' }
    ]
  }
];
