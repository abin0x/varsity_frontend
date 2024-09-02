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

    document.getElementById('edit-button').addEventListener('click', () => {
        document.getElementById('profile-view').classList.add('d-none');
        document.getElementById('profile-edit').classList.remove('d-none');
        
        // Populate edit form with current data
        document.getElementById('profile-image-input').value = document.getElementById('profile-image').src;
        document.getElementById('username-input').value = document.getElementById('username').textContent;
        document.getElementById('full-name-input').value = document.getElementById('full-name').textContent;
        document.getElementById('email-input').value = document.getElementById('email').textContent;
        document.getElementById('user-type-input').value = document.getElementById('user-type').textContent.toLowerCase();
        document.getElementById('description-input').value = document.getElementById('description').textContent;
    });

    document.getElementById('cancel-button').addEventListener('click', () => {
        document.getElementById('profile-edit').classList.add('d-none');
        document.getElementById('profile-view').classList.remove('d-none');
    });

    document.getElementById('save-button').addEventListener('click', () => {
        const formData = {
            profile_image: document.getElementById('profile-image-input').value,
            username: document.getElementById('username-input').value,
            first_name: document.getElementById('full-name-input').value.split(' ')[0],
            last_name: document.getElementById('full-name-input').value.split(' ')[1],
            email: document.getElementById('email-input').value,
            user_type: document.getElementById('user-type-input').value,
            description: document.getElementById('description-input').value,
        };

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('auth_token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('profile-image').src = formData.profile_image;
            document.getElementById('username').textContent = formData.username;
            document.getElementById('full-name').textContent = `${formData.first_name} ${formData.last_name}`;
            document.getElementById('email').textContent = formData.email;
            document.getElementById('user-type').textContent = formData.user_type.charAt(0).toUpperCase() + formData.user_type.slice(1);
            document.getElementById('description').textContent = formData.description;

            document.getElementById('profile-edit').classList.add('d-none');
            document.getElementById('profile-view').classList.remove('d-none');
        })
        .catch(err => console.log('Error updating profile', err));
    });
});
