const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let score = 0;
let gameSpeed = 2000; // Initial obstacle speed in ms

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !isJumping) {
    jump();
  }
});

function jump() {
    isJumping = true;
    let jumpHeight = 0;
    let upInterval = setInterval(() => {
      if (jumpHeight >= 120) {  // הגבלת גובה הקפיצה
        clearInterval(upInterval);
        let downInterval = setInterval(() => {
          if (jumpHeight <= 0) {
            clearInterval(downInterval);
            isJumping = false;
          } else {
            jumpHeight -= 10;
            dino.style.bottom = `${jumpHeight}px`;  // הזזה למטה
          }
        }, 20);
      } else {
        jumpHeight += 10;
        dino.style.bottom = `${jumpHeight}px`;  // הזזה למעלה
      }
    }, 20);
  }
    
function checkCollision() {
  const dinoRect = dino.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    dinoRect.right > obstacleRect.left &&
    dinoRect.left < obstacleRect.right &&
    dinoRect.bottom > obstacleRect.top
  ) {
    alert('Game Over! Your score: ' + score);
    resetGame();
  }
}

function resetGame() {
  score = 0;
  gameSpeed = 2000;
  scoreDisplay.textContent = `Score: ${score}`;
  obstacle.style.animationDuration = `${gameSpeed / 1000}s`;
}

function increaseDifficulty() {
  if (gameSpeed > 800) {
    gameSpeed -= 100;
    obstacle.style.animationDuration = `${gameSpeed / 1000}s`;
  }
}

function updateScore() {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
}

setInterval(() => {
  checkCollision();
}, 10);

setInterval(() => {
  updateScore();
  increaseDifficulty();
}, 1000);
