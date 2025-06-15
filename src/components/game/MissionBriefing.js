import React, { useState } from 'react';

const MissionBriefing = ({ description, objectives }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div 
      className="mission-briefing"
      style={{
        backgroundColor: '#232f3e',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        margin: '1rem 0',
        position: 'relative'
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <h3 style={{ margin: 0 }}>ミッション概要</h3>
        <button 
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
        >
          {expanded ? '▼' : '▶'}
        </button>
      </div>
      
      {expanded && (
        <div style={{ marginTop: '10px' }}>
          <p>{description}</p>
          
          <h4 style={{ marginTop: '15px', marginBottom: '10px' }}>目標:</h4>
          <ul style={{ paddingLeft: '20px' }}>
            {objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MissionBriefing;
