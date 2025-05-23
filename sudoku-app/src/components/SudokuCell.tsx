import React from "react";
import { SudokuCellProps } from "../types";

const SudokuCell: React.FC<SudokuCellProps> = ({
  cell,
  row,
  col,
  isSelected,
  onClick,
  onKeyDown,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    onKeyDown(row, col, e.key);
  };

  return (
    <div
      className={`sudoku-cell ${isSelected ? "selected" : ""} ${
        cell.isInitial ? "initial" : ""
      }`}
      onClick={() => onClick(row, col)}
      onKeyDown={handleKeyDown}
      tabIndex={isSelected ? 0 : -1}
      data-testid="sudoku-cell"
    >
      {cell.value !== 0 ? (
        <span className="cell-value">{cell.value}</span>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default SudokuCell;
