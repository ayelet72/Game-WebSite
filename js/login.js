
localStorage.setItem('username', 'איילת השחר');
localStorage.setItem('password', '1234567');

document.getElementById('login-form').addEventListener("submit",(ev)=>{

    const userName = document.getElementById("name");
    const pass = document.getElementById("password");
    

    // checks if the user exists in the Local Storage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const wrongError = document.getElementById('wrong');

    if (storedUsername !== userName.value || storedPassword !== pass.value) {
        wrongError.style.display="block";
        ev.preventDefault();
        // checking the password length : 
        const passwordError = document.getElementById('passerror');
        if (password.value.length < 6) {
            passwordError.style.display = "block"; //showing the error
            ev.preventDefault();
            return;
        } else {
            passwordError.textContent = "";
            passwordError.style.display = "none"; //covers the error
        }
        return;

    }
    if(storedUsername == userName.value && storedPassword == pass.value) {
      window.location.href = "";
      wrongError.style.display="none";
    }

    // checking the password length : 
    const passwordError = document.getElementById('passerror');
        if (password.value.length < 6) {
            passwordError.style.display = "block"; //showing the error
            ev.preventDefault();
            return;
        } else {
            passwordError.textContent = "";
            passwordError.style.display = "none"; //covers the error
        }


});
