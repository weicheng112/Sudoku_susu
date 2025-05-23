import { sudokuBoard } from "./utils/types";

export type { sudokuBoard };

export interface Cell {
  value: number;
  isInitial: boolean;
}

export interface SudokuGameState {
  board: sudokuBoard;
  cellDetails: Cell[][];
  selectedCell: { row: number; col: number } | null;
  isSolved: boolean;
}

export interface SudokuCellProps {
  cell: Cell;
  row: number;
  col: number;
  isSelected: boolean;
  onClick: (row: number, col: number) => void;
  onKeyDown: (row: number, col: number, key: string) => void;
}
