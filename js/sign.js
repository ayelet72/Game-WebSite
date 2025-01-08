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
        achievements: [],
        loginAttempts: 0
    };

    // שמירה ב-LocalStorage
    localStorage.setItem('users', JSON.stringify(users));

    // שמירת שם המשתמש ב-localStorage
    localStorage.setItem('loggedInUser', username);

    // בדיקת שמירת הנתון
    console.log("שם המשתמש שנשמר ב-localStorage: ", localStorage.getItem('loggedInUser'));

    alert('נרשמת בהצלחה!');
    window.location.href = 'login.html';
});
