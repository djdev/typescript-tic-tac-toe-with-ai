// Import stylesheets
import './style.css';

const container = document.querySelector('container');
const buttons = document.getElementsByClassName('button');
const domBoard = document.querySelector('board');
const aiButton = document.querySelector('with-ai');
const nonAiButton = document.querySelector('non-ai');

const score = {
  ai: 1,
  human: -1,
  draw: 0,
};

let gameMode: string;

// render initial layout
function buttonEventListener() {
  for (let button of buttons) {
    button.setAttribute('class', 'no-show');
  }

  generateBoard();
}

function initiateButtons() {
  for (let button of buttons) {
    button.addEventListener('click', buttonEventListener);
    button.setAttribute('class', 'show');
  }
}

initiateButtons();

// render board when button is clicked, and hide buttons
function generateBoard() {
  for (let i = 0; i < 9; i++) {
    const element = document.createElement('div');
    element.className = 'cell';
    element.innerHTML = '';

    domBoard[0].appendChild(element);
  }
}

// calculate moves, win and loss
let board: Array<string> = ['', '', '', '', '', '', '', '', ''];

function matchesWinningCombo(): boolean {
  return (
    // horizontal combos
    board[0] === board[1] &&
    board[1] === board[2] &&
    indexComboIsNotEmpty(0, 1, 2) &&
    board[3] === board[4] &&
    board[4] === board[5] &&
    indexComboIsNotEmpty(3, 4, 5) &&
    board[6] === board[7] &&
    board[7] === board[8] &&
    indexComboIsNotEmpty(6, 7, 8) &&
    // vertical combos
    board[0] === board[3] &&
    board[3] === board[6] &&
    indexComboIsNotEmpty(0, 3, 6) &&
    board[1] === board[4] &&
    board[4] === board[7] &&
    indexComboIsNotEmpty(1, 4, 7) &&
    board[2] === board[5] &&
    board[5] === board[8] &&
    indexComboIsNotEmpty(2, 5, 8) &&
    // diagonal combos
    board[0] === board[4] &&
    board[4] === board[8] &&
    indexComboIsNotEmpty(0, 4, 8) &&
    board[2] === board[4] &&
    board[4] === board[6] &&
    indexComboIsNotEmpty(2, 4, 6)
  );
}

function indexComboIsNotEmpty(i1: number, i2: number, i3: number): boolean {
  return board[i1] !== '' && board[i2] !== '' && board[i3] !== '';
}

function isBoardFull(): boolean {
  return board.every((item) => item !== '');
}

function min(a: number, b: number): number {
  return a <= b ? a : b;
}

function max(a: number, b: number): number {
  return a >= b ? a : b;
}

function checkWin(): boolean {
  return false;
}

function boardIsFull(): boolean {
  return false;
}

function isGameOver(): boolean {
  return boardIsFull() || checkWin();
}

// Algorithm to set X or O based on whether it is the maximizing or minimizing turn.

// Take the current board,
// current depth of the board,
// isMax flag to decide whether to maximize or minimize for the current turn
function minimax(board: Array<string>, depth: number, isMax: boolean) {
  // base cases for the recursive function.

  // If win condition is generated during maximizing turn,
  // then the condition occured during X's turn (1),
  // otherwise, the condition occured during O's turn (-1).
  if (checkWin()) return isMax ? 1 : -1;

  // If the board is full, there's no further generation of boards and it's a draw (0).
  if (boardIsFull()) return 0;

  if (isMax) {
    // For maximizing turn, the best starts at -Infinity,
    // so that any board value higher than the counter is now considered the best value.
    let best = -Infinity;

    board.forEach((element: string, index: number) => {
      // To check all resulting positions, iterate over the board and,
      // whenever there is an avaible slot set it to X and,
      // run minimax on this position.
      if (element === '') {
        board[index] = 'X';

        let localScores = minimax(board, depth + 1, false);
        board[index] = '';
        best = max(best, localScores);
      }
    });

    return best;
  } else {
    // For maximizing turn, the best starts at Infinity,
    // so that any board value lower than the counter is now considered the best value.
    let best = Infinity;

    board.forEach((element: string, index: number) => {
      // To check all resulting positions, iterate over the board and,
      // whenever there is an avaible slot set it to O and,
      // run minimax on this position.
      if (element === '') {
        board[index] = 'O';

        let localScores = minimax(board, depth + 1, true);
        board[index] = '';
        best = min(best, localScores);
      }
    });

    return best;
  }
}
