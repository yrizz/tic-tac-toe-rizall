let gameBoard = [];
let currentPlayer = 'X';
let winner = null;
let gameHistory = [];

// Initialize game board
for (let i = 0; i < 9; i++) {
  gameBoard.push(document.getElementById(`cell-${i}`));
  gameBoard[i].addEventListener('click', handleCellClick);
}

document.getElementById('reset-button').addEventListener('click', resetGame);

function handleCellClick(event) {
  const cellIndex = parseInt(event.target.id.split('-')[1]);
  if (gameBoard[cellIndex].textContent === '' && winner === null) {
    gameBoard[cellIndex].textContent = currentPlayer;
    gameBoard[cellIndex].classList.add(currentPlayer);
    gameHistory.push(cellIndex);
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    if (gameBoard[combination[0]].textContent === gameBoard[combination[1]].textContent &&
        gameBoard[combination[1]].textContent === gameBoard[combination[2]].textContent &&
        gameBoard[combination[0]].textContent !== '') {
      winner = gameBoard[combination[0]].textContent;
      document.getElementById('game-status').textContent = `Player ${winner} wins!`;
      return;
    }
  }

  if (gameHistory.length === 9) {
    document.getElementById('game-status').textContent = `It's a draw!`;
  }
}

function resetGame() {
  gameBoard.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
  winner = null;
  gameHistory = [];
  currentPlayer = 'X';
  document.getElementById('game-status').textContent = `Game in progress...`;
}