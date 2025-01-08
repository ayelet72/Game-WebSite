window.addEventListener('DOMContentLoaded', function () {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const globalHighScore = localStorage.getItem('globalHighScore') || 0; // שמירת השיא הגלובלי
    const chHighScore = localStorage.getItem('chHighScore') || 0;
    const welcomeMessage = document.getElementById('welcome-message');
    const userStats = document.getElementById('user-stats');
    const loginLink = document.getElementById('login-link');

    if (userDetails) {
        const highScore = Math.max(userDetails.highScore || 0, globalHighScore); //  דינו - השיא הגבוה ביותר
        const chhighScore = Math.max(userDetails.chhighScore || 0, chHighScore);// השיר הגבוה ביותר תרנגולות
        welcomeMessage.textContent = `ברוך הבא, ${localStorage.getItem('loggedInUser')}!`;

        userStats.innerHTML = `
            אימייל: ${userDetails.email}<br>
            שיא במשחק הדינוזאור: ${highScore}s
            שיא במשחק התרנגולות: ${chhighScore}s
        `;

        // עדכון השיא הגלובלי במידה והשיא במשתמש הנוכחי גבוה יותר
        if (userDetails.highScore > globalHighScore) {
            localStorage.setItem('globalHighScore', userDetails.highScore);
        }

        // עדכון השיא הגלובלי במידה והשיא במשתמש הנוכחי גבוה יותר
        if (userDetails.chhighScore < chHighScore) {
            localStorage.setItem('chHighScore', userDetails.chhighScore);
        }

        // שינוי הקישור להתנתקות
        loginLink.textContent = 'התנתקות';
        loginLink.href = '#';
        loginLink.classList.remove('hidden');
        loginLink.addEventListener('click', function () {
            localStorage.removeItem('loggedInUser'); // מחיקת המשתמש המתחבר בלבד
            document.cookie = 'username=; path=/; max-age=0'; // מחיקת ה-cookie
            window.location.href = 'login.html';
        });
    } else {
        // אם אין משתמש מחובר, הצג כפתור התחברות
        welcomeMessage.textContent = 'ברוך הבא!';
        userStats.innerHTML = `נא להתחבר כדי לצפות בפרטים.<br> 
            שיא גלובלי במשחק הדינוזאור: ${globalHighScore}s`;
        loginLink.textContent = 'התחבר';
        loginLink.href = 'login.html';
        loginLink.classList.remove('hidden');
    }
});