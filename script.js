
const board = document.getElementById("board");

// Create grid
for (let i = 0; i < 81; i++) {
  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 1;
  input.classList.add("cell");

  input.addEventListener("input", () => {
    if (!/[1-9]/.test(input.value)) {
      input.value = "";
    }
  });

  board.appendChild(input);
}

const cells = document.querySelectorAll(".cell");

function getBoard() {
  const grid = [];
  for (let r = 0; r < 9; r++) {
    const row = [];
    for (let c = 0; c < 9; c++) {
      const value = cells[r * 9 + c].value;
      row.push(value === "" ? 0 : parseInt(value));
    }
    grid.push(row);
  }
  return grid;
}

function setBoard(grid) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      cells[r * 9 + c].value = grid[r][c] === 0 ? "" : grid[r][c];
    }
  }
}

function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) {
      return false;
    }
  }

  const startRow = row - row % 3;
  const startCol = col - col % 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;

            if (solveSudoku(board)) {
              return true;
            }

            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

document.getElementById("solveBtn").addEventListener("click", () => {
  const grid = getBoard();

  if (solveSudoku(grid)) {
    setBoard(grid);
    alert("Sudoku solved successfully!");
  } else {
    alert("No solution exists!");
  }
});

document.getElementById("clearBtn").addEventListener("click", () => {
  cells.forEach(cell => cell.value = "");
});

document.getElementById("sampleBtn").addEventListener("click", () => {
  const sample = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ];

  setBoard(sample);
});
