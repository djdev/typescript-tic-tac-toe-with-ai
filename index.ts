// Import stylesheets
import './style.css';

function initiateButtons() {
  const buttons = document.getElementsByTagName('button');

  for (let button of buttons) {
    button.addEventListener('click', buttonEventListener);
    button.setAttribute('class', 'show');
  }
}

initiateButtons();

function buttonEventListener() {
  const buttons = document.getElementsByTagName('button');
  for (let button of buttons) {
    button.setAttribute('class', 'no-show');
  }

  generateBoard();
}

// render board
function generateBoard() {
  const board = document.getElementsByClassName('board');

  for (let i = 0; i < 9; i++) {
    const element = document.createElement('div');
    element.className = 'cell';
    element.innerHTML = '';

    board[0].appendChild(element);
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
