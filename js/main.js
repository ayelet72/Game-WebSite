// Add an event listener to execute code once the DOM content is fully loaded
window.addEventListener('DOMContentLoaded', function () {
    // Retrieve user details and high scores from localStorage
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const globalHighScore = localStorage.getItem('globalHighScore') || 0; // Global high score
    const chHighScore = localStorage.getItem('chHighScore') || 0; // High score for the chicken game

    // Get references to the HTML elements where user details will be displayed
    const welcomeMessage = document.getElementById('welcome-message');
    const userStats = document.getElementById('user-stats');
    const loginLink = document.getElementById('login-link');

    // If user details exist (the user is logged in)
    if (userDetails) {
        // Calculate the highest score between the user's score and the global score for each game
        const highScore = Math.max(userDetails.highScore || 0, globalHighScore); // Dinosaur game high score
        const chhighScore = Math.max(userDetails.chhighScore || 0, chHighScore); // Chicken game high score
        
        // Display the welcome message with the logged-in user's name
        welcomeMessage.textContent = `Welcome, ${localStorage.getItem('loggedInUser')}!`;

        // Display user stats including email and high scores for both games
        userStats.innerHTML = `
            Email: ${userDetails.email}<br>
            Dinosaur Game High Score: ${highScore}s<br>
            Chicken Game High Score: ${chhighScore}s
        `;

        // Update the global high scores if the current user's scores are higher
        if (userDetails.highScore > globalHighScore) {
            localStorage.setItem('globalHighScore', userDetails.highScore); // Update global dinosaur high score
        }
        if (userDetails.chhighScore > chHighScore) {
            localStorage.setItem('chHighScore', userDetails.chhighScore); // Update global chicken game high score
        }

        // Update the login link to show "Logout" and provide functionality for logging out
        loginLink.textContent = 'Logout';
        loginLink.href = '#'; // Set the link to prevent navigation
        loginLink.classList.remove('hidden'); // Make the logout link visible

        // Add a click event to log the user out
        loginLink.addEventListener('click', function () {
            localStorage.removeItem('loggedInUser'); // Remove the logged-in user from localStorage
            document.cookie = 'username=; path=/; max-age=0'; // Delete the 'username' cookie
            window.location.href = 'login.html'; // Redirect to the login page
        });
    } else {
        // If no user is logged in, display a login button and global high score
        welcomeMessage.textContent = 'Welcome!';
        userStats.innerHTML = `Please log in to view your details.<br>
            Global Dinosaur Game High Score: ${globalHighScore}s`;

        // Set the login link to direct to the login page
        loginLink.textContent = 'Login';
        loginLink.href = 'login.html';
        loginLink.classList.remove('hidden'); // Make the login link visible
    }
});
