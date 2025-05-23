import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders the header with title", () => {
    render(<App />);
    const headerElement = screen.getByText(/Sudoku Solver/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("renders the SudokuBoard component", () => {
    render(<App />);
    const boardContainer = screen.getByRole("main");
    expect(boardContainer).toBeInTheDocument();
  });
});
