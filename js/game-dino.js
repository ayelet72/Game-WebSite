const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let score = 0;
let gameSpeed = 2000;
let isGameOver = false; // משתנה למניעת התנגשויות חוזרות

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

// בדיקת התנגשות בין הדינוזאור למכשול
function checkCollision() {
  if (isGameOver) return; // עצור אם המשחק הסתיים

  const dinoRect = dino.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  // מרכז הדינוזאור
  const dinoCenterX = dinoRect.left + dinoRect.width / 2;
  const dinoCenterY = dinoRect.top + dinoRect.height / 2;

  // מרכז העץ
  const obstacleCenterX = obstacleRect.left + obstacleRect.width / 2;
  const obstacleCenterY = obstacleRect.top + obstacleRect.height / 2;

  // חישוב מרחק אופקי ואנכי
  const deltaX = Math.abs(dinoCenterX - obstacleCenterX);
  const deltaY = Math.abs(dinoCenterY - obstacleCenterY);

  // הגדרת סף התנגשות
  const collisionThresholdX = (dinoRect.width + obstacleRect.width) / 2 - 20;
  const collisionThresholdY = (dinoRect.height + obstacleRect.height) / 2 - 20;

  if (deltaX < collisionThresholdX && deltaY < collisionThresholdY) {
    isGameOver = true; // מנע התנגשויות נוספות
    obstacle.classList.add('paused'); // עצור את האנימציה
    // alert('Game Over! Your score: ' + score);
    resetGame();
  }
}

// איפוס המשחק
function resetGame() {
  score = 0;
  gameSpeed = 2000;
  isGameOver = false;
  scoreDisplay.textContent = `Score: ${score}`;
  obstacle.classList.remove('paused');
  obstacle.style.animationDuration = `${gameSpeed / 1000}s`;
  obstacle.style.right = '-60px';  // החזרת העץ להתחלה
}

// העלאת הקושי עם הזמן
function increaseDifficulty() {
  if (gameSpeed > 800) {
    gameSpeed -= 100;
    obstacle.style.animationDuration = `${gameSpeed / 1000}s`;
  }
}

// עדכון ניקוד
function updateScore() {
  if (!isGameOver) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }
}

// בדיקת התנגשות כל 10ms
setInterval(() => {
  checkCollision();
}, 10);

// עדכון ניקוד וקושי כל שניה
setInterval(() => {
  updateScore();
  // increaseDifficulty();
}, 1000);
