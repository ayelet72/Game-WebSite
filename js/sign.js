// טיפול ברישום משתמשים
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // בדיקה אם הסיסמה קצרה מ-6 תווים
    if (password.length < 6) {
        document.getElementById('error').textContent = 'הסיסמה חייבת להיות באורך של לפחות 6 תווים!';
        document.getElementById('error').style.display = 'block';
        return;
    }

    // בדיקה אם המשתמש כבר קיים
    let users = JSON.parse(localStorage.getItem('users')) || {};
    let attempts = JSON.parse(localStorage.getItem('attempts')) || {};

    if (users[username]) {
        document.getElementById('error').textContent = 'משתמש כבר קיים!';
        document.getElementById('error').style.display = 'block';
        return;
    }

    // הוספת משתמש חדש ל-LocalStorage
    users[username] = {
        email: email,
        password: password,
        achievements: [],
        loginAttempts: 0
    };

    localStorage.setItem('users', JSON.stringify(users));

    alert('נרשמת בהצלחה!');
    document.cookie = `username=${username}; path=/; max-age=3600`;
    window.location.href = 'login.html';
});

// מעקב אחר משתמשים חסומים וניסיונות שגויים
function blockUser(username) {
    let blocked = JSON.parse(localStorage.getItem('blockedUsers')) || [];
    blocked.push(username);
    localStorage.setItem('blockedUsers', JSON.stringify(blocked));
}

function isUserBlocked(username) {
    let blocked = JSON.parse(localStorage.getItem('blockedUsers')) || [];
    return blocked.includes(username);
}
