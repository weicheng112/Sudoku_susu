# Sudoku_susu

## How to install

1. Make sure you have Node.js installed on your computer
2. Clone this project
3. Install the solver (not actually needed, it's a part of experiment from developer side):
   ```
   cd solver
   npm install
   ```
4. Install the web app:
   ```
   cd sudoku-app
   npm install
   ```

## How to run

To start the game:

```
cd sudoku-app
npm start
```

This will open the game in your web browser at http://localhost:3000

## Features

- Interactive Sudoku board
- Keyboard navigation
- Solution checking
- Reset functionality
- Solver algorithm

## Project structure

- `solver/`: Contains the Sudoku solving algorithm (for testing purpose, I put all of them in utils folder at frontend)
- `sudoku-app/`: Contains the React web app
