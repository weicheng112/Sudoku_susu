import { sudokuBoard } from "./types";
// Solves the board
export function solve(board: sudokuBoard): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // Skip filled cells
      if (board[row][col] === 0) {
        // Try placing 1–9
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            // backtracking
            if (solve(board)) return true;
            // undo and try next number
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Checks if placing 'num' at (row, col) is allowed
function isValid(
  board: sudokuBoard,
  row: number,
  col: number,
  num: number
): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
    const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const boxCol = 3 * Math.floor(col / 3) + (i % 3);
    if (board[boxRow][boxCol] === num) return false;
  }
  return true;
}
