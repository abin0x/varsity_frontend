document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://varsity-s41t.onrender.com/api/profile/';
    
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('auth_token'),
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('profile-image').src = data.profile_image || 'default_image.jpg';
        document.getElementById('username').textContent = data.username;
        document.getElementById('full-name').textContent = `${data.first_name} ${data.last_name}`;
        document.getElementById('email').textContent = data.email;
        document.getElementById('user-type').textContent = data.user_type.charAt(0).toUpperCase() + data.user_type.slice(1);
        
        const descriptionElement = document.getElementById('description');
        if (data.user_type === 'student') {
            descriptionElement.textContent = 'Enthusiastic student dedicated to personal and academic growth. Actively engages in coursework, participates in extracurricular activities, and seeks out opportunities to enhance skills and knowledge for future success.';
        } else if (data.user_type === 'teacher') {
            descriptionElement.textContent = 'Seasoned educator with a passion for teaching and mentoring. Committed to creating an engaging and supportive learning environment, utilizing diverse teaching methods to inspire and guide students toward their academic goals.';
        }
    })
    .catch(err => console.log('Error fetching profile data', err));
});
