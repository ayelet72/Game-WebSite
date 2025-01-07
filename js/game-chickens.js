const gameArea= document.getElementById("gameArea");
const player =  document.getElementById("player");

let chickens = [];
let bullets = [];
let eggs = [];
let gameOver = false;

const gameAreaWidth = gameArea.offsetWidth;
const gameAreaHeight = gameArea.offsetHeight;

//start the game by clicking the button:
startButton.addEventListener("click", () => {
    startButton.style.display = "none"; // הסתרת הכפתור
    startGame();
  });

function startGame() {
    gameOver = false;
    playerMove();
    createChickenRows();
    gameArea.addEventListener("click", () => {
    shootBullet();
  });
}

function createChickenRows() {
  const rows = 4; // מספר השורות
  const cols = 10; // מספר הטורים
  const chickenSpacing = 50; // מרחק בין תרנגולות
  const startX = 20; // מיקום התחלה בציר X
  const startY = 20; // מיקום התחלה בציר Y

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const chicken = createChicken();

      // קביעת המיקום
      chicken.style.left = `${startX + col * chickenSpacing}px`;
      chicken.style.top = `${startY + row * chickenSpacing}px`;

      gameArea.appendChild(chicken);
    
      // הפעלת תנועה למעלה ולמטה
      animateChicken(chicken);
    }
  }
}


//player movemnt
function playerMove(){
    document.addEventListener("keydown", (e)=>{
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
    })
}




//create chicken
function createChicken(){
    if(gameover){return;}
    const chicken = document.createElement("div");
    chicken.classList.add("chicken");

    //chicken.style.top = `${Math.random() * 50}px`;
    //chicken.style.left = `${Math.random() * (gameAreaWidth - 50)}px`;

  gameArea.appendChild(chicken);
  //chickens.push(chicken);

  setTimeout(() => layEgg(chicken), Math.random() * 3000 + 2000);
}

//bullets
function shootBullet() {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
  
    // קביעת מיקום התחלתי של הכדור ביחס לשחקן
    bullet.style.left = `${player.offsetLeft + player.offsetWidth / 2 - 5}px`;
    bullet.style.top = `${player.offsetTop}px`;
  
    //add to the geme space
    gameArea.appendChild(bullet);
  
    // moovment -upwords
    const interval = setInterval(() => {
      const bulletTop = parseInt(bullet.style.top);
      if (bulletTop <= 0) {
        clearInterval(interval); // delets the boolet when it ges out the frame
        bullet.remove();
      } else {
        bullet.style.top = `${bulletTop - 10}px`;
      }
    }, 30);
}


//eggs:
function layEgg(chicken) {
    if (!chicken.parentElement || gameOver) return; 
  
    const egg = document.createElement("div");
    egg.classList.add("egg");
  
    // start placemnt according to the chickens
    egg.style.left = `${chicken.offsetLeft + chicken.offsetWidth / 2 - 10}px`;
    egg.style.top = `${chicken.offsetTop + chicken.offsetHeight}px`;
  
    // adds the egg to the game space
    gameArea.appendChild(egg);
  
    // the egss movemnt downwords
    const eggFallInterval = setInterval(() => {
      if (!egg.parentElement || gameOver) {
        clearInterval(eggFallInterval); // עצור את התנועה אם המשחק נגמר או התרנגולת הוסרה
        return;
      }
      const currentTop = parseInt(egg.style.top);
      if (currentTop >= gameArea.offsetHeight) {
        // delets the eggs that touched the grownd 
        clearInterval(eggFallInterval);
        egg.remove();
      } else {
        egg.style.top = `${currentTop + 5}px`;
      }
  
      // בדיקה אם הביצה פוגעת בשחקן
      if (checkCollision(egg, player)) {
        endGame();
      }
    }, 30);
}


function startEggLaying(chicken) {
    const layInterval = setInterval(() => {
      if (!chicken.parentElement || gameOver) {
        clearInterval(layInterval); // עצור אם התרנגול הוסר או המשחק נגמר
        return;
      }
      layEgg(chicken); // התרנגול מטיל ביצה
    }, Math.random() * 3000 + 2000); // כל 2-5 שניות
}

//chicken movemnt
function animateChicken(chicken) {
    let direction = 1; // direction 
    const animationInterval = setInterval(() => {
      if (!chicken.parentElement || gameOver) {
        clearInterval(animationInterval); // עצירה אם התרנגול נמחק או המשחק נגמר
        return;
      }
  
      const currentTop = parseInt(chicken.style.top);
      const newTop = currentTop + direction * 2; // תנועה של 2 פיקסלים
      chicken.style.top = `${newTop}px`;
  
      // change the direction 
      if (newTop >= currentTop + 2 || newTop <= currentTop - 2) {
        direction *= -1;
      }
    }, 1000); //every second 
}

//checking if object1 touched object2 
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
  
  
function endGame() {
    gameOver = true;
    alert("Game Over!");
    //location.reload(); // טוען מחדש את המשחק
}



  
  
  