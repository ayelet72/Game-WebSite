document.getElementById('login-form').addEventListener("submit", (ev) => {
    ev.preventDefault();

    // שליפת הערכים מהשדות
    const userName = document.getElementById("name").value.trim();
    const pass = document.getElementById("password").value;

    // שליפת נתוני המשתמשים מה-localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const attempts = JSON.parse(localStorage.getItem('loginAttempts')) || {};

    const user = users[userName]; // שליפת המשתמש
    const wrongError = document.getElementById('wrong');
    const passwordError = document.getElementById('passerror');
    document.cookie = "testCookie=12345; path=/; max-age=3600";

    // בדיקת סיסמה קצרה מדי
    if (pass.length < 6) {
        passwordError.style.display = "block";
        return;
    } else {
        passwordError.style.display = "none";
    }

    // בדיקת אם המשתמש חסום
    if (attempts[userName] && attempts[userName].isBlocked) {
        alert("המשתמש חסום לאחר 5 ניסיונות כושלים.");
        return;
    }

    // אימות המשתמש והסיסמה
    if (user && user.password === pass) {
        // הסרת ניסיונות כושלים
        delete attempts[userName];
        localStorage.setItem('loginAttempts', JSON.stringify(attempts));

        // שמירת שם המשתמש בעוגייה
        document.cookie = `username=${encodeURIComponent(userName)}; path=/; max-age=3600`;

    // בדיקה אם העוגייה נשמרה
    if (document.cookie.includes("testCookie=12345")) {
        console.log("עוגיות נתמכות ונשמרות בהצלחה.");
    } else {
        console.error("עוגיות לא נשמרות. ודאי שאין חסימה בדפדפן.");
    }

        // // מעבר לדף הראשי
        // window.location.href = "main.html";
        // wrongError.style.display = "none";
    } else {
        // אם הסיסמה לא נכונה, הצגת הודעת שגיאה
        wrongError.style.display = "block";

        // ניהול ניסיונות התחברות
        if (!attempts[userName]) {
            attempts[userName] = { count: 0, isBlocked: false };
        }
        attempts[userName].count++;

        if (attempts[userName].count >= 5) {
            attempts[userName].isBlocked = true;
            alert("המשתמש נחסם לאחר 5 ניסיונות כושלים.");
        }
        

        // עדכון ניסיונות ב-localStorage
        localStorage.setItem('loginAttempts', JSON.stringify(attempts));
    }
});
