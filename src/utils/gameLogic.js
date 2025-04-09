export const getValidMoves = (board, row, col) => {
  const moves = [];
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  directions.forEach(([dx, dy]) => {
    let newRow = row + dx;
    let newCol = col + dy;
    
    while (
      newRow >= 0 && newRow < 10 &&
      newCol >= 0 && newCol < 10 &&
      board[newRow][newCol] === 0
    ) {
      moves.push([newRow, newCol]);
      newRow += dx;
      newCol += dy;
    }
  });

  return moves;
};

export const createInitialBoard = () => {
  const board = Array(10).fill(0).map(() => Array(10).fill(0));
  
  // Black pieces (Player 1)
  board[0][3] = 1;
  board[0][6] = 1;
  board[3][0] = 1;
  board[3][9] = 1;
  
  // White pieces (Player 2)
  board[6][0] = 2;
  board[6][9] = 2;
  board[9][3] = 2;
  board[9][6] = 2;
  
  return board;
};

export const hasValidMoves = (board, player) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] === player) {
        const moves = getValidMoves(board, i, j);
        if (moves.length > 0) return true;
      }
    }
  }
  return false;
};