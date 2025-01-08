const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const timerDisplay = document.getElementById("timerDisplay");

const gameMessage = document.getElementById("gameMessage");
const messageText = document.getElementById("messageText");
const playAgainButton = document.getElementById("playAgain");

const chHighScore = parseInt(localStorage.getItem('chHighScore') || 0);
const userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};

let chickens = [];
let eggs = [];
let gameOver = false;
let gameTime=0;
let timerInterval;
const gameAreaWidth = gameArea.offsetWidth;
const gameAreaHeight = gameArea.offsetHeight;

// Start the game by clicking the button
startButton.addEventListener("click", () => {
    startButton.style.display = "none"; // Hide the button
    startGame();
});

playAgainButton.addEventListener("click", () => {
    gameMessage.style.display = "none"; // Hide the message
    startGame();
});

function startGame() {
    gameOver = false;
    gameTime = 0;
    playerMove();
    createChickenRows();
    startTimer();
}

// Create rows of chickens
function createChickenRows() {
    const rows = 4; // Number of rows
    const cols = 8; // Number of columns
    const chickenSpacingX = 70; // Spacing between chickens on X-axis
    const chickenSpacingY = 60; // Spacing between chickens on Y-axis
    const borderOffset = 55; //
    const startX = borderOffset; // Starting position on X-axis
    const startY = borderOffset; // Starting position on Y-axis

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const chicken = document.createElement("div");
            chicken.classList.add("chicken");
            chicken.style.left = `${startX + col * chickenSpacingX}px`;
            chicken.style.top = `${startY + row * chickenSpacingY}px`;
            gameArea.appendChild(chicken);
            chickens.push(chicken);

            // Start movement animation for each chicken
            animateChicken(chicken);
            if (Math.random() < 0.7) {
                chicken.layRate = Math.random() * 15000 + 5000; // Egg rate between 10-25 seconds
                setTimeout(() => layEgg(chicken), chicken.layRate);
            }
        }
    }
}

// Move the player
function playerMove() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            const newLeft = Math.max(0, player.offsetLeft - 10);
            player.style.left = `${newLeft}px`;
        }
        if (e.key === "ArrowRight") {
            const newLeft = Math.min(gameAreaWidth - 50, player.offsetLeft + 10);
            player.style.left = `${newLeft}px`;
        }
        if (e.key === " ") {
            shootBullet();
        }
    });
}

// Create bullets
function shootBullet() {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");

    // Set the initial position of the bullet relative to the player
    bullet.style.left = `${player.offsetLeft + player.offsetWidth / 2 - 27}px`;
    bullet.style.top = `${player.offsetTop}px`;

    // Add the bullet to the game area
    gameArea.appendChild(bullet);

    // Move the bullet upwards
    const interval = setInterval(() => {
        const bulletTop = parseInt(bullet.style.top);
        if (bulletTop <= 0) {
            clearInterval(interval); // Remove the bullet when it exits the frame
            bullet.remove();
        }
        else {
            bullet.style.top = `${bulletTop - 10}px`;
            // Check for collisions with chickens
            chickens.forEach((chicken, index) => {
                if (checkCollision(bullet, chicken)) {
                    // Remove the bullet
                    clearInterval(interval);
                    bullet.remove();

                    // Remove the chicken
                    chicken.remove();
                    chickens.splice(index, 1);

                    // Check if all chickens are removed
                    if (chickens.length === 0) {
                        // endGame(); // End the game
                        endGame("What a win!"); // Show victory message
                        // clearInterval(timerInterval);
                        // gameTime=0;
                    }
                    // Exit the loop because the bullet already hit
                    return;
                }
            });
        }
    }, 30);
}

// Lay eggs
function layEgg(chicken) {
    if (!chicken.parentElement || gameOver) return;

    const egg = document.createElement("div");
    egg.classList.add("egg");
    eggs.push(egg);

    // Set the initial position based on the chicken
    egg.style.left = `${chicken.offsetLeft + chicken.offsetWidth / 2 - 10}px`;
    egg.style.top = `${chicken.offsetTop + chicken.offsetHeight}px`;

    // Add the egg to the game area
    gameArea.appendChild(egg);

    // Move the egg downwards
    const eggFallInterval = setInterval(() => {
        if (!egg.parentElement || gameOver) {
            clearInterval(eggFallInterval);
            return;
        }
        const currentTop = parseInt(egg.style.top);
        if (currentTop >= gameArea.offsetHeight) {
            clearInterval(eggFallInterval);
            egg.remove(); // Remove the egg when it touches the ground
        } else {
            egg.style.top = `${currentTop + 5}px`;
        }

        // Check if the egg hits the player
        if (checkCollision(egg, player)) {
            clearInterval(eggFallInterval);
            endGame("So close!");
        }
    }, 30);
}

// Animate chicken movement
function animateChicken(chicken) {
    let direction = 1; // Movement direction
    const animationInterval = setInterval(() => {
        if (!chicken.parentElement || gameOver) {
            clearInterval(animationInterval); // Stop if the chicken is removed or the game is over
            return;
        }

        const currentTop = parseInt(chicken.style.top);
        const newTop = currentTop + direction * 2; // Move by 2 pixels
        chicken.style.top = `${newTop}px`;

        // Change direction when reaching the limits
        if (newTop >= currentTop + 2 || newTop <= currentTop - 2) {
            direction *= -1;
        }
    }, 1000); // Every second
}

// Check for collisions between two objects
function checkCollision(obj1, obj2) {
    const rect1 = obj1.getBoundingClientRect();
    const rect2 = obj2.getBoundingClientRect();

    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );
}

function showWinMessage(ms) {
    messageText.textContent = ms;
    // Show message with button
    gameMessage.style.display = "block";
}

function score() {
    // Check if the current time is shorter than the global high score and save it
    if (gameTime > chHighScore || chHighScore === 0) {
        localStorage.setItem('chHighScore', gameTime); // Update global high score
        alert(`New High Score: ${gameTime} seconds`); // Alert the player
    }

    // Update the personal high score in the user object
    if (!userDetails.chhighScore || gameTime > userDetails.chhighScore) {
        userDetails.chhighScore = gameTime; // Update personal high score
        localStorage.setItem('userDetails', JSON.stringify(userDetails)); // Save the updated object
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (!gameOver) {
            gameTime++;
            timerDisplay.textContent = `Time: ${gameTime} seconds`;
        }
    }, 1000); // Update every second
}

// End the game
function endGame(ms) {
    showWinMessage(ms);
    gameOver = true;
    // alert("Game Over!");
    score();
    chickens.forEach(chicken => chicken.remove());
    chickens = [];
    eggs.forEach(egg => egg.remove());
    eggs = [];
    clearInterval(timerInterval); // Stop the timer
    // location.reload(); // Reload the game
}
