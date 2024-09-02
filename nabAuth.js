document.addEventListener('DOMContentLoaded', function() {
    const authLinksDiv = document.getElementById('auth-links');
    const token = localStorage.getItem('authToken'); // Make sure you're using consistent key names

    if (token) {
        // User is logged in
        authLinksDiv.innerHTML = `
            <a href="#" id="logout-button">Logout</a>
        `;

        document.getElementById('logout-button').addEventListener('click', handleLogout);
    } else {
        // User is not logged in
        authLinksDiv.innerHTML = `
            <a href="login.html">Login</a> |
            <a href="register.html">Register</a>
        `;
    }
});