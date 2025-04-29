// List of possible words (this is a small sample - you can add more)
const WORDS = ['APPLE', 'BEACH', 'CHAIR', 'DANCE', 'EAGLE', 'FLAME', 'GRAPE', 'HOUSE'];

// Game state
let targetWord = WORDS[Math.floor(Math.random() * WORDS.length)];
let currentRow = 0;
let currentTile = 0;
let gameOver = false;

// Get all rows and message element
const rows = document.querySelectorAll('.row');
const messageElement = document.getElementById('message');

// Listen for keypress events
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
    if (gameOver) return;

    if (e.key === 'Enter') {
        if (currentTile === 5) {
            checkGuess();
        }
    } else if (e.key === 'Backspace') {
        if (currentTile > 0) {
            currentTile--;
            rows[currentRow].children[currentTile].textContent = '';
        }
    } else if (isLetter(e.key) && currentTile < 5) {
        rows[currentRow].children[currentTile].textContent = e.key.toUpperCase();
        currentTile++;
    }
}

function isLetter(key) {
    return /^[a-zA-Z]$/.test(key);
}

function checkGuess() {
    const tiles = rows[currentRow].children;
    const guess = Array.from(tiles).map(tile => tile.textContent).join('');
    
    // Create a map for remaining letters to handle duplicate letters correctly
    let remainingLetters = {};
    for (let letter of targetWord) {
        remainingLetters[letter] = (remainingLetters[letter] || 0) + 1;
    }

    // First pass: mark correct letters
    for (let i = 0; i < 5; i++) {
        if (guess[i] === targetWord[i]) {
            tiles[i].classList.add('correct');
            remainingLetters[guess[i]]--;
        }
    }

    // Second pass: mark present and absent letters
    for (let i = 0; i < 5; i++) {
        if (guess[i] !== targetWord[i]) {
            if (remainingLetters[guess[i]] > 0) {
                tiles[i].classList.add('present');
                remainingLetters[guess[i]]--;
            } else {
                tiles[i].classList.add('absent');
            }
        }
    }

    // Check if won
    if (guess === targetWord) {
        messageElement.textContent = 'Congratulations! You won!';
        gameOver = true;
        return;
    }

    // Move to next row or end game
    currentRow++;
    currentTile = 0;

    if (currentRow === 6) {
        messageElement.textContent = `Game Over! The word was ${targetWord}`;
        gameOver = true;
    }
}