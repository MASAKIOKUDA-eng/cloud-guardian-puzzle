import React from 'react';
import ResourceItem from './ResourceItem';

const GameGrid = ({ placedResources, onPlaceResource, onRemoveResource }) => {
  // グリッドのサイズ
  const gridSize = 6;
  
  // グリッドセルの作成
  const renderGridCells = () => {
    const cells = [];
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const position = `${row}-${col}`;
        const placedResource = placedResources.find(
          resource => resource.position === position
        );
        
        cells.push(
          <div
            key={position}
            className="grid-cell"
            style={{
              width: '120px',
              height: '120px',
              border: '1px dashed #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const resourceId = e.dataTransfer.getData('resourceId');
              onPlaceResource(resourceId, position);
            }}
          >
            {placedResource ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <ResourceItem
                  resource={placedResource}
                  onDragStart={() => {}}
                />
                <button
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'rgba(255, 0, 0, 0.7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                  onClick={() => onRemoveResource(placedResource.id)}
                >
                  ×
                </button>
              </div>
            ) : (
              <span style={{ color: '#ccc' }}>{position}</span>
            )}
          </div>
        );
      }
    }
    
    return cells;
  };
  
  return (
    <div className="game-grid">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 120px)`,
          gridTemplateRows: `repeat(${gridSize}, 120px)`,
          gap: '10px',
          margin: '20px 0',
          justifyContent: 'center'
        }}
      >
        {renderGridCells()}
      </div>
    </div>
  );
};

export default GameGrid;
