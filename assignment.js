document.addEventListener('DOMContentLoaded', () => {
    // Fetch courses and students on page load
    fetchCourses();
    fetchStudents();

    // Handle form submission
    document.getElementById('assignmentForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const assignmentData = {
            title: formData.get('title'),
            description: formData.get('description'),
            due_date: formData.get('due_date'),
            course: formData.get('course'),
            // for_students: Array.from(formData.getAll('for_students')) 
        };

        try {
            const response = await fetch('https://varsity-s41t.onrender.com/api/assignments/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(assignmentData)
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Network response was not ok. Status: ${response.status}, Details: ${errorDetails}`);
            }

            const result = await response.json();
            console.log('Assignment created successfully:', result);
            alert('Assignment created successfully!');
            document.getElementById('assignmentForm').reset();
        } catch (error) {
            console.error('Error creating assignment:', error);
            alert('Error creating assignment: ' + error.message);
        }
    });
});

async function fetchCourses() {
    try {
        const response = await fetch('https://varsity-s41t.onrender.com/api/courses/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('auth_token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch courses: ${response.status}`);
        }

        const courses = await response.json();
        const courseSelect = document.getElementById('course');

        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.id;
            option.textContent = course.title;
            courseSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

async function fetchStudents() {
    try {
        const response = await fetch('https://varsity-s41t.onrender.com/api/users/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('auth_token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch students: ${response.status}`);
        }

        const users = await response.json();
        const studentSelect = document.getElementById('for_students');

        users.forEach(user => {
            if (user.user_type === 'student') {
                const option = document.createElement('option');
                option.value = user.id; // Use the ID here
                option.textContent = user.username;0
                studentSelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

// abin 