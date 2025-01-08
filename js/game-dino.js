// Get references to important elements in the game
const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('timer');
const gameOverMessage = document.getElementById('game-over-message');
const resetBtn = document.getElementById('reset-btn');

// Variables to manage game state
let isJumping = false;
let score = 0;
let isGameOver = false;

// Variables for increasing difficulty
let difficultyIncreaseInterval;
let obstacleSpeed = 2; // Initial obstacle speed

// Event listener for jumping when the spacebar is pressed
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping && !isGameOver) {
        jump(); // Trigger jump if spacebar is pressed
    }
});

// Jump function to animate the dinosaur's jump
function jump() {
    isJumping = true;
    let jumpHeight = -8;
    let upInterval = setInterval(() => {
        if (jumpHeight >= 120) {
            clearInterval(upInterval); // Stop going up when the maximum height is reached
            let downInterval = setInterval(() => {
                if (jumpHeight <= -8) {
                    clearInterval(downInterval); // Stop when reaching the starting position
                    isJumping = false;
                } else {
                    jumpHeight -= 10; // Lower the dinosaur
                    dino.style.bottom = `${jumpHeight}px`;
                }
            }, 20);
        } else {
            jumpHeight += 10; // Raise the dinosaur
            dino.style.bottom = `${jumpHeight}px`;
        }
    }, 20);
}

// Function to increase obstacle speed as the game progresses
function increaseDifficulty() {
    if (isGameOver) return;

    obstacleSpeed -= 0.2; // Increase speed by decreasing the duration of the animation
    const newSpeed = Math.max(0.8, obstacleSpeed); // Minimum speed limit
    obstacle.style.animationDuration = `${newSpeed}s`;
}

// Start a timer to increase difficulty every 4 seconds
function startDifficultyTimer() {
    difficultyIncreaseInterval = setInterval(increaseDifficulty, 4000);
}

// Collision detection function
function checkCollision() {
    if (isGameOver) return;

    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    // Calculate the center points of the dinosaur and the obstacle
    const dinoCenterX = dinoRect.left + dinoRect.width / 2;
    const dinoCenterY = dinoRect.top + dinoRect.height / 2;
    const obstacleCenterX = obstacleRect.left + obstacleRect.width / 2;
    const obstacleCenterY = obstacleRect.top + obstacleRect.height / 2;

    // Calculate the difference in X and Y coordinates
    const deltaX = Math.abs(dinoCenterX - obstacleCenterX);
    const deltaY = Math.abs(dinoCenterY - obstacleCenterY);

    // Set collision thresholds for X and Y
    const collisionThresholdX = (dinoRect.width + obstacleRect.width) / 2 - 30;
    const collisionThresholdY = (dinoRect.height + obstacleRect.height) / 2 - 30;

    // If the differences are smaller than the thresholds, a collision has occurred
    if (deltaX < collisionThresholdX && deltaY < collisionThresholdY) {
        gameOver(); // Trigger game over
    }
}

// Game over function
function gameOver() {
    isGameOver = true;
    obstacle.classList.add('paused'); // Pause the obstacle animation
    gameOverMessage.textContent = `Game Over! Your time: ${score}s`;
    gameOverMessage.style.display = 'block'; // Show the game over message
    resetBtn.style.display = 'block'; // Show the reset button

    // Save the high score if it exceeds the global high score
    const globalHighScore = parseInt(localStorage.getItem('globalHighScore') || 0);
    if (score > globalHighScore) {
        localStorage.setItem('globalHighScore', score);
    }

    // Save the high score for the current user if logged in
    const userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};
    if (score > (userDetails.highScore || 0)) {
        userDetails.highScore = score;
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }

    clearInterval(difficultyIncreaseInterval); // Stop increasing difficulty when the game is over
}

// Reset game function
function resetGame() {
    score = 0;
    isGameOver = false;
    gameOverMessage.style.display = 'none'; // Hide the game over message
    resetBtn.style.display = 'none'; // Hide the reset button
    scoreDisplay.textContent = `Timer: ${score}s`; // Reset the score display

    obstacle.classList.remove('paused'); // Remove the pause from the obstacle
    obstacle.style.right = '-60px'; // Reset obstacle position

    obstacleSpeed = 2; // Reset obstacle speed
    obstacle.style.animationDuration = `${obstacleSpeed}s`; // Reset the speed animation

    obstacle.style.animation = 'none'; // Reset the obstacle animation
    setTimeout(() => {
        obstacle.style.animation = ''; // Restart the animation
    }, 10);

    dino.style.bottom = '-8px'; // Reset the dinosaur position

    clearInterval(difficultyIncreaseInterval); // Prevent duplicate timers
    startDifficultyTimer(); // Restart the difficulty timer
}

// Update the score every second
function updateScore() {
    if (!isGameOver) {
        score++;
        scoreDisplay.textContent = `Timer: ${score}s`; // Update the score display
    }
}

// Check for collisions every 10ms
setInterval(checkCollision, 10);

// Update the score every second
setInterval(updateScore, 1000);

// Start the difficulty timer when the game begins
startDifficultyTimer();

// Add event listener to reset the game when the reset button is clicked
resetBtn.addEventListener('click', () => {
    resetGame();
});
