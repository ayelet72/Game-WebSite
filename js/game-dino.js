const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('timer');
const gameOverMessage = document.getElementById('game-over-message');
const resetBtn = document.getElementById('reset-btn');

let isJumping = false;
let score = 0;
let isGameOver = false;

// משתנים להעלאת רמת קושי
let difficultyIncreaseInterval;
let obstacleSpeed = 2; // מהירות התחלתית של המכשול

// קפיצה כאשר לוחצים על מקש הרווח
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping && !isGameOver) {
        jump();
    }
});

// פונקציית קפיצה
function jump() {
    isJumping = true;
    let jumpHeight = -8;
    let upInterval = setInterval(() => {
        if (jumpHeight >= 120) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (jumpHeight <= -8) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    jumpHeight -= 10;
                    dino.style.bottom = `${jumpHeight}px`;
                }
            }, 20);
        } else {
            jumpHeight += 10;
            dino.style.bottom = `${jumpHeight}px`;
        }
    }, 20);
}

// פונקציה להגדלת מהירות המכשול
function increaseDifficulty() {
    if (isGameOver) return;

    obstacleSpeed -= 0.2;
    const newSpeed = Math.max(0.8, obstacleSpeed); // הגבלת מהירות מינימלית
    obstacle.style.animationDuration = `${newSpeed}s`;
}

// התחלת טיימר להעלאת רמת קושי כל 10 שניות
function startDifficultyTimer() {
    difficultyIncreaseInterval = setInterval(increaseDifficulty, 4000);
}

// בדיקת התנגשות
function checkCollision() {
    if (isGameOver) return;

    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    const dinoCenterX = dinoRect.left + dinoRect.width / 2;
    const dinoCenterY = dinoRect.top + dinoRect.height / 2;

    const obstacleCenterX = obstacleRect.left + obstacleRect.width / 2;
    const obstacleCenterY = obstacleRect.top + obstacleRect.height / 2;

    const deltaX = Math.abs(dinoCenterX - obstacleCenterX);
    const deltaY = Math.abs(dinoCenterY - obstacleCenterY);

    const collisionThresholdX = (dinoRect.width + obstacleRect.width) / 2 - 30;
    const collisionThresholdY = (dinoRect.height + obstacleRect.height) / 2 - 30;

    if (deltaX < collisionThresholdX && deltaY < collisionThresholdY) {
        gameOver();
    }
}

// הצגת הודעה וכפתור איפוס
function gameOver() {
    isGameOver = true;
    obstacle.classList.add('paused');
    gameOverMessage.textContent = `Game Over! Your time: ${score}s`;
    gameOverMessage.style.display = 'block';
    resetBtn.style.display = 'block';

    // שמירת השיא אם הוא גבוה יותר מהשיא הגלובלי
    const globalHighScore = parseInt(localStorage.getItem('globalHighScore') || 0);
    if (score > globalHighScore) {
        localStorage.setItem('globalHighScore', score);
    }

    // שמירת השיא גם באובייקט המשתמש, אם הוא מחובר
    const userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};
    if (score > (userDetails.highScore || 0)) {
        userDetails.highScore = score;
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }

    clearInterval(difficultyIncreaseInterval); // עצירת העלאת הקושי כשהמשחק נגמר
}

// איפוס המשחק
function resetGame() {
    score = 0;
    isGameOver = false;
    gameOverMessage.style.display = 'none';
    resetBtn.style.display = 'none';
    scoreDisplay.textContent = `Timer: ${score}s`;

    obstacle.classList.remove('paused');
    obstacle.style.right = '-60px';

    obstacleSpeed = 2; // איפוס מהירות המכשול
    obstacle.style.animationDuration = `${obstacleSpeed}s`;

    obstacle.style.animation = 'none';
    setTimeout(() => {
        obstacle.style.animation = '';
    }, 10);

    dino.style.bottom = '-8px';

    clearInterval(difficultyIncreaseInterval); // מניעת כפילות
    startDifficultyTimer(); // הפעלת טיימר מחדש
}

// עדכון ניקוד
function updateScore() {
    if (!isGameOver) {
        score++;
        scoreDisplay.textContent = `Timer: ${score}s`;
    }
}

// בדיקת התנגשות כל 10ms
setInterval(checkCollision, 10);
setInterval(updateScore, 1000);

// הפעלת העלאת רמת קושי עם תחילת המשחק
startDifficultyTimer();

// הוספת מאזין לכפתור איפוס
resetBtn.addEventListener('click', () => {
    resetGame();
});