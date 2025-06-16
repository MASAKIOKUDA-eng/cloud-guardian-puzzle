import React, { useState, useEffect } from 'react';
import { SecurityRules } from '../models/SecurityRules';

/**
 * セキュリティルール表示コンポーネント
 */
const SecurityRuleDisplay3D = ({ matchedRules = [] }) => {
  const [activeRules, setActiveRules] = useState([]);
  
  // マッチしたルールを表示
  useEffect(() => {
    if (matchedRules.length > 0) {
      setActiveRules(prev => [...prev, ...matchedRules]);
      
      // 5秒後にマッチしたルールを非表示
      const timer = setTimeout(() => {
        setActiveRules(prev => prev.filter(rule => !matchedRules.includes(rule)));
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [matchedRules]);
  
  return (
    <div className="security-rules">
      <h3>セキュリティルール</h3>
      
      <div className="rules-list">
        {SecurityRules.map((rule, index) => (
          <div
            key={index}
            className={`rule-item ${activeRules.some(r => r.name === rule.name) ? 'active' : ''}`}
          >
            <h4>{rule.name}</h4>
            <p>{rule.description}</p>
            <span className="points">{rule.points}ポイント</span>
          </div>
        ))}
      </div>
      
      {activeRules.length > 0 && (
        <div className="matched-rules">
          <h4>達成したルール:</h4>
          <ul>
            {activeRules.map((rule, index) => (
              <li key={index}>
                {rule.name} (+{rule.points}ポイント)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SecurityRuleDisplay3D;
