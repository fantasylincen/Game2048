import React, { useState, useEffect, useCallback } from 'react';
import { 
  initializeGrid, 
  handleMove, 
  checkWin, 
  checkGameOver 
} from '../utils/gameLogic';
import soundManager from '../utils/soundManager';
import useTouchControls from '../hooks/useTouchControls';
import Grid from './Grid';
import GameInfo from './GameInfo';
import './Game.css';

const Game = () => {
  const [grid, setGrid] = useState(() => initializeGrid());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('2048-bestScore')) || 0;
    } catch (error) {
      console.warn('无法从 localStorage 读取最高分：', error);
      return 0;
    }
  });
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('2048-soundEnabled');
      return saved !== null ? saved === 'true' : true;
    } catch (error) {
      console.warn('无法从 localStorage 读取音效设置：', error);
      return true;
    }
  });

  // 处理移动操作（键盘和触摸通用）
  const performMove = useCallback((direction) => {
    if (gameOver && !showWinMessage) return;
    
    const result = handleMove(grid, direction);
    if (result.moved) {
      setGrid(result.grid);
      const newScore = score + result.score;
      setScore(newScore);
      
      // 更新最高分
      if (newScore > bestScore) {
        setBestScore(newScore);
        try {
          localStorage.setItem('2048-bestScore', newScore.toString());
        } catch (error) {
          console.warn('无法保存最高分到 localStorage：', error);
        }
      }
      
      // 检查胜利
      if (!gameWon && checkWin(result.grid)) {
        setGameWon(true);
        setShowWinMessage(true);
        // 播放胜利音效
        if (soundEnabled) {
          soundManager.playWinSound();
        }
      }
      
      // 检查游戏结束
      if (checkGameOver(result.grid)) {
        setGameOver(true);
        // 播放失败音效
        if (soundEnabled) {
          soundManager.playGameOverSound();
        }
      }
    } else {
      // 无效移动音效
      if (soundEnabled) {
        soundManager.playInvalidMoveSound();
      }
    }
  }, [grid, score, bestScore, gameWon, gameOver, showWinMessage, soundEnabled]);

  // 处理键盘输入
  const handleKeyPress = useCallback((event) => {
    const validKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (!validKeys.includes(event.key)) return;
    
    event.preventDefault();
    performMove(event.key);
  }, [performMove]);

  // 触摸控制ref
  const gameContainerRef = useTouchControls(performMove);

  // 监听键盘事件和初始化
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    // 初始化音效系统
    soundManager.setEnabled(soundEnabled);
    
    // 启动用户交互监听，等待用户第一次交互时初始化音频
    if (soundEnabled) {
      soundManager.initOnUserInteraction();
    }
    
    // 清理函数：组件卸载时确保数据得到保存
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      // 确保最高分得到保存
      try {
        localStorage.setItem('2048-bestScore', bestScore.toString());
        localStorage.setItem('2048-soundEnabled', soundEnabled.toString());
      } catch (error) {
        console.warn('组件卸载时无法保存数据：', error);
      }
    };
  }, [handleKeyPress, soundEnabled, bestScore]);

  // 切换音效状态
  const toggleSound = () => {
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    soundManager.setEnabled(newSoundEnabled);
    
    // 如果启用音效，初始化用户交互监听
    if (newSoundEnabled) {
      soundManager.initOnUserInteraction();
    }
    
    try {
      localStorage.setItem('2048-soundEnabled', newSoundEnabled.toString());
    } catch (error) {
      console.warn('无法保存音效设置到 localStorage：', error);
    }
  };

  // 重新开始游戏
  const restartGame = () => {
    setGrid(initializeGrid());
    setScore(0);
    setGameWon(false);
    setGameOver(false);
    setShowWinMessage(false);
  };

  // 继续游戏（胜利后）
  const continueGame = () => {
    setShowWinMessage(false);
  };

  return (
    <div className="game">
      <div className="game-header">
        <h1 className="game-title">2048</h1>
        <div className="game-controls">
          <GameInfo score={score} bestScore={bestScore} />
          <div className="control-buttons">
            <button className="sound-button" onClick={toggleSound}>
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            <button className="restart-button" onClick={restartGame}>
              重新开始
            </button>
          </div>
        </div>
      </div>
      
      <div className="game-container" ref={gameContainerRef}>
        <Grid grid={grid} />
        
        {showWinMessage && (
          <div className="game-message">
            <div className="message-content">
              <h2>你赢了！</h2>
              <p>恭喜你达到了2048！</p>
              <div className="message-buttons">
                <button onClick={continueGame}>继续游戏</button>
                <button onClick={restartGame}>重新开始</button>
              </div>
            </div>
          </div>
        )}
        
        {gameOver && !showWinMessage && (
          <div className="game-message">
            <div className="message-content">
              <h2>游戏结束</h2>
              <p>没有更多移动了！</p>
              <div className="message-buttons">
                <button onClick={restartGame}>重新开始</button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="game-instructions">
        <p><strong>如何游戏：</strong></p>
        <p className="instruction-desktop">💻 电脑：使用方向键移动方块</p>
        <p className="instruction-mobile">📱 手机：滑动屏幕移动方块</p>
        <p>当两个相同数字的方块接触时，它们会合并成一个！目标是达到2048！</p>
      </div>
    </div>
  );
};

export default Game;