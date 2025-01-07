document.getElementById('login-form').addEventListener("submit", (ev) => {
    ev.preventDefault();

    const userName = document.getElementById("name").value;
    const pass = document.getElementById("password").value;

    // שליפת המשתמשים מ-localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const attempts = JSON.parse(localStorage.getItem('loginAttempts')) || {}; // אובייקט לניסיונות כניסה

    const user = users[userName];
    const wrongError = document.getElementById('wrong');
    const passwordError = document.getElementById('passerror');

    // בדיקת חסימת משתמש
    if (attempts[userName] && attempts[userName].isBlocked) {
        alert("המשתמש חסום לאחר 5 ניסיונות כושלים.");
        return;
    }

    // בדיקת אורך הסיסמה
    if (pass.length < 6) {
        passwordError.style.display = "block";
        return;
    } else {
        passwordError.style.display = "none";
    }

    if (user && user.password === pass) {
        // איפוס הניסיונות במידה וההתחברות הצליחה
        delete attempts[userName];
        localStorage.setItem('loginAttempts', JSON.stringify(attempts));

        alert('התחברת בהצלחה!');
        window.location.href = "main.html";
        wrongError.style.display = "none";
    } else {
        // אם שם המשתמש או הסיסמה אינם נכונים
        wrongError.style.display = "block";

        // עדכון מספר הניסיונות למשתמש
        if (!attempts[userName]) {
            attempts[userName] = { count: 0, isBlocked: false };
        }
        attempts[userName].count++;

        // חסימת המשתמש לאחר 5 ניסיונות
        if (attempts[userName].count >= 5) {
            attempts[userName].isBlocked = true;
            alert("המשתמש נחסם לאחר 5 ניסיונות כושלים.");
        }

        localStorage.setItem('loginAttempts', JSON.stringify(attempts));
    }
});
