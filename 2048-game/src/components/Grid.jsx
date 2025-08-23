import React from 'react';
import Tile from './Tile';
import './Grid.css';

const Grid = ({ grid }) => {
  return (
    <div className="grid-container">
      <div className="grid-background">
        {Array(16).fill(0).map((_, index) => (
          <div key={index} className="grid-cell"></div>
        ))}
      </div>
      
      <div className="grid-tiles">
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
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