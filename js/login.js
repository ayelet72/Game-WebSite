

document.getElementById('login-form').addEventListener("submit",(ev)=>{
    ev.preventDefault();
    const userName = document.getElementById("name");
    const pass =document.getElementById("password");

    const popup = getElementById('popup');
    const overlay = document.getElementById('overlay');

    popup.style.display = 'block';
    overlay.style.display = 'block';

    //saving the login information- if the user want to :
    document.getElementById('rememberButton').addEventListener('click', () => {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        popup.style.display = 'none';
        overlay.style.display = 'none';
        alert('פרטיך נשמרו בהצלחה!');
    });

    document.getElementById('closeButton').addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        alert('המשתמש לא נשמר.');
    });

    const passwordError = document.getElementById('passwordError');
        // checks the password length:
        if (password.length < 6) {
            passwordError.textContent = "הסיסמא חייבת להכיל לפחות 6 תווים.";
            return;
        } 
        else{
            passwordError.textContent = "";
        }


});
