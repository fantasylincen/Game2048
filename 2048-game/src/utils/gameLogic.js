// 2048 游戏核心逻辑
import soundManager from './soundManager';

// 初始化空的4x4游戏网格
export const initializeGrid = () => {
  const grid = Array(4).fill(null).map(() => Array(4).fill(0));
  return addRandomTile(addRandomTile(grid));
};

// 在随机空位置添加新数字（2或4）
export const addRandomTile = (grid, playSound = true) => {
  const emptyCells = [];
  
  // 找到所有空位置
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }
  
  if (emptyCells.length === 0) return grid;
  
  // 随机选择一个空位置
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { row, col } = emptyCells[randomIndex];
  
  // 90%概率是2，10%概率是4
  const newValue = Math.random() < 0.9 ? 2 : 4;
  
  const newGrid = grid.map(row => [...row]);
  newGrid[row][col] = newValue;
  
  // 播放新方块音效
  if (playSound) {
    soundManager.playNewTileSound();
  }
  
  return newGrid;
};

// 向左移动并合并
export const moveLeft = (grid) => {
  let newGrid = grid.map(row => [...row]);
  let moved = false;
  let score = 0;
  let hasMerged = false;
  
  for (let i = 0; i < 4; i++) {
    const row = newGrid[i];
    const filteredRow = row.filter(cell => cell !== 0);
    const mergedRow = [];
    let j = 0;
    
    while (j < filteredRow.length) {
      if (j < filteredRow.length - 1 && filteredRow[j] === filteredRow[j + 1]) {
        // 合并相同的数字
        const mergedValue = filteredRow[j] * 2;
        mergedRow.push(mergedValue);
        score += mergedValue;
        hasMerged = true;
        
        // 播放合并音效
        soundManager.playMergeSound(mergedValue);
        
        j += 2;
      } else {
        mergedRow.push(filteredRow[j]);
        j++;
      }
    }
    
    // 用0填充剩余位置
    while (mergedRow.length < 4) {
      mergedRow.push(0);
    }
    
    // 检查是否有移动
    for (let k = 0; k < 4; k++) {
      if (row[k] !== mergedRow[k]) {
        moved = true;
      }
    }
    
    newGrid[i] = mergedRow;
  }
  
  // 播放移动音效（只有当有移动但没有合并时）
  if (moved && !hasMerged) {
    soundManager.playMoveSound();
  }
  
  return { grid: newGrid, moved, score };
};

// 向右移动并合并
export const moveRight = (grid) => {
  // 水平翻转，向左移动，再翻转回来
  const flippedGrid = grid.map(row => [...row].reverse());
  const { grid: movedGrid, moved, score } = moveLeft(flippedGrid);
  const resultGrid = movedGrid.map(row => [...row].reverse());
  
  return { grid: resultGrid, moved, score };
};

// 向上移动并合并
export const moveUp = (grid) => {
  // 转置矩阵，向左移动，再转置回来
  const transposedGrid = transpose(grid);
  const { grid: movedGrid, moved, score } = moveLeft(transposedGrid);
  const resultGrid = transpose(movedGrid);
  
  return { grid: resultGrid, moved, score };
};

// 向下移动并合并
export const moveDown = (grid) => {
  // 转置矩阵，向右移动，再转置回来
  const transposedGrid = transpose(grid);
  const { grid: movedGrid, moved, score } = moveRight(transposedGrid);
  const resultGrid = transpose(movedGrid);
  
  return { grid: resultGrid, moved, score };
};

// 矩阵转置
const transpose = (matrix) => {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
};

// 检查游戏是否胜利（有2048）
export const checkWin = (grid) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 2048) {
        return true;
      }
    }
  }
  return false;
};

// 检查游戏是否结束（无法移动）
export const checkGameOver = (grid) => {
  // 检查是否还有空格
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        return false;
      }
    }
  }
  
  // 检查是否还可以合并
  // 检查水平方向
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === grid[i][j + 1]) {
        return false;
      }
    }
  }
  
  // 检查垂直方向
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === grid[i + 1][j]) {
        return false;
      }
    }
  }
  
  return true;
};

// 处理移动操作
export const handleMove = (grid, direction) => {
  let result;
  
  switch (direction) {
    case 'ArrowLeft':
      result = moveLeft(grid);
      break;
    case 'ArrowRight':
      result = moveRight(grid);
      break;
    case 'ArrowUp':
      result = moveUp(grid);
      break;
    case 'ArrowDown':
      result = moveDown(grid);
      break;
    default:
      return { grid, moved: false, score: 0 };
  }
  
  if (result.moved) {
    result.grid = addRandomTile(result.grid);
  }
  
  return result;
};