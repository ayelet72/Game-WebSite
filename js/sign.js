document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const errorDiv = document.getElementById('error');

    // בדיקת אורך הסיסמה
    if (password.length < 6) {
        errorDiv.textContent = 'הסיסמה חייבת להיות באורך של לפחות 6 תווים!';
        errorDiv.style.display = 'block';
        return;
    }

    // שליפת נתוני המשתמשים
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // בדיקה אם המשתמש כבר קיים
    if (users[username]) {
        errorDiv.textContent = 'משתמש בשם זה כבר קיים!';
        errorDiv.style.display = 'block';
        return;
    }

    // הוספת משתמש חדש
    users[username] = {
        email: email,
        password: password,
        achievements: [], // השגים
        loginAttempts: 0  // נסיונות התחברות
    };

    // שמירה ב-LocalStorage
    localStorage.setItem('users', JSON.stringify(users));

    // שמירת שם המשתמש בעוגייה
    document.cookie = `username=${username}; path=/; max-age=3600`;  // שמירת העוגייה ללא secure

    // בדיקת שמירת העוגיה
    console.log("עוגייה שנשמרה: ", document.cookie);

    alert('נרשמת בהצלחה!');
    window.location.href = 'login.html';
});
