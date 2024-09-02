// Handle Registration
const handleRegistration = (event) => {
    event.preventDefault();
    const form = document.getElementById('registration-form');
    const formData = new FormData(form);

    const role = formData.get('user_type'); // Get the user role (student or teacher)
    const profileImageFile = formData.get('profile_image');
  
    if (profileImageFile) {
        // Upload image to imgBB
        uploadImageToImgBB(profileImageFile, (imageUrl) => {
            formData.set('profile_image', imageUrl);
            submitRegistrationForm(formData);
        });
    } else {
        submitRegistrationForm(formData);
    }
};

const submitRegistrationForm = (formData) => {
    const jsonData = {};
    formData.forEach((value, key) => {
        if (value instanceof File) {
            return;
        }
        jsonData[key] = value;
    });

    console.log('Submitting registration data:', jsonData); // Debugging line

    fetch('https://varsity-s41t.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.detail) {
            alert('Registration Successful. Please check your email for confirmation.');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed: ' + (data.error || 'Please try again.'));
        }
    })
    .catch((err) => console.log('Registration error', err));
};

// Upload image to imgBB
const uploadImageToImgBB = (imageFile, callback) => {
    const apiKey = 'd18b1e9613f8b8cd33d7da9d7d9b7322'; // Replace with your imgBB API key
    const formData = new FormData();
    formData.append('key', apiKey);
    formData.append('image', imageFile);

    fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            callback(data.data.url);
        } else {
            throw new Error('Failed to upload image to imgBB');
        }
    })
    .catch((err) => console.log('Image upload error', err));
};

// Event listeners
if (document.getElementById('registration-form')) {
    document.getElementById('registration-form').addEventListener('submit', handleRegistration);
}
// Handle Login
const handleLogin = (event) => {
    event.preventDefault();
    const form = document.getElementById('login-form');
    const formData = new FormData(form);

    const loginData = {};
    formData.forEach((value, key) => {
        if (value instanceof File) {
            return;
        }
        loginData[key] = value;
    });

    fetch('https://varsity-s41t.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.key) {
            // Save token in localStorage or sessionStorage
            localStorage.setItem('auth_token', data.key);
            alert('Login successful!');
            window.location.href = 'index.html'; // Redirect to the user's dashboard
        } else {
            alert('Login failed: ' + (data.non_field_errors || 'Please try again.'));
        }
    })
    .catch((err) => console.log('Login error', err));
};

// Event listeners
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
}
// Handle Logout
const handleLogout = () => {
    fetch('https://varsity-s41t.onrender.com/api/users/logout', {
        method: 'GET',
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('auth_token'),
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.detail) {
            // Clear the token from localStorage or sessionStorage
            localStorage.removeItem('auth_token');
            alert('Logout successful!');
            window.location.href = 'index.html'; // Redirect to the homepage or login page
        } else {
            alert('Logout failed: ' + (data.error || 'Please try again.'));
        }
    })
    .catch((err) => console.log('Logout error', err));
};

// Event listeners
if (document.getElementById('logout-button')) {
    document.getElementById('logout-button').addEventListener('click', handleLogout);
}


document.addEventListener('DOMContentLoaded', function() {
    const authLinksDiv = document.getElementById('auth-links');
    const token = localStorage.getItem('auth_token'); // Make sure you're using consistent key names

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


document.addEventListener('DOMContentLoaded', function() {
    const profileMenu = document.getElementById('profile-menu'); 
    const token = localStorage.getItem('auth_token'); 

    if (token) {
        
        profileMenu.style.display = 'block';
    } else {
        
        profileMenu.style.display = 'none';
    }
});
