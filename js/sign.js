// Add an event listener for the 'submit' event on the signup form
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values entered by the user and trim any extra spaces
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Reference to the error message div
    const errorDiv = document.getElementById('error');

    // Password length check (must be at least 6 characters)
    if (password.length < 6) {
        errorDiv.textContent = 'The password must be at least 6 characters long!'; // Display error message
        errorDiv.style.display = 'block'; // Show the error div
        return; // Stop execution if password is too short
    }

    // Retrieve user data from localStorage (or initialize to an empty object if no data exists)
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Check if the username already exists
    if (users[username]) {
        errorDiv.textContent = 'A user with this username already exists!'; // Display error message
        errorDiv.style.display = 'block'; // Show the error div
        return; // Stop execution if username exists
    }

    // Add the new user data to the users object
    users[username] = {
        email: email,
        password: password,
        achievements: [], // Initialize an empty array for achievements
        loginAttempts: 0 // Initialize login attempts counter
    };

    // Save the updated users object in localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Save the username of the logged-in user in localStorage
    localStorage.setItem('loggedInUser', username);

    // Log the saved username for debugging purposes
    console.log("Saved username in localStorage: ", localStorage.getItem('loggedInUser'));

    // Show a success message and redirect the user to the login page
    alert('Successfully registered!');
    window.location.href = 'login.html'; // Redirect to the login page
});
