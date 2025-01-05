document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (localStorage.getItem(username)) {
        document.getElementById('error').style.display = 'block';
    } else {
        const user = {
            email: email,
            password: password
        };
        
        localStorage.setItem(username, JSON.stringify(user));
        alert('נרשמת בהצלחה!');
        window.location.href = 'login.html';
    }
});
