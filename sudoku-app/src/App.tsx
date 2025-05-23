import SudokuBoard from "./components/SudokuBoard";
import HowToPlay from "./components/HowToPlay";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sudoku Solver</h1>
      </header>
      <main>
        <HowToPlay />
        <SudokuBoard />
      </main>
    </div>
  );
}

export default App;
