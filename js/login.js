// Add an event listener for the 'submit' event on the login form
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values entered by the user for username, password, and remember me checkbox
    const username = document.getElementById('name').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe') ? document.getElementById('rememberMe').checked : false;

    // Reference to the error message div
    const errorDiv = document.getElementById('wrong');

    // Retrieve the users data from localStorage (or initialize to an empty object if no data exists)
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Check if the user exists and the password matches
    if (users[username] && users[username].password === password) {
        // Save the logged-in user in localStorage
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('userDetails', JSON.stringify(users[username])); // Save user details

        // If the "remember me" checkbox is checked, save the username in a cookie for a week
        if (rememberMe) {
            document.cookie = `username=${username}; path=/; max-age=${60 * 60 * 24 * 7}`; // Cookie for 7 days
        }

        // Redirect to the main page after successful login
        window.location.href = 'main.html';
    } else {
        // Display an error message if the username or password is incorrect
        errorDiv.textContent = 'Incorrect username or password!';
        errorDiv.style.display = 'block'; // Show the error div
    }
});

// Automatically fill the username field with the value from the cookie if it exists
window.addEventListener('DOMContentLoaded', () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'username') {
            document.getElementById('name').value = value; // Set the username field
            break;
        }
    }
});
