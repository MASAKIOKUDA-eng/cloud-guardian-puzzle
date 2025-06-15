import React from 'react';

const ResourceItem = ({ resource, onDragStart }) => {
  // リソースタイプに応じたアイコンやスタイルを設定
  const getResourceStyle = (type) => {
    const baseStyle = {
      padding: '10px',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '120px',
      height: '80px',
      cursor: 'grab',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: 'white',
      border: '2px solid'
    };

    // リソースタイプに応じた色を設定
    switch (type) {
      case 'VPC':
        return { ...baseStyle, borderColor: '#232f3e', backgroundColor: '#f8f8f8' };
      case 'Subnet':
        return { ...baseStyle, borderColor: '#527FFF', backgroundColor: '#f0f5ff' };
      case 'InternetGateway':
      case 'NATGateway':
        return { ...baseStyle, borderColor: '#FF9900', backgroundColor: '#fff8f0' };
      case 'SecurityGroup':
      case 'NACL':
        return { ...baseStyle, borderColor: '#D13212', backgroundColor: '#fff5f0' };
      case 'IAMUser':
      case 'IAMRole':
      case 'IAMPolicy':
      case 'IAMGroup':
        return { ...baseStyle, borderColor: '#C7511F', backgroundColor: '#fff7f0' };
      case 'KMSKey':
      case 'CloudHSM':
        return { ...baseStyle, borderColor: '#7AA116', backgroundColor: '#f8fff0' };
      case 'S3Bucket':
        return { ...baseStyle, borderColor: '#E16737', backgroundColor: '#fff6f0' };
      case 'RDSInstance':
      case 'DynamoDBGlobalTable':
        return { ...baseStyle, borderColor: '#3B48CC', backgroundColor: '#f0f1ff' };
      case 'Region':
        return { ...baseStyle, borderColor: '#232f3e', backgroundColor: '#f8f8f8', width: '150px' };
      default:
        return { ...baseStyle, borderColor: '#232f3e' };
    }
  };

  // リソースタイプに応じたアイコンを取得
  const getResourceIcon = (type) => {
    switch (type) {
      case 'VPC':
        return '🌐';
      case 'Subnet':
        return '🔲';
      case 'InternetGateway':
        return '🌍';
      case 'NATGateway':
        return '🔄';
      case 'SecurityGroup':
        return '🛡️';
      case 'NACL':
        return '🔒';
      case 'IAMUser':
        return '👤';
      case 'IAMRole':
        return '🎭';
      case 'IAMPolicy':
        return '📜';
      case 'IAMGroup':
        return '👥';
      case 'KMSKey':
        return '🔑';
      case 'S3Bucket':
        return '🪣';
      case 'RDSInstance':
        return '💾';
      case 'CloudTrail':
        return '📊';
      case 'AWSConfig':
        return '⚙️';
      case 'GuardDuty':
        return '🔍';
      case 'SecurityHub':
        return '🔐';
      case 'Region':
        return '🌎';
      case 'Route53':
        return '🧭';
      case 'S3Replication':
        return '🔄';
      case 'DynamoDBGlobalTable':
        return '🌐';
      case 'VPCEndpoints':
        return '🔌';
      case 'IAMConditions':
        return '⚖️';
      case 'WAF':
        return '🧱';
      case 'Shield':
        return '🛡️';
      case 'Cognito':
        return '🔐';
      case 'CloudHSM':
        return '🔒';
      case 'KMSCustomKeystore':
        return '🗝️';
      case 'SecretsManager':
        return '🤐';
      default:
        return '📦';
    }
  };

  const style = getResourceStyle(resource.type);
  const icon = getResourceIcon(resource.type);

  return (
    <div
      className="resource-item"
      style={style}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('resourceId', resource.id);
        onDragStart(resource);
      }}
    >
      <div style={{ fontSize: '24px', marginBottom: '5px' }}>{icon}</div>
      <div style={{ fontSize: '12px', textAlign: 'center' }}>{resource.name}</div>
    </div>
  );
};

export default ResourceItem;
