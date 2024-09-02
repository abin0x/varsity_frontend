// Fetch and populate courses and students
document.addEventListener('DOMContentLoaded', () => {
    fetchCourses();
    fetchStudents();
});

// Fetch courses from the API
const fetchCourses = async () => {
    try {
        const response = await fetch('https://varsity-s41t.onrender.com/api/courses/');
        if (!response.ok) {
            throw new Error(`Failed to fetch courses: ${response.statusText} (${response.status})`);
        }
        const courses = await response.json();
        populateCourses(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
};

// Populate course dropdown
const populateCourses = (courses) => {
    const courseSelect = document.getElementById('course');
    courseSelect.innerHTML = ''; // Clear previous options

    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = `${course.title}`;
        courseSelect.appendChild(option);
    });
};



// Handle notification creation form submission
const handleNotificationCreation = async (event) => {
    event.preventDefault();
    
    const form = document.getElementById('notification-form');
    const formData = new FormData(form);
    
    const jsonData = {};
    formData.forEach((value, key) => {
        if (key === 'for_students') {
            jsonData[key] = formData.getAll(key);
        } else {
            jsonData[key] = value;
        }
    });

    try {
        const response = await fetch('https://varsity-s41t.onrender.com/api/notifications/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('auth_token')}` // Ensure token is added
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized: Please log in.');
            } else {
                throw new Error('Network response was not ok.');
            }
        }

        const data = await response.json();
        alert('Notification created successfully!');
        form.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to create notification. Please try again.');
    }
};

// Event listener for notification form submission
const notificationForm = document.getElementById('notification-form');
if (notificationForm) {
    notificationForm.addEventListener('submit', handleNotificationCreation);
}
