// script.js
const cells = document.querySelectorAll("[data-cell]");
const gameScreen = document.querySelector(".game-screen");
const winnerScreen = document.querySelector(".winner-screen");
const winnerText = document.getElementById("winner-text");
const newGameButton = document.getElementById("new-game-button");

let isXTurn = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game
function startGame() {
  isXTurn = true;
  gameScreen.classList.remove("hidden");
  winnerScreen.classList.add("hidden");

  cells.forEach((cell) => {
    cell.textContent = ""; // Clear cell content
    cell.classList.remove("x", "o");
    cell.addEventListener("click", handleClick, { once: true });
  });
}

// Handle cell click
function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "x" : "o";
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

// Place X or O in the cell
function placeMark(cell, currentClass) {
  cell.textContent = currentClass.toUpperCase(); // Display X or O
  cell.classList.add(currentClass); // Add CSS class for potential styling
}

// Swap turns
function swapTurns() {
  isXTurn = !isXTurn;
}

// Check if the current player has won
function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

// Check for a draw
function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

// End the game
function endGame(draw) {
  if (draw) {
    winnerText.textContent = "It's a draw!";
  } else {
    winnerText.textContent = `${isXTurn ? "X" : "O"} wins!`;
  }
  gameScreen.classList.add("hidden");
  winnerScreen.classList.remove("hidden");
}

// Handle "New Game" button
newGameButton.addEventListener("click", startGame);

// Start the game on page load
startGame();
