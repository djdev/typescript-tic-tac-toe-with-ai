// Import stylesheets
import './style.css';

let board = ['', '', '', '', '', '', '', '', ''];

function matchesWinningCombo() {
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

function indexComboIsNotEmpty(i1, i2, i3) {
  return board[i1] !== '' && board[i2] !== '' && board[i3] !== '';
}

function isBoardFull() {
  return board.every((item) => item !== '');
}
