/**
 * AWS サービスブロックの定義
 * 各ブロックはAWSサービスを表し、形状、色、セキュリティレベル、特性を持つ
 */
export const BlockTypes = {
  S3: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: '#FF9900',
    icon: 'assets/images/aws/s3.png',
    securityLevel: 2,
    properties: {
      encryption: true,
      publicAccess: false
    }
  },
  EC2: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#FF4F00',
    icon: 'assets/images/aws/ec2.png',
    securityLevel: 3,
    properties: {
      patchLevel: 'latest',
      firewallEnabled: true
    }
  },
  VPC: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#2473F3',
    icon: 'assets/images/aws/vpc.png',
    securityLevel: 4,
    properties: {
      privateSubnet: true,
      natGateway: true
    }
  },
  IAM: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#DD344C',
    icon: 'assets/images/aws/iam.png',
    securityLevel: 5,
    properties: {
      leastPrivilege: true,
      mfa: true
    }
  },
  KMS: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#3B48CC',
    icon: 'assets/images/aws/kms.png',
    securityLevel: 4,
    properties: {
      keyRotation: true,
      cmk: true
    }
  },
  LAMBDA: {
    shape: [
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
    color: '#FF9900',
    icon: 'assets/images/aws/lambda.png',
    securityLevel: 2,
    properties: {
      runtime: 'latest',
      permissions: 'minimal'
    }
  },
  CLOUDTRAIL: {
    shape: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0]
    ],
    color: '#2E73B8',
    icon: 'assets/images/aws/cloudtrail.png',
    securityLevel: 3,
    properties: {
      multiRegion: true,
      logValidation: true
    }
  }
};

// ブロックタイプの配列を取得
export const getBlockTypes = () => {
  return Object.keys(BlockTypes).map(key => ({
    type: key,
    ...BlockTypes[key]
  }));
};

// ランダムなブロックタイプを取得
export const getRandomBlockType = () => {
  const types = getBlockTypes();
  return types[Math.floor(Math.random() * types.length)];
};
