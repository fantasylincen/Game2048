import React from 'react';
import Tile from './Tile';
import './Grid.css';

const Grid = ({ grid }) => {
  return (
    <div className="grid-container">
      <div className="grid-tiles">
        {/* 背景格子 */}
        {Array(16).fill(0).map((_, index) => (
          <div key={`cell-${index}`} className="grid-cell"></div>
        ))}
        
        {/* 实际方块 */}
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Tile
              key={`tile-${rowIndex}-${colIndex}`}
              value={value}
              row={rowIndex}
              col={colIndex}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;