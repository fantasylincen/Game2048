import React from 'react';
import './Tile.css';

const Tile = ({ value, row, col }) => {
  if (value === 0) return null;
  
  const tileClass = `tile tile-${value} tile-position-${row}-${col}`;
  
  return (
    <div className={tileClass}>
      {value}
    </div>
  );
};

export default Tile;