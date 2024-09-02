document.addEventListener('DOMContentLoaded', () => {
    fetchCourses();
    fetchStudents();
});

const fetchCourses = () => {
    fetch('https://varsity-s41t.onrender.com/api/courses/', {
        method: 'GET',
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('auth_token'),
        },
    })
    .then(response => response.json())
    .then(data => {
        const courseSelect = document.getElementById('course');
        data.forEach(course => {
            const option = document.createElement('option');
            option.value = course.id;
            option.textContent = course.title;
            courseSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching courses:', error));
};

const fetchStudents = () => {
    fetch('https://varsity-s41t.onrender.com/api/users/', {
        method: 'GET',
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('auth_token'),
        },
    })
    .then(response => response.json())
    .then(data => {
        const studentsList = document.getElementById('students-list');
        studentsList.innerHTML = ''; // Clear existing content
        data.forEach(user => {
            // Assuming 'user_type' is a field in your API response to differentiate between students and others
            if (user.user_type === 'student') {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `student_${user.id}`;
                checkbox.name = `student_${user.id}`;
                checkbox.value = 'present';

                const label = document.createElement('label');
                label.htmlFor = checkbox.id;
                label.textContent = `${user.first_name} ${user.last_name}`; // Display full name

                studentsList.appendChild(checkbox);
                studentsList.appendChild(label);
                studentsList.appendChild(document.createElement('br'));
            }
        });
    })
    .catch(error => console.error('Error fetching students:', error));
};

const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = document.getElementById('attendance-form');
    const formData = new FormData(form);
    const jsonData = {};

    formData.forEach((value, key) => {
        if (value instanceof File) return;
        jsonData[key] = value;
    });

    const students = document.querySelectorAll('#students-list input[type="checkbox"]');
    students.forEach(student => {
        jsonData[student.name] = student.checked ? 'present' : 'absent';
    });

    fetch('https://varsity-s41t.onrender.com/api/attendance/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('auth_token'),
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => {
        if (response.ok) {
            return response.blob(); // Handle the PDF response as a blob
        }
        throw new Error('Network response was not ok.');
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'attendance_record.pdf'; // Default file name
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Clean up
        alert('Attendance recorded successfully!');
    })
    .catch(error => console.error('Error:', error));
};

document.getElementById('attendance-form').addEventListener('submit', handleFormSubmit);
