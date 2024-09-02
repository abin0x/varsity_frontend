// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('notification-form');
//     const responseMessage = document.getElementById('response-message');
//     const courseSelect = document.getElementById('course');
//     const teachersSelect = document.getElementById('for_teachers');
//     const apiUrl = 'https://varsity-s41t.onrender.com/api/cr'; // API endpoint for creating notifications
//     const coursesApiUrl = 'https://varsity-s41t.onrender.com/api/courses/'; // API endpoint for fetching courses
//     const usersApiUrl = 'https://varsity-s41t.onrender.com/api/users/'; // API endpoint for fetching users

//     async function fetchCourses() {
//         try {
//             const response = await fetch(coursesApiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 const errorDetails = await response.text();
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();
//             populateCourses(data);
//         } catch (error) {
//             console.error('Error fetching courses:', error);
//         }
//     }

//     async function fetchTeachers() {
//         try {
//             const response = await fetch(usersApiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 const errorDetails = await response.text();
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();
//             const teachers = data.filter(user => user.user_type === 'teacher');
//             populateTeachers(teachers);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     }

//     function populateCourses(courses) {
//         courseSelect.innerHTML = '<option value="">Select Course</option>';
//         courses.forEach(course => {
//             const option = document.createElement('option');
//             option.value = course.id;
//             option.textContent = course.title; // Adjust based on your API response
//             courseSelect.appendChild(option);
//         });
//     }

//     function populateTeachers(teachers) {
//         teachersSelect.innerHTML = '';
//         teachers.forEach(teacher => {
//             const option = document.createElement('option');
//             option.value = teacher.id;
//             option.textContent = teacher.username; // Adjust based on your API response
//             teachersSelect.appendChild(option);
//         });
//     }

//     form.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const formData = new FormData(form);

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Token ${localStorage.getItem('auth_token')}` // Use auth token if required
//                 },
//                 body: formData
//             });

//             if (!response.ok) {
//                 const errorDetails = await response.text();
//                 responseMessage.textContent = `Error: ${response.status} - ${errorDetails}`;
//                 responseMessage.style.color = 'red';
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();
//             responseMessage.textContent = 'Notification created successfully!';
//             responseMessage.style.color = 'green';
//             form.reset(); // Clear the form
//         } catch (error) {
//             console.error('Error creating notification:', error);
//             responseMessage.textContent = 'Failed to create notification. Please try again.';
//             responseMessage.style.color = 'red';
//         }
//     });

//     fetchCourses();
//     fetchTeachers();
// });



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('notification-form');
    const responseMessage = document.getElementById('response-message');
    const courseSelect = document.getElementById('course');
    const teachersSelect = document.getElementById('for_teachers');
    const apiUrl = 'https://varsity-s41t.onrender.com/api/cr'; // API endpoint for creating notifications
    const coursesApiUrl = 'https://varsity-s41t.onrender.com/api/courses/'; // API endpoint for fetching courses
    const usersApiUrl = 'https://varsity-s41t.onrender.com/api/users/'; // API endpoint for fetching users
    const imgbbApiUrl = 'https://api.imgbb.com/1/upload';
    const imgbbApiKey = '67b5c3db779f78eaa9e1918a2e997101'; // Replace with your ImgBB API key

    async function fetchCourses() {
        try {
            const response = await fetch(coursesApiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            populateCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    async function fetchTeachers() {
        try {
            const response = await fetch(usersApiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const teachers = data.filter(user => user.user_type === 'teacher');
            populateTeachers(teachers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    function populateCourses(courses) {
        courseSelect.innerHTML = '<option value="">Select Course</option>';
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.id;
            option.textContent = course.title; // Adjust based on your API response
            courseSelect.appendChild(option);
        });
    }

    function populateTeachers(teachers) {
        teachersSelect.innerHTML = '';
        teachers.forEach(teacher => {
            const option = document.createElement('option');
            option.value = teacher.id;
            option.textContent = teacher.username; // Adjust based on your API response
            teachersSelect.appendChild(option);
        });
    }

    async function uploadToImgBB(file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${imgbbApiUrl}?key=${imgbbApiKey}`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`ImgBB upload error! Status: ${response.status} - ${errorDetails}`);
            }

            const data = await response.json();
            return data.data.url; // Return the URL of the uploaded image
        } catch (error) {
            console.error('Error uploading to ImgBB:', error);
            throw error;
        }
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];

        try {
            let fileUrl = null;

            // If a file is attached, upload it to ImgBB first
            if (file) {
                fileUrl = await uploadToImgBB(file);
                formData.append('file_url', fileUrl); // Append the ImgBB file URL to formData
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('auth_token')}` // Use auth token if required
                },
                body: formData
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                responseMessage.textContent = `Error: ${response.status} - ${errorDetails}`;
                responseMessage.style.color = 'red';
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            responseMessage.textContent = 'Notification created successfully!';
            responseMessage.style.color = 'green';
            window.location.href ='crDashboard.html';
            alert('Notification created successfully!');
            
        } catch (error) {
            console.error('Error creating notification:', error);
            responseMessage.textContent = 'Failed to create notification. Please try again.';
            responseMessage.style.color = 'red';
        }
    });

    fetchCourses();
    fetchTeachers();
});
