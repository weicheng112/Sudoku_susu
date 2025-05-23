import React, { useState, useEffect, useCallback } from "react";
import SudokuCell from "./SudokuCell";
import { Cell, SudokuGameState, sudokuBoard } from "../types";
import { solve } from "../utils/solver";

// TODO : hardcode the initial board for now
// TODO : add a function to generate a random board
const initialBoard: sudokuBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const SudokuBoard: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const [gameState, setGameState] = useState<SudokuGameState>(() => {
    const board = JSON.parse(JSON.stringify(initialBoard)) as sudokuBoard;
    const cellDetails: Cell[][] = Array(9)
      .fill(null)
      .map((_, row) =>
        Array(9)
          .fill(null)
          .map((_, col) => ({
            value: board[row][col],
            isInitial: board[row][col] !== 0,
          }))
      );

    return {
      board,
      cellDetails,
      selectedCell: null,
      isSolved: false,
    };
  });

  const isBoardFilled = useCallback(() => {
    return gameState.board.every((row) => row.every((cell) => cell !== 0));
  }, [gameState.board]);

  const handleCellClick = (row: number, col: number) => {
    setGameState((prev) => ({
      ...prev,
      selectedCell: { row, col },
    }));
  };

  const handleKeyDown = useCallback(
    (row: number, col: number, key: string) => {
      if (gameState.cellDetails[row][col].isInitial) return;

      if (/^[1-9]$/.test(key)) {
        const value = parseInt(key);
        setGameState((prev) => {
          const newBoard = [...prev.board];
          const newCellDetails = [...prev.cellDetails];

          newBoard[row][col] = value;
          newCellDetails[row][col] = {
            ...newCellDetails[row][col],
            value,
          };

          return { ...prev, board: newBoard, cellDetails: newCellDetails };
        });
      } else if (["Backspace", "Delete", "0"].includes(key)) {
        setGameState((prev) => {
          const newBoard = [...prev.board];
          const newCellDetails = [...prev.cellDetails];

          newBoard[row][col] = 0;
          newCellDetails[row][col] = {
            ...newCellDetails[row][col],
            value: 0,
          };

          return { ...prev, board: newBoard, cellDetails: newCellDetails };
        });
      }
    },
    [gameState.cellDetails]
  );

  const checkSolution = () => {
    if (!isBoardFilled()) {
      setMessage("Please fill in all cells before checking your solution.");
      return;
    }

    const userSolution = JSON.parse(
      JSON.stringify(gameState.board)
    ) as sudokuBoard;
    const solvedBoard = JSON.parse(JSON.stringify(initialBoard)) as sudokuBoard;

    solve(solvedBoard);

    const isCorrect = userSolution.every((row, i) =>
      row.every((value, j) => value === solvedBoard[i][j])
    );

    if (isCorrect) {
      setMessage("Congratulations! Your solution is correct!");
      setGameState((prev) => ({ ...prev, isSolved: true }));
    } else {
      setMessage("Sorry, your solution is incorrect. Please try again.");
    }
  };

  const resetPuzzle = () => {
    const board = JSON.parse(JSON.stringify(initialBoard)) as sudokuBoard;
    const cellDetails: Cell[][] = Array(9)
      .fill(null)
      .map((_, row) =>
        Array(9)
          .fill(null)
          .map((_, col) => ({
            value: board[row][col],
            isInitial: board[row][col] !== 0,
          }))
      );

    setGameState({
      board,
      cellDetails,
      selectedCell: null,
      isSolved: false,
    });
    setMessage(null);
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!gameState.selectedCell) return;

      const { row, col } = gameState.selectedCell;
      const move = (r: number, c: number) =>
        setGameState((prev) => ({
          ...prev,
          selectedCell: { row: r, col: c },
        }));

      switch (e.key) {
        case "ArrowUp":
          if (row > 0) move(row - 1, col);
          break;
        case "ArrowDown":
          if (row < 8) move(row + 1, col);
          break;
        case "ArrowLeft":
          if (col > 0) move(row, col - 1);
          break;
        case "ArrowRight":
          if (col < 8) move(row, col + 1);
          break;
        default:
          handleKeyDown(row, col, e.key);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [gameState.selectedCell, handleKeyDown]);

  return (
    <div className="sudoku-container">
      <div className="sudoku-board">
        {gameState.cellDetails.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                row={rowIndex}
                col={colIndex}
                isSelected={
                  gameState.selectedCell?.row === rowIndex &&
                  gameState.selectedCell?.col === colIndex
                }
                onClick={handleCellClick}
                onKeyDown={handleKeyDown}
              />
            ))}
          </div>
        ))}
      </div>

      {message && (
        <div
          className={`message ${
            message.includes("Congratulations") ? "success" : "error"
          }`}
        >
          {message}
        </div>
      )}

      <div className="controls">
        <button
          onClick={checkSolution}
          disabled={gameState.isSolved || !isBoardFilled()}
        >
          Check Solution
        </button>
        <button onClick={resetPuzzle}>Reset</button>
      </div>
    </div>
  );
};

export default SudokuBoard;
