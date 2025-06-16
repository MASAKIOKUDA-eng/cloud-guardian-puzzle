import React from 'react';

/**
 * セキュリティルール表示コンポーネント
 */
const SecurityRuleDisplay = ({ matchedRules, title = "達成したセキュリティルール" }) => {
  if (matchedRules.length === 0) {
    return null;
  }
  
  return (
    <div className="security-rule-display">
      <h3>{title}</h3>
      <ul className="rule-list">
        {matchedRules.map((rule, index) => (
          <li key={index} className="rule-item">
            <span className="rule-name">{rule.name}</span>
            <span className="rule-points">+{rule.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecurityRuleDisplay;
