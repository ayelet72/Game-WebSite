document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('name').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe') ? document.getElementById('rememberMe').checked : false;

    const errorDiv = document.getElementById('wrong');

    // שליפת המשתמשים מה-localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // בדיקה האם המשתמש קיים והסיסמה תואמת
    if (users[username] && users[username].password === password) {
        // שמירת המשתמש המחובר ב-localStorage
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('userDetails', JSON.stringify(users[username]));

        // שמירת שם משתמש ב-cookie במידה והתיבה מסומנת
        if (rememberMe) {
            document.cookie = `username=${username}; path=/; max-age=${60 * 60 * 24 * 7}`; // שמירה לשבוע
        }

        // הפניה לעמוד הראשי
        window.location.href = 'main.html';
    } else {
        errorDiv.textContent = 'שם משתמש או סיסמא שגויים!';
        errorDiv.style.display = 'block';
    }
});

// מילוי אוטומטי של שם משתמש מה-cookie אם קיים
window.addEventListener('DOMContentLoaded', () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'username') {
            document.getElementById('name').value = value;
            break;
        }
    }
});
