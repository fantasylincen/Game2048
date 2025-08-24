import React from 'react';
import './GameInfo.css';

const GameInfo = ({ score, bestScore }) => {
  return (
    <div className="game-info">
      <div className="score-container">
        <div className="score-label">得分</div>
        <div className="score-value">{score}</div>
      </div>
      <div className="score-container">
        <div className="score-label">最高分</div>
        <div className="score-value">{bestScore}</div>
      </div>
    </div>
  );
};

export default GameInfo;