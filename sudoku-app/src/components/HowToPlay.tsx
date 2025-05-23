import React, { useState } from "react";

const HowToPlay: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleGuide = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="how-to-play">
      <button onClick={toggleGuide} className="guide-toggle">
        {isExpanded ? "Hide Guide" : "How to Play"}
      </button>

      {isExpanded && (
        <div className="guide-content">
          <h3>How to Play Sudoku</h3>
          <ol>
            <li>
              <strong>Goal:</strong> Fill the 9×9 grid so that each row, column,
              and 3×3 box contains all digits from 1 to 9 without repetition.
            </li>
            <li>
              <strong>Starting Point:</strong> Some cells are already filled
              with numbers (shown in bold). These cannot be changed.
            </li>
            <li>
              <strong>Playing:</strong>
              <ul>
                <li>Click on an empty cell to select it</li>
                <li>Type a number (1-9) to fill the cell</li>
                <li>Use Backspace or Delete to clear a cell</li>
                <li>Use arrow keys to navigate between cells</li>
              </ul>
            </li>
            <li>
              <strong>Checking:</strong> Click "Check Solution" when you've
              filled all cells to verify your solution.
            </li>
            <li>
              <strong>Reset:</strong> Click "Reset" to start over.
            </li>
          </ol>
          <p>
            <strong>Tip:</strong> Look for cells where only one number is
            possible based on the row, column, and box constraints.
          </p>
        </div>
      )}
    </div>
  );
};

export default HowToPlay;
