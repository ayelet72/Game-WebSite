document.addEventListener("DOMContentLoaded", () => {
    // פונקציה לשליפת ערך מהעוגייה
    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        const cookie = cookies.find(row => row.startsWith(`${name}=`));
        if (cookie) {
            return decodeURIComponent(cookie.split("=")[1]);
        }
        return null;
    }

    // שליפת שם המשתמש מהעוגיות
    const username = getCookie("username");

    // הדפסת העוגיות לקונסול
    console.log("עוגיות בדף ראשי: ", document.cookie);

    if (username) {
        console.log("המשתמש מחובר: ", username);
        // שליפת פרטי המשתמש מתוך localStorage
        const users = JSON.parse(localStorage.getItem("users")) || {};
        const user = users[username];

        if (user) {
            // עדכון נתוני המשתמש על המסך
            document.getElementById("welcome-message").textContent = `ברוך הבא, ${username}!`;
            document.getElementById("user-stats").innerHTML = `
                <strong>כתובת אימייל:</strong> ${user.email} <br>
                <strong>שיאים:</strong> ${user.achievements.length || 0} <br>
                <strong>ניסיונות התחברות:</strong> ${user.loginAttempts || 0}
            `;
            document.getElementById("login-link").classList.add("hidden"); // מסתיר את כפתור ההתחברות
        } else {
            // משתמש לא נמצא ב-localStorage
            document.getElementById("welcome-message").textContent = "משתמש לא נמצא.";
            document.getElementById("user-stats").textContent = "אין נתונים להצגה.";
            document.getElementById("login-link").classList.remove("hidden");
        }
    } else {
        console.log("המשתמש לא מחובר");
        document.getElementById("welcome-message").textContent = "שלום אורח!";
        document.getElementById("user-stats").textContent = "אנא התחבר כדי לראות את הנתונים שלך.";
        document.getElementById("login-link").classList.remove("hidden");
    }
});
